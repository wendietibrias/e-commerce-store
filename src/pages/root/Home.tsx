import { Banner,ProductCard,Products } from "../../components";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="w-full pb-8 mx-auto">
            <Banner/>
            <Products/>
        </div>
    )
}

export default Home;