import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, IconButton, InputAdornment, Grid, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ThreeDots } from 'react-loader-spinner';
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
  const [loading, setLoading] = useState(false);

  const handlePhoneInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setphonenumber(numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`  http://localhost:8081/register`, {
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
        toast.success(response.data.message, {
          hideProgressBar: true,
        });
        navigate("/login");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.Error);
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[100%] p-[2%] md:p-[4%] flex items-center justify-center bg-[#E5E1DA] flex-col'>
      <h1 className="text-3xl font-extrabold text-gray-800 uppercase mb-4 ">
        <span className="text-xl lg:text-3xl text-center font-semibold tracking-wider text-gray-500 ">Signup</span>
      </h1>
      <Container maxWidth="md">
        <Paper elevation={1} style={{ padding: '25px', marginTop: '24px' }}>
          <form onSubmit={handleSubmit} className="space-y-2 flex flex-col gap-2">
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
                  type='tel'
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  value={phonenumber}
                  onChange={handlePhoneInputChange}
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
                Signup
              </Button>
            )}

            <div className="flex">
              <span className='text-gray-600 font-semibold'>Already have an account? <Link to="/login" className='hover:text-gray-400 text-gray-700'>Login</Link></span>
            </div>
          </form>
        </Paper>
      </Container>
    </div >
  );
};

export default Signup;
