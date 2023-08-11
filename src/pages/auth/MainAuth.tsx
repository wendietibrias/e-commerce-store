import { Outlet } from "react-router-dom";
import authbg from "../../assets/images/auth-bg.jpg";

const MainAuth = () => {
    return (
        <div className="flex items-stretch">
          <div className="flex-1 sm:w-full sm:h-screen">
            <Outlet/>
          </div>
          <div className="w-[50%] h-screen sm:hidden">
            <img src={authbg} className="w-full h-full m-0 p-0" alt="auth-bg"/>
          </div>
        </div>
    )
}

export default MainAuth;