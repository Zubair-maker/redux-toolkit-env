import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getCompanyInfo: build.query({
            query: () => ({
                url: `${apiUrl.companyInfo}`,
            }),
        }),
        updateCompanyInfo: build.mutation({
            query: (data) => ({
                url: `${apiUrl.companyInfo}`,
                method: "POST",
                body: data,
            })
        }),
        updateCompanyLogo: build.mutation({
            query: (data) => ({
                url: `${apiUrl.companyLogo}`,
                method: "POST",
                body: data,
            })
        }),
    }),
    overrideExisting: false,

});

export const { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUpdateCompanyLogoMutation } = extendedApi;
