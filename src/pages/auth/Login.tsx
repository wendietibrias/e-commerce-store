import { Input,Button,Alert,LoadingSpinner } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { Link,Navigate } from 'react-router-dom';
import { openAlert,closeAlert } from '../../slices/alert.slice';
import { useForm } from 'react-hook-form';
import { setCredentials } from '../../slices/auth.slice';
import { useLoginCredentialMutation } from '../../services/auth.services';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useAppDispatch();

  const { alert:{ open },auth:{ token } } = useAppSelector(state=>state);
  const { register,handleSubmit,formState:{ errors },setValue,reset } = useForm();

  const [loginCredential, { isLoading }] = useLoginCredentialMutation();

  const submitHandler = (formData : any) => {
     loginCredential(formData)
       .unwrap()
       .then((res)=>{
          dispatch(openAlert({
              open:true,
              message:res?.message,
              variant:"success"
          }));

          dispatch(setCredentials(res?.data?.access_token));

          if(formData.remember === true) {
              localStorage.setItem("wmart-user-history" , JSON.stringify(formData.email));
          }
       })
       .catch((err)=>{
          dispatch(openAlert({
              message:err?.data?.error,
              variant:'error',
              open:true
          }));
       })
       .finally(()=> setTimeout(()=> dispatch(closeAlert()),6000) )
  }


  if(token) {
     return <Navigate to="/"/>
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-[600px] sm:w-full sm:px-5">
         {open && <Alert/>}
         <h2 className="font-bold sm:text-center sm:text-2xl text-gray-700 text-3xl">Welcome back</h2>
         <p className="text-[13px] sm:text-center mt-2 text-gray-500">Please complete your credentials and login</p>
         <form onSubmit={handleSubmit(submitHandler)} className="mt-7 flex flex-col gap-y-3">
           <Input name="email" placeholder='Example@gmail.com' type="email" register={register} error={errors?.email ? true : false}/>
           <Input name="password" placeholder='Password' type="password" register={register} error={errors?.password ? true : false}/>
           <div className="flex justify-between items-center mt-2">
             <div className="flex items-center gap-x-2">
               <input type="checkbox" {...register('remember')} name="remember" className="border border-gray-300" />
               <span className="text-gray-400 text-[13px] font-normal">Remember me?</span>
             </div>
             <Link to={`/forgot-password`}>
               <button className="font-semibold text-[12px] text-blue-500">Forgot password</button>
             </Link>
           </div>
           <Button>
              {isLoading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Sign in"}
           </Button>
           <p className="text-center text-gray-500 font-medium text-[13px] mt-1">
             Don't have account ? <Link to="/auth/register"><span className="text-blue-500 font-semibold">Register</span></Link>
           </p>
         </form>
      </div>
    </div>
  )
}

export default Login