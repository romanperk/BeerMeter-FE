import React from 'react';
import { Typography } from '@mui/material';
import { useDeleteItemMutation } from '../../redux/items/itemsRtk';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { IItem } from '../../redux/items/itemsSlice';
import { useNavigate } from 'react-router-dom';
import { TFunction } from 'i18next';

interface DeleteItemModalProps {
  open: boolean;
  item: IItem;
  handleClose: () => void;
  t: TFunction<'translation', undefined>;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({ open, item, handleClose, t }) => {
  const [deleteItem] = useDeleteItemMutation();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/lists/${item.listId}`);
    deleteItem(item.itemId);
    handleClose();
  };

  return (
    <CustomModal open={open} title="deleteItem" handleClose={handleClose} handleSubmit={onSubmit}>
      <Typography variant="body1" align="center">
        {t('deleteItemText')}
      </Typography>
    </CustomModal>
  );
};

export default DeleteItemModal;
