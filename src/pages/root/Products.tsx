import { useGetAllProductQuery,useGetProductCategoriesQuery } from "../../services/product.services";
import { ProductCard, SkeletonLoadingProduct } from "../../components";
import { useSearchParams,Link } from 'react-router-dom';
import { IProductResponse } from "../../interface/product.interface";
import { useState } from "react";

const Products = () => {

  const [page,setPage] = useState<number>(1);
  const [searchParams,setSearchParams] = useSearchParams();

  const {
    data:products,
    isLoading:loading,
    isFetching:fetching,
    error:errorProduct,
  } = useGetAllProductQuery(`take=12&category=${searchParams.get("category")}&page=${page}`);

  const {
    data:categories,
    isLoading:categoriesLoading,
    error:errorCategories
  } = useGetProductCategoriesQuery(null);


  if(errorProduct && errorCategories) {
     return (
        <div className="text-center mt-7">
            <h4 className="text-xl font-medium text-gray-500">No Products</h4>
        </div>
     )
  }

  return (
    <div className="mt-7 sm:mt-5 w-full">
        <div className="flex sm:flex-col items-start gap-x-10">
          {categoriesLoading ? (
             <div className="w-[13%] sm:w-full flex flex-col sm:flex-row gap-y-3 sm:gap-x-3 mt-3">
                <button className="w-full sm:flex-1 bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
                <button className="w-full sm:flex-1 bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
                <button className="w-full sm:flex-1 bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
                <button className="w-full sm:flex-1 bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
             </div>
          ) : (
              <div className="w-[13%] lg:w-[20%] sm:w-full">
                <div className="flex justify-between items-center sm:hidden">
                <h3 className="text-lg font-bold text-gray-700">All Categories</h3>
              </div>
              <div className="flex sm:gap-x-4 sm:mb-5 flex-col gap-y-3 mt-3 sm:flex-row sm:px-5 sm:overflow-x-scroll">
                    <Link to={`/product`}>
                      <button className={` text-left ${!searchParams.get("category") ? "text-blue-500 sm:bg-gray-200" : "text-gray-700 sm:bg-gray-100"} py-1 w-full sm:p-2 rounded-md text-[13px] font-medium`}>All</button>
                  </Link>
                  {categories && categories.data.map((category : any, idx : number) => (
                  <Link to={`/product?category=${category?.slug}`}>
                      <button key={idx} className={` text-left ${searchParams.get("category") === category.slug ? "text-blue-500" : "text-gray-700"} sm:bg-gray-100 sm:p-2  py-1 w-full rounded-md text-[13px] font-medium`}>{category?.title}</button>
                  </Link>
                ))}
              </div>
            </div>
          )}
           <div className="flex-1 sm:w-full sm:px-5">
             {loading === true || fetching === true ? (
                <SkeletonLoadingProduct cols="grid-cols-4" count={12}/>
             ) : (
                <div className="w-full">
                  {products?.data?.length > 0  ? (
                     <div className="w-full grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-3">
                       {products && products?.data?.map((product : IProductResponse , idx : number) => <ProductCard key={idx} product={product}/>)}
                    </div>
                  ) : (
                     <div className="text-center">
                        <h4 className="text-sm font-medium text-gray-500">No products with category : {searchParams.get("category")}</h4>
                     </div>
                  )}
                </div>
             )}
           </div>
        </div>
    </div>
  )
}

export default Products