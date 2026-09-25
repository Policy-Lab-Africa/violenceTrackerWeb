import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import { renderWithProviders } from '../utils/renderWithProviders';

// Chakra's InputGroup renders: InputLeftElement (filter), Input, InputRightElement (search)
const getFilterIcon = (input: HTMLElement) =>
  input.previousElementSibling as HTMLElement;
const getSearchIcon = (input: HTMLElement) =>
  input.nextElementSibling as HTMLElement;
const getDatePicker = (container: HTMLElement) =>
  container.querySelector(`.rdrDateRangeWrapper`) as HTMLElement;

describe(`SearchWithFilter`, () => {
  it(`renders the search input with correct placeholder`, () => {
    renderWithProviders(<SearchWithFilter />);
    expect(
      screen.getByPlaceholderText(`Search with State or LGA or Polling Unit`),
    ).toBeInTheDocument();
  });

  it(`date range picker is hidden on initial render`, () => {
    const { container } = renderWithProviders(<SearchWithFilter />);
    expect(getDatePicker(container)).not.toBeVisible();
  });

  it(`calls onChange with query on every keystroke`, async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithProviders(<SearchWithFilter onChange={onChange} />);
    const input = screen.getByPlaceholderText(
      `Search with State or LGA or Polling Unit`,
    );

    await user.type(input, `Lagos`);

    // Called once per character typed
    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ q: `Lagos` }),
    );
  });

  it(`includes start and end Date objects in onChange payload`, async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithProviders(<SearchWithFilter onChange={onChange} />);
    const input = screen.getByPlaceholderText(
      `Search with State or LGA or Polling Unit`,
    );

    await user.type(input, `A`);

    const payload = onChange.mock.calls[0][0];
    expect(payload.start).toBeInstanceOf(Date);
    expect(payload.end).toBeInstanceOf(Date);
  });

  it(`clicking the search icon calls onChange with current query`, async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithProviders(<SearchWithFilter onChange={onChange} />);
    const input = screen.getByPlaceholderText(
      `Search with State or LGA or Polling Unit`,
    );

    await user.type(input, `Abuja`);
    onChange.mockClear();

    // InputRightElement (search icon) triggers sendDataOut
    await user.click(getSearchIcon(input));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ q: `Abuja` }),
    );
  });

  it(`clicking the filter icon toggles the date picker visibility`, async () => {
    const user = userEvent.setup();

    const { container } = renderWithProviders(<SearchWithFilter />);
    const input = screen.getByPlaceholderText(
      `Search with State or LGA or Polling Unit`,
    );
    const filterIcon = getFilterIcon(input);

    await user.click(filterIcon);
    expect(getDatePicker(container)).toBeVisible();

    await user.click(filterIcon);
    expect(getDatePicker(container)).not.toBeVisible();
  });

  it(`does not throw when onChange prop is not provided`, async () => {
    const user = userEvent.setup();

    renderWithProviders(<SearchWithFilter />);
    const input = screen.getByPlaceholderText(
      `Search with State or LGA or Polling Unit`,
    );

    // Should not throw even without onChange
    await expect(user.type(input, `test`)).resolves.toBeUndefined();
  });
});
