import { rest } from 'msw';

const BASE_URL = `http://localhost:3001`;

export const mockState = {
  id: 1,
  data_id: 1,
  name: `Lagos`,
  capital: `Ikeja`,
  created_at: `2023-01-01T00:00:00.000Z`,
  updated_at: `2023-01-01T00:00:00.000Z`,
};

export const mockLGA = {
  id: 1,
  data_id: 1,
  name: `Ikeja`,
  abbreviation: `IKJ`,
  state_id: 1,
  created_at: `2023-01-01T00:00:00.000Z`,
  updated_at: `2023-01-01T00:00:00.000Z`,
};

export const mockWard = {
  id: 1,
  data_id: 1,
  name: `Ward A`,
  abbreviation: `WDA`,
  local_government_id: 1,
  created_at: `2023-01-01T00:00:00.000Z`,
  updated_at: `2023-01-01T00:00:00.000Z`,
};

export const mockPollingUnit = {
  id: 1,
  data_id: 1,
  name: `PU 001`,
  registration_area_id: 1,
  abbreviation: `PU001`,
  units: `1`,
  delimitation: ``,
  remark: ``,
  ward_id: 1,
  created_at: `2023-01-01T00:00:00.000Z`,
  updated_at: `2023-01-01T00:00:00.000Z`,
  location: {
    id: 1,
    ng_polling_unit_id: 1,
    latitude: `6.5244`,
    longitude: `3.3792`,
    created_at: `2023-01-01T00:00:00.000Z`,
    updated_at: `2023-01-01T00:00:00.000Z`,
  },
};

export const mockViolenceType = {
  id: 1,
  name: `Ballot Box Snatching`,
  note: ``,
  created_at: `2023-01-01T00:00:00.000Z`,
  updated_at: `2023-01-01T00:00:00.000Z`,
};

export const mockViolenceReport = {
  id: 99,
  ng_state_id: 1,
  ng_local_government_id: 1,
  ng_polling_unit_id: 1,
  type_id: 1,
  title: ``,
  description: `A violent incident occurred at the polling unit.`,
  file: ``,
  ip_address: `127.0.0.1`,
  user_agent: `test`,
  longitude: `3.3792`,
  latitude: `6.5244`,
  created_at: `2023-01-01T00:00:00.000Z`,
  updated_at: `2023-01-01T00:00:00.000Z`,
};

export const handlers = [
  rest.get(`${BASE_URL}/states`, (_req, res, ctx) =>
    res(ctx.json({ data: { states: [mockState] }, status: `success` })),
  ),

  rest.get(`${BASE_URL}/states/1/lgas`, (_req, res, ctx) =>
    res(
      ctx.json({
        data: { local_government_areas: [mockLGA] },
        status: `success`,
      }),
    ),
  ),

  rest.get(`${BASE_URL}/lgas/1/wards`, (_req, res, ctx) =>
    res(ctx.json({ data: { wards: [mockWard] }, status: `success` })),
  ),

  rest.get(`${BASE_URL}/wards/1/polling-units`, (_req, res, ctx) =>
    res(ctx.json({ data: { wards: [mockPollingUnit] }, status: `success` })),
  ),

  rest.get(`${BASE_URL}/violence-types`, (_req, res, ctx) =>
    res(ctx.json({ data: { types: [mockViolenceType] }, status: `success` })),
  ),

  rest.get(`${BASE_URL}/violence-reports`, (_req, res, ctx) =>
    res(
      ctx.json({
        data: {
          violence_reports: {
            data: [mockViolenceReport],
            current_page: 1,
            last_page: 1,
            per_page: 10,
          },
        },
        status: `success`,
      }),
    ),
  ),

  rest.get(`${BASE_URL}/violence-reports/data`, (_req, res, ctx) =>
    res(
      ctx.json({
        data: {
          state_results: [],
          local_government_results: [],
          ward_results: [],
          polling_unit_results: [],
        },
        status: `success`,
      }),
    ),
  ),

  rest.post(`${BASE_URL}/violence-reports`, (_req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({
        data: { violence_report: mockViolenceReport },
        status: `success`,
      }),
    ),
  ),

  rest.post(`${BASE_URL}/verify`, (_req, res, ctx) =>
    res(ctx.json({ data: { success: true } })),
  ),
];
