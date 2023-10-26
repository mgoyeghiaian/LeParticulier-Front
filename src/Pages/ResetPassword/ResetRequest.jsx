import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Paper, } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ResetRequest = () => {
  const [email, setemail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8081/request-reset-password`, {
        email,
      });

      if (response.status === 200) {
        toast.success(response.data.Status, {
          hideProgressBar: true,
        });
        setError('');
        navigate('/')
      }
    } catch (error) {
      setError(error.response.data.Error);
      console.log(error.response)
    }
  };

  return (
    <div className='h-[61.1svh] flex items-center justify-center bg-gray-200 flex-col'>
      <h1 className="text-3xl font-extrabold text-gray-800 uppercase mb-4">
        <span className="font-bold text-xl md:text-4xl  text-gray-500">Reset Password Request</span>
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
            <p className="text-sm text-gray-500">Insert your email to receive a reset password link.</p>

            {error && (
              <div className="text-red-600">{error}</div>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reset Password
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetRequest;