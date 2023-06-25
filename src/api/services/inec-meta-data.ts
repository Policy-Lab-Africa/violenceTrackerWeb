import {
  State,
  ViolenceTrackerResponse,
  LGA,
  PollingUnit,
  Ward,
} from '@/types';
import { axiosClient } from '../client';

export const fetchStates = async (): Promise<State[]> => {
  const response = await axiosClient.get<
    ViolenceTrackerResponse<{ states: State[] }>
  >(`/states`);
  return response.data.data.states;
};

export const fetchLGAs = async (stateId: number): Promise<LGA[]> => {
  const response = await axiosClient.get<
    ViolenceTrackerResponse<{ local_government_areas: LGA[] }>
  >(`/states/${stateId}/lgas`);
  return response.data.data.local_government_areas;
};

export const fetchPollingUnits = async (
  wardId: number,
): Promise<PollingUnit[]> => {
  const response = await axiosClient.get<
    ViolenceTrackerResponse<{ wards: PollingUnit[] }>
  >(`/wards/${wardId}/polling-units`);

  return response.data.data.wards;
};

export const fetchWards = async (lgaId: number): Promise<Ward[]> => {
  const response = await axiosClient.get<
    ViolenceTrackerResponse<{ wards: Ward[] }>
  >(`/lgas/${lgaId}/wards`);
  return response.data.data.wards;
};
