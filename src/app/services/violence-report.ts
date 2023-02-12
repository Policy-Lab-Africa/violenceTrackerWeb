import {
  PaginatedReponse,
  ViolenceReport,
  ViolenceTrackerResponse,
  ViolenceType,
} from '@/types';
import { axiosClient } from '../client';

// interface ViolencReportRequestData {
//   ng_state_id: number;
//   ng_local_government_id: number;
//   ng_polling_unit_id: number;
//   type_id: number;
//   title: string;
//   description: string;
//   file: File;
//   hashtags: string | string[];
// }

export const fetchViolenceTypes = async (): Promise<ViolenceType[]> => {
  return await (
    await axiosClient.get<ViolenceTrackerResponse<{ types: ViolenceType[] }>>(
      `/violence-types`,
    )
  ).data.data.types;
};

export const fetchViolenceReports = async (
  limit: number,
): Promise<ViolenceReport[]> => {
  const limitQuery = !!limit ? `?limit=${limit}&` : `?`;

  return (
    await axiosClient.get<
      ViolenceTrackerResponse<{ violence_reports: { data: ViolenceReport[] } }>
    >(`/violence-reports${limitQuery}`)
  ).data.data.violence_reports.data;
};

export const fetchInfiniteViolenceReports = async ({
  limit,
  pageParam,
}: {
  limit?: number;
  pageParam?: number;
}): Promise<PaginatedReponse<ViolenceReport[]>> => {
  const limitQuery = !!limit ? `?limit=${limit}&` : `?`;
  const pageQuery = !!pageParam ? `page=${pageParam}` : ``;

  return (
    await axiosClient.get<
      ViolenceTrackerResponse<{
        violence_reports: PaginatedReponse<ViolenceReport[]>;
      }>
    >(`/violence-reports${limitQuery}${pageQuery}`)
  ).data.data.violence_reports;
};
