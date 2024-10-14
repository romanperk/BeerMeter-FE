import React, { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavDrink, updateFirstName, updateLastName } from '../../redux/users/userSlice';
import { useTranslation } from 'react-i18next';
import { EditProfileModal } from '../../components/Profile/EditProfileModal';
import { getUser } from '../../redux/users/userSelectors';
import { useNavigate } from 'react-router-dom';
import { ProfileLayout } from '../../components/Profile/ProfileLayout';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(getUser);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [favDrink, setFavDrink] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFavDrink(event.target.value as string);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateFirstName(firstName));
    dispatch(updateLastName(lastName));
    dispatch(updateFavDrink(favDrink));
    setOpen(false);
  };

  return (
    <>
      <ProfileLayout t={t} navigate={navigate} setOpen={setOpen} user={user} />
      <EditProfileModal
        t={t}
        favDrink={favDrink}
        handleChange={handleChange}
        open={open}
        handleClose={() => setOpen(false)}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Profile;
