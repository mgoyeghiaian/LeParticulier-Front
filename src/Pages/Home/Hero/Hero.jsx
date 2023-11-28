import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
// import { Facebook, Instagram } from "@mui/icons-material";
import CarouselData from '../../../Db';
import { Link as ScrollLink } from 'react-scroll';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (section) => {
    navigate(`/#${section}`);
  };


  return (
    <div className="relative w-full  h-full">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        showArrows={false}
        stopOnHover={false}
        emulateTouch={true}
        interval={5000}
        className="h-full"
      >
        {CarouselData.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={`Image ${item.id}`} className="h-[40svh] md:h-[70svh] object-cover" />
          </div>
        ))}
      </Carousel>
      {/* <div className="absolute bottom-8 left-20 transform -translate-y-1/2 hidden md:flex space-x-5">
        <Link to="https://www.facebook.com/profile.php?id=100093833086676" target="_blank" className="text-black border border-black bg-gray-300 bg-opacity-75 p-1.5 rounded-full text-center hover:bg-opacity-100 transition duration-300 hover:cursor-pointer hover:no-underline hover:text-gray-600">
          <Facebook style={{ fontSize: 25, color: 'black', transition: 'color 0.2s', cursor: 'pointer', }} />
        </Link>
        <Link to="https://www.instagram.com/particulier.lb/" target="_blank" className="text-black bg-gray-300 bg-opacity-75 border border-black p-1.5 rounded-full text-center hover:bg-opacity-100 transition duration-300 hover:cursor-pointer hover:no-underline hover:text-gray-600">
          <Instagram style={{ fontSize: 25, color: 'black', transition: 'color 0.2s', cursor: 'pointer', }} />
        </Link>
      </div> */}
      <ScrollLink to="/"
        onClick={() => {
          scrollToSection("resrvation");
        }} className=" md:flex absolute bottom-8 cursor-pointer hidden  right-20 transform -translate-y-1/2 md:text-xl mt-3 text-sm  border border-black text-black  bg-gray-400 hover:bg-opacity-100 bg-opacity-90 p-2 pr-5 pl-5 rounded text-center hover-bg-opacity-100 transition duration-300  hover:no-underline hover:text-gray-600">
        BOOK NOW
      </ScrollLink>
    </div>
  );
};

export default Hero;
