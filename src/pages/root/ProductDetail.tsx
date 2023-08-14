import { useAppDispatch,useAppSelector } from "../../hooks/redux.hook";
import { useState,useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useGetProductQuery } from "../../services/product.services";
import { useParams } from "react-router-dom";
import { addCart } from "../../slices/cart.slice";
import { AiOutlineHeart,AiTwotoneHeart } from 'react-icons/ai';
import { addFavorite, removeFavorite } from "../../slices/favorite.slice";
import { IFavoriteState } from "../../interface/favorite.interface";
import convertMoney from "../../utils/convertMoney";

const ProductDetail = () => {
    const dispatch = useAppDispatch();

    const { favorite:{ favorites },auth:{ token } } = useAppSelector(state=>state);
    const { id } = useParams();
 
    const {
        data:product,
        isLoading 
    } = useGetProductQuery(Number(id));
    
    const [qty,setQty] = useState<number>(1);
    const [isFavorite,setIsFavorite] = useState<boolean>(favorites.find((item : IFavoriteState) => item.id === Number(product?.data?.id)) ? true : false);

    useEffect(()=>{
        const findFavorite = favorites.find((item : IFavoriteState) => item.id === Number(product?.data?.id));
        if(findFavorite) {
            setIsFavorite(true);
        }
    }, [product,favorites]);



    const addProductCartHandler = () => {
       dispatch(addCart({
            id:product?.data?.id,
            title:product?.data?.title,
            price:product?.data?.price,
            productImage:product?.data?.productImage?.url,
            qty:qty,
            total:product?.data?.price * qty, 
        }));

        toast.remove();
        setQty(1);
        return toast.success('product add to cart!' , {
            duration:6000,
            position:'top-center'
        })
    }

    const addProductFavoriteHandler = () => {
         const findFavorite = favorites.find((item : IFavoriteState) => item.id === Number(product?.data?.id));

         if(findFavorite) {
            dispatch(removeFavorite(findFavorite?.id));
            setIsFavorite(false);
            return toast.success('product already remove from favorite' , {
                duration:6000,
                position:'top-center'
            });
         }

         dispatch(addFavorite({
              title:product?.data?.title,
              price:product?.data?.price,
              productImage:product?.data?.productImage,
              id:product?.data?.id
         }));
    }

    if(isLoading) {
        return (
            <div className="w-full flex items-stretch sm:flex-col sm:gap-y-7 gap-x-10 mt-7">
                <div className="w-[410px] skeleton-box h-[430px] rounded-lg"></div>
                <div className="flex-1 sm:px-5">
                    <div className="flex items-center gap-x-5">
                        <h2 className="w-[80%] h-[21px] skeleton-box rounded-sm"></h2>
                        <h2 className="w-[50px] h-[21px] skeleton-box rounded-sm"></h2>
                    </div>
                    <p className="mt-3 w-[60%] h-[15px] rounded-sm skeleton-box"></p>
                    <p className="mt-5 w-[70%] h-[15px] rounded-sm skeleton-box"></p>
                    <p className="mt-1 w-full h-[15px] rounded-sm skeleton-box"></p>
                    <p className="mt-1 w-[60%] h-[15px] rounded-sm skeleton-box"></p>
                    <p className="mt-1 w-[70%] h-[15px] rounded-sm skeleton-box"></p>
                    <p className="mt-1 w-[60%] h-[15px] rounded-sm skeleton-box"></p>
                    <p className="mt-1 w-[70%] h-[15px] rounded-sm skeleton-box"></p>
                    
                    {token && (
                        <div className="mt-9">
                            <div className="w-full flex items-center gap-x-2">
                                <button className="py-2 px-2 rounded-md skeleton-box"></button>
                                <span className="skeleton-box px-1 py-1"></span>
                                <button className="py-2 px-2 rounded-md skeleton-box"></button>
                            </div>
                            <div className="w-full flex items-center gap-x-3 mt-5">
                                <button className="py-3 px-3 rounded-md skeleton-box"></button>
                                <button className="py-3 flex-1 rounded-md skeleton-box"></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full sm:flex-col sm:gap-y-5 flex items-stretch gap-x-10 mt-7 sm:mt-0">
         <div className="w-[410px] shadow-md shadow-gray-200 h-[430px] rounded-lg bg-gray-100 flex justify-center items-center">
             <img src={`${product?.data?.productImage?.url}`} alt={product?.data?.title} className="w-[70%]"/>
         </div>
         <div className="flex-1  mt-2 sm:px-5">
            <div className="w-full">
                <div className="flex items-center sm:justify-between gap-x-5">
                <h2 className="text-2xl font-extrabold text-gray-700">{product?.data?.title}</h2>
                <h5 className="text-blue-500 font-bold">{convertMoney(Number(product?.data?.price))}</h5>
            </div>
                <p className="text-sm mt-1 text-gray-400">{product?.data?.category?.title}</p>
                <p className="text-sm mt-5 text-gray-400 ">Product stock : {product?.data?.stock}</p>
                <p className="text-sm  text-gray-400 mt-2">{product?.data?.excerpt}</p>
                <p className="text-sm  text-gray-400 mt-2">{product?.data?.description}</p>
            </div>
            {token && (
               <div className="w-full mt-9">
                 {isFavorite ? (
                     <button onClick={() => addProductFavoriteHandler()} className="text-red-500 font-semibold flex items-center gap-x-2 text-[13px]"><AiTwotoneHeart className="text-lg"/>Remove from favorite</button>
                     ) : (
                     <button onClick={() => addProductFavoriteHandler()} className="text-red-500 font-semibold flex items-center gap-x-2 text-[13px]"><AiOutlineHeart className="text-lg"/>Add to favorite</button>
                 )} 
                 <div className="flex items-center gap-x-5 mt-4">
                 <div className="flex items-center gap-x-3">
                    <button onClick={()=>setQty(qty-1)} disabled={qty < 2 ? true : false} className="text-md text-white px-[6px]  bg-blue-500 rounded-sm font-semibold">-</button>
                    <span className="font-semibold text-md text-gray-700">{qty}</span>
                    <button onClick={()=> qty >= product?.data?.stock ? setQty(qty) : setQty(qty+1)} className="text-md text-white px-[6px]  bg-blue-500 rounded-sm font-semibold">+</button>
                 </div>
                      <button onClick={addProductCartHandler} className="bg-blue-500 w-full  text-white rounded-md py-2 text-[13px] font-semibold">Add to cart</button>
                 </div>
               </div>
            )}
         </div>
          <Toaster/>
        </div>
    )
}

export default ProductDetail;