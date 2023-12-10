import img from '../../../assets/BeforSocialMediaSection.png';

const Gallery = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center lg:gap-4 text-white w-full h-[30vh] lg:h-[70vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${img})`, fontFamily: 'Playfair Display' }}>
      <div className="absolute inset-0 opacity-50"></div>
      <p className="text-[18px] md:text-xl lg:text-2xl xl:text-3xl mb-2">Particulier</p>
      <p className="text-[14px] md:text-lg lg:text-xl xl:text-2xl leading-snug">EXCEPTIONAL LOCATION WITH <span className='block'>EXCEPTIONAL CHARACTER</span></p>
    </div>
  );
}

export default Gallery;
