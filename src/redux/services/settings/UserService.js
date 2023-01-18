import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getUsersApi: build.query({
            query: () => ({
                url: `${apiUrl.user}`,
            }),
        }),
        addUserApi: build.mutation({
            query: (data) => ({
                url: `${apiUrl.user}`,
                method: "POST",
                body: data,
            })
        }),
        updateUserApi: build.mutation({
            query: (data) => ({
                url: `${apiUrl.user}`,
                method: "POST",
                body: data,
            })
        }),
        deleteUserApi: build.mutation({
            query: (id) => ({
                url: `${apiUrl.user}?account_id=${id}`,
                method: "DELETE",
            })
        }),
        activateDeactivateUserApi:build.mutation({
            query:(data)=>({
                url :`${apiUrl.activate_deactivate_user}`,
                method:"POST",
                body:data
            })
        })

    }),
    overrideExisting: false,
});
export const { useGetUsersApiQuery, useAddUserApiMutation, useUpdateUserApiMutation, useDeleteUserApiMutation,useActivateDeactivateUserApiMutation } = extendedApi;
