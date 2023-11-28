import { Card, CardContent, CardMedia, Typography, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import Room1 from '../../../assets/PremiumSeaView/3.jpg';
import Room2 from '../../../assets/PremiumMountainView/2.jpg';
import Room3 from '../../../assets/StandardSeaView/1.jpg';
import Room4 from '../../../assets/StandardMountainView/2.jpg';

import { DateRangePicker } from 'rsuite';
import 'react-datepicker/dist/react-datepicker.css';
import 'rsuite/dist/rsuite.css';

const dummyData = [
  {
    id: 1,
    Thumbnail: Room1,
    Name: 'Premium Sea View',
    maxperson: 4,
    price: 1000,
  },
  {
    id: 2,
    Thumbnail: Room3,
    Name: 'Standard Sea View',
    maxperson: 2,
    price: 800,
  },
  {
    id: 3,
    Thumbnail: Room2,
    Name: 'Premium Mountain View',
    maxperson: 4,
    price: 1000,
  },
  {
    id: 4,
    Thumbnail: Room4,
    Name: 'Standard Mountain View',
    maxperson: 2,
    price: 600,
  },

];

const Resrvation = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDateModalOpen, setDateModalOpen] = useState(false);

  const handleReserveNow = () => {
    // Close the date selection modal
    setDateModalOpen(false);

    if (selectedStartDate && selectedEndDate) {
      // Here you can send the selectedStartDate and selectedEndDate to your backend.
      // Implement the API call to reserve the room.
      // After successful reservation, navigate the user to the reservation page with available data.
      console.log('Selected Start Date:', selectedStartDate);
      console.log('Selected End Date:', selectedEndDate);
    }
  };

  return (
    <div className="h-auto flex flex-col items-center justify-around p-5 gap-10">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <p className="text-xs md:text-lg">WHERE MODERN MEETS TRADITION</p>
        <h1 className=' text-2xl lg:text-3xl font-semibold tracking-wider ' style={{ 'fontFamily': 'Playfair Display', }}>THE CITY FURNISHED APARTMENTS<span className="block">AMIDST NATURE</span></h1>
        <div className="max-w-[90%] lg:max-w-[55%] text-xs md:text-lg">
          <p className="mb-2">City and nature become silent accomplices. Selected luxury, traditional values, and modern design with a focus on the essential. Voyages through time. Welcome to the place for everybody. Welcome to Le Particulier. A place for the young and young at heart. For bon vivants and relaxation seekers. For individualists and creative minds. For those who love and appreciate personal service, multi-faceted nature, and exclusive furnished apartments</p>
          <p>Choose your favorite room: base camp for great experiences, retreat for great relaxation</p>
        </div>
        <Button variant="outlined" onClick={() => setDateModalOpen(!isDateModalOpen)}>
          Reserve Now
        </Button>

        {isDateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-4 shadow-md z-50">
              <DateRangePicker
                appearance="default"
                placeholder="Default"
                style={{ width: 230, zIndex: 1000 }}
                value={[selectedStartDate, selectedEndDate]}
                onChange={([startDate, endDate]) => {
                  setSelectedStartDate(startDate);
                  setSelectedEndDate(endDate);
                }}
              />
              <Button variant="outlined" onClick={handleReserveNow}>
                Confirm Reservation
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto flex flex-wrap">
        <div className="flex items-center gap-5 p-5 w-[100%] h-auto justify-center ">
          {dummyData.map((item) => (
            <div key={item.id} >
              <Card className='w-[100%] h-[100%]  ' variant="outlined">
                <CardMedia
                  component="img"
                  height={300}
                  image={item.Thumbnail}
                  alt={item.Name}
                />
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div">
                      {item.Name}
                    </Typography>

                    <Typography variant="h6" className='font-bold ' color="textSecondary" mt={2}>
                      ${item.price}
                    </Typography>
                  </div>
                  <Typography color="textSecondary">
                    Max Persons: {item.maxperson}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resrvation;
