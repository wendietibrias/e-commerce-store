type SkeletonLoadingProductProps = {
    count:number;
    cols:string;
}

const SkeletonLoadingProduct = ({
   count,
   cols
} : SkeletonLoadingProductProps) => {
  const allSkeletonItems = [];

  for(let i = 0; i < count; i++) {
       allSkeletonItems.push(i);
  }

  return (

    <div className={`w-full gap-3 grid ${cols} xs:grid-cols-1 sm:grid-cols-1 mt-5`}>
       {allSkeletonItems.map((item : number , idx : number) => <div key={idx} className="skeleton-box rounded-lg w-full h-[280px]"></div>)}
    </div>
  )
}

export default SkeletonLoadingProduct