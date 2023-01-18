import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getCountry: build.query({
            query: () => ({
                url: `${apiUrl.country}`,
            }),
        }),
        getState: build.query({
            query: (id) => `${apiUrl.state}${id}`,
        }),
        getCity: build.query({
            query: (id) => `${apiUrl.city}${id}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetCountryQuery, useGetStateQuery, useGetCityQuery } = extendedApi;
