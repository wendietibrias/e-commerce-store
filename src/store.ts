import { configureStore } from "@reduxjs/toolkit";
import { bannerApi } from "./services/banner.services";
import { productApi } from "./services/product.services";
import { authApi } from "./services/auth.services";
import favoriteSlice from "./slices/favorite.slice";
import authSlice from "./slices/auth.slice";
import cartSlice from "./slices/cart.slice";
import alertSlice from "./slices/alert.slice";
import { checkoutApi } from "./services/checkout.services";

const store = configureStore({
    reducer: {
        auth:authSlice,
        cart:cartSlice,
        alert:alertSlice,
        favorite:favoriteSlice,
        [bannerApi.reducerPath]:bannerApi.reducer,
        [productApi.reducerPath]:productApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [checkoutApi.reducerPath]:checkoutApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat([
        bannerApi.middleware,
        productApi.middleware,
        authApi.middleware,
        checkoutApi.middleware
    ])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;