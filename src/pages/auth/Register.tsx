import { useRegisterCredentialMutation,useResendEmailVerificationMutation } from '../../services/auth.services';
import { Input,Button, Alert, LoadingSpinner } from '../../components';
import { openAlert,closeAlert } from '../../slices/alert.slice';
import { useAppDispatch,useAppSelector } from '../../hooks/redux.hook';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { BsCheck2Circle } from 'react-icons/bs';

const Register = () => {
  const dispatch = useAppDispatch();
  const { alert:{ open } } = useAppSelector(state=>state);
  const { register,handleSubmit,formState:{ errors },setValue,getValues,reset } = useForm();

  const [resendEmailVerification , { isLoading:loadingResend }] = useRegisterCredentialMutation();
  const [registerCredential , { isLoading:loadingRegister }] = useRegisterCredentialMutation();
  const [successRegister,setSuccessRegister] = useState<boolean>(false);

  const submitHandler = (formData : any) => {
      registerCredential(formData)
        .unwrap()
        .then((res)=>{
           dispatch(openAlert({
             open:true,
             variant:'success',
             message:res?.message
           }));
           setTimeout(()=>{
            setSuccessRegister(true)
           },3000);
        })
        .catch((err)=>{
            dispatch(openAlert({
               open:true,
               variant:'error',
               message:err?.data?.error
            }))
        })
        .finally(()=>{
           setTimeout(()=>dispatch(closeAlert()),6000);
        });
  }

  const resendEmailVerificationHandler = () => {
      const email = getValues('root.email');
      resendEmailVerification(email)
        .unwrap()
        .then((res)=>{
           dispatch(openAlert({
               open:true,
               variant:'success',
               message:res?.message
           }));
        })
        .catch((err)=>{
           dispatch(openAlert({
               open:true,
               variant:'error',
               message:err?.data?.error
           }));
        })
        .finally(()=>{
            setTimeout(()=>dispatch(closeAlert()),6000);
        })
  }


  return (
      <div className="w-full h-full flex flex-col justify-center items-center">
       {successRegister ? (
          <div className="w-[600px] sm:w-full sm:px-5">
            {open && <Alert/>}
            <BsCheck2Circle className="text-5xl text-green-500" />
            <h2 className="font-bold text-gray-700 mt-4 text-2xl">Email confirmation already send</h2>
            <p className="text-[13px] mt-2 text-gray-500">Please check your email for the confirmation</p>
            <button onClick={resendEmailVerificationHandler} className="bg-blue-500 text-white text-[13px] py-2 px-5 font-semibold mt-5 rounded-md">
              {loadingResend ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Resend email"}
            </button>
          </div> 
       ) : (
            <div className="w-[600px] sm:px-5 sm:w-full">
            {open && <Alert/>}
            <h2 className="font-bold text-gray-700 text-3xl sm:text-2xl sm:text-center">Join WMART</h2>
            <p className="text-[13px] mt-1 text-gray-500 sm:text-center">Create your own account and start your shopping journey</p>
            <form onSubmit={handleSubmit(submitHandler)} className="mt-7 flex flex-col gap-y-3">
              <Input name="name" placeholder='JohndoeExample' type="text" register={register} error={errors?.name ? true : false}/>
              <Input name="email" placeholder='Example@gmail.com' type="email" register={register} error={errors?.email ? true : false}/>
              <Input name="password" placeholder='Password' type="password" register={register} error={errors?.password ? true : false}/>
              <Input name="confirm" placeholder='Confirm password' type="password" register={register} error={errors?.confirm ? true : false}/>
              <Button>
                {loadingRegister ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Sign up"}
              </Button>
              <p className="text-center text-gray-500 font-medium text-[13px] mt-1">
                Already have account? ? <Link to="/auth"><span className="text-blue-500 font-semibold">Login</span></Link>
              </p>
            </form>
          </div>
       )}
    </div>
  )
}

export default Register