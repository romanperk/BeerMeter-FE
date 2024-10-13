import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateUser } from '../../redux/users/authSlice';
import { useTranslation } from 'react-i18next';

function Profile() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

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
        {t('userEditProfile')}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            label={t('userFirstName')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label={t('userLastName')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>

        <Box textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            {t('userSaveChangesButton')}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Profile;
