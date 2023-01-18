import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getJob: build.query({
      query: () => ({
        url: `${apiUrl.jobs}job/`,
      }),
    }),
    getJobeDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details/?id=${id}`,
      }),
    }),
   
    addJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}job/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}job/`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteJob: build.mutation({
      query: (id) => ({
        url: `${apiUrl.jobs}job/?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobQuery,
  useGetJobeDetailsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = extendedApi;
