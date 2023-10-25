import { useState, useEffect } from 'react';
import { Container, Typography, Paper, IconButton, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const ProfileEdit = () => {
  // const [isPasswordVisible, setIsPasswordVisib le] = useState(false);
  // const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible(!isPasswordVisible);
  // };

  // const toggleConfirmPasswordVisibility = () => {
  //   setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  // };

  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    country: '',
  };

  const [userData, setUserData] = useState({ ...initialUserData });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    username: false,
    phoneNumber: false,
    address: false,
    country: false,
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = async (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    const newValue = userData[field];

    const userId = userData.id;
    console.log(userId);
    try {
      const response = await axios.put(`http://particulierlb.com/update/${userId}`, {

        updateFields: field,
        updateValues: newValue,
      });

      console.log(response);
    } catch (error) {
      console.error('Error updating user data in the database:', error);
    }

    const updatedUserData = { ...userData, [field]: newValue };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    setUserData(updatedUserData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const renderField = (label, field, icon) => {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          {icon}
        </Grid>
        <Grid item xs={6}>
          <label className="font-semibold text-gray-600">
            {label}:
          </label>
        </Grid>
        <Grid item xs={4}>
          {isEditing[field] ? (
            <div className="flex items-center">
              <TextField
                name={field}
                value={userData[field]}
                onChange={handleChange}
                variant="outlined"
                size="small"
                color="primary"
              />
              <IconButton onClick={() => handleSave(field)}>
                <CheckIcon color="success" />
              </IconButton>
            </div>
          ) : (
            <div className="flex items-center">
              <Typography variant="body1" component="div">
                {userData[field]}
              </Typography>
              {field !== 'email' && (
                <IconButton onClick={() => handleEdit(field)}>
                  <EditIcon color="primary" />
                </IconButton>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {renderField('First Name', 'firstName', <AccountCircleIcon />)}
        {renderField('Last Name', 'lastName', <AccountCircleIcon />)}
        {renderField('Email', 'email', <EmailIcon />)}
        {renderField('Phone Number', 'phoneNumber', <PhoneIcon />)}
        {renderField('Country', 'country', <LocationOnIcon />)}
        {renderField('Address', 'address', <LocationOnIcon />)}
      </Paper>
    </Container>
  );
};

export default ProfileEdit;
