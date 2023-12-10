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
    <>
      {/* Pool */}
      <Element name="Pool">
        <div className=" flex lg:flex-row gap-5 flex-col p-2 lg:p-5 mt-20 lg:mt-20 mb-20 h-auto lg:mb-0 lg:h-auto  justify-around items-center">
          <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">
            <p className=' lg:text-xl text-xl' >POOL</p>
            <h1 className='text-xl lg:text-3xl font-semibold  tracking-wider cap' style={{ 'fontFamily': 'Playfair Display', }} >
              RELAX AND REJUVENATE BY THE POLLSIDE, ENJOYING BREATHTAKING VIEWS
            </h1>
            <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
              <span>Nestled in the vibrant heart of Hazmieh, Lebanon, Le Particulier is more than just a furnished apartment facility; it&apos;s a lively meeting place and a tranquil power spot all rolled into one. Our establishment seamlessly blends history and the promise of the future, cosmopolitan flair with a touch of greenery, and the beating heart with the soothing soul.</span>

              <span>Set amidst picturesque pine trees forests, Le Particulier offers a small yet enchanting oasis of well-being, just a stone&apos;s throw away from the charming old town of Hazmieh. It&apos;s a place where emotions meet enjoyment, city life harmonizes with quiet moments, and where you can truly unwind.</span>

              <span>We are eagerly awaiting your arrival to share with you our genuine hospitality and provide you with an unforgettable holiday experience - your very own furnished apartment away from home.</span>
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
          <div className="flex lg:flex-row gap-5 flex-col p-2 lg:p-5 mt-20 lg:mt-20 mb-20 h-auto lg:mb-0 lg:h-auto  justify-around items-center">
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

              <p className=' lg:text-xl text-xl' >PLAYGROUND FOR KIDS</p>
              <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap' style={{ 'fontFamily': 'Playfair Display', }} >
                A SAFE AND ENJOYABLE SPACE FOR OUR YOUNGER RESIDENTS
              </h1>
              <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
                <span>Nestled in the vibrant heart of Hazmieh, Lebanon, Le Particulier is more than just a furnished apartment facility; it&apos;s a lively meeting place and a tranquil power spot all rolled into one. Our establishment seamlessly blends history and the promise of the future, cosmopolitan flair with a touch of greenery, and the beating heart with the soothing soul.</span>

                <span>Set amidst picturesque pine trees forests, Le Particulier offers a small yet enchanting oasis of well-being, just a stone&apos;s throw away from the charming old town of Hazmieh. It&apos;s a place where emotions meet enjoyment, city life harmonizes with quiet moments, and where you can truly unwind.</span>

                <span>We are eagerly awaiting your arrival to share with you our genuine hospitality and provide you with an unforgettable holiday experience - your very own furnished apartment away from home.</span>
              </h4>

            </div >

          </div>
        </div>
      </Element>
      {/* Experience */}

      <Element name="Cigar">
        <div>
          <div className=" flex lg:flex-row gap-5 flex-col p-2 lg:p-5 mt-20 lg:mt-20 mb-20 h-auto lg:mb-0 lg:h-auto  justify-around items-center">
            <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">

              <p className=' lg:text-xl text-xl' >CIGAR LOUNGE</p>
              <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap' style={{ 'fontFamily': 'Playfair Display', }} >
                UNWIND IN STYLE AND SOPHISTICATION IN OUR EXCLUSIVE CIGAR LOUNGE
              </h1>
              <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
                <span>Nestled in the vibrant heart of Hazmieh, Lebanon, Le Particulier is more than just a furnished apartment facility; it&apos;s a lively meeting place and a tranquil power spot all rolled into one. Our establishment seamlessly blends history and the promise of the future, cosmopolitan flair with a touch of greenery, and the beating heart with the soothing soul.</span>

                <span>Set amidst picturesque pine trees forests, Le Particulier offers a small yet enchanting oasis of well-being, just a stone&apos;s throw away from the charming old town of Hazmieh. It&apos;s a place where emotions meet enjoyment, city life harmonizes with quiet moments, and where you can truly unwind.</span>

                <span>We are eagerly awaiting your arrival to share with you our genuine hospitality and provide you with an unforgettable holiday experience - your very own furnished apartment away from home.</span>
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
        <div className="flex lg:flex-row gap-5 flex-col p-2 lg:p-5 mt-20 lg:mt-20 mb-20 h-auto lg:mb-0 lg:h-auto  justify-around items-center">
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
          <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">

            <p className=' lg:text-xl text-xl' >GYM</p>
            <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap' style={{ 'fontFamily': 'Playfair Display', }} >
              STAY FIT AND HEALTHY WITH STATE-OF-THE-ART FITNESS FACILITIES
            </h1>
            <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
              <span>Nestled in the vibrant heart of Hazmieh, Lebanon, Le Particulier is more than just a furnished apartment facility; it&apos;s a lively meeting place and a tranquil power spot all rolled into one. Our establishment seamlessly blends history and the promise of the future, cosmopolitan flair with a touch of greenery, and the beating heart with the soothing soul.</span>

              <span>Set amidst picturesque pine trees forests, Le Particulier offers a small yet enchanting oasis of well-being, just a stone&apos;s throw away from the charming old town of Hazmieh. It&apos;s a place where emotions meet enjoyment, city life harmonizes with quiet moments, and where you can truly unwind.</span>

              <span>We are eagerly awaiting your arrival to share with you our genuine hospitality and provide you with an unforgettable holiday experience - your very own furnished apartment away from home.</span>
            </h4>

          </div >
        </div>
      </Element>


      {/*Lobby*/}
      <Element name="Lobby">

        <div className=" flex lg:flex-row gap-5 mb-20  flex-col p-2 lg:p-5 h-auto  justify-around items-center ">
          <div className=" flex flex-col lg:p-4 justify-centers items-center text-center lg:text-left lg:items-start   flex-wrap w-[97%] lg:w-[50%] gap-5">

            <p className=' lg:text-xl text-xl' >LOBBY</p>
            <h1 className='text-xl lg:text-3xl font-semibold tracking-wider cap' style={{ 'fontFamily': 'Playfair Display', }} >
              A GRAND ENTRANCE THAT SETS THE TONE FOR YOUR LUXURIOUS STAY
            </h1>

            <h4 className=' flex flex-col gap-4 lg:text-justify	lg:text-lg text-[14px] mb-2'>
              <span>Nestled in the vibrant heart of Hazmieh, Lebanon, Le Particulier is more than just a furnished apartment facility; it&apos;s a lively meeting place and a tranquil power spot all rolled into one. Our establishment seamlessly blends history and the promise of the future, cosmopolitan flair with a touch of greenery, and the beating heart with the soothing soul.</span>

              <span>Set amidst picturesque pine trees forests, Le Particulier offers a small yet enchanting oasis of well-being, just a stone&apos;s throw away from the charming old town of Hazmieh. It&apos;s a place where emotions meet enjoyment, city life harmonizes with quiet moments, and where you can truly unwind.</span>

              <span>We are eagerly awaiting your arrival to share with you our genuine hospitality and provide you with an unforgettable holiday experience - your very own furnished apartment away from home.</span>
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
            {/* <img src={LifeStyleImg} className='w-[100%] rounded-sm object-cover' /> */}
          </div>
        </div>
      </Element>
    </>

  )
}

export default Gallery