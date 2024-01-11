import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';

const LoadingSkeleton = () => (
  <div className="lg:w-1/4 md:w-1/2 w-full p-4">
    <div className="w-full bg-white md:h-[420px] border rounded-lg overflow-hidden border-slate-200">
      <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
      <div className="p-4 flex flex-col justify-around items-center h-[54%]">
        <div className="h-6 bg-gray-300 w-3/4 rounded-sm  mb-2 animate-pulse"></div>
        <div className="h-16 bg-gray-300 w-full rounded-sm  mb-2 animate-pulse"></div>
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


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('https://leparticulier-backend.onrender.com/rooms');
        setRooms(response.data);
        // console.log("TEst", response.data)
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleReserveNow = () => {
    setDateModalOpen(true);
  };

  const handleConfirmReservation = () => {
    console.log('Selected Start Date:', selectedStartDate);
    console.log('Selected End Date:', selectedEndDate);
    setDateModalOpen(false);
  };

  return (
    <div className="h-auto flex flex-col pt-10 items-center  justify-around p-5 gap-10">
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
        <Button variant="outlined" onClick={handleReserveNow}>
          Reserve Now
        </Button>

        {isDateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-4 md:w-96 sm:w-full shadow-md z-50">
              <DateRangePicker
                appearance="default"
                placeholder="Default"
                style={{ width: '100%' }}
                value={[selectedStartDate, selectedEndDate]}
                onChange={([startDate, endDate]) => {
                  setSelectedStartDate(startDate);
                  setSelectedEndDate(endDate);
                }}
              />
              <Button variant="outlined" onClick={handleConfirmReservation}>
                Confirm Reservation
              </Button>
            </div>
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
                    <p className="text-lg font-semiboldself-start">{item.room_type}</p>
                    <p className="text-sm text-gray-400 font-light">{item.description}</p>
                    <p className="text-md self-end justify-self-end text-gray-500">${item.price}</p>
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
