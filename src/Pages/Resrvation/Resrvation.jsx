/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowBack, Close, WebStories } from '@mui/icons-material';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

// import Link from 'react-router-dom';
const Reservation = () => {
  const location = useLocation();
  const roomsData = useMemo(() => location.state ? location.state.roomsData : [], [location.state]);
  const startDate = location.state && location.state.StartDate;
  const endDate = location.state && location.state.EndDate;
  const navigate = useNavigate();
  const selectedNumberOfDays = parseInt(localStorage.getItem('selectedNumberOfDays'), 10);
  const [amenities, setAmenities] = useState({});
  const [showMoreMap, setShowMoreMap] = useState({});
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [loader, setLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [roomLoading, setRoomLoading] = useState({});
  // const [roomisLoadingTest, setRoomLoadingTest] = useState(true);

  // console.log("Resrvation Page startDate", startDate)
  // console.log("Resrvation Page endDate", endDate)

  const handleReserveClick = async (roomId, totalPrice) => {
    const userId = userData ? userData.id : localStorage.getItem('id');
    setRoomLoading((prevLoading) => ({
      ...prevLoading,
      [roomId]: true,
    }));

    try {
      const response = await axios.post(`https://leparticulier-backend.onrender.com/reserve-room`, {
        user_id: userId,
        room_id: roomId,
        start_date: startDate,
        end_date: endDate,
        final_price: totalPrice
      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          hideProgressBar: true,
        });
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Reset loading state for the clicked room
      setRoomLoading((prevLoading) => ({
        ...prevLoading,
        [roomId]: false,
      }));
    }
  };


  const toggleShowMore = (roomId) => {
    setShowMoreMap((prevMap) => ({
      ...prevMap,
      [roomId]: !prevMap[roomId],
    }));
  };

  const openGallery = (roomId) => {
    setSelectedRoomId(roomId);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setSelectedRoomId(null);
    setGalleryOpen(false);
  };





  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeGallery]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeGallery();
    }
  };
  // const formatDate = (dateString) => {
  //   if (!dateString) return '';

  //   const dateArray = dateString.split('-');

  //   const formattedDateArray = [dateArray[2], dateArray[1], dateArray[0]];

  //   return formattedDateArray.join(' / ');
  // };


  useEffect(() => {
    const fetchAmenities = async (roomId) => {
      try {
        setLoader(true)
        const response = await fetch(`https://leparticulier-backend.onrender.com/amenities/${roomId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch amenities for room ${roomId}`);
        }
        const data = await response.json();
        setAmenities((prevAmenities) => ({
          ...prevAmenities,
          [roomId]: data,
        }));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoader(false);
      }
    };

    roomsData.forEach((room) => {
      fetchAmenities(room.room_id);
    });
  }, [roomsData]);


  const renderGallery = () => {
    const selectedRoom = roomsData.find((room) => room.room_id === selectedRoomId);
    const imageUrls = selectedRoom.image_urls ? JSON.parse(selectedRoom.image_urls) : [];
    const images = imageUrls.map((url) => ({
      original: url,
      thumbnail: url,
    }));

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="relative max-w-screen-md p-2 max-h-screen-3/4 overflow-hidden ">
          <span
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer z-10 hover:text-gray-400"
            onClick={closeGallery}
          >
            <Close />
          </span>
          <Gallery
            items={images}
            onClose={closeGallery}
            showNav={true}
            showThumbnails={true}
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <div className='flex flex-col justify-center items-center md:items-start '>
        <h1 className=" text-2xl md:text-3xl font-bold mb-4">Available Rooms ({roomsData.length})</h1>
        <a href="/" className="text-md font-bold flex justify-start items-center text-[#000000a9] hover:text-black">
          <ArrowBack /> Back To Main Page
        </a>
        {/* <div className='self-center bg-gray-300 flex gap-5 font-bold rounded-full p-1 flex-col md:flex-row justify-center items-center '>
          <p className='bg-gray-200 rounded-full p-2 text-gray-600 hover:border-black cursor-pointer border hover:text-black'>{formatDate(startDate)}</p>
          <p className='p-2'>To</p>
          <p className='bg-gray-200 rounded-full p-2 text-gray-600 hover:border-black cursor-pointer border hover:text-black'>{formatDate(endDate)}</p>
          <div className=' bg-gray-200 p-2 rounded-full text-gray-600 hover:border-black cursor-pointer border hover:text-black'>
            <Close />
          </div>
        </div> */}
      </div>
      <div className="w-full overflow-x-auto flex flex-wrap">
        {roomsData.map((item) => {
          const imageUrls = item.image_urls && JSON.parse(item.image_urls);
          const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
          const totalPrice = selectedNumberOfDays * item.price;

          return (
            <div key={item.room_id} className="lg:w-1/4 md:w-1/2 w-full p-4">
              <div className="w-full bg-white md:h-auto border rounded-lg overflow-hidden relative">
                <div className="relative">
                  <img
                    src={firstImageUrl}
                    alt={item.room_type}
                    className="w-full h-48 object-cover object-center "
                  />
                  <div
                    className="absolute bottom-2 right-2 border rounded-full p-2 w-8 h-8 flex justify-center items-center cursor-pointer bg-gray-800 hover:bg-gray-600"
                    onClick={() => openGallery(item.room_id)}
                  >
                    <WebStories fontSize='small' className="text-gray-200 " />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-around items-center gap-2">
                  <p className="text-lg font-semibold self-start">{item.room_type}</p>
                  <p className="text-sm text-gray-400 font-light">
                    {showMoreMap[item.room_id]
                      ? item.description
                      : item.description.length > 150
                        ? `${item.description.substring(0, 150)}...`
                        : item.description}
                  </p>

                  {showMoreMap[item.room_id] && amenities[item.room_id] && (
                    <div className="mt-2 border-t-[1.5px] w-[100%] border-[#9e9898d3]">
                      <p className="font-semibold mb-2 text-[12px] pt-4 ">Amenities:</p>
                      {loader ? (
                        <Skeleton />
                      ) : (
                        <ul className="ml- text-[10px] font-semibold">
                          {amenities[item.room_id].map((amenity) => (
                            <li key={amenity.amenity_id} className="mt-1">
                              {amenity.NAME}
                              <span className="text-gray-400 font-normal">
                                {amenity.description && ` - (${amenity.description})`}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {item.description.length > 150 && (
                    <button
                      className="text-[#9e9898] hover:underline text-[12px] self-end cursor-pointer"
                      onClick={() => toggleShowMore(item.room_id)}
                    >
                      {showMoreMap[item.room_id] ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                  <div className="flex flex-row  items-center md:gap-5 gap-10 pt-3 w-[100%]">
                    {userData ? (
                      <>
                        {roomLoading[item.room_id] ? (
                          <div className=' w-[100px] flex  p-2  justify-center'>
                            <ThreeDots color="grey" width={70} height={60} ariaLabel="line-wave-loading"
                            />
                          </div>
                        ) : (
                          <button
                            className="border text-[10px] border-[#9e9898] text-black hover:bg-gray-300 bg-opacity-50 p-2 rounded text-center hover:bg-opacity-100 transition duration-300 cursor-pointer hover:no-underline hover:text-gray-600 mb-2 md:mb-0"
                            onClick={() => handleReserveClick(item.room_id, totalPrice)}
                          >
                            Reserve Now
                          </button>
                        )}
                      </>
                    ) : (

                      <p className="text-[12px] text-gray-500 ">
                        You should login to Reserve.{' '}
                        <a href="/login" className="underline text-blue-500">
                          Login now
                        </a>
                      </p>

                    )}
                    <div className="text-[12px]  inline text-gray-500 font-bold md:ml-20   ">
                      Total for {selectedNumberOfDays} days:
                      <span > ${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {galleryOpen && renderGallery()}
    </div >
  );
};
export default Reservation;
