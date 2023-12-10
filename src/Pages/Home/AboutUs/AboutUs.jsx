
import GalleryCarousel from '../../../Components/GalleryCarousel/GalleryCarousel'
import Img from '../../../assets/About UsRImage.png'

const AboutUS = () => {
  return (
    <>
      <div className=" flex lg:flex-row gap-5  flex-col p-2 lg:p-5 lg:pr-40 lg:pl-40  h-auto  justify-around items-center ">
        <div className=" flex flex-col md:p-4 justify-center items-center lg:items-start pt-5 flex-wrap w-[100%] lg:w-[50%] gap-5">
          <p className=' lg:text-xl text-xl' >PARTICULER</p>
          <h1 className='text-xl lg:text-3xl text-center font-semibold tracking-wider' style={{ 'fontFamily': 'Playfair Display', }} >WELCOME TO PARTICULER</h1>

          <h4 className=' flex flex-col text-center gap-4 md:text-justify lg:text-lg text-[14px] mb-2'>
            <span>Nestled in the vibrant heart of Hazmieh, Lebanon,  Particulier is more than just a furnished apartment facility; it&apos;s a lively meeting place and a tranquil power spot all rolled into one. Our establishment seamlessly blends history and the promise of the future, cosmopolitan flair with a touch of greenery, and the beating heart with the soothing soul.</span>

            <span>Set amidst picturesque pine trees forests, Particulier offers a small yet enchanting oasis of well-being, just a stone&apos;s throw away from the charming old town of Hazmieh. It&apos;s a place where emotions meet enjoyment, city life harmonizes with quiet moments, and where you can truly unwind.</span>

            <span>We are eagerly awaiting your arrival to share with you our genuine hospitality and provide you with an unforgettable holiday experience - your very own furnished apartment away from home.</span>
          </h4>

          <div className='md:text-xl mt-3 text-sm mb-4'>
            <a href="https://maps.app.goo.gl/vRM6oERNi589GRYu9" target='_blank' className=' border border-black text-black   hover:bg-gray-300 bg-opacity-50 p-2 pr-5 pl-5 rounded text-center hover-bg-opacity-100 transition duration-300 cursor-pointer hover:no-underline hover:text-gray-600 ' rel="noreferrer">
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