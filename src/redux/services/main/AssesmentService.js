import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssesment: build.query({
      query: () => ({
        url: `${apiUrl.assesment}`,
      }),
    }),
   
    addAssesment: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesment}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssesment: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesment}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssesment: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assesment}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssesmentQuery,
  useAddAssesmentMutation,
  useUpdateAssesmentMutation,
  useDeleteAssesmentMutation,
} = extendedApi;
