import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const bannerApi = createApi({
    reducerPath:'bannerApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/banner`
    }),
    endpoints:(builder)=>({
        getBanner:builder.query({
            query:()=>`/all-banner`
        })
    })
});

export const { useGetBannerQuery } = bannerApi;