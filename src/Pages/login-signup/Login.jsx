import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, IconButton, InputAdornment, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setemail] = useState('');
  const [error, setError] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://leparticulier-backend.onrender.com/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setError('');
        const userData = {
          adress: response.data.userData.adress,
          country: response.data.userData.country,
          email: response.data.userData.email,
          firstname: response.data.userData.firstname,
          lastname: response.data.userData.lastname,
          phonenumber: response.data.userData.phonenumber,
          id: response.data.userData.id,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success(response.data.Message, {
          hideProgressBar: true,
        });
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.Error);
      console.log(error.response.data.Error);
    }
  };

  return (
    <div className='h-[60.9svh] flex items-center justify-center bg-gray-200 flex-col'>
      <h1 className="text-3xl font-extrabold text-gray-800 uppercase mb-4">
        <span className="font-bold text-4xl text-gray-500">Login</span>
      </h1>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '24px', marginTop: '24px' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              type='email'
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required

            />



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
            <div className='flex items-end justify-end'>
              <Link to="/reset-request" className=' text-gray-800 font-semibold hover:text-gray-400'>Forget Password</Link>
            </div>

            {error && (
              <div className="text-red-600">{error}</div>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'darkgray' } }}
            >
              Login
            </Button>
            <div className="flex">
              <span className=' text-gray-600 font-semibold '> Dont Have An account? <Link to="/signup" className='hover:text-gray-400 text-gray-800' >Sign Up</Link></span>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;