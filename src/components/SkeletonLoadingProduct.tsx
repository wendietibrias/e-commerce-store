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

    <div className={`w-full gap-3 grid ${cols} sm:grid-cols-2`}>
       {allSkeletonItems.map((item : number , idx : number) => <div key={idx} className="skeleton-box w-full h-[280px]"></div>)}
    </div>
  )
}

export default SkeletonLoadingProduct