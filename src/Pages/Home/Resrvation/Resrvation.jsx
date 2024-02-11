import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Close, DeleteForever } from '@mui/icons-material';
import { LineWave } from 'react-loader-spinner';

const LoadingSkeleton = () => (
  <div className="lg:w-1/4 md:w-1/2 w-full p-4">
    <div className="w-full bg-white md:h-[420px] border rounded-lg overflow-hidden border-slate-200">
      <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
      <div className="p-4 flex flex-col justify-around items-center h-[54%]">
        <div className="h-6 bg-gray-300 w-3/4 rounded-sm mb-2 animate-pulse"></div>
        <div className="h-16 bg-gray-300 w-full rounded-sm mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-1/2  rounded-sm animate-pulse"></div>
      </div>
    </div>
  </div>
);

const Reservation = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateValidationError, setDateValidationError] = useState('');
  const [showRoomsLoading, setShowRoomsLoading] = useState(false);

  const endDateRef = useRef(null);

  const navigate = useNavigate();
  // console.log(selectedStartDate)
  // console.log(selectedEndDate)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setShowRoomsLoading(true)
        const response = await axios.get('https://leparticulier-backend.onrender.com/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setShowRoomsLoading(false);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleModalClose = () => {
    setDateModalOpen(false);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setDateValidationError('');
  };

  const handleConfirmReservation = async () => {
    try {
      setDateValidationError('');

      if (selectedStartDate && selectedEndDate) {
        // Adjust the start and end dates for the local time zone before formatting
        const timezoneOffset = new Date().getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const localStartDate = new Date(selectedStartDate.getTime() - timezoneOffset);
        const localEndDate = new Date(selectedEndDate.getTime() - timezoneOffset);

        const formattedStartDate = localStartDate.toISOString().split('T')[0];
        const formattedEndDate = localEndDate.toISOString().split('T')[0];

        const startDate = new Date(selectedStartDate);
        const endDate = new Date(selectedEndDate);
        const numberOfDays = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000) - 1) + 1;

        localStorage.setItem('selectedNumberOfDays', numberOfDays);

        setLoading(true);
        setShowRoomsLoading(true);

        const response = await axios.post('https://leparticulier-backend.onrender.com/available-rooms', {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        });

        navigate('/reservation', {
          state: {
            roomsData: response.data,
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
          },
        });
      } else {
        setDateValidationError('Please select both start and end dates');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
      setShowRoomsLoading(false);
    }

    handleModalClose();
  };


  const handleClearReservation = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };
  const handleReserveNow = () => {
    setDateModalOpen(true);
    setSelectedEndDate(null);
  };
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    if (endDateRef.current) {
      setTimeout(() => {
        endDateRef.current.setOpen(true);
      }, 0);
    }
  };




  const isShowRoomsButtonDisabled = !selectedStartDate || !selectedEndDate;
  const isValidDateSelected = selectedStartDate && selectedEndDate;

  return (
    <div className="h-auto flex flex-col pt-10 items-center justify-around p-5 gap-10">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <p className="lg:text-xl text-lg">WHERE MODERN MEETS TRADITION</p>
        <h1 className="text-xl lg:text-2xl font-semibold tracking-wide">
          THE CITY FURNISHED APARTMENTS<span className="block">AMIDST NATURE</span>
        </h1>
        <div className="max-w-full lg:max-w-[55%] text-sm md:text-md lg:text-lg">
          <p className="mb-2 text-justify md:text-center">
            City and nature become silent accomplices. Selected luxury, traditional values, and modern design with a focus on
            the essential. Voyages through time. Welcome to the place for everybody. Welcome to Particulier. A place for the
            young and young at heart. For bon vivants and relaxation seekers. For individualists and creative minds. For those
            who love and appreciate personal service, multi-faceted nature, and exclusive furnished apartments
          </p>
          <p>Choose your favorite room: base camp for great experiences, retreat for great relaxation</p>
        </div>

        {isDateModalOpen ? (

          <div className='w-[98%] h-auto flex mt-6 justify-start items-center flex-col gap-2 rounded-lg border p-4 border-gray-400 bg-white'>
            <button onClick={handleModalClose} className='bg-black self-end text-white p-1 flex items-center justify-center rounded-full cursor-pointer'>
              <Close />
            </button>
            <h1 className="lg:text-xl text-lg">Choose Your Dates </h1>
            <div className="flex items-center justify-center flex-col gap-2 md:flex-row md:gap-5 ">
              <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
                className="p-2 border border-gray-300 rounded"
                autoFocus={true}
              />
              <p className="mx-2">To</p>
              <DatePicker
                selected={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
                selectsEnd
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                minDate={selectedStartDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
                className="p-2 border border-gray-300 rounded"
                ref={endDateRef}
              />
            </div>

            {showRoomsLoading ? (
              <LineWave color="grey" height={70} width={70} />
            ) : (
              <div className='md:text-xl mt-5 text-sm mb-4 flex gap-2 flex-col md:flex-row'>
                <button
                  onClick={handleConfirmReservation}
                  className={`border text-[14px] border-black text-black ${isShowRoomsButtonDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-300 bg-opacity-50 hover-bg-opacity-100 transition duration-300 cursor-pointer hover:no-underline hover:text-gray-600'
                    } p-2 pr-5 pl-5 rounded text-center`}
                  disabled={isShowRoomsButtonDisabled}
                  rel="noreferrer"
                >
                  Show Available Rooms
                </button>
                {isValidDateSelected && (
                  <div
                    onClick={handleClearReservation}
                    className=' text-[21px] text-red-500 hover:bg-gray-200 bg-opacity-50 pr-2 pl-2 p-1 rounded-lg text-center hover-bg-opacity-100 transition duration-300 cursor-pointer flex justify-center items-center'
                    rel="noreferrer"
                  >
                    <DeleteForever />
                  </div>
                )}
              </div>)}



            {dateValidationError && <p className="text-red-500">{dateValidationError}</p>}
          </div>
        ) : (
          <div className='md:text-xl mt-3 text-sm mb-4'>
            <button onClick={handleReserveNow} className='border text-[14px] border-black text-black hover:bg-gray-300 bg-opacity-50 p-2 pr-5 pl-5 rounded text-center hover-bg-opacity-100 transition duration-300 cursor-pointer hover:no-underline hover:text-gray-600 ' rel="noreferrer">
              Choose Date
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="w-full overflow-x-auto flex flex-wrap">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="w-full overflow-x-auto flex flex-wrap">
          {rooms.map((item) => {
            const imageUrls = item.image_urls && JSON.parse(item.image_urls);
            const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
            return (
              <div key={item.room_id} className="lg:w-1/4 md:w-1/2 w-full p-4">
                <div className="w-full bg-white md:h-[420px] border rounded-lg overflow-hidden border-slate-200">
                  <img
                    src={firstImageUrl}
                    alt={item.room_type}
                    className="w-full h-48 object-cover object-center "
                  />
                  <div className="p-4 flex flex-col justify-around items-center h-[54%]">
                    <p className="text-lg font-semibold self-start">{item.room_type}</p>
                    <p className="text-sm text-gray-400 font-light">
                      {item.description}</p>
                    <p className="text-md self-end justify-self-end text-gray-500 font-bold ">${item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reservation;
