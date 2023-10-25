import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, IconButton, InputAdornment, Grid, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setemail] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [country, setcountry] = useState('');
  const [adress, setadress] = useState('');
  const [phonenumber, setphonenumber] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://particulierlb.com/service/index.js/register`, {
        email,
        password,
        firstname,
        lastname,
        country,
        adress,
        phonenumber,
      });

      if (response.status === 200) {
        setError('');
        console.log(response.data.message);
        toast.success(response.data.message, {
          hideProgressBar: true,
        });
        navigate("/login");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setError(error.response);
      console.log(error);
    }
  };

  return (
    <div className='h-screen lg:h-[59.6svh] md:p-5 flex items-center justify-center bg-gray-200 flex-col'>
      <h1 className="text-3xl font-extrabold text-gray-800 uppercase mb-4">
        <span className="font-bold text-4xl text-gray-500">Signup</span>
      </h1>
      <Container maxWidth="md">
        <Paper elevation={1} style={{ padding: '25px', marginTop: '24px' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Grid container spacing={1}>
              <Grid item xs={100} sm={6}>

                <TextField
                  type='text'
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  value={firstname}
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


            <Grid container spacing={1}>
              <Grid item xs={100} sm={6}>
                <TextField
                  type='email'
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={100} sm={6}>
                <TextField
                  type='number'
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  value={phonenumber}
                  onChange={(e) => setphonenumber(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
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

            <TextField
              type={passwordVisible ? 'text' : 'password'}
              label="Password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                      {!passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <div className="text-red-600">{error}</div>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Signup
            </Button>
            <div className="flex">
              <span className='text-gray-600 font-semibold'>Already have an account? <Link to="/login" className='hover:text-blue-400 text-blue-600'>Login</Link></span>
            </div>
          </form>
        </Paper>
      </Container>
    </div >
  );
};

export default Signup;
