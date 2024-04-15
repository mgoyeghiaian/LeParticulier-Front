import { useState } from 'react';
import { Container, TextField, Grid, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import ResrvationInfo from './ResrvationInfo';

const ProfileEdit = () => {
  const UserData = JSON.parse(localStorage.getItem('userData'))
  const userId = UserData.id

  const [firstname, setfirstname] = useState(UserData.firstname);
  const [lastname, setlastname] = useState(UserData.lastname);
  const [email, setemail] = useState(UserData.email);
  const [phonenumber, setphonenumber] = useState(UserData.phonenumber);
  const [country, setcountry] = useState(UserData.country);
  const [adress, setadress] = useState(UserData.adress);
  const [error, seterror] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/reset-request');
    window.location.reload();
  };
  const userData = {
    adress: adress,
    country: country,
    email: email,
    firstname: firstname,
    id: userId,
    lastname: lastname,
    phonenumber: phonenumber,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(`https://leparticulier-backend.onrender.com/update/${userId}`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber,
        country: country,
        adress: adress,
      });
      console.log(response)
      if (response.data.status === 'Success') {
        seterror('');
        toast.success(response.data.message)
        localStorage.setItem('userData', JSON.stringify(userData));
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        seterror('Failed to update user data');
      }
    } catch (error) {
      seterror('Error updating user data in the database');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='h-[100%] md:p-[5%] flex items-center justify-center bg-[#ece8e0] flex-col'>
      <h1 className="text-3xl font-extrabold text-gray-800 uppercase mb-4">
        <span className="text-xl lg:text-3xl text-center font-semibold tracking-wider text-gray-500 "> Edit Profile </span>
      </h1>
      <Container maxWidth="md"
      >
        <Paper elevation={1} style={{ padding: '25px', marginTop: '24px', background: '#FFFFFF' }}>

          <form onSubmit={handleSubmit} className="space-y-2  flex flex-col gap-2">
            <Grid container spacing={2} >
              <Grid item xs={100} sm={6}  >

                <TextField
                  type='text'
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  value={firstname ? firstname : UserData.firstName}
                  onChange={(e) => setfirstname(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={100} sm={6} >

                <TextField
                  type='text'
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  required
                />
              </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid item xs={100} sm={6}>
                <TextField
                  type='email'
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={100} sm={6}>
                <TextField
                  type='tel'
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  value={phonenumber}
                  onChange={(e) => setphonenumber(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={100} sm={6}>
                <TextField
                  type='text'
                  label="Country"
                  fullWidth
                  variant="outlined"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={100} sm={6}>
                <TextField
                  type='text'
                  label="Adress"
                  fullWidth
                  variant="outlined"
                  value={adress}
                  onChange={(e) => setadress(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            {error && (
              <div className="text-red-600">{error}</div>
            )}

            {loading ? (
              <div className="flex justify-center">
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="gray"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <Button type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'darkgray' }, width: "50%", alignSelf: "center", justifySelf: "center" }}
              >
                Edit
              </Button>
            )}

          </form>
        </Paper>
      </Container>
      <div className='flex border  mt-2 p-1 rounded-md items-end justify-end'>
        <a onClick={handleLogout} className=' cursor-pointer text-gray-600 font-semibold hover:text-gray-500 '>Reset Password</a>
      </div>
      <ResrvationInfo />

    </div >
  );
};

export default ProfileEdit;
