import { ViolenceReport, ViolenceTrackerResponse, ViolenceType } from '@/types';
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

export const fetchViolenceReports = async () => {
  return await axiosClient.get(`/violence-reports?limit=100`);
};

export const submitViolentReport = async (
  data: FormData,
): Promise<ViolenceReport> => {
  return (
    await axiosClient.post<
      ViolenceTrackerResponse<{ violence_report: ViolenceReport }>
    >(`/violence-reports?limit=100`, data, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })
  ).data.data.violence_report;
};
