type InputProps = {
    name:string;
    type:string;
    placeholder:string;
    register:any;
    error:boolean;
}

const Input = ({
  name,
  type,
  placeholder,
  register,
  error
} : InputProps) => {
    return (
        <div className="w-full flex flex-col gap-y-2">
            <label className="font-medium text-gray-500 text-[13px] capitalize">{name}</label>
            <input type={type} placeholder={placeholder} {...register(name , { required:true })} name={name} className={`w-full text-[13px] py-3 px-3 rounded-md outline-none border ${error ? "border-red-500" : "border-gray-300"}`} />
            {error && <p className="text-red-500 text-[12px] font-medium">{name} field is required</p>}
        </div>
    )
}

export default Input;