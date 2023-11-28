import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import GalleryCarouselData from './Data';

const GalleryCarousel = () => {
  const navigate = useNavigate();

  const scrollToSection = (section) => {
    navigate(`/gallery/#${section}`);
  };

  return (
    <>
      <div className='flex  justify-center items-center gap-0.5 md:gap-1 lg:p-1 p-4 w-[100%] flex-wrap '>
        {GalleryCarouselData.map((item) => (
          <div key={item.id} className='w-[100%] h-[100%] lg:w-[19.5%] object-cover relative '>
            <ScrollLink spy={true} smooth={true} offset={-100} duration={500} to={`/gallery/${item.url}`}>
              <div className='relative w-[100%] h-[100%] hover:cursor-pointer'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-[100%] object-cover h-[120px] lg:h-[600px] cursor-pointer rounded-md hover:cursor-pointer'
                />
                <div
                  onClick={() => scrollToSection(item.url)}
                  className='absolute inset-0 bg-black opacity-0 cursor-pointer w-[100%] h-[100%] rounded-md transition-opacity md:flex items-center justify-start hidden hover:opacity-40 hover:cursor-pointer '
                >
                  <p className='text-white lg:text-[60px]  xl:text-[80px] font-extrabold absolute transform -rotate-90 font-sans hover:cursor-pointer'>{item.title}</p>
                </div>
              </div>

              <div
                onClick={() => scrollToSection(item.url)}
                className='absolute bg-black opacity-50  rounded-md inset-0 flex items-end p-2 justify-start  lg:hidden '
              >
                <p className='text-white text-md md:text-2xl'>{item.title}</p>
              </div>
            </ScrollLink>
          </div >
        ))}
      </div >
    </>
  );
};

export default GalleryCarousel;
