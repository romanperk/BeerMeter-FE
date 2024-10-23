import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditProfileModal } from '../../containers/Profile/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { ProfileLayout } from '../../containers/Profile/ProfileLayout';
import { useUpdateUserMutation } from '../../redux/users/userRtk';
import { useFetchUser } from '../../helpers/functions/fetchUser';
import { useForm } from 'react-hook-form';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { SetUpProfileFormProps } from '../Auth/SetUpProfile';

function Profile() {
  const navigate = useNavigate();
  const { showSnackBarSuccess, showSnackBarError } = useShowSnackbar();
  const { t } = useTranslation();
  const { user, isLoading, refetchUser } = useFetchUser();
  const [updateUser] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      favDrink: '',
    },
  });

  const onSubmit = async (data: SetUpProfileFormProps) => {
    const uid = user?.uid;
    if (!uid) {
      console.error('User UID is required');
      return;
    }
    try {
      await updateUser({
        uid,
        ...data,
      }).unwrap();
      setOpen(false);
      showSnackBarSuccess('User updated');
      refetchUser();
    } catch {
      showSnackBarError('User not updated');
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
