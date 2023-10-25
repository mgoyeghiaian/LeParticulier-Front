import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from "@mui/icons-material";
import CarouselData from '../../../Db';

const Hero = () => {
  return (
    <div className="relative w-full h-full">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        showArrows={false}
        stopOnHover={false}
        emulateTouch={true}
        interval={3000}
        className="h-full"
      >
        {CarouselData.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={`Image ${item.id}`} className="h-[40svh] md:h-[95svh] object-cover" />
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-8 left-20 transform -translate-y-1/2 hidden md:flex space-x-5">
        <Link to="https://www.facebook.com" target="_blank" className="text-black border border-black bg-gray-300 bg-opacity-75 p-2 rounded-full text-center hover:bg-opacity-100 transition duration-300">
          <Facebook />
        </Link>
        <Link to="https://www.instagram.com" target="_blank" className="text-black bg-gray-300 bg-opacity-75 border border-black p-2 rounded-full text-center hover-bg-opacity-100 transition duration-300">
          <Instagram />
        </Link>
      </div>
      <Link to="/reservation" className=" absolute bottom-8  right-20 transform -translate-y-1/2 border border-black text-black font-bold bg-gray-300 bg-opacity-75 p-2 pr-5 pl-5 rounded text-center hover-bg-opacity-100 transition duration-300">
        Book Now
      </Link>
    </div>
  );
};

export default Hero;
