import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '@/api/client';
import {
  fetchStates,
  fetchLGAs,
  fetchWards,
  fetchPollingUnits,
} from '@/api/services/inec-meta-data';

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(axiosClient);
});

afterEach(() => {
  mock.restore();
});

const mockState = {
  id: 1,
  data_id: 1,
  name: `Lagos`,
  created_at: `2023-01-01`,
  updated_at: `2023-01-01`,
};

const mockLGA = {
  id: 1,
  data_id: 1,
  name: `Ikeja`,
  abbreviation: `IKJ`,
  state_id: 1,
  created_at: `2023-01-01`,
  updated_at: `2023-01-01`,
};

const mockWard = {
  id: 1,
  data_id: 1,
  name: `Ward A`,
  abbreviation: `WDA`,
  local_government_id: 1,
  created_at: `2023-01-01`,
  updated_at: `2023-01-01`,
};

const mockPollingUnit = {
  id: 1,
  data_id: 1,
  name: `PU 001`,
  registration_area_id: 1,
  abbreviation: `PU001`,
  units: `1`,
  delimitation: ``,
  remark: ``,
  ward_id: 1,
  created_at: `2023-01-01`,
  updated_at: `2023-01-01`,
  location: {
    id: 1,
    ng_polling_unit_id: 1,
    latitude: `6.5244`,
    longitude: `3.3792`,
    created_at: `2023-01-01`,
    updated_at: `2023-01-01`,
  },
};

describe(`fetchStates`, () => {
  it(`makes GET to /states and returns states array`, async () => {
    mock.onGet(`/states`).reply(200, {
      data: { states: [mockState] },
      status: `success`,
    });

    const result = await fetchStates();

    expect(mock.history.get[0].url).toBe(`/states`);
    expect(result).toEqual([mockState]);
  });

  it(`returns empty array when no states`, async () => {
    mock.onGet(`/states`).reply(200, {
      data: { states: [] },
      status: `success`,
    });

    const result = await fetchStates();
    expect(result).toEqual([]);
  });

  it(`rejects on server error`, async () => {
    mock.onGet(`/states`).reply(500);
    await expect(fetchStates()).rejects.toThrow();
  });
});

describe(`fetchLGAs`, () => {
  it(`makes GET to /states/{id}/lgas with correct stateId`, async () => {
    mock.onGet(`/states/7/lgas`).reply(200, {
      data: { local_government_areas: [mockLGA] },
      status: `success`,
    });

    const result = await fetchLGAs(7);

    expect(mock.history.get[0].url).toBe(`/states/7/lgas`);
    expect(result).toEqual([mockLGA]);
  });

  it(`returns from data.local_government_areas key`, async () => {
    mock.onGet(`/states/1/lgas`).reply(200, {
      data: { local_government_areas: [mockLGA] },
      status: `success`,
    });

    const result = await fetchLGAs(1);
    expect(result).toEqual([mockLGA]);
  });

  it(`rejects on 404 for invalid stateId`, async () => {
    mock.onGet(`/states/99999/lgas`).reply(404);
    await expect(fetchLGAs(99999)).rejects.toThrow();
  });
});

describe(`fetchWards`, () => {
  it(`makes GET to /lgas/{id}/wards with correct lgaId`, async () => {
    mock.onGet(`/lgas/42/wards`).reply(200, {
      data: { wards: [mockWard] },
      status: `success`,
    });

    const result = await fetchWards(42);

    expect(mock.history.get[0].url).toBe(`/lgas/42/wards`);
    expect(result).toEqual([mockWard]);
  });

  it(`returns from data.wards key`, async () => {
    mock.onGet(`/lgas/1/wards`).reply(200, {
      data: { wards: [mockWard] },
      status: `success`,
    });

    const result = await fetchWards(1);
    expect(result).toEqual([mockWard]);
  });
});

describe(`fetchPollingUnits`, () => {
  it(`makes GET to /wards/{id}/polling-units with correct wardId`, async () => {
    mock.onGet(`/wards/100/polling-units`).reply(200, {
      data: { wards: [mockPollingUnit] },
      status: `success`,
    });

    const result = await fetchPollingUnits(100);

    expect(mock.history.get[0].url).toBe(`/wards/100/polling-units`);
    expect(result).toEqual([mockPollingUnit]);
  });

  // The API response uses the key "wards" even for polling units — this is an API quirk
  it(`returns data from data.wards key (API naming quirk)`, async () => {
    mock.onGet(`/wards/1/polling-units`).reply(200, {
      data: { wards: [mockPollingUnit] },
      status: `success`,
    });

    const result = await fetchPollingUnits(1);
    expect(result).toEqual([mockPollingUnit]);
  });

  it(`rejects on server error`, async () => {
    mock.onGet(`/wards/1/polling-units`).reply(500);
    await expect(fetchPollingUnits(1)).rejects.toThrow();
  });
});
