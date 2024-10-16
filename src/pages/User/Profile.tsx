import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditProfileModal } from '../../components/Profile/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { ProfileLayout } from '../../components/Profile/ProfileLayout';
import { useUpdateUserMutation } from '../../redux/users/userRtk';
import { useFetchUser } from '../../helpers/fetchUser';
import { useForm } from 'react-hook-form';

function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isLoading, refetchUser } = useFetchUser();
  const [updateUser] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      favDrink: user?.favDrink || '',
    },
  });

  const onSubmit = (data: any) => {
    const uid = user?.uid;
    if (!uid) {
      console.error('User UID is required');
      return;
    }
    try {
      updateUser({
        uid,
        ...data,
      }).unwrap();
      setOpen(false);
      refetchUser();
    } catch (error) {
      console.error('Failed to update user: ', error);
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <ProfileLayout t={t} navigate={navigate} setOpen={setOpen} user={user || undefined} />
          <EditProfileModal
            t={t}
            open={open}
            handleClose={() => setOpen(false)}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
          />
        </>
      )}
    </>
  );
}

export default Profile;
