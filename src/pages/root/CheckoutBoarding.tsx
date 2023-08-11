import { useState,useEffect } from 'react';
import { Input,Select } from "../../components";
import { useForm } from "react-hook-form";
import { useAppSelector } from '../../hooks/redux.hook';

const CheckoutBoarding = () => {
    const { auth:{ payload } } = useAppSelector(state=>state);
    const { register,handleSubmit,formState:{ errors },setValue } = useForm();

    const [step,setStep] = useState<number>(1);

    useEffect(() => {
       setValue('name', payload?.name);
       setValue('email' , payload?.email);
    },[]);
 
    if(step === 1) {
        return (
            <div className="w-full h-full flex justify-center items-center py-8">
                <div className="w-[800px] bg-white border shadow-sm shadow-gray-400 border-gray-300 p-5 rounded-md">
                   <div className="pb-2 border-b text-left border-gray-300">
                     <h2 className="text-sm font-bold text-gray-700">Payment Details</h2>
                   </div>
                   <form className="flex flex-col gap-y-3 mt-5">
                     <div className="grid grid-cols-2 gap-3">
                        <Input name="name" register={register} placeholder="Username" error={errors?.name ? true : false} type="text"/>
                        <Input name="email" register={register} placeholder="Email" error={errors?.email ? true : false} type="email"/>
                        <Input name="country" register={register} placeholder="Your country" error={errors?.country ? true : false} type="text"/>
                        <Input name="city" register={register} placeholder="Your city" error={errors?.city ? true : false} type="text"/>
                        <Input name="address" register={register} placeholder="Your address" error={errors?.address ? true : false} type="text"/>
                        <Input name="postalCode" register={register} placeholder="Postal code" error={errors?.postalCode ? true : false} type="text"/>
                     </div>
                     {step > 1 && (
                       <div className="w-full">
                         <div className="grid grid-cols-2 gap-3">
                           
                         </div>
                       </div>
                     )}
                     <button type="button" onClick={()=>setStep(step+1)} className="mt-4 bg-blue-500 text-[13px] py-2 text-white font-semibold rounded-md">Next step</button>
                   </form>
                </div>
            </div>
        )
    }

    if(step === 2) {
        return (
            <div className="w-full h-full flex justify-center items-center py-8">
                <div className="w-[800px] bg-white border shadow-sm shadow-gray-400 border-gray-300 p-5 rounded-md">
                      <div className="pb-2 border-b text-left border-gray-300">
                     <h2 className="text-sm font-bold text-gray-700">Payment Method</h2>
                   </div>
                </div>
            </div>
        )
    }

    return (
        <div>last step</div>
    )
}

export default CheckoutBoarding;