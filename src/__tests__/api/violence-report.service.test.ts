import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '@/api/client';
import {
  fetchViolenceTypes,
  fetchViolenceReports,
  fetchInfiniteViolenceReports,
  submitViolentReport,
  searchReports,
} from '@/api/services/violence-report';

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(axiosClient);
});

afterEach(() => {
  mock.restore();
});

const mockViolenceType = {
  id: 1,
  name: `Ballot Box Snatching`,
  note: ``,
  created_at: `2023-01-01`,
  updated_at: `2023-01-01`,
};

const mockViolenceReport = {
  id: 1,
  ng_state_id: 1,
  ng_local_government_id: 1,
  ng_polling_unit_id: 1,
  type_id: 1,
  title: ``,
  description: `Test report description here.`,
  file: ``,
  ip_address: `127.0.0.1`,
  user_agent: `test`,
  longitude: `3.38`,
  latitude: `6.52`,
  created_at: `2023-01-01`,
  updated_at: `2023-01-01`,
};

describe(`fetchViolenceTypes`, () => {
  it(`makes GET to /violence-types and returns types array`, async () => {
    mock.onGet(`/violence-types`).reply(200, {
      data: { types: [mockViolenceType] },
      status: `success`,
    });

    const result = await fetchViolenceTypes();

    expect(mock.history.get[0].url).toBe(`/violence-types`);
    expect(result).toEqual([mockViolenceType]);
  });

  it(`returns empty array when types is empty`, async () => {
    mock.onGet(`/violence-types`).reply(200, {
      data: { types: [] },
      status: `success`,
    });

    const result = await fetchViolenceTypes();
    expect(result).toEqual([]);
  });

  it(`rejects on server error`, async () => {
    mock.onGet(`/violence-types`).reply(500);
    await expect(fetchViolenceTypes()).rejects.toThrow();
  });
});

describe(`fetchViolenceReports`, () => {
  it(`includes ?limit=N& in URL when limit is truthy`, async () => {
    mock.onGet(/\/violence-reports/).reply(200, {
      data: { violence_reports: { data: [mockViolenceReport] } },
      status: `success`,
    });

    await fetchViolenceReports(10);

    expect(mock.history.get[0].url).toBe(`/violence-reports?limit=10&`);
  });

  it(`uses just ? when limit is 0 (falsy)`, async () => {
    mock.onGet(/\/violence-reports/).reply(200, {
      data: { violence_reports: { data: [] } },
      status: `success`,
    });

    await fetchViolenceReports(0);

    expect(mock.history.get[0].url).toBe(`/violence-reports?`);
  });

  it(`returns the data array from the nested response`, async () => {
    mock.onGet(/\/violence-reports/).reply(200, {
      data: { violence_reports: { data: [mockViolenceReport] } },
      status: `success`,
    });

    const result = await fetchViolenceReports(5);
    expect(result).toEqual([mockViolenceReport]);
  });
});

describe(`fetchInfiniteViolenceReports`, () => {
  it(`builds URL with both limit and page`, async () => {
    mock.onGet(/\/violence-reports/).reply(200, {
      data: {
        violence_reports: {
          data: [],
          current_page: 2,
          last_page: 5,
          per_page: 10,
        },
      },
      status: `success`,
    });

    await fetchInfiniteViolenceReports({ limit: 10, pageParam: 2 });

    expect(mock.history.get[0].url).toBe(`/violence-reports?limit=10&page=2`);
  });

  it(`builds URL with only limit (no page)`, async () => {
    mock.onGet(/\/violence-reports/).reply(200, {
      data: {
        violence_reports: {
          data: [],
          current_page: 1,
          last_page: 1,
          per_page: 10,
        },
      },
      status: `success`,
    });

    await fetchInfiniteViolenceReports({ limit: 10 });

    expect(mock.history.get[0].url).toBe(`/violence-reports?limit=10&`);
  });

  it(`builds URL with neither (both falsy)`, async () => {
    mock.onGet(/\/violence-reports/).reply(200, {
      data: {
        violence_reports: {
          data: [],
          current_page: 1,
          last_page: 1,
          per_page: 10,
        },
      },
      status: `success`,
    });

    await fetchInfiniteViolenceReports({});

    expect(mock.history.get[0].url).toBe(`/violence-reports?`);
  });

  it(`returns full PaginatedReponse including pagination metadata`, async () => {
    const paginatedData = {
      data: [mockViolenceReport],
      current_page: 2,
      last_page: 5,
      per_page: 10,
    };

    mock.onGet(/\/violence-reports/).reply(200, {
      data: { violence_reports: paginatedData },
      status: `success`,
    });

    const result = await fetchInfiniteViolenceReports({
      limit: 10,
      pageParam: 2,
    });
    expect(result).toEqual(paginatedData);
  });
});

describe(`submitViolentReport`, () => {
  it(`POSTs to /violence-reports with multipart/form-data header`, async () => {
    mock.onPost(`/violence-reports`).reply(201, {
      data: { violence_report: mockViolenceReport },
      status: `success`,
    });

    const formData = new FormData();
    formData.append(`ng_state_id`, `1`);
    formData.append(`description`, `A test report description.`);

    await submitViolentReport(formData);

    expect(mock.history.post[0].url).toBe(`/violence-reports`);
    expect(mock.history.post[0].headers?.[`Content-Type`]).toContain(
      `multipart/form-data`,
    );
  });

  it(`returns the violence_report object from the nested response`, async () => {
    mock.onPost(`/violence-reports`).reply(201, {
      data: { violence_report: mockViolenceReport },
      status: `success`,
    });

    const result = await submitViolentReport(new FormData());
    expect(result).toEqual(mockViolenceReport);
  });

  it(`rejects on 422 validation error`, async () => {
    mock.onPost(`/violence-reports`).reply(422, {
      message: `The given data was invalid.`,
    });

    await expect(submitViolentReport(new FormData())).rejects.toThrow();
  });
});

describe(`searchReports`, () => {
  const mockSearchResults = {
    state_results: [],
    local_government_results: [],
    ward_results: [],
    polling_unit_results: [],
  };

  it(`uses q=Nigeria when no search argument is provided`, async () => {
    mock.onGet(/\/violence-reports\/data/).reply(200, {
      data: mockSearchResults,
      status: `success`,
    });

    await searchReports();

    expect(mock.history.get[0].url).toContain(`q=Nigeria`);
  });

  it(`uses provided query string`, async () => {
    mock.onGet(/\/violence-reports\/data/).reply(200, {
      data: mockSearchResults,
      status: `success`,
    });

    await searchReports({ q: `Lagos` });

    expect(mock.history.get[0].url).toContain(`q=Lagos`);
  });

  it(`returns the SearchResults data directly`, async () => {
    mock.onGet(/\/violence-reports\/data/).reply(200, {
      data: mockSearchResults,
      status: `success`,
    });

    const result = await searchReports();
    expect(result).toEqual(mockSearchResults);
  });
});
