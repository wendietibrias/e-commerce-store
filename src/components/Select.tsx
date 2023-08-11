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
        <select className="outline-none border border-gray-300 p-3 rounded-md" placeholder={placeholder} name={name} {...register(name, { required:true })}>
            {items.map((item : string , idx : number) => (
                 <option key={idx} value={item} className={`capitalize`}>{item}</option>
            ))}
        </select>
    )
}

export default Select;