import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const checkoutApi = createApi({
    reducerPath:'checkoutApi',
    baseQuery:fetchBaseQuery({
         baseUrl:`${process.env.REACT_APP_BASE_API_URL}/checkout`,
         prepareHeaders:(headers) => {
             const token = JSON.parse(localStorage.getItem("wmart-user-token") || "null");
             headers.set(`Authorization` , `Bearer ${token}`);

             return headers;
         }
    }),
    endpoints:(builder) => ({
        checkoutHandler:builder.mutation({
            query:(formData) => ({
                url:`/checkout-product`,
                method:'POST',
                body:formData
            })
        }),
        getCheckoutHistory:builder.query({
            query:() => `/history/transaction`
        }),
        getDetailCheckoutHistory:builder.query({
            query:(id : number) => `/history/transaction/${id}`
        })
    })
});

export const { useCheckoutHandlerMutation,useGetCheckoutHistoryQuery,useGetDetailCheckoutHistoryQuery } = checkoutApi;