import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getEmailCategory: build.query({
      query: () => ({
        url: `${apiUrl.emailCategory}`,
      }),
    }),
    addEmailCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailCategory}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateEmailCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailCategory}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteEmailCategory: build.mutation({
      query: (id) => ({
        url: `${apiUrl.emailCategory}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmailCategoryQuery,
  useDeleteEmailCategoryMutation,
  useAddEmailCategoryMutation,
  useUpdateEmailCategoryMutation,
  
} = extendedApi;
