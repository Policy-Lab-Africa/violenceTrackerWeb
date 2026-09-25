import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/verify';

const mockFetch = jest.fn();
const originalFetch = global.fetch;

// Installed per-test (not at module scope) so it runs after MSW's
// server.listen() in jest.setup.ts, which would otherwise replace it.
beforeEach(() => {
  global.fetch = mockFetch;
});

afterEach(() => {
  mockFetch.mockReset();
  global.fetch = originalFetch;
});

const makeFetchResponse = (body: object, ok = true) => ({
  ok,
  json: jest.fn().mockResolvedValue(body),
});

describe(`POST /api/verify — reCAPTCHA handler`, () => {
  it(`returns 200 with success:true when Google verifies the token`, async () => {
    mockFetch.mockResolvedValueOnce(makeFetchResponse({ success: true }));

    const { req, res } = createMocks({
      method: `POST`,
      body: { recaptchaToken: `valid-token` },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ success: true });
  });

  it(`passes the token to the Google verify URL`, async () => {
    mockFetch.mockResolvedValueOnce(makeFetchResponse({ success: true }));

    const { req, res } = createMocks({
      method: `POST`,
      body: { recaptchaToken: `my-token-123` },
    });

    await handler(req, res);

    const calledUrl: string = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain(`response=my-token-123`);
    expect(calledUrl).toContain(`secret=test-secret-key`);
  });

  it(`proxies Google failure response with status 200`, async () => {
    const googleFailure = {
      success: false,
      'error-codes': [`invalid-input-response`],
    };
    mockFetch.mockResolvedValueOnce(makeFetchResponse(googleFailure));

    const { req, res } = createMocks({
      method: `POST`,
      body: { recaptchaToken: `invalid-token` },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(googleFailure);
  });

  it(`returns 400 when fetch throws a network error`, async () => {
    mockFetch.mockRejectedValueOnce(new Error(`Network error`));

    const { req, res } = createMocks({
      method: `POST`,
      body: { recaptchaToken: `some-token` },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    // e.error is undefined on a standard Error, so res.json(undefined) sends
    // an empty body — documenting this existing behavior
    expect(res._getData()).toBe(``);
  });

  it(`handles missing recaptchaToken (sends undefined to Google)`, async () => {
    mockFetch.mockResolvedValueOnce(
      makeFetchResponse({
        success: false,
        'error-codes': [`missing-input-response`],
      }),
    );

    const { req, res } = createMocks({
      method: `POST`,
      body: {},
    });

    await handler(req, res);

    const calledUrl: string = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain(`response=undefined`);
    expect(res._getStatusCode()).toBe(200);
  });
});
