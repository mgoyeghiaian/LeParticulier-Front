import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Paper, IconButton, InputAdornment, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [user, setUser] = useState('');
  useEffect(() => {
    axios.get(`https://leparticulier-backend.onrender.com/user/${token}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError('User information not found.', err);
      });
  }, [token]);

  // console.log("User", user)



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`https://leparticulier-backend.onrender.com/reset-password/${user.id}`, {
        newPassword,
      });

      if (response.status === 200) {
        setError('');

        // console.log(response.data);
        toast.success(response.data, {
          hideProgressBar: true,
        });
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data);
      // console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[100%] p-[5%] flex items-center justify-center bg-[#E5E1DA] flex-col'>
      <h1 className="text-xl lg:text-3xl text-center font-semibold tracking-wider text-gray-500 " >
        Reset Password for{' '}
        <p className="text-xl lg:text-3xl text-center font-semibold tracking-wider text-gray-500 " >{user.email}</p>
      </h1>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '24px', marginTop: '24px' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              type={passwordVisible ? 'text' : 'password'}
              label="New Password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            <TextField
              type={passwordVisible2 ? 'text' : 'password'}
              label="Confirm Password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setPasswordVisible2(!passwordVisible2)}>
                      {!passwordVisible2 ? <Visibility /> : <VisibilityOff />}
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
              <Button type="submit" variant="contained" color="primary" fullWidth
                sx={{ backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'darkgray' } }}
              >
                Reset Password
              </Button>
            )}

          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetPassword;
