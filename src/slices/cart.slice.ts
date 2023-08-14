import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../interface/cart.interface";

export type CartState = {
    carts:ICartState[]
}

const initialState : CartState = {
   carts: JSON.parse(localStorage.getItem("wmart-user-cart") || "null") || []
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCart(state : CartState , { payload }){
            const findCart = state.carts.find((item)=>item.id == Number(payload?.id));
            if(findCart) {
               const mapCart = state.carts.map((item) => item.id == Number(payload?.id) ? {...item, qty:item.qty + Number(payload?.qty)} : item);
               state.carts = mapCart;
            } else {
                state.carts = [
                    ...state.carts,
                    {
                        id:payload?.id,
                        productTitle:payload?.title,
                        productPrice:payload?.price,
                        productImage:payload?.productImage,
                        qty:payload?.qty,
                        total:payload?.total
                    }
                ];
            }

            localStorage.setItem("wmart-user-cart" , JSON.stringify(state.carts));
            return state;
        },
        removeCart(state : CartState, { payload }){
            const filterCarts = state.carts.filter((item : ICartState) => item.id != Number(payload.id) ? item : "");
            state.carts = filterCarts;
            localStorage.setItem("wmart-user-cart" , JSON.stringify(state.carts));
            return state;
        },
        updateCartQty(state : CartState , { payload }){
            if(payload?.type === "increase") {
                const mapCarts = state.carts.map((item) => item.id === Number(payload?.id) ? {...item,qty:item.qty + 1,total:Number(item.total) + Number(item.productPrice)} : item);
                state.carts = mapCarts;
            }

            if(payload?.type === "decrease") {
                const mapCarts = state.carts.map((item) => item.id === Number(payload?.id) ? {...item,qty:item.qty < 1 ? 0 : item.qty - 1,total:Number(item.total) > 0 ? Number(item.total) - Number(item.productPrice) : 0} : item);
                state.carts = mapCarts;
            }

            localStorage.setItem("wmart-user-cart" , JSON.stringify(state.carts));
            return state;
        },
        clearCart(state : CartState) {
           state.carts = [];
           localStorage.setItem("wmart-user-cart" , JSON.stringify(state.carts));
           return state;
        }
    },
});

export const { addCart,removeCart,updateCartQty,clearCart } = cartSlice.actions;
export default cartSlice.reducer;