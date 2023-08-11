import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/cart`
    }),
    endpoints:(builder) => ({})
});

