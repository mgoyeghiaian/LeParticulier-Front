import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll"

import { Carousel } from "react-responsive-carousel";
import { Gym, Lobby, Pool, Kidsarea, Experience } from "./Db";

const Gallery = () => {

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      scroller.scrollTo(hash, {
        duration: 500,
        smooth: true,
      });
    }
  }, [location.hash]);
  return (
    <div className="bg-[#E5E1DA]">
      {/* Pool */}
      <Element name="Pool">
        <div className=" flex lg:flex-row gap-5 flex-col p-2 lg:pb-20 lg:pt-20 pt-10 lg:pr-44 lg:pl-44  pb-10 h-auto lg:mb-0 lg:h-auto  justify-around items-center">
          <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">
            <p className=' lg:text-xl text-xl' >Pool (On the Roof with Sea View)</p>
            <h1 className='text-xl lg:text-3xl font-semibold  tracking-wider cap' >
              RELAX AND REJUVENATE BY THE POLLSIDE, ENJOYING BREATHTAKING VIEWS
            </h1>
            <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
              <span>Take a dip in our rooftop pool and experience leisure like never before. With a panoramic view of the Lebanese coast, our pool offers a refreshing escape. Relax, sip on your favorite beverage, and soak in the sun as you enjoy breathtaking vistas. </span>
            </h4>
          </div>
          <div className=' w-[97%] lg:w-[50%]  h-auto border ' >
            <Carousel
              showStatus={false}
              showThumbs={true}
              infiniteLoop={true}
              autoPlay={false}
            >
              {Pool.map((item) => (
                <div key={item.id}>
                  <img src={item.image} alt={`Image ${item.id}`} className="w-[100%] rounded-sm object-cover" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </Element>

      {/* Kidsarea */}
      <Element name="Kidsarea">
        <div>
          <div className="flex lg:flex-row gap-5 flex-col-reverse lg:pb-20 pt-0 lg:pr-44 lg:pl-44 pb-10  mt-1 lg:mt-0  h-auto lg:mb-0 lg:h-auto  justify-around items-center">
            <div className=' w-[97%] lg:w-[50%]  h-auto border ' >
              <Carousel
                showStatus={false}
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={false}
              >
                {Kidsarea.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt={`Image ${item.id}`} className="w-[100%] rounded-sm object-cover" />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">

              <p className=' lg:text-xl text-xl' >Kid&apos;s Area</p>
              <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap'  >
                A SAFE AND ENJOYABLE SPACE FOR OUR YOUNGER RESIDENTS
              </h1>
              <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
                <span>Families are welcome to explore our dedicated Kid&apos;s Area, where children can play, imagine, and create unforgettable memories. Designed with safety and fun in mind, our kid-friendly space ensures that the youngest members of your family have a delightful and entertaining stay.</span>
              </h4>

            </div >

          </div>
        </div>
      </Element>
      {/* Cigar */}

      <Element name="Cigar">
        <div>
          <div className=" flex lg:flex-row gap-5 flex-col p-2 lg:pr-44 lg:pl-44 lg:pb-20  h-auto pb-10 lg:h-auto  justify-around items-center">
            <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">

              <p className=' lg:text-xl text-xl' >CIGAR LOUNGE</p>
              <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap'  >
                UNWIND IN STYLE AND SOPHISTICATION IN OUR EXCLUSIVE CIGAR LOUNGE
              </h1>
              <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
                <span>Indulge in refined luxury at our Cigar Lounge. Immerse yourself in a sophisticated ambiance and an atmosphere of relaxation. Our lounge provides the perfect setting to savor moments of tranquility and friendliness.</span>
              </h4>
            </div >
            <div className=' w-[97%] lg:w-[50%]  h-auto border ' >
              <Carousel
                showStatus={false}
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={false}
              >
                {Experience.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt={`Image ${item.id}`} className="w-[100%] rounded-sm object-cover" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </Element>


      {/* Fitness */}
      <Element name="Fitness">
        <div className="flex lg:flex-row gap-5 flex-col-reverse p-2 lg:pr-44 lg:pl-44 lg:pb-20  pb-10 h-auto lg:mb-0 lg:h-auto  justify-around items-center">
          <div className=' w-[97%] lg:w-[50%]  h-auto border ' >
            <Carousel
              showStatus={false}
              showThumbs={true}
              infiniteLoop={true}
              autoPlay={false}
            >
              {Gym.map((item) => (
                <div key={item.id}>
                  <img src={item.image} alt={`Image ${item.id}`} className="w-[100%] rounded-sm object-cover" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start flex-wrap w-[97%] lg:w-[50%] gap-5">

            <p className=' lg:text-xl text-xl' >GYM</p>
            <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap'  >
              STAY FIT AND HEALTHY WITH STATE-OF-THE-ART FITNESS FACILITIES
            </h1>
            <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
              <span>Elevate your fitness routine in our state-of-the-art gym. Equipped with the latest technology and a range of workout options, our fitness center is designed to cater to all fitness levels. Stay active and energized while enjoying a motivating workout in a modern and invigorating environment.</span>
            </h4>

          </div >
        </div>
      </Element>


      {/*Lobby*/}
      <Element name="Lobby">

        <div className="flex lg:flex-row gap-5 flex-col p-2 lg:pr-44 lg:pl-44 pb-24 h-auto lg:h-auto justify-around items-center">
          <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">

            <p className=' lg:text-xl text-xl' >LOBBY</p>
            <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap'  >
              A GRAND ENTRANCE THAT SETS THE TONE FOR YOUR LUXURIOUS STAY
            </h1>

            <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
              <span>Step into our welcoming lobby, where the journey of comfort and hospitality begins. Designed with a blend of modern elegance and warmth, our lobby is the perfect space to unwind, socialize, or simply enjoy a moment of quiet relaxation. Our attentive staff is ready to ensure your stay starts with a warm welcome. </span>
            </h4>

          </div>
          <div className=' w-[97%] lg:w-[50%]  h-auto border ' >
            <Carousel
              showStatus={false}
              showThumbs={true}
              infiniteLoop={true}
              autoPlay={false}
              showArrows={true}

            >
              {Lobby.map((item) => (
                <div key={item.id}>
                  <img src={item.image} alt={`Image ${item.id}`} className="w-[100%] rounded-sm object-cover" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </Element>
    </div>

  )
}

export default Gallery