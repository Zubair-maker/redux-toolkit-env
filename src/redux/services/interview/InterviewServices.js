import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getInterviewListAll: build.query({
      query: () => ({
        url: `${apiUrl.interview}`,
      }),
    }),
    getInterviewListjob: build.query({
        query: (id) => ({
          url: `${apiUrl.interview}?id=${id}`,
        }),
      }),
    getInterviewListCandidate: build.query({
        query: (candidateId) => ({
          url: `${apiUrl.interview}?candidate_id=${candidateId}`,
        }),
      }),
    getInterviewDetails: build.query({
        query: (id) => ({
          url: `${apiUrl.interview}?id=${id}`,
        }),
      }),
    addInterview: build.mutation({
        query: (data) => ({
          url: `${apiUrl.interview}`,
          method: 'POST',
          body: data,
        }),
      }),
    updateInterview: build.mutation({
      query: (data) => ({
        url: `${apiUrl.interview}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteInterview: build.mutation({
      query: (id) => ({
        url: `${apiUrl.interview}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInterviewListAllQuery,
  useGetInterviewListjobQuery,
  useGetInterviewListCandidateQuery,
  useGetInterviewDetailsQuery,
  useAddInterviewMutation,
  useUpdateInterviewMutation,
  useDeleteInterviewMutation,
} = extendedApi;
