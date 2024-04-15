import { Facebook, Instagram } from "@mui/icons-material";
import In2infoLogo from '../assets/in2infoLogo.png';
import Logo from '../assets/LogoBlack.png';
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialMediaLinks = [
    { icon: <Instagram fontSize="medium" />, link: "#" },
    { icon: <Facebook fontSize="medium" />, link: "#" },
  ];


  return (
    <div className="w-full bg-[#141717] text-gray-200 flex flex-col items-center justify-between h-auto">
      <div className=" mt-11 flex flex-col items-center justify-center gap-4 mb-5">
        <div>
          <img src={Logo} alt="Logo" className=" w-60 rounded-sm" />
        </div>
        <div className="flex flex-col  text-[13px] items-center justify-center gap-1 md:flex-row">
          <span>BEIT MERI | MAIN ROAD </span> <span> <span className=" hidden md:inline">|</span> Mount Lebanon | Lebanon</span>
        </div>

        <div className="flex gap-3 items-center text-[13px] flex-col md:flex-row">
          <a href="tel:+9613785866"><span className='hover:text-gray-500 cursor-pointer'> +961 3 785866</span></a><span className=" hidden md:inline">|</span>
          <a href="tel:+96178845805"><span className='hover:text-gray-500 cursor-pointer'> +961 78 845805</span></a><span className=" hidden md:inline">|</span>
          <a href="mailto:info@particulierlb.com"><span className='hover:text-gray-500 cursor-pointer '>INFO@PARTICULIERLB.COM</span> </a>
        </div>

        <div className="flex gap-2 mt-4">
          {socialMediaLinks.map((linkObj, index) => (
            <a
              key={index}
              href={linkObj.link}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300  hover:text-gray-500"
            >
              {linkObj.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-600 mx-auto lg:w-[75%] w-[95%] justify-between flex-wrap  flex flex-row md:py-6">
        <span className="text-gray-400 text-[10px] md:text-sm">
          &copy; {currentYear} all rights reserved | Particulier Residental Furnised Appartment
          <span className=" flex items-center text-[8px] md:hidden">
            SITE<span className="font-bold">MANAGER</span> V4.0 <Link to="http://www.in2info.com" target="_blank"> <img src={In2infoLogo} alt="In2infoLogo" className=" md:w-[100px] w-[60px]  p-2  rounded-sm" /></Link>
          </span>
          <div className="mt-1 hidden md:block">
            <div className=" flex items-center text-[12px]">
              SITE<span className="font-bold">MANAGER</span> V4.0 <Link to="http://www.in2info.com" target="_blank"> <img src={In2infoLogo} alt="In2infoLogo" className=" md:w-[100px]  p-2  rounded-sm" /></Link>
            </div>
          </div>
        </span>

      </div>
    </div>
  );
};

export default Footer;
