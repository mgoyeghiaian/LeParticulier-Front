import { useState } from 'react';
import { Container, TextField, Grid, Paper, Button } from '@mui/material';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    }
  };



  return (
    <div className='h-screen lg:h-[59.6svh] md:p-5 flex items-center justify-center bg-gray-200 flex-col'>
      <h1 className="text-xl md:text-3xl font-extrabold text-gray-800 uppercase mb-4">
        Edit Profile for{' '}
        <p className="font-bold text-xl md:text-4xl text-gray-500">{UserData.firstName} {UserData.lastName}</p>
      </h1>
      <Container maxWidth="md">
        <Paper elevation={1} style={{ padding: '25px', marginTop: '24px' }}>

          <form onSubmit={handleSubmit} className="space-y-2">
            <Grid container spacing={2}>
              <Grid item xs={100} sm={6} >

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
              <Grid item xs={100} sm={6}>

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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Edit
            </Button>
          </form>
        </Paper>
      </Container>
      <div className='flex border  mt-2 p-1 rounded-md items-end justify-end'>
        <a onClick={handleLogout} className=' cursor-pointer text-[18px] text-blue-600 font-semibold hover:text-black'>Reset Password</a>
      </div>
    </div >

  );
};

export default ProfileEdit;
