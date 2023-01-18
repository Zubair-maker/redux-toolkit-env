import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
      getWebformFields: build.query({
        query: () => ({
          url: `${apiUrl.fields}`,
        }),
      }),
      addWebformFields: build.mutation({
        query: (data) => ({
          url: `${apiUrl.fields}`,
          method: 'POST',
          body: data,
        }),
      }),
      updateWebformFields: build.mutation({
        query: (data) => ({
          url: `${apiUrl.fields}`,
          method: 'POST',
          body: data,
        }),
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useGetWebformFieldsQuery, useAddWebformFieldsMutation,useUpdateWebformFieldsMutation } = extendedApi;
  