import img from '../../../assets/BeforSocialMediaSection.png'

const Gallery = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <img src={img} alt="Gallery Image" className="w-full " />
      <div className="absolute p-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-1 lg:gap-4 text-white">
        <small className=" xs:text-[10px] sm:text-[13px] md:text-[20px] lg:text-2xl">Le Particulier</small>
        <h1 className=" xs:text-[8px] sm:text-[12px] md:text-[23px] lg:text-3xl" style={{ 'fontFamily': 'Playfair Display', }}>EXCEPTIONAL LOCATION WITH <span className=' block'> EXCEPTIONAL CHARACTER</span></h1>
      </div>
    </div>
  );
}

export default Gallery;
