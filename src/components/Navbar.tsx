import { AiOutlineHeart,AiOutlineLogout } from 'react-icons/ai';
import { useAppSelector,useAppDispatch } from "../hooks/redux.hook";
import { Link } from "react-router-dom";
import { PiShoppingCartSimple } from 'react-icons/pi';
import { LiaUserCircleSolid } from 'react-icons/lia';
import { removeCredentials } from "../slices/auth.slice";
import { MdOutlinePayment } from 'react-icons/md';
import { useState } from 'react';

const Navbar = () => {
    const dispatch = useAppDispatch();

    const { cart:{ carts },favorite:{ favorites },auth:{ token,payload } } = useAppSelector(state=>state);
    const [openDropdown,setOpenDropdown] = useState<boolean>(false);

    return (
        <nav className="w-full py-4 border-b sm:px-5 border-gray-300 relative">
            <div className="w-full mx-auto flex justify-between items-center">
                 <Link to="/">
                    <span className="font-extrabold text-gray-700 text-2xl sm:text-xl uppercase">wmart</span>
                </Link>
                <div className="flex items-center gap-x-4">
                    <Link to="/carts">
                      <button className="relative cursor-pointer text-md font-bold text-gray-700">
                        <span className="w-[16px] h-[16px] rounded-full absolute font-medium -top-[8px] -right-2 bg-red-500 text-white flex justify-center items-center text-[12px]">{carts.length}</span>
                        <PiShoppingCartSimple className="text-lg font-bold"/>
                      </button>
                    </Link>
                   <Link to="/favorites">
                      <button className="relative cursor-pointer text-md font-bold text-gray-700">
                            <span className="w-[16px] h-[16px] absolute -top-[8px] font-medium -right-2 rounded-full bg-red-500 text-white flex justify-center items-center text-[12px]">{favorites?.length}</span>
                            <AiOutlineHeart className="text-lg font-bold"/>
                        </button>
                   </Link>
                    {token ? (
                       <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center gap-x-1 mb-1 text-gray-700">
                         <LiaUserCircleSolid className="text-[24px]"/>
                         <span className="text-[13px] font-semibold text-gray-700">{payload?.name}</span>
                       </button>
                    ) : (
                       <Link to="/auth">
                          <button className="bg-blue-500 text-white ml-4 font-semibold text-[13px] py-2 px-4 rounded-md">Sign in</button>
                       </Link>
                    )}
                </div>
            </div>
            {openDropdown && (
               <div className="absolute z-[999] right-1 flex flex-col gap-y-2 top-14 border border-gray-300 bg-white rounded-md py-3 px-5">
                 <button onClick={() => {
                   dispatch(removeCredentials());
                   setOpenDropdown(false);
                 }} className="flex items-center gap-x-3 font-medium text-gray-700 text-[12px]">
                   <AiOutlineLogout className="text-[16px]"/>
                   Logout
                 </button>
                <Link to="/transaction">
                    <button className="flex items-center gap-x-3 font-medium text-gray-700 text-[12px]">
                    <MdOutlinePayment className="text-[16px]"/>
                    Transaction history
                  </button>
                </Link>
               </div>
            )}
        </nav>
    )
}

export default Navbar;