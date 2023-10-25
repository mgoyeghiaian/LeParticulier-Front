import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import backgroundImage from '../../../assets/Testemonials2.png';
import CircularProgress from '@mui/material/CircularProgress';

const Testemonial = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 640);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAP_API_KEY}/testimonials`);
        setTestimonialsData(response?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(true);
        console.log("Testemonial Error:", error.message);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonialsData]);

  const goToNextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const goToPreviousTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 750);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="relative w-full h-[650px] flex flex-col justify-center items-center gap-4 p-4 md:p-8"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className='mb-8 text-center'>
        <h1 className='font-bold text-3xl md:text-4xl text-[#DAA520]'>ILS PARLENT DE NOUS</h1>
        <h1 className='font-bold text-3xl md:text-6xl text-white'>Ce qu&rsquo;ils disent de nous !</h1>
      </div>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <div className=' w-[85%] lg:w-[50%] flex flex-col md:flex-row justify-center items-center gap-5'>
          {!isSmallDevice && (
            <button
              className="text-gold-500 text-4xl border border-gold-500 text-center text-white justify-center flex p-2 rounded-lg hover:bg-gold-500 hover:bg-opacity-70 hover:text-orange-500" onClick={goToPreviousTestimonial}
            >
              <ArrowBack />
            </button>
          )}
          <div className="w-full bg-black bg-opacity-70 rounded-lg shadow-lg p-6 md:h-[280px] relative overflow-hidden">
            <Carousel
              className='w-full h-full'
              autoPlay={true}
              infiniteLoop={true}
              interval={5000}
              selectedItem={activeIndex}
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              stopOnHover={false}
              transitionTime={500}
              dynamicHeight={false}
            >
              {testimonialsData.map((testimonial) => (
                <div key={testimonial._id} className='w-full h-full'>
                  <p className="font-semibold text-2xl text-[#DAA520] mb-6 mt-10">{testimonial.name}</p>
                  <p className="text-white text-xl font-bold">{testimonial.message}</p>
                </div>
              ))}
            </Carousel>
          </div>
          {!isSmallDevice && (
            <button
              className="text-gold-500 text-4xl border border-gold-500 text-center text-white justify-center flex p-2 rounded-lg hover:bg-gold-500 hover:bg-opacity-70 hover:text-[#DAA520]"
              onClick={goToNextTestimonial}
            >
              <ArrowForward />
            </button>
          )}
        </div>
      )};
    </div>

  );
};

export default Testemonial;
