import { Input,Select,OrderDetailCard,LoadingSpinner,Alert, Button } from "../../components";
import { useCheckoutHandlerMutation } from "../../services/checkout.services";
import { useAppSelector,useAppDispatch } from '../../hooks/redux.hook';
import { useState,useEffect } from 'react';
import { Navigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ICartState } from '../../interface/cart.interface';
import { closeAlert, openAlert } from "../../slices/alert.slice";
import { BsCheck2Circle } from 'react-icons/bs';
import { clearCart } from "../../slices/cart.slice";
import convertMoney from '../../utils/convertMoney';

const CheckoutBoarding = () => {
   const dispatch = useAppDispatch();

    const { auth:{ payload,token },alert:{ open },cart:{ carts } } = useAppSelector(state=>state);
    const { register,handleSubmit,formState:{ errors },setValue,getValues } = useForm();

    const [successPayment,setSuccessPayment] = useState<boolean>(false);
    const [checkoutHandler , { isLoading }] = useCheckoutHandlerMutation();

    const submitHandler = (formData : any) => {
       checkoutHandler({...formData,orderDetail:carts})
         .unwrap()
         .then((res) => {
            dispatch(clearCart());
            dispatch(openAlert({
                open:true,
                variant:'success',
                message:`${res?.message}`
            }));
            setTimeout(()=> setSuccessPayment(true),4000);
         })
         .catch((err) => {
            dispatch(openAlert({
                open:true,
                variant:'error',
                message:err?.data?.error
            }));
         })
         .finally(() => {
             setTimeout(() => dispatch(closeAlert()) ,6000);
         })
    }

    useEffect(() => {
       setValue('name', payload?.name);
       setValue('email' , payload?.email);
    },[]);

    if(!token) {
      return <Navigate to="/"/>
    }

    if(successPayment) {
       return (
         <div className="w-full flex-1 py-8 flex justify-center items-center">
             <div className="w-[800px] bg-white shadow-sm shadow-gray-400 border border-gray-300 flex flex-col items-center p-7  rounded-lg">
                <div className="flex items-center gap-x-3">
                   <BsCheck2Circle className="text-4xl text-green-500"/>
                   <h4 className="text-xl text-green-500 font-semibold">Payment Success</h4>
                </div>
                <p className="text-sm text-gray-500 mt-1">Your item will be send with the delivery you choose</p>
                <Link className="w-full" to="/">
                  <button className="text-green-500 border-2 border-green-500 py-2 w-full rounded-md mt-5 font-semibold text-[13px]">Back to home</button>
                </Link>
             </div>
         </div>
       )
    }

    if(isLoading) {
       return (
          <div className="w-full py-8 flex justify-center items-center">
              <LoadingSpinner width={40} height={40} color="#3b82f6" />
          </div>
       )
    }

        return (
           <div className="w-full h-full py-8">
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-gray-700">Total : {convertMoney(carts.reduce((a,b)=>a+Number(b.total),0))}</h2>
                    <p className="text-[14px] mt-1 text-gray-500  font-medium">Total Products : {carts.length}</p>
                </div>
            <div className="flex justify-center gap-x-7 items-start">
                <div className="flex-1">
                  <div className="w-full grid grid-cols-2 gap-3">
                     {carts.map((item : ICartState , idx : number) => <OrderDetailCard key={idx} item={item} />)}  
                  </div>
                </div>
                <div className="w-[600px] bg-white border shadow-sm shadow-gray-400 border-gray-300 p-5 rounded-md">
                   <div className="pb-2 border-b text-left border-gray-300">
                     <h2 className="text-sm font-bold text-gray-700">Payment Details</h2>
                   </div>
                   {open && <Alert/>}
                   <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-y-3 mt-5">
                     <div className="grid grid-cols-2 gap-3">
                        <Input name="name" register={register} placeholder="Username" error={errors?.name ? true : false} type="text"/>
                        <Input name="phone" register={register} placeholder="Phone number" error={errors?.phone ? true : false} type="text"/>
                        <Input name="country" register={register} placeholder="Your country" error={errors?.country ? true : false} type="text"/>
                        <Input name="city" register={register} placeholder="Your city" error={errors?.city ? true : false} type="text"/>
                        <Input name="address" register={register} placeholder="Your address" error={errors?.address ? true : false} type="text"/>
                        <Input name="postalCode" register={register} placeholder="Postal code" error={errors?.postalCode ? true : false} type="text"/>
                     </div>
                       <div className="w-full">
                         <div className="grid grid-cols-2 gap-3">
                           <Select name="payment" placeholder='Choose payment method' register={register} error={errors?.payment ? true : false} items={["Visa", "PayPal" , "MidTrans","Stripe"]} />
                           <Select name="delivery" placeholder='Choose delivery service' register={register} error={errors?.delivery ? true : false} items={["J&T", "JNE" , "SiCepat","Ninja Express"]} />
                         </div>
                       </div>
                       <div className="flex flex-col gap-y-2">
                         <label className="text-[13px] text-gray-500 font-semibold">Detail</label>
                         <textarea {...register('detail' , { required:true })} className="w-full border border-gray-300 resize-none h-[150px] rounded-md p-3 outline-none text-[13px] text-gray-500"></textarea>
                       </div>
                      <Button>
                        {isLoading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Proceed Payment"}
                      </Button>
                   </form>
                </div>
            </div>
           </div>
        )

}

export default CheckoutBoarding;