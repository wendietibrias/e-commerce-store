
export interface IFavoriteState {
    id:number | string;
    title:string;
    price:string | number;
    productImage:{
        url:string;
        publicId:string;
    };
}