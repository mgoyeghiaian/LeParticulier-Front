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
import moment from 'moment';

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
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({});

  const calculateNumberOfDays = (startDate, endDate) => {
    const duration = moment.duration(moment(endDate).diff(moment(startDate)));
    const numberOfDays = duration.asDays();
    return Math.ceil(numberOfDays);
  };




  const handleReserveClick = async (roomId, price) => {
    const userId = userData ? userData.id : localStorage.getItem('id');
    const email = userData ? userData.email : localStorage.getItem('email');
    const phonenumber = userData ? userData.phonenumber : localStorage.getItem('phonenumber');
    const name = userData ? userData.firstname : localStorage.getItem('firstname');
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
        final_price: price,
        phone_number: phonenumber,
        email: email,
        name: name,

      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          hideProgressBar: true,
        });
        setReservationDetails({
          startDate: startDate,
          name: name,
          email: email,
          endDate: endDate,
          totalPrice: price,
          phoneNumber: phonenumber,
          roomType: roomsData.find((room) => room.room_id === roomId).room_type,
          numberOfDays: calculateNumberOfDays(startDate, endDate),
        });
        setConfirmationModalOpen(true);

      }
    } catch (error) {
      console.log(error);
    } finally {
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

  const ReservationConfirmationModal = () => {
    return (
      confirmationModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 px-2 lg:px-0">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-3xl md:max-w-none md:h-[95%]  md:w-[100%] lg:w-[50%] mx-auto md:max-h-none max-h-[90vh] overflow-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">Reservation Confirmation</h2>
            <div className="mt-4 text-gray-600">
              <p>Dear <span className="font-semibold text-gray-800">{reservationDetails.name}</span>,</p>
              <p className="mt-2">Thank you for choosing our service. We are pleased to confirm your reservation with the following details:</p>
            </div>
            <ul className="mt-4 space-y-2 pl-4 list-inside">
              <li className="text-sm sm:text-md md:text-lg">Start Date: <span className="font-semibold">{reservationDetails.startDate}</span></li>
              <li className="text-sm sm:text-md md:text-lg">End Date: <span className="font-semibold">{reservationDetails.endDate}</span></li>
              <li className="text-sm sm:text-md md:text-lg">Room Type: <span className="font-semibold">{reservationDetails.roomType}</span></li>
              <li className="text-sm sm:text-md md:text-lg">Number of Days: <span className="font-semibold">{reservationDetails.numberOfDays}</span></li>
              <li className="text-sm sm:text-md md:text-lg">Total Price for {reservationDetails.numberOfDays} days: <span className="font-semibold">${reservationDetails.totalPrice}</span></li>
              <li className="text-sm sm:text-md md:text-lg">Phone Number: <span className="font-semibold">{reservationDetails.phoneNumber}</span></li>
            </ul>
            <div className="mt-6 border-t border-gray-300 pt-4">
              <h1 className='text-md sm:text-lg md:text-xl font-bold text-gray-800'>Reservation Confirmation and Payment Instructions:</h1>
              <p className="mt-2 text-sm sm:text-md md:text-lg">Thank you for choosing Particulier Serviced Apartments in Beit Meri! Your reservation has been confirmed. To secure your booking, please follow the payment instructions below:</p>
            </div>
            <div className='mt-4'>
              <h1 className='text-md sm:text-lg md:text-xl font-bold text-gray-800 mb-3'>Payment Options:</h1>
              <ul className='list-disc space-y-2 pl-5 text-sm sm:text-md md:text-lg font-medium text-gray-600'>
                <li>OMT Transfer: Visit any OMT branch and transfer the amount to the number below: 961 3785866</li>
                <li>Whish Money Transfer: Make a transfer through Whish Money to the number below: ensure 961 3785866</li>
                <li>In-Person Payment: You can settle the payment at the front desk of our location in Beit Meri within the next 2 days.</li>
              </ul>
            </div>
            <div className="mt-4 text-sm sm:text-md md:text-lg text-gray-600">
              <p>Check your email: <span className="font-bold text-gray-800">{reservationDetails.email}</span> for full information.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg bg-blue-600 text-white font-semibold leading-snug uppercase rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-150 ease-in-out"
                onClick={() => {
                  setConfirmationModalOpen(false);
                  navigate("/profile");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>

      )
    );
  };





  return (
    <div className="container mx-auto mt-10">
      <div className='flex flex-col justify-center items-center md:items-start '>
        <h1 className=" text-2xl md:text-3xl font-bold mb-4">Available Rooms ({roomsData.length})</h1>
        <a href="/" className="text-md font-bold flex justify-start items-center text-[#000000a9] hover:text-black">
          <ArrowBack /> Back To Main Page
        </a>
      </div>
      <div className="w-full overflow-x-auto flex flex-wrap">
        {roomsData.map((item) => {
          const imageUrls = item.image_urls && JSON.parse(item.image_urls);
          const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
          const totalPrice = selectedNumberOfDays * item.price;
          const price = item.price



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
                            onClick={() => handleReserveClick(item.room_id, price)}
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

      <ReservationConfirmationModal />
      {galleryOpen && renderGallery()}
    </div>

  );
};
export default Reservation;
