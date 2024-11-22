import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '../../redux/users/userSelectors';
import { useGetListQuery, useUpdateListMutation } from '../../redux/lists/listsRtk';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListLayout } from '../../containers/ListDetail/ListLayout';
import { CreateListModal } from '../../containers/Lists/CreateListModal';
import { SetUpListFormProps } from '../Drawer/Lists';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ReportProblem } from '@mui/icons-material';
import { useGetItemsQuery } from '../../redux/items/itemsRtk';
// import { CreateItemModal } from '../../containers/ListDetail/CreateItemModal';

const ListDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = useSelector(getUserId)!;
  const [updateList] = useUpdateListMutation();
  const {
    data: list,
    isLoading: isListLoading,
    error,
    refetch: refetchList,
  } = useGetListQuery(
    { listId: id || '', userId },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: items, isLoading: isItemsLoading } = useGetItemsQuery(id || '', {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  console.log(items);
  const { showSnackBarSuccess, showSnackBarError } = useShowSnackbar();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchQuery: '',
      place: '',
      type: '',
    },
  });

  const onSubmit = async (data: SetUpListFormProps) => {
    if (!id) {
      console.error('User ID is undefined, cannot update user');
      return;
    }
    try {
      await updateList({
        listId: id,
        ...data,
      }).unwrap();
      setOpen(false);
      showSnackBarSuccess('User updated');
      refetchList();
    } catch {
      showSnackBarError('User not updated');
    }
  };

  if (error) {
    return (
      <Box sx={{ m: 3, textAlign: 'center' }}>
        <ReportProblem />
        <Typography variant="h5" component="h1" mt={2}>
          This list doesn't exist or you're not authorized to view this page.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {!isListLoading && !isItemsLoading && (
        <>
          <ListLayout list={list} items={items} t={t} setOpen={() => setOpen(true)} navigate={navigate} />
          {/* <CreateItemModal /> */}
          <CreateListModal
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
};

export default ListDetail;
