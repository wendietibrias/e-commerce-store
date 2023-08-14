import { useGetBannerQuery } from '../services/banner.services';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const {
        data:banner,
        isLoading ,
        error
    } = useGetBannerQuery(null);

    if(isLoading ) {
        return (
            <div className="w-full h-[400px] my-5 sm:my-0 rounded-lg sm:rounded-none skeleton-box"></div>
        )
    }

    if(error) {
        return (
            <div className="w-full h-[400px] bg-gray-100 flex my-5 sm:my-0 sm:rounded-none justify-center rounded-lg items-center">
                <h2 className=" uppercase text-2xl text-gray-400 font-bold">NO BANNER</h2>
            </div>
        )
    }

     const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };

    return (
        <div className="w-full my-7 sm:mt-0">
          <Slider {...settings}>
             {banner?.data?.map((item : any , idx : number) => (
                 <div key={idx} className="w-full relative overflow-hidden rounded-lg sm:rounded-none h-full">
                    <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/banner/${item?.bannerImage}`} className="w-full object-cover rounded-lg h-[400px]"/>
                    <div className="absolute top-0 flex justify-center rounded-lg sm:rounded-none flex-col px-10 sm:px-5 left-0 w-full h-full bg-gray-800/50">
                        <h2 className="text-3xl  sm:text-lg text-white font-semibold">{item?.title}</h2>
                        <p className="text-white text-sm mt-2">{item?.subtitle}</p>
                        <button className="bg-white self-start mt-6 text-[13px] outline-none rounded-md py-3 px-4 text-gray-700 font-semibold">Explore now!</button>
                    </div>
                 </div>
             ))}
          </Slider>
        </div>
    )
}

export default Banner;