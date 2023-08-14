import { ITransactionHistory } from "../../interface/transactionDetail.interface";
import { TransactionCard } from "../../components";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.hook";
import { useGetCheckoutHistoryQuery } from "../../services/checkout.services";

const TransactionHistory = () => {
    const { auth:{ token } } = useAppSelector(state=>state);

    const { 
        data:history,
        isLoading:loading 
    } = useGetCheckoutHistoryQuery(null);

    if(!token) {
        return <Navigate to="/"/>
    }

    if(loading) {
        return (
            <div className="grid grid-cols-4 sm:grid-cols-1 sm:px-5 gap-3 py-8">
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
                <div className="w-full skeleton-box bg-gray-100 h-[150px] rounded-md"></div>
            </div>
        )
    }

    return (
        <div className="w-full py-8 sm:px-5">
            <h2 className="text-gray-700 text-lg  sm:text-sm font-bold">Transaction History</h2>
            <div className="mt-5 grid grid-cols-4 sm:grid-cols-1 gap-3">
                {history?.data?.map((history : ITransactionHistory , idx : number) => <TransactionCard key={idx} transaction={history} />)}
            </div>
        </div>
    )
}

export default TransactionHistory;