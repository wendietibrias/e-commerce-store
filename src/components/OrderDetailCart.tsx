import { ICartState } from "../interface/cart.interface";
import convertMoney from "../utils/convertMoney";

type OrderDetailCardProps = {
    item:ICartState
}

const OrderDetailCard = ({
    item 
} : OrderDetailCardProps) => {
  return (
      <div  className="w-full rounded-lg shadow-sm shadow-gray-400 p-4">
            <div className="flex items-center justify-center h-[210px] bg-gray-100 rounded-lg">
                <img src={item?.productImage} alt={item.productTitle} className="w-[65%]"/>
            </div>
            <div className="w-full pt-4">
                <div className="flex justify-between items-center">
                <h4 className="text-[12px] text-gray-700 font-semibold">{item?.productTitle}</h4>
                <h4 className="text-[13px] text-blue-500 font-semibold">{convertMoney(Number(item?.productPrice))}</h4>
            </div>
            <p className="text-gray-500 text-[12px] font-medium mt-1">Quantity : {item?.qty}</p>
            </div>
        </div>
  )
}

export default OrderDetailCard;