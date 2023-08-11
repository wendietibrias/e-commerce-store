import React from "react";

type ButtonProps = {
    children:React.ReactNode;
}

const Button = ({
   children 
} : ButtonProps) => {
    return (
        <button className="w-full flex justify-center items-center mt-4 bg-blue-500 py-2 text-white font-semibold text-[13px] rounded-md">{children}</button>
    )
}

export default Button;