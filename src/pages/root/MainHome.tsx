import { Outlet } from "react-router-dom";
import { Navbar,Footer } from "../../components";

const MainHome = () => {
    return (
        <div className="w-full mx-auto flex flex-col justify-between min-h-screen">
            <div className="w-[80%] sm:w-full  mx-auto flex-1">
               <Navbar/>
               <main className="w-full mt-1"><Outlet/></main>
            </div>
            <Footer/>
        </div>
    )
}

export default MainHome;