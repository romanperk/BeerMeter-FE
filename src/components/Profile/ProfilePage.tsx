import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateUser } from '../../redux/users/authSlice';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Form state
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ firstName: firstName, lastName: lastName }));
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>

        <Box textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;
