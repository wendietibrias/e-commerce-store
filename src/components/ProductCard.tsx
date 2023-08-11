import { IProductResponse } from "../interface/product.interface";
import { Link } from "react-router-dom";
import convertMoney from "../utils/convertMoney";

type ProductCardProps = {
    product:IProductResponse
}

const ProductCard = ({
    product
} : ProductCardProps) => {
  return (
       <Link to={`/product/${product.id}`} >
            <div  className="w-full relative hover:scale-110 overflow-hidden transition-all duration-500 bg-white shadow-sm shadow-gray-400 p-4 rounded-lg">
                <div className="w-full h-[210px] bg-gray-100 flex justify-center items-center rounded-lg">
                <img src={product?.productImage?.url} alt={product?.title} className="w-[60%]" />
                </div>
                <div className="pt-3">
                    <div className="flex items-center justify-between">
                        <h5 className="text-[12px] font-semibold text-gray-700">{product?.title}</h5>
                        <h5 className="text-[12px] font-bold text-blue-500">{convertMoney(Number(product?.price))}</h5>
                    </div>
                    <p className="text-[12px] mt-1 text-gray-400">{product?.category?.title}</p>
                </div>
            </div>
       </Link>
  )
}

export default ProductCard