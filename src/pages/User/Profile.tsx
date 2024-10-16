import React, { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EditProfileModal } from '../../components/Profile/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { ProfileLayout } from '../../components/Profile/ProfileLayout';
import { useGetUserQuery } from '../../redux/users/userRtk';
import { useSelector } from 'react-redux';
import { getUserUid } from '../../redux/users/userSelectors';

function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const uid = useSelector(getUserUid);
  const { data: user } = useGetUserQuery(uid!);
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
    setOpen(false);
  };

  return (
    <>
      <ProfileLayout t={t} navigate={navigate} setOpen={setOpen} user={user || undefined} />
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
