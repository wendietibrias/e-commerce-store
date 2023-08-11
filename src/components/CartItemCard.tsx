import { ICartState } from "../interface/cart.interface";
import { FiTrash } from "react-icons/fi";
import { removeCart,updateCartQty } from "../slices/cart.slice";
import { useAppDispatch } from "../hooks/redux.hook";
import convertMoney from "../utils/convertMoney"

type CartItemCardProps = {
   item:ICartState
}

const CartItemCard = ({
    item
} : CartItemCardProps) => {
    const dispatch = useAppDispatch();

    return (
        <div className="w-full shadow-sm shadow-gray-400 p-4 rounded-lg">
            <div className="w-full h-[210px] bg-gray-100 rounded-lg flex justify-center items-center">
                    <img className="w-[50%]" alt={item?.productTitle} src={item?.productImage} />
            </div>
            <div className="w-full pt-3">
              <div className="flex justify-between items-center">
                    <h2 className="text-[12px] font-semibold text-gray-700">{item?.productTitle}</h2>
                    <h5 className="font-bold text-[12px] text-blue-500">{convertMoney(Number(item.productPrice))}</h5>
               </div>
               <div className="flex items-center justify-between mt-4">
                <button  onClick={()=>dispatch(removeCart({ id:item?.id }))} className="text-red-500 flex items-center gap-x-1 font-medium text-[13px]"><FiTrash/> Remove</button>
                  <div className="flex items-center gap-x-2">
                    <button onClick={() => dispatch(updateCartQty({ id:item?.id,type:"decrease" }))} className="text-[13px] text-white px-[4px]  bg-blue-500 rounded-sm font-semibold">-</button>
                    <span className="font-semibold text-sm text-gray-700">{item?.qty}</span>
                    <button onClick={() => dispatch(updateCartQty({ id:item?.id,type:"increase" }))} className="text-[13px] text-white px-[4px]  bg-blue-500 rounded-sm font-semibold">+</button>
                </div>
               </div>
            </div>
    
        </div>
    )
}

export default CartItemCard;