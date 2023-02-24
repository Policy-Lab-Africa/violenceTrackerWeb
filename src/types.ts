export interface State {
  id: number;
  data_id: number;
  name: string;
  capital?: string;
  latitude?: string;
  longitude?: string;
  created_at: string;
  updated_at: string;
  polling_units?: PollingUnit[];
}

export interface LGA {
  id: number;
  data_id: number;
  name: string;
  abbreviation: string;
  state_id: number;
  created_at: string;
  updated_at: string;
}

export interface Ward {
  id: number;
  data_id: number;
  name: string;
  abbreviation: string;
  local_government_id: number;
  created_at: string;
  updated_at: string;
}

export interface PollingUnit {
  id: number;
  data_id: number;
  name: string;
  registration_area_id: number;
  precise_location?: string;
  abbreviation: string;
  units: string;
  delimitation: string;
  remark: string;
  ward_id: number;
  created_at: string;
  updated_at: string;
  location: Location;
  violencereports?: ViolenceReport[];
  local_government?: LGA;
}

export interface Location {
  id: number;
  ng_polling_unit_id: number;
  latitude: string;
  longitude: string;
  viewport?: string;
  formatted_address?: string;
  google_map_url?: string;
  google_place_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ViolenceType {
  id: number;
  name: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface ViolenceReport {
  id: number;
  ng_state_id: number;
  ng_local_government_id: number;
  ng_polling_unit_id: number;
  type_id: number;
  title: string;
  description: string;
  file: string;
  ip_address: string;
  user_agent: string;
  longitude: string;
  latitude: string;
  updated_at: string;
  created_at: string;
  type?: ViolenceType;
  polling_unit: PollingUnit;
}

export type ViolenceTrackerResponse<T> = {
  data: T;
  status: string;
};

// Responses
export type PaginatedReponse<T> = {
  data: T;
  current_page: number;
  last_page: number;
  per_page: number;
};

export interface LGAMeta {
  data: ViolenceType[];
  count_unique: number;
  count_by_reports: { [key: string]: number }[];
}

export interface ViolenceTypeMeta {
  data: ViolenceType[];
  count_unique: number;
  count_by_reports: { [key: string]: number }[];
}

export interface StateSearchData {
  data: State[];
  meta_data: {
    violence_reports: {
      count: number;
    };
    polling_units: {
      count: number;
    };
    local_governments: LGAMeta;
    types: ViolenceTypeMeta;
  };
}

export interface LGASearchData {
  data: LGA[];
  meta_data: {
    violence_reports: {
      count: number;
    };
    local_governments: LGAMeta;
    types: ViolenceTypeMeta;
  };
}

export interface WardSearchData {
  data: Ward[];
  meta_data: {
    violence_reports: {
      count: number;
    };
    polling_units: {
      count: number;
    };
    local_governments: LGAMeta;
    types: ViolenceTypeMeta;
  };
}

export interface PUSearchData {
  data: PollingUnit[];
  meta_data: {
    violence_reports: {
      count: number;
    };
    polling_units: {
      count: number;
    };
    local_governments: LGAMeta;
    types: ViolenceTypeMeta;
  };
}

export interface SearchResults {
  state_results: StateSearchData;
  local_government_results: LGASearchData;
  ward_results: WardSearchData;
  polling_unit_results: PUSearchData;
}

export type AvailableViolentTypes =
  | 'Attempted Murder'
  | 'Gun Shots'
  | 'Murder'
  | 'Intimidation'
  | 'Physical Harm'
  | 'Ballot Box Snatching'
  | 'Physical Threat'
  | 'Group Clash'
  | 'Sexual Violence'
  | 'Other';

export const sampleResult = {
  state_results: {
    data: [
      {
        id: 1,
        data_id: 1,
        name: `abia`,
        capital: null,
        latitude: null,
        longitude: null,
        created_at: `2023-02-02T23:14:33.000000Z`,
        updated_at: `2023-02-02T23:14:33.000000Z`,
      },
      {
        id: 2,
        data_id: 2,
        name: `adamawa`,
        capital: null,
        latitude: null,
        longitude: null,
        created_at: `2023-02-02T23:14:33.000000Z`,
        updated_at: `2023-02-02T23:14:33.000000Z`,
      },
      {
        id: 3,
        data_id: 3,
        name: `akwa ibom`,
        capital: null,
        latitude: null,
        longitude: null,
        created_at: `2023-02-02T23:14:33.000000Z`,
        updated_at: `2023-02-02T23:14:33.000000Z`,
      },
    ],
    meta_data: {
      violence_reports: {
        count: 0,
      },
      local_governments: {
        data: [],
        count_unique: 0,
        count_reports: [],
      },
      types: {
        data: [],
        count_unique: 0,
        count_by_reports: [],
      },
    },
  },
  local_government_results: {
    data: [
      {
        id: 596,
        data_id: 600,
        name: `ATAKUMOSA EAST`,
        abbreviation: `01`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 597,
        data_id: 601,
        name: `ATAKUMOSA WEST`,
        abbreviation: `02`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 598,
        data_id: 602,
        name: `AYEDAADE`,
        abbreviation: `03`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 599,
        data_id: 603,
        name: `AYEDIRE`,
        abbreviation: `04`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 600,
        data_id: 604,
        name: `BOLUWADURO`,
        abbreviation: `05`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 601,
        data_id: 605,
        name: `BORIPE`,
        abbreviation: `06`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 602,
        data_id: 606,
        name: `EDE NORTH`,
        abbreviation: `07`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
      {
        id: 603,
        data_id: 607,
        name: `EDE SOUTH`,
        abbreviation: `08`,
        state_id: 29,
        created_at: `2023-02-02T23:14:48.000000Z`,
        updated_at: `2023-02-02T23:14:48.000000Z`,
      },
    ],
    meta_data: {
      violence_reports: {
        count: 0,
      },
      local_governments: {
        data: [],
        count_unique: 0,
        count_reports: [],
      },
      types: {
        data: [],
        count_unique: 0,
        count_by_reports: [],
      },
    },
  },
  ward_results: {
    data: [
      {
        id: 6948,
        data_id: 17860,
        name: `AYESAN`,
        abbreviation: `01`,
        local_government_id: 614,
        created_at: `2023-02-02T23:16:09.000000Z`,
        updated_at: `2023-02-02T23:16:09.000000Z`,
      },
      {
        id: 6949,
        data_id: 17861,
        name: `IKIJA  I`,
        abbreviation: `02`,
        local_government_id: 614,
        created_at: `2023-02-02T23:16:09.000000Z`,
        updated_at: `2023-02-02T23:16:09.000000Z`,
      },
      {
        id: 6950,
        data_id: 17862,
        name: `IKIJA  II`,
        abbreviation: `03`,
        local_government_id: 614,
        created_at: `2023-02-02T23:16:09.000000Z`,
        updated_at: `2023-02-02T23:16:09.000000Z`,
      },
    ],
    meta_data: {
      violence_reports: {
        count: 0,
      },
      local_governments: {
        data: [],
        count_unique: 0,
        count_reports: [],
      },
      types: {
        data: [],
        count_unique: 0,
        count_by_reports: [],
      },
    },
  },
  polling_unit_results: {
    data: [
      {
        id: 139514,
        data_id: 350320,
        name: `BABA AKODI, IFETEDO`,
        registration_area_id: 17862,
        precise_location: null,
        abbreviation: `001`,
        units: `001`,
        delimitation: `29/16/03/001`,
        remark: `EXISTING PU`,
        ward_id: 17862,
        created_at: `2023-02-03T00:03:49.000000Z`,
        updated_at: `2023-02-03T00:03:49.000000Z`,
        location: {
          id: 139514,
          ng_polling_unit_id: 350320,
          latitude: `7.1976489`,
          longitude: `4.711976`,
          viewport: `{"northeast":{"lat":7.199905649999999,"lng":4.713370250000001},"southwest":{"lat":7.19689665,"lng":4.707793249999998}}`,
          formatted_address: `5PX6+3Q5, Ifetedo, Ondo Road, Akure, Nigeria`,
          google_map_url: `https://maps.google.com?q=7.197648900000001,4.711976`,
          google_place_id: `ChIJJ18eBJ5dOBAR5UKtaFV99xQ`,
          created_at: `2023-02-03T00:03:49.000000Z`,
          updated_at: `2023-02-03T00:03:49.000000Z`,
        },
      },
      {
        id: 139515,
        data_id: 350321,
        name: `C.A.C. PRY. SCHOOL I, IFETEDO`,
        registration_area_id: 17862,
        precise_location: null,
        abbreviation: `002`,
        units: `002`,
        delimitation: `29/16/03/002`,
        remark: `EXISTING PU`,
        ward_id: 17862,
        created_at: `2023-02-03T00:03:49.000000Z`,
        updated_at: `2023-02-03T00:03:49.000000Z`,
        location: {
          id: 139515,
          ng_polling_unit_id: 350321,
          latitude: `7.193975`,
          longitude: `4.675991`,
          viewport: `{"northeast":{"lat":7.194931129892723,"lng":4.677807579892722},"southwest":{"lat":7.192231470107279,"lng":4.675107920107278}}`,
          formatted_address: `5MVG+H9Q, 220110, Wanikin, Nigeria`,
          google_map_url: `https://maps.google.com?q=7.193975,4.675991`,
          google_place_id: `ChIJ3_Ec4llcOBARJ__b6UofgQw`,
          created_at: `2023-02-03T00:03:49.000000Z`,
          updated_at: `2023-02-03T00:03:49.000000Z`,
        },
      },
    ],
    meta_data: {
      violence_reports: {
        count: 0,
      },
      polling_units: {
        count: 0,
      },
      local_governments: {
        data: [],
        count_unique: 0,
        count_reports: [],
      },
      types: {
        data: [],
        count_unique: 0,
        count_by_reports: [],
      },
    },
  },
};
