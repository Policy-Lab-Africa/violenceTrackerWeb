import { SearchInputData } from '@/components/Inputs/SearchWithFilter';
import {
  PaginatedReponse,
  SearchResults,
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

export const submitViolentReport = async (data: FormData) => {
  const response = await axiosClient.post<
    ViolenceTrackerResponse<{ violence_report: ViolenceReport }>
  >(`/violence-reports`, data, {
    method: `post`,
    headers: {
      'Content-Type': `multipart/form-data`,
      Accept: `application/json`,
    },
  });
  return response.data.data.violence_report;
};

export const searchReports = async (
  search?: SearchInputData,
): Promise<SearchResults> => {
  const sq = !search ? `q=Nigeria` : `q=${search.q}`;
  const response = await axiosClient.get<
    ViolenceTrackerResponse<SearchResults>
  >(`/violence-reports/data?${sq}`);

  return response.data.data;
};
