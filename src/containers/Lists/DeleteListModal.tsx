import React from 'react';
import { Typography } from '@mui/material';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteListMutation } from '../../redux/lists/listsRtk';
import { IList } from '../../redux/lists/listsSlice';
import { TFunction } from 'i18next';

interface DeleteListModalProps {
  open: boolean;
  list: IList;
  handleClose: () => void;
  t: TFunction<'translation', undefined>;
}

const DeleteListModal: React.FC<DeleteListModalProps> = ({ open, list, handleClose, t }) => {
  const [deleteList] = useDeleteListMutation();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/lists`);
    deleteList(list.listId);
    handleClose();
  };

  return (
    <CustomModal open={open} title={'deleteList'} handleClose={handleClose} handleSubmit={onSubmit}>
      <Typography variant="body1" align="center">
        {t('deleteListText')}
      </Typography>
    </CustomModal>
  );
};

export default DeleteListModal;
