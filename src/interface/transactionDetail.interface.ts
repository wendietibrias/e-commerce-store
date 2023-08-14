
type ITransactionDetail = {
    id:number;
    productTitle:string;
    productPrice:number;
    productImage:string;
    qty:number;
    total:number;
    createdAt:string;
}

export interface ITransactionHistory {
    id:number;
    phone:string;
    address:string;
    country:string;
    detail:string;
    paymentMethod:string;
    delivery:string;
    createdAt:string;
    orderDetail:ITransactionDetail[]
}