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
