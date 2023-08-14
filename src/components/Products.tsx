import { useGetAllProductQuery } from "../services/product.services";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import SkeletonLoadingProduct from "./SkeletonLoadingProduct";

const Products = () => {
    const {
        data:products,
        isLoading,
        error
    } = useGetAllProductQuery('take=8');

    if(isLoading) {
        return (
           <SkeletonLoadingProduct cols="grid-cols-4" count={8}/>
        )
    }

    if(error) {
        return (
            <div className="text-center">
                <h4 className="text-xl font-medium text-gray-500">No Products</h4>
            </div>
        )
    }

    return (
        <div className="sm:px-5">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">All products</h3>
                <Link to={`/product`}>
                    <button className="bg-transparent text-blue-500 font-semibold text-[13px]">See more</button>
                </Link>
            </div>
            <div className="w-full mt-4 grid grid-cols-4 lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-2 gap-4">
                {products?.data?.map((product : any , idx : number) => <ProductCard key={idx} product={product} />)}
            </div>
        </div>
    )
}

export default Products;