import { Typography, IconButton, Box, Button } from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import { useGetItemQuery } from '../../redux/items/itemsRtk';
import { useNavigate, useParams } from 'react-router-dom';
import EditItemModal from './EditItemModal';
import { useState } from 'react';
import DeleteItemModal from './DeleteItemModal';
import { LoadingScreen } from '../../components/LoadingState/LoadingScreen';
import { useTranslation } from 'react-i18next';

const ItemDetail = () => {
  const { t } = useTranslation();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const { itemId, listId } = useParams<{ itemId: string; listId: string }>();
  const {
    data: item,
    error,
    isLoading,
    refetch: refetchItem,
  } = useGetItemQuery(itemId, {
    skip: !itemId,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Typography>Error loading item details.</Typography>;
  }

  return (
    <>
      {!isLoading && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/lists/${listId}`)}
            >
              {t('backToListBtn')}
            </Button>
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('itemSize')}: {item.size}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('itemType')}: {item.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('itemAmount')}: {item.amount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('itemPrice')}: {item.price} Kč
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <IconButton color="primary" onClick={() => setEditOpen(true)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => setDeleteOpen(true)}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      )}
      <EditItemModal
        open={editOpen}
        item={item}
        handleClose={() => setEditOpen(false)}
        refetch={refetchItem}
      />
      <DeleteItemModal t={t} open={deleteOpen} item={item} handleClose={() => setDeleteOpen(false)} />
    </>
  );
};

export default ItemDetail;
