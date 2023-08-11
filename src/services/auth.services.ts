import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/auth`
    }),
    endpoints:(builder) => ({
        loginCredential:builder.mutation({
            query:(formData) => ({
                url:`/login`,
                method:'POST',
                body:formData
            })
        }),

        registerCredential:builder.mutation({
            query:(formData) => ({
                url:`/register`,
                method:'POST',
                body:formData
            })
        }),
        resendEmailVerification:builder.mutation({
            query:(email : string) => ({
                url:`/resend-email-verification`,
                method:'POST',
                body:{email:email}
            })
        })
    })
});

export const { 
    useLoginCredentialMutation,
    useRegisterCredentialMutation,
    useResendEmailVerificationMutation 
} = authApi;