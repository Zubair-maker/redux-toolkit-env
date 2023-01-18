import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getCandidateList: build.query({
      query: () => ({
        url: `${apiUrl.candidate}candidate/`,
      }),
    }),
    getCandidateDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.candidate}applications/?id=${id}`,
      }),
    }),
    addApplyJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}apply/`,
        method: 'POST',
        body: data,
      }),
    }),
    addCandidateResume: build.mutation({
        query: (data) => ({
          url: `${apiUrl.candidate}resume-parse/`,
          method: 'POST',
          body: data,
        }),
      }),
    updateCandidate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}applications/`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteCandidate: build.mutation({
      query: (id) => ({
        url: `${apiUrl.candidate}applications/?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCandidateListQuery,
  useGetCandidateDetailsQuery,
  useAddApplyJobMutation,
  useAddCandidateResumeMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
} = extendedApi;
