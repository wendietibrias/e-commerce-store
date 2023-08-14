type SelectProps = {
    name:string;
    placeholder:string;
    items:string[] | any[];
    register:any;
    error:boolean;
}

const Select = ({
   name,
   placeholder,
   items,
   register,
   error
} : SelectProps) => {
    return (
       <div className="flex flex-col gap-y-2">
            <label className="font-medium text-gray-500 text-[13px] capitalize">{name}</label>
            <select className={`outline-none text-[13px] ${error ? "border-red-500" : "border-gray-300"} text-gray-500 border  p-3 rounded-md`} placeholder={placeholder} name={name} {...register(name, { required:true })}>
                {items.map((item : string , idx : number) => (
                    <option key={idx} value={item} className={`capitalize`}>{item}</option>
                ))}
            </select>
        {error && <p className="text-red-500 text-[12px] font-medium">{name} field is required</p>}
       </div>
    )
}

export default Select;