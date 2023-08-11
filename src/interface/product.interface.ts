export interface IProductResponse {
   id:number | string;
   title:string;
   price:string;
   description:string;
   excerpt:string;
   productImage:{
    url:string;
    publicId:string;
   }
   category:{
    title:string;
    slug:string;
   }
}