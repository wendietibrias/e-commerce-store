import { createSlice } from "@reduxjs/toolkit";
import { IFavoriteState } from "../interface/favorite.interface";

export type FavoriteState = {
    favorites:IFavoriteState[]
}

const initialState : FavoriteState = {
    favorites:JSON.parse(localStorage.getItem("wmart-user-favorite") || "null") || []
}

const favoriteSlice = createSlice({
    name:'favorite',
    initialState,
    reducers:{
        addFavorite(state : FavoriteState, { payload }){
            state.favorites = [
                ...state.favorites,
                {
                    id:payload?.id,
                    title:payload?.title,
                    price:payload?.price,
                    productImage:payload?.productImage
                }
            ];

            localStorage.setItem("wmart-user-favorite", JSON.stringify(state.favorites));
            return state;
        },
        removeFavorite(state : FavoriteState, { payload }){
            const filterFavorite = state.favorites.filter((item : IFavoriteState) => item.id === Number(payload) ? "" : item);
            state.favorites = filterFavorite;
            localStorage.setItem("wmart-user-favorite" , JSON.stringify(state.favorites));
            return state;
        }
    }
});

export const { addFavorite,removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;