import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { rest } from 'msw';
import { server } from '../msw/server';
import { renderWithProviders } from '../utils/renderWithProviders';
import ReportViolence from '@/pages/report-violence';

// Mock ReCAPTCHA — renders a simple button that triggers onChange with a test token
jest.mock(`react-google-recaptcha`, () =>
  // eslint-disable-next-line react/display-name
  React.forwardRef(
    (
      { onChange }: { onChange: (token: string) => void },
      _ref: React.Ref<unknown>,
    ) => (
      <button
        type="button"
        data-testid="mock-recaptcha"
        onClick={() => onChange(`mock-recaptcha-token`)}
      >
        Verify reCAPTCHA
      </button>
    ),
  ),
);

// Mock next/router (required by pages that use useRouter implicitly via Layout)
jest.mock(`next/router`, () => ({
  useRouter: () => ({ pathname: `/report-violence`, push: jest.fn() }),
}));

// Leaflet requires a DOM that jsdom doesn't fully support — mock it
jest.mock(`leaflet`, () => ({}));
jest.mock(`react-leaflet`, () => ({
  MapContainer: () => null,
  TileLayer: () => null,
  Marker: () => null,
  Popup: () => null,
  useMap: () => ({ fitBounds: jest.fn() }),
}));

const BASE_URL = `http://localhost:3001`;

describe(`ReportViolence page`, () => {
  it(`renders the page heading`, async () => {
    renderWithProviders(<ReportViolence />);
    expect(screen.getByText(`Report Violence`)).toBeInTheDocument();
  });

  it(`submit button is disabled before reCAPTCHA is verified`, async () => {
    renderWithProviders(<ReportViolence />);
    const submitBtn = screen.getByRole(`button`, { name: /submit report/i });
    expect(submitBtn).toBeDisabled();
  });

  it(`renders the reCAPTCHA widget when online`, () => {
    renderWithProviders(<ReportViolence />);
    expect(screen.getByTestId(`mock-recaptcha`)).toBeInTheDocument();
  });

  it(`loads states from API into the state dropdown`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportViolence />);

    // react-select only renders options once the menu is open
    await user.click(screen.getByText(`Select State*`));

    expect(await screen.findByText(`Lagos`)).toBeInTheDocument();
  });

  it(`submit button becomes enabled after clicking reCAPTCHA`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportViolence />);

    // Mock the verify endpoint to return success
    server.use(
      rest.post(`${BASE_URL}/verify`, (_req, res, ctx) =>
        res(ctx.json({ data: { success: true } })),
      ),
    );

    await user.click(screen.getByTestId(`mock-recaptcha`));

    await waitFor(() => {
      const submitBtn = screen.getByRole(`button`, { name: /submit report/i });
      expect(submitBtn).not.toBeDisabled();
    });
  });

  it(`shows error toast when description and file are both empty on submit`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportViolence />);

    // Verify reCAPTCHA and wait for button to enable
    server.use(
      rest.post(`${BASE_URL}/verify`, (_req, res, ctx) =>
        res(ctx.json({ data: { success: true } })),
      ),
    );
    await user.click(screen.getByTestId(`mock-recaptcha`));

    await waitFor(() => {
      expect(
        screen.getByRole(`button`, { name: /submit report/i }),
      ).not.toBeDisabled();
    });

    // Wait for states to load, then select state
    await user.click(screen.getByText(`Select State*`));
    await user.click(await screen.findByText(`Lagos`));

    // Wait for LGAs to load, then select LGA
    await user.click(screen.getByText(`Please Select LGA*`));
    await user.click(await screen.findByText(`Ikeja`));

    // Wait for wards, select Ward
    await user.click(screen.getByText(`Select Ward*`));
    await user.click(await screen.findByText(`Ward A`));

    // Wait for polling units, select PU
    await user.click(screen.getByText(`Select Polling Unit*`));
    await user.click(await screen.findByText(`PU 001`));

    // Select violence type
    await user.click(screen.getByText(`Select Violence Type*`));
    await user.click(await screen.findByText(`Ballot Box Snatching`));

    // Submit without description or file
    await user.click(screen.getByRole(`button`, { name: /submit report/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Both description field and file evidence cannot be empty/,
        ),
      ).toBeInTheDocument();
    });
  });

  it(`shows success toast after successful submission`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportViolence />);

    server.use(
      rest.post(`${BASE_URL}/verify`, (_req, res, ctx) =>
        res(ctx.json({ data: { success: true } })),
      ),
    );
    await user.click(screen.getByTestId(`mock-recaptcha`));

    await waitFor(() => {
      expect(
        screen.getByRole(`button`, { name: /submit report/i }),
      ).not.toBeDisabled();
    });

    // Select all required dropdowns
    await user.click(screen.getByText(`Select State*`));
    await user.click(await screen.findByText(`Lagos`));

    await user.click(screen.getByText(`Please Select LGA*`));
    await user.click(await screen.findByText(`Ikeja`));

    await user.click(screen.getByText(`Select Ward*`));
    await user.click(await screen.findByText(`Ward A`));

    await user.click(screen.getByText(`Select Polling Unit*`));
    await user.click(await screen.findByText(`PU 001`));

    await user.click(screen.getByText(`Select Violence Type*`));
    await user.click(await screen.findByText(`Ballot Box Snatching`));

    // Add a description so the "empty description + empty file" guard passes
    const descriptionField = screen.getByPlaceholderText(
      `Description of Incidence`,
    );
    await user.type(descriptionField, `A violent incident occurred here.`);

    await user.click(screen.getByRole(`button`, { name: /submit report/i }));

    await waitFor(() => {
      expect(
        screen.getByText(`Your report has been recorded successfully.`),
      ).toBeInTheDocument();
    });
  });

  it(`shows error toast when server returns a 422`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportViolence />);

    server.use(
      rest.post(`${BASE_URL}/verify`, (_req, res, ctx) =>
        res(ctx.json({ data: { success: true } })),
      ),
      rest.post(`${BASE_URL}/violence-reports`, (_req, res, ctx) =>
        res(
          ctx.status(422),
          ctx.json({ message: `The given data was invalid.` }),
        ),
      ),
    );

    await user.click(screen.getByTestId(`mock-recaptcha`));

    await waitFor(() =>
      expect(
        screen.getByRole(`button`, { name: /submit report/i }),
      ).not.toBeDisabled(),
    );

    await user.click(screen.getByText(`Select State*`));
    await user.click(await screen.findByText(`Lagos`));

    await user.click(screen.getByText(`Please Select LGA*`));
    await user.click(await screen.findByText(`Ikeja`));

    await user.click(screen.getByText(`Select Ward*`));
    await user.click(await screen.findByText(`Ward A`));

    await user.click(screen.getByText(`Select Polling Unit*`));
    await user.click(await screen.findByText(`PU 001`));

    await user.click(screen.getByText(`Select Violence Type*`));
    await user.click(await screen.findByText(`Ballot Box Snatching`));

    const descriptionField = screen.getByPlaceholderText(
      `Description of Incidence`,
    );
    await user.type(descriptionField, `A violent incident occurred here.`);

    await user.click(screen.getByRole(`button`, { name: /submit report/i }));

    await waitFor(() => {
      expect(screen.getByText(`Oops!`)).toBeInTheDocument();
    });
  });

  it(`hides reCAPTCHA and enables submit when offline`, async () => {
    Object.defineProperty(navigator, `onLine`, {
      value: false,
      writable: true,
      configurable: true,
    });
    renderWithProviders(<ReportViolence />);

    fireEvent(window, new Event(`offline`));

    await waitFor(() => {
      expect(screen.queryByTestId(`mock-recaptcha`)).not.toBeInTheDocument();
    });

    // When offline, !recaptchaVerified && isOnline is false, so button should not be disabled
    // purely due to the recaptcha gate
    const submitBtn = screen.getByRole(`button`, { name: /submit report/i });
    expect(submitBtn).not.toBeDisabled();

    // Restore
    Object.defineProperty(navigator, `onLine`, {
      value: true,
      writable: true,
      configurable: true,
    });
  });

  it(`shows Yup validation error for oversized file`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportViolence />);

    const fileInput = screen.getByPlaceholderText(`Upload Evidence`);

    const oversizedFile = new File([``], `video.mp4`, { type: `video/mp4` });
    Object.defineProperty(oversizedFile, `size`, { value: 25_000_000 });

    await user.upload(fileInput, oversizedFile);

    // Touch the file field to trigger error display
    fireEvent.blur(fileInput);

    await waitFor(() => {
      expect(
        screen.getByText(`File size should not be more than 20MB.`),
      ).toBeInTheDocument();
    });
  });

  it(`shows Yup validation error for unsupported file type`, async () => {
    // The input's accept="image/*, video/*" is only a picker hint (users can
    // choose "All files"), so bypass it to exercise the Yup check.
    const user = userEvent.setup({ applyAccept: false });
    renderWithProviders(<ReportViolence />);

    const fileInput = screen.getByPlaceholderText(`Upload Evidence`);

    const pdfFile = new File([``], `document.pdf`, { type: `application/pdf` });
    Object.defineProperty(pdfFile, `size`, { value: 1_000 });

    await user.upload(fileInput, pdfFile);

    fireEvent.blur(fileInput);

    await waitFor(() => {
      expect(
        screen.getByText(/We only support the following file types/),
      ).toBeInTheDocument();
    });
  });
});
