import { IFavoriteState } from "../interface/favorite.interface";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux.hook";
import convertMoney from "../utils/convertMoney";
import { removeFavorite } from "../slices/favorite.slice";

type FavoriteCardProps = {
    favorite:IFavoriteState
}

const FavoriteCard = ({
   favorite
} : FavoriteCardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
         <div onClick={(e : any) => {
             if(e.target.className.includes("delete-btn")) return null;
             return navigate(`/product/${favorite?.id}`);
         }} className="w-full relative bg-white shadow-sm shadow-gray-400 cursor-pointer p-4 rounded-lg">
            <div className="w-full h-[210px] bg-gray-100 overflow-hidden flex justify-center items-center">
                <img src={favorite?.productImage?.url} alt={favorite?.title} className="w-[65%]"/>
            </div>
            <div className="pt-3">
               <div className="flex items-center justify-between">
                    <h5 className="text-[12px] font-semibold text-gray-700">{favorite?.title}</h5>
                    <h5 className="text-[12px] font-bold text-blue-500">{convertMoney(Number(favorite?.price))}</h5>
                 </div>
                 <button onClick={() => dispatch(removeFavorite(favorite?.id))} className="delete-btn text-red-500 mt-2 flex items-center gap-x-1 font-medium text-[12px]"><FiTrash/> Remove</button>
            </div>
        </div>
    )
}

export default FavoriteCard;