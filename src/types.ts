export interface State {
  id: number;
  data_id: number;
  name: string;
  capital?: string;
  latitude?: string;
  longitude?: string;
  created_at: string;
  updated_at: string;
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
}

export interface Location {
  id: number;
  ng_polling_unit_id: number;
  latitude?: string;
  longitude?: string;
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
  id: number;
}

export type ViolenceTrackerResponse<T> = {
  data: T;
  status: string;
};
