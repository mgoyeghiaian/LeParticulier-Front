import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import logo from '../assets/in2infoLogo.png'
import Profile from './Profile';
import Avatar from '@mui/material/Avatar';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userDataObj = JSON.parse(userDataString);
      setUserData(userDataObj);
    }
  }, []);

  const handleloginclick = () => {
    navigate('/login')

  };


  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const scrollToSection = (section) => {
    navigate(`/#${section}`);
  };

  return (
    <nav className="p-4 text-black font-semibold bg-white ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="hidden items-center gap-10 text-[15px] lg:flex">
          <a href="tel:+9615123456">T|<span className='hover:text-gray-500'> +961 (512) 3456</span></a>
          <a href="mailto:info@leparticulier.com"><span className='hover:text-gray-500 '>INFO@LEPARTICULER.COM</span> </a>
        </div>

        <RouterLink to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo" className=" w-32" />
        </RouterLink>

        <div className="md:hidden flex justify-center items-center">
          {userData ? (
            <Profile />) : (

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Login">
                <IconButton
                  onClick={handleloginclick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, background: "black" }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
          >



            {mobileMenuOpen ? (

              <CloseIcon style={{ fontSize: 38, color: 'gray', zIndex: "500" }} />
            ) : (
              <MenuIcon style={{ fontSize: 38, color: 'gray' }} />
            )}
          </IconButton>
        </div>

        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#19191C] transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform ease-in-out duration-300 z-50`}
        >
          <div className="flex flex-col mt-10 h-full gap-5 items-center px-10 py-32 text-white text-[21px] ">
            <RouterLink to="/" onClick={closeMobileMenu}
            >
              <img src={logo} alt="Logo" className=" w-32 bg-[#D1D5DB] p-2  rounded-sm" />
            </RouterLink>
            <ScrollLink
              to='/'
              onClick={() => {
                scrollToSection("aboutUs");
                closeMobileMenu();
              }} className="hover:text-gray-700 cursor-pointer"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="/"
              onClick={() => {
                scrollToSection("resrvation");
                closeMobileMenu();
              }}
              className="hover:text-gray-700 cursor-pointer"

            >
              Reservation
            </ScrollLink>
            <RouterLink
              to='/gallery'
              className="hover:text-gray-700 cursor-pointer"
              onClick={closeMobileMenu}

            >
              Gallery
            </RouterLink>
            <RouterLink
              to="/contactus"
              className="hover:text-gray-700 cursor-pointer"
              onClick={closeMobileMenu}

            >
              Contact Us
            </RouterLink>


            <div className=" gap-2 text-[14px] text-gray-200 font-semibold flex flex-col justify-center">
              <a href="tel:+9615123456" className=' text-center' onClick={closeMobileMenu}
              >T |<span className='hover:text-gray-500'> +961 (512) 3456</span></a>
              <a href="mailto:info@leparticulier.com" onClick={closeMobileMenu}
              ><span className='hover:text-gray-500 '>INFO@LEPARTICULER.COM</span> </a>
            </div>
          </div>

        </div>

        <div className="hidden md:flex items-center space-x-4 cursor-pointer text-[15px]">
          <ScrollLink
            to='/'
            onClick={() => scrollToSection("aboutUs")}
            className="hover:text-gray-700 cursor-pointer hover:border-gray-700  border-white border-b-2"
          >
            About Us
          </ScrollLink>
          <ScrollLink
            to="/"
            onClick={() => scrollToSection("resrvation")}
            className="hover:text-gray-700 cursor-pointer hover:border-gray-700  border-white border-b-2"
          >
            Reservation
          </ScrollLink>
          <RouterLink
            to='/gallery'
            className="hover:text-gray-700 cursor-pointer hover:border-gray-700  border-white border-b-2"
          >
            Gallery
          </RouterLink>
          <RouterLink
            to="/contactus"
            className="hover:text-gray-700 cursor-pointer hover:border-gray-700  border-white border-b-2"
          >
            Contact Us
          </RouterLink>
          {userData ? (
            <>
              <Profile />
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Login">
                <IconButton
                  onClick={handleloginclick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, background: "black" }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </div>


      </div>
    </nav >
  );
};

export default Navbar;
