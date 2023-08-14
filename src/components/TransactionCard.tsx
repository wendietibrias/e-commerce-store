
import { AiOutlineEye } from "react-icons/ai";
import { ITransactionHistory } from '../interface/transactionDetail.interface';
import convertMoney from '../utils/convertMoney';
import { Link } from "react-router-dom";

type TransactionCardProps = {
  transaction:ITransactionHistory
}

const TransactionCard = ({
  transaction 
} : TransactionCardProps) => {
  return (
    <div className="w-full rounded-md shadow-sm shadow-gray-400  p-4">
      <div className="flex items-center justify-between">
      <h4 className="text-gray-700 text-md font-bold">{transaction?.paymentMethod}</h4>
       <p className="text-[12px] mt-1 text-gray-500 font-medium">{convertMoney(transaction.orderDetail.reduce((a,b)=>a+b.total,0))}</p>
      </div>
      <p className="text-[12px] mt-1 text-gray-500 font-medium">{transaction.orderDetail.length} products</p>
      <Link to={`/transaction/${transaction.id}`}>
         <button className="flex items-center text-blue-500 text-[12px] font-semibold mt-3 gap-x-2">
           <AiOutlineEye className="text-sm"/>
           See detail
         </button>
      </Link>
    </div>
  )
}

export default TransactionCard