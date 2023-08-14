import { useAppSelector,useAppDispatch } from "../../hooks/redux.hook";
import { FavoriteCard } from "../../components";
import { IFavoriteState } from "../../interface/favorite.interface";

const  Favorites = () => {
    const dispatch = useAppDispatch();
    const { favorite:{ favorites } } = useAppSelector(state=>state);

    return (
        <div className="w-full mt-7 sm:px-5">
            <h2 className="text-gray-700 text-lg sm:text-sm font-bold">Favorite products ({favorites.length})</h2>
            {favorites.length === 0 ? (
                <div className="w-full text-center mt-7">
                    <h5 className="text-lg sm:text-md font-medium text-gray-500">No Products</h5>
                </div>
            ) : (
                <div className="w-full grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-3 mt-7">
                    {favorites?.map((item : IFavoriteState , idx : number) => <FavoriteCard key={idx} favorite={item} />)}
                </div>
            )}
        </div>
    )
}

export default Favorites;