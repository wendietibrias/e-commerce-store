import { useGetAllProductQuery,useGetProductCategoriesQuery } from "../../services/product.services";
import { ProductCard, SkeletonLoadingProduct } from "../../components";
import { useSearchParams,Link } from 'react-router-dom';
import { IProductResponse } from "../../interface/product.interface";

const Products = () => {
  const [searchParams,setSearchParams] = useSearchParams();

  const {
    data:products,
    isLoading:loading,
    error:errorProduct
  } = useGetAllProductQuery(`take=12&category=${searchParams.get("category")}`);

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
    <div className="mt-7 w-full">
        <div className="flex items-start gap-x-10">
          {categoriesLoading ? (
             <div className="w-[13%] flex flex-col gap-y-3">
                <button className="w-full bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
                <button className="w-full bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
                <button className="w-full bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
                <button className="w-full bg-gray-100 rounded-sm h-[30px] skeleton-box"></button>
             </div>
          ) : (
              <div className="w-[13%]">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">All Categories</h3>
              </div>
              <div className="flex flex-col gap-y-3 mt-3">
                    <Link to={`/product`}>
                      <button className={` text-left ${!searchParams.get("category") ? "text-blue-500" : "text-gray-700"} py-1 w-full rounded-md text-[13px] font-medium`}>All</button>
                  </Link>
                  {categories && categories.data.map((category : any, idx : number) => (
                  <Link to={`/product?category=${category?.slug}`}>
                      <button key={idx} className={` text-left ${searchParams.get("category") === category.slug ? "text-blue-500" : "text-gray-700"}  py-1 w-full rounded-md text-[13px] font-medium`}>{category?.title}</button>
                  </Link>
                ))}
              </div>
            </div>
          )}
           <div className="flex-1">
             {loading ? (
                <SkeletonLoadingProduct cols="grid-cols-4" count={12}/>
             ) : (
                <div className="w-full grid grid-cols-4 gap-3">
                {products && products?.data?.map((product : IProductResponse , idx : number) => <ProductCard key={idx} product={product}/>)}
              </div>
             )}
           </div>
        </div>
    </div>
  )
}

export default Products