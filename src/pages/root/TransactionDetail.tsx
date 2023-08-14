import { useGetDetailCheckoutHistoryQuery } from "../../services/checkout.services";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.hook";
import { ICartState } from "../../interface/cart.interface";
import { OrderDetailCard } from "../../components";
import toast , { Toaster } from 'react-hot-toast';
import convertMoney from "../../utils/convertMoney";


const TransactionDetail = () => {
    const { auth:{ token } } = useAppSelector(state=>state);
    const { id } = useParams();

    const {
        data:transaction,
        isLoading:loading,
        isFetching:fetching,
    } = useGetDetailCheckoutHistoryQuery(Number(id));
    

     if(!token) {
        return <Navigate to="/"/>
    }

    if(loading === true || fetching === true) {
        return (
            <div className="py-8 flex">Loading...</div>
        )
    }

    return (
        <div className="w-full py-8">
            <div className="flex sm:flex-col sm:px-5 items-start gap-x-10 sm:gap-y-6">
                <div className="w-[450px] sm:w-full shadow-sm shadow-gray-400 rounded-lg p-4">
                    <div className="w-full border-b border-gray-300 pb-2">
                        <h4 className="font-semibold text-gray-700 text-sm">Transaction details</h4>
                    </div>
                    <div className="flex gap-y-3 flex-col mt-4">
                        <p className="text-[13px] text-gray-500 font-medium">Country : {transaction?.data?.country}</p>
                        <p className="text-[13px] text-gray-500 font-medium">City : {transaction?.data?.city}</p>
                        <p className="text-[13px] text-gray-500 font-medium">Address : {transaction?.data?.address}</p>
                        <p className="text-[13px] text-gray-500 font-medium">Delivery : {transaction?.data?.delivery}</p>
                        <p className="text-[13px] text-gray-500 font-medium">Payment Method : {transaction?.data?.paymentMethod}</p>
                    </div>
                    <div className="mt-5 flex justify-between items-center border-t border-gray-300 pt-2">
                        <h4 className="text-lg font-bold text-gray-700">Total</h4>
                        <h4 className="text-lg font-bold text-blue-500">{convertMoney(transaction?.data?.orderDetail?.reduce((a : number,b : ICartState) => a + Number(b.total),0))}</h4>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-3 sm:grid-cols-1 gap-3">
                    {transaction?.data?.orderDetail.map((item : ICartState , idx : number) => <OrderDetailCard key={idx} item={item} />)}
                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default TransactionDetail;