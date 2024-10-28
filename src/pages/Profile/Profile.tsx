import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditProfileModal } from '../../containers/Profile/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { ProfileLayout } from '../../containers/Profile/ProfileLayout';
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/users/userRtk';
import { useForm } from 'react-hook-form';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { SetUpProfileFormProps } from '../Auth/SetUpProfile';
import { useSelector } from 'react-redux';
import { getUserId } from '../../redux/users/userSelectors';

function Profile() {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const { showSnackBarSuccess, showSnackBarError } = useShowSnackbar();
  const { t } = useTranslation();
  const [updateUser] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useGetUserQuery(userId || '', {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      favDrink: '',
    },
  });

  const onSubmit = async (data: SetUpProfileFormProps) => {
    const userId = user?.userId?.toString();
    if (!userId) {
      console.error('User ID is undefined, cannot update user');
      return;
    }
    try {
      await updateUser({
        userId,
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
