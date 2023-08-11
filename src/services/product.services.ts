import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productApi = createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/product`
    }),
    endpoints:(builder) => ({
        getAllProduct:builder.query({
            query:(queryParams : string) => `/all-product?${queryParams}`
        }),
        getProduct:builder.query({
            query:(id : number) => `/detail/${id}`
        }),
        getProductCategories:builder.query({
            query:() => `/all-category`
        })
    })
})

export const { useGetAllProductQuery,useGetProductQuery,useGetProductCategoriesQuery } = productApi;