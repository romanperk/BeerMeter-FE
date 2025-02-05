import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { useUpdateItemMutation } from '../../redux/items/itemsRtk';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { IItem } from '../../redux/items/itemsSlice';
import { TFunction } from 'i18next';

interface EditItemModalProps {
  open: boolean;
  item: IItem;
  handleClose: () => void;
  refetch: () => void;
  t: TFunction<'translation', undefined>;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ open, item, handleClose, refetch, t }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: item.name,
      size: item.size,
      type: item.type,
      amount: item.amount,
      price: item.price,
    },
  });

  const [updateItem] = useUpdateItemMutation();

  const onSubmit = async (data: any) => {
    await updateItem({ ...data, itemId: item.itemId });
    refetch();
    handleClose();
  };

  return (
    <CustomModal open={open} title="editItem" handleClose={handleClose} handleSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} label="Name" fullWidth />}
        />
        <Controller
          name="size"
          control={control}
          render={({ field }) => <TextField {...field} label="Size" fullWidth />}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => <TextField {...field} label="Type" fullWidth />}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => <TextField {...field} label="Amount" type="number" fullWidth />}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => <TextField {...field} label="Price" type="number" fullWidth />}
        />
      </Stack>
    </CustomModal>
  );
};

export default EditItemModal;
