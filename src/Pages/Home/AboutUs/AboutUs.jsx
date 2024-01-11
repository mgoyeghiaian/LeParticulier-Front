
import { useState } from 'react';
import GalleryCarousel from '../../../Components/GalleryCarousel/GalleryCarousel'
import Img from '../../../assets/About UsRImage2.jpg'

const AboutUS = () => {
  const [showFullText, setShowFullText] = useState(false);

  const handleShowMore = () => {
    setShowFullText(!showFullText);
  };
  return (
    <>
      <div className=" flex lg:flex-row gap-5  flex-col p-2 lg:p-5 lg:pr-40 lg:pl-40 pt-10  md:h-[750px]  justify-around items-center ">
        <div className=" flex flex-col md:p-4 justify-center items-center lg:items-start pt-5 flex-wrap w-[100%] lg:w-[50%] gap-5">
          <p className=' lg:text-xl text-xl' >PARTICULER</p>
          <h1 className='text-xl lg:text-3xl text-center font-extrabold tracking-wider'  >WELCOME TO PARTICULER</h1>
          {showFullText ? (
            <h4 className=' flex flex-col text-justify p-4 md:p-0 gap-4 md:text-justify lg:text-[16px] text-[14px] mb-2'>

              <span>  Platinum Invest Holding’s latest masterpiece inspired by the exquisite living experience found in boutique hotels.
                Nestled in the scenic Beit Meri, our project offers a refreshing concept of fully furnished studios and apartments on a wide road with a prime location, providing an unparalleled view of the stunning Lebanese coast.
                At Particulier, immerse yourself in the hotel-caliber lifestyle, where each apartment is meticulously designed, decorated, and fully furnished, ensuring a heightened attention to every detail.</span>

              Join the exclusive community of Particulier residents and indulge in a plethora of exceptional services and amenities, including:
              <ul>
                <li> • Lobby: A grand entrance that sets the tone for your luxurious stay.</li>
                <li> •	Cigar Lounge: Unwind in style and sophistication in our exclusive cigar lounge.</li>
                <li> •	Gym: Stay fit and healthy with state-of-the-art fitness facilities.</li>
                <li> •	Pool: Relax and rejuvenate by the poolside, enjoying breathtaking views.</li>
                <li> •	Convenient Store: Convenience at your doorstep for your everyday needs.</li>
                <li> •	Laundry Service: Effortless living with our top-notch laundry services.</li>
                <li> •	Playground for Kids: A safe and enjoyable space for our younger residents.</li>
              </ul>
              <span> At Particulier, we invite you to elevate your lifestyle and experience a harmonious blend of luxury, comfort, and convenience.
                Make Particulier your destination of choice, offering not just a home but an experience. Whether you&apost;re seeking a short-term stay or considering a long-term rental, embrace the extraordinary at Particulier-Where Every Detail Matters.   </span>
              <button onClick={handleShowMore} className="text-gray-400 text-right hover:text-black  text-[13px]  cursor-pointer focus:outline-none">
                {showFullText ? 'Show Less' : 'More...'}
              </button>
            </h4>
          ) : (
            <h4 className=' flex flex-col text-justify p-4 md:p-0 gap-4 md:text-justify lg:text-[16px] text-[14px] mb-2'>

              <span>  Platinum Invest Holding’s latest masterpiece inspired by the exquisite living experience found in boutique hotels.
                Nestled in the scenic Beit Meri, our project offers a refreshing concept of fully furnished studios and apartments on a wide road with a prime location, providing an unparalleled view of the stunning Lebanese coast.
                At Particulier, immerse yourself in the hotel-caliber lifestyle, where each apartment is meticulously designed, decorated, and fully furnished, ensuring a heightened attention to every detail.  </span>

              <button onClick={handleShowMore} className="text-gray-400 text-right hover:text-black text-[13px] cursor-pointer focus:outline-none">
                {showFullText ? 'Show Less' : 'Read More...'}
              </button>
            </h4>
          )}




          <div className='md:text-xl mt-3 text-sm mb-4'>
            <a href="https://maps.app.goo.gl/vRM6oERNi589GRYu9" target='_blank' className=' border text-[14px] border-black text-black   hover:bg-gray-300 bg-opacity-50 p-2 pr-5 pl-5 rounded text-center hover-bg-opacity-100 transition duration-300 cursor-pointer hover:no-underline hover:text-gray-600 ' rel="noreferrer">
              YOUR FASTEST WAY TO US
            </a>
          </div>

        </div>
        <div className='w-[97%] lg:w-[50%]  h-auto border ' >
          <img src={Img} className='w-[100%] rounded-sm object-cover' />
        </div>
      </div >
      <GalleryCarousel />
    </>
  )
}

export default AboutUS