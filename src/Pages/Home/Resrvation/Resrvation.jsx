import { Button } from '@mui/material';
import { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'react-datepicker/dist/react-datepicker.css';
import 'rsuite/dist/rsuite.css';

import Room1 from '../../../assets/PremiumSeaView/3.jpg';
import Room2 from '../../../assets/PremiumMountainView/2.jpg';
import Room3 from '../../../assets/StandardSeaView/1.jpg';
import Room4 from '../../../assets/StandardMountainView/2.jpg';

const dummyData = [
  {
    id: 1,
    Thumbnail: Room1,
    Name: 'Premium Sea View',
    Disc: "Immerse yourself in luxury with our Premium Sea View room. Enjoy the widest space, a private balcony overlooking the Lebanese coast, and a studio-like feel. Enjoy the extra space, a private balcony with panoramic sea views, and a comfortable living area that seamlessly blends with the stunning surroundings.",
    price: 100,
  },
  {
    id: 2,
    Thumbnail: Room3,
    Name: 'Standard Sea View',
    Disc: "Upgrade to our Standard Sea View room, featuring extra space and a stunning view of the Lebanese coast. Experience tranquility and coastal charm without leaving your room.",
    price: 70,
  },
  {
    id: 3,
    Thumbnail: Room2,
    Name: 'Premium Mountain View',
    Disc: "Elevate your stay in our Premium Mountain View room. Experience sophistication with a wider layout, a private balcony, and a small living area. This room is more than just accommodation; it's an immersive experience, it's a suite-like retreat.",
    price: 90,
  },
  {
    id: 4,
    Thumbnail: Room4,
    Name: 'Standard Mountain View',
    Disc: "Embrace simplicity in our Standard Mountain View room. Enjoy a cozy space with a beautiful view of the Lebanese mountains, providing a serene backdrop for your stay. Unwind in a thoughtfully designed space, where every detail is crafted to ensure a serene stay. ",
    price: 60,
  },
];

const Reservation = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDateModalOpen, setDateModalOpen] = useState(false);

  const handleReserveNow = () => {
    setDateModalOpen(true);
  };

  const handleConfirmReservation = () => {
    console.log('Selected Start Date:', selectedStartDate);
    console.log('Selected End Date:', selectedEndDate);
    setDateModalOpen(false);
  };

  return (
    <div className="h-auto flex flex-col items-center justify-around p-5 gap-10">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <p className="lg:text-xl text-lg">WHERE MODERN MEETS TRADITION</p>
        <h1 className="text-xl lg:text-2xl font-semibold tracking-wide">
          THE CITY FURNISHED APARTMENTS<span className="block">AMIDST NATURE</span>
        </h1>
        <div className="max-w-full lg:max-w-[55%] text-sm md:text-md lg:text-lg">
          <p className="mb-2">
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

      <div className="w-full overflow-x-auto flex flex-wrap">
        {dummyData.map((item) => (
          <div key={item.id} className="lg:w-1/4 md:w-1/2  w-full p-4">
            <div className="w-full bg-white h-[420px] border rounded-lg overflow-hidden border-slate-200">
              <img
                src={item.Thumbnail}
                alt={item.Name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4 flex flex-col justify-around items-center h-[54%]">
                <p className="text-lg font-semiboldself-start">{item.Name}</p>
                <p className="text-sm text-gray-400 font-light">{item.Disc}</p>
                <p className="text-md self-end justify-self-end text-gray-500">${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
