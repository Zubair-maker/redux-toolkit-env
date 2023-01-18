import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssesmentCategory: build.query({
      query: () => ({
        url: `${apiUrl.assementCategory}`,
      }),
    }),

    addAssesmentCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assementCategory}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssesmentCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assementCategory}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssesmentCategory: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assementCategory}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssesmentCategoryQuery,
  useAddAssesmentCategoryMutation,
  useUpdateAssesmentCategoryMutation,
  useDeleteAssesmentCategoryMutation,
} = extendedApi;
