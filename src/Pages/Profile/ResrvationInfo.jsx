import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Container, Paper, Modal, Button, CircularProgress } from '@mui/material';

const ReservationInfo = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const UserData = JSON.parse(localStorage.getItem('userData'));
  const userId = UserData.id;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`  http://localhost:8081/userReservations/${userId}`)
      .then((response) => {
        setReservations(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        setIsLoading(false);
      });
  }, [userId]);

  const openCancelConfirmation = (reservationId) => {
    setReservationToCancel(reservationId);
    setCancelConfirmationOpen(true);
  };

  const closeCancelConfirmation = () => {
    setReservationToCancel(null);
    setCancelConfirmationOpen(false);
  };

  const cancelReservation = async () => {
    setCancelLoading(true);

    await axios
      .put(`  http://localhost:8081/cancelReservation/${reservationToCancel}`)
      .then((response) => {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) => {
            if (reservation.reservation_id === reservationToCancel) {
              return { ...reservation, is_canceled: 1 };
            }
            return reservation;
          })
        );
        toast.success(response.data.message, {
          hideProgressBar: true,
        });
        closeCancelConfirmation();
        setCancelLoading(false);
      })
      .catch((error) => {
        console.error('Error canceling reservation:', error);
        console.log(error);
        setCancelLoading(false);

      });
  };

  const isDatePast = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    return end < today;
  };

  const upcomingReservations = reservations.filter(
    (reservation) => reservation.is_canceled === 0 && !isDatePast(reservation.end_date)
  );
  const pastReservations = reservations.filter(
    (reservation) => reservation.is_canceled === 0 && isDatePast(reservation.end_date)
  );
  const canceledReservations = reservations.filter((reservation) => reservation.is_canceled === 1);
  // console.log("Upcoming", upcomingReservations)
  // console.log("Past", pastReservations)
  // console.log("Canceled", canceledReservations)


  return (
    <>
      {/* Reservation listings */}
      <h1 className="text-3xl font-extrabold text-gray-800 uppercase mt-16">
        <span className="text-xl lg:text-3xl font-semibold tracking-wider text-gray-500 ">Reservations</span>
      </h1>
      <Container maxWidth="md">
        <Paper elevation={1} style={{ padding: '25px', marginTop: '24px', background: '#FFFFFF', width: '100%' }}>
          <h2 className="text-2xl font-bold mt-4 mb-4">Upcoming Reservations</h2>
          {isLoading ? (
            <div className='w-full'>
              <Skeleton height={250} width='100%' count={1} />
            </div>
          ) : (
            <>
              {upcomingReservations.length === 0 ? (
                <p>No Upcoming Reservations.</p>
              ) : (
                <div className='p-5 flex justify-around items-center flex-wrap gap-10'>
                  {upcomingReservations.map((item) => {
                    const startDate = formatDate(item.start_date);
                    const endDate = formatDate(item.end_date);
                    function formatDate(dateString) {
                      const date = new Date(dateString);
                      const day = date.getDate();
                      const month = date.getMonth() + 1;
                      const year = date.getFullYear();
                      const formattedDay = day < 10 ? '0' + day : day;
                      const formattedMonth = month < 10 ? '0' + month : month;
                      return formattedDay + '-' + formattedMonth + '-' + year;
                    }
                    const imageUrls = item.image_urls && JSON.parse(item.image_urls);
                    const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
                    return (
                      <div key={item.reservation_id} className="w-full ">
                        <div className="w-full bg-white md:h-auto border rounded-lg overflow-hidden relative">
                          <div className="relative">
                            <img
                              src={firstImageUrl}
                              alt={item.room_type}
                              className="w-full h-48 object-cover object-center "
                            />
                          </div>
                          <div className="p-4 pb-1 flex flex-row justify-between items-center gap-2">
                            <p className="text-sm inline font-semibold self-start">{item.room_type}</p>
                          </div>
                          <div className="p-4 pt-1 flex flex-row justify-between items-center gap-2">
                            <p className="text-sm text-gray-400 font-light">
                              {item.description}
                            </p>
                          </div>
                          <div className='pt-2 p-4'>
                            {item.is_canceled === 0 && (
                              <button className="bg-red-500 hover:bg-red-400 text-white text-[11px] px-3 py-2 rounded" onClick={() => openCancelConfirmation(item.reservation_id)}>Cancel Reservation</button>
                            )}
                          </div>
                          <div className="text-[12px] text-gray-600 bg-gray-100 w-full font-bold justify-between p-4 pt-2 pb-2 items-center flex-row flex">
                            <span className='self-start'> From {startDate} to  {endDate}</span>
                            <span className='self-end'> Total: ${item.final_price}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}

          {/* Past Reservations */}
          <h2 className="text-2xl font-bold mt-4 mb-4">Past Reservations:</h2>
          {isLoading ? (
            <div className='w-full'>
              <Skeleton height={250} width='100%' count={1} />
            </div>
          ) : (
            <>
              {pastReservations.length === 0 ? (
                <p>No Past reservations.</p>
              ) : (
                <div className='p-5 flex justify-around items-center flex-wrap gap-10'>
                  {pastReservations.map((item) => {
                    const startDate = formatDate(item.start_date);
                    const endDate = formatDate(item.end_date);
                    function formatDate(dateString) {
                      const date = new Date(dateString);
                      const day = date.getDate();
                      const month = date.getMonth() + 1;
                      const year = date.getFullYear();
                      const formattedDay = day < 10 ? '0' + day : day;
                      const formattedMonth = month < 10 ? '0' + month : month;
                      return formattedDay + '-' + formattedMonth + '-' + year;
                    }
                    const imageUrls = item.image_urls && JSON.parse(item.image_urls);
                    const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
                    return (
                      <div key={item.reservation_id} className="w-full ">
                        <div className="w-full bg-white md:h-auto border rounded-lg overflow-hidden relative">
                          <div className="relative">
                            <img
                              src={firstImageUrl}
                              alt={item.room_type}
                              className="w-full h-48 object-cover object-center "
                            />
                          </div>
                          <div className="p-4 pb-1 flex flex-row justify-between items-center gap-2">
                            <p className="text-sm inline font-semibold self-start">{item.room_type}</p>
                          </div>
                          <div className="p-4 pt-1 flex flex-row justify-between items-center gap-2">
                            <p className="text-sm text-gray-400 font-light">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-[12px] text-gray-600 bg-gray-100 w-full font-bold justify-between p-4 pt-2 pb-2 items-center flex-row flex">
                            <span className='self-start'> From {startDate} to  {endDate}</span>
                            <span className='self-end'> Total: ${item.final_price}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}

          {/* Canceled Reservations */}
          <h2 className="text-2xl font-bold mt-4 mb-4 ">Canceled Reservations</h2>
          {isLoading ? (
            <div className='w-full'>
              <Skeleton height={250} width='100%' count={1} />
            </div>
          ) : (
            <>
              {canceledReservations.length === 0 ? (
                <p>No Canceled Reservations.</p>
              ) : (
                <div className='p-5 flex justify-around items-center flex-wrap gap-10'>
                  {canceledReservations.map((item) => {
                    const startDate = formatDate(item.start_date);
                    const endDate = formatDate(item.end_date);
                    function formatDate(dateString) {
                      const date = new Date(dateString);
                      const day = date.getDate();
                      const month = date.getMonth() + 1;
                      const year = date.getFullYear();
                      const formattedDay = day < 10 ? '0' + day : day;
                      const formattedMonth = month < 10 ? '0' + month : month;
                      return formattedDay + '-' + formattedMonth + '-' + year;
                    }
                    const imageUrls = item.image_urls && JSON.parse(item.image_urls);
                    const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
                    return (
                      <div key={item.reservation_id} className="w-full ">
                        <div className="w-full bg-white md:h-auto border rounded-lg overflow-hidden relative">
                          <div className="relative">
                            <img
                              src={firstImageUrl}
                              alt={item.room_type}
                              className="w-full h-48 object-cover object-center "
                            />
                          </div>
                          <div className="p-4 pb-1 flex flex-row justify-between items-center gap-2">
                            <p className="text-sm inline font-semibold self-start">{item.room_type}</p>
                          </div>
                          <div className="p-4 pt-1 flex flex-row justify-between items-center gap-2">
                            <p className="text-sm text-gray-400 font-light">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-[12px] text-gray-600 bg-gray-100 w-full font-bold justify-between p-4 pt-2 pb-2 items-center flex-row flex">
                            <span className='self-start'> From {startDate} to  {endDate}</span>
                            <span className='self-end'> Total: ${item.final_price}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}

        </Paper>
      </Container>

      {/* Modals */}
      <Modal
        open={cancelConfirmationOpen}
        onClose={closeCancelConfirmation}
        aria-labelledby="cancel-confirmation-modal"
        aria-describedby="cancel-confirmation-modal-description"
        className=' flex justify-center items-center'
      >
        <Container maxWidth="xs" >
          <Paper elevation={3} className='p-6 flex flex-col justify-center items-center self-center justify-self-center'>
            <h2 id="cancel-confirmation-modal" className='text-center'>Are you sure you want to cancel the reservation?</h2>
            <div className=' flex p-2 pt-3 gap-5' >
              <Button
                variant="contained"
                color="error"
                onClick={cancelReservation}
                disabled={cancelLoading} // Disable the button while loading
                startIcon={cancelLoading && <CircularProgress size={24} color="inherit" />}
              >
                Yes
              </Button>
              <Button variant="contained" onClick={closeCancelConfirmation}>No</Button>
            </div>
          </Paper>
        </Container>
      </Modal>
    </>
  );
};

export default ReservationInfo;
