import { useAppSelector,useAppDispatch } from "../../hooks/redux.hook";
import { CartItemCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { ICartState } from "../../interface/cart.interface";
import convertMoney from "../../utils/convertMoney";

const Carts = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { cart:{ carts },auth:{ token } } = useAppSelector(state=>state);

    return (
        <div className="w-full py-7 sm:px-5">
            <h2 className="text-gray-700 text-lg font-bold sm:text-sm">Shopping Cart ({carts.length})</h2>
            <div className="mt-8 sm:mt-5 flex items-start gap-x-7 sm:flex-col sm:gap-y-10">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-1 sm:w-full gap-3">
                  {carts?.map((item : ICartState , idx : number) => <CartItemCard key={idx} item={item}/>)}
                </div>
                {token && (
                    <div className="w-[450px] sm:w-full py-5 px-5 rounded-md bg-gray-100">
                    <div className="border-b border-gray-300 pb-2">
                        <h4 className="text-gray-700 text-sm font-semibold">Order Summary  </h4>
                    </div>
                    <div className="flex flex-col gap-y-2 mt-5">
                            <div className="flex justify-between items-center">
                                <h4 className="text-gray-700 text-sm font-bold">Products  </h4>
                                <p className="text-gray-500 text-sm">{carts?.length}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h4 className="text-gray-700 text-sm font-bold">Total  </h4>
                                <p className="text-gray-500 text-sm">{convertMoney(carts.reduce((a,b)=>a+Number(b.total),0))}</p>
                            </div>
                    </div>
                      <button onClick={() => navigate("/checkout")} disabled={carts.length < 1 ? true : false} className={`rounded-full mt-7 bg-blue-500 text-white py-2 w-full text-[13px] font-semibold ${carts.length < 1 ? "cursor-not-allowed" : "cursor-pointer"}`}>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Carts;