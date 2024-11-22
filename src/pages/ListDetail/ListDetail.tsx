import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '../../redux/users/userSelectors';
import { useGetListQuery, useUpdateListMutation } from '../../redux/lists/listsRtk';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListLayout } from '../../containers/ListDetail/ListLayout';
import { CreateListModal } from '../../containers/Lists/CreateListModal';
import { SetUpListFormProps } from '../Drawer/Lists';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ReportProblem } from '@mui/icons-material';
import { useCreateItemMutation, useGetItemsQuery } from '../../redux/items/itemsRtk';
import { CreateItemModal } from '../../containers/ListDetail/CreateItemModal';

const ListDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = useSelector(getUserId)!;
  const [updateList] = useUpdateListMutation();
  const [createItem] = useCreateItemMutation();
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
  const { showSnackBarSuccess, showSnackBarError } = useShowSnackbar();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const createItemFormMethods = useForm({
    defaultValues: {
      type: '',
      name: '',
      size: 0,
      amount: 1,
      price: '',
    },
  });

  const createListFormMethods = useForm({
    defaultValues: {
      searchQuery: '',
      place: '',
      type: '',
    },
  });

  const handleCreateItem = async (data: any) => {
    if (!id) {
      showSnackBarError('ListId not defined');
      return;
    }
    try {
      await createItem({
        listId: id,
        ...data,
      }).unwrap();
      setCreateModalOpen(false);
      showSnackBarSuccess('Item created');
      refetchList();
    } catch {
      showSnackBarError('List not updated');
    }
  };

  const onSubmit = async (data: SetUpListFormProps) => {
    if (!id) {
      showSnackBarError('ListId not defined');
      return;
    }
    try {
      await updateList({
        listId: id,
        ...data,
      }).unwrap();
      setOpen(false);
      showSnackBarSuccess('List updated');
      refetchList();
    } catch {
      showSnackBarError('List not updated');
    }
  };

  useEffect(() => {
    if (!open || !createModalOpen) {
      createItemFormMethods.reset();
      createListFormMethods.reset();
    }
  }, [open, createModalOpen, createItemFormMethods.reset, createListFormMethods.reset]);

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
          <ListLayout
            setCreateModalOpen={() => setCreateModalOpen(true)}
            list={list}
            items={items}
            t={t}
            setOpen={() => setOpen(true)}
            navigate={navigate}
          />
          <CreateItemModal
            register={createItemFormMethods.register}
            handleSubmit={createItemFormMethods.handleSubmit(handleCreateItem)}
            handleClose={() => setCreateModalOpen(false)}
            t={t}
            open={createModalOpen}
            watch={createItemFormMethods.watch}
          />
          <CreateListModal
            t={t}
            open={open}
            handleClose={() => setOpen(false)}
            handleSubmit={createListFormMethods.handleSubmit(onSubmit)}
            register={createListFormMethods.register}
          />
        </>
      )}
    </>
  );
};

export default ListDetail;
