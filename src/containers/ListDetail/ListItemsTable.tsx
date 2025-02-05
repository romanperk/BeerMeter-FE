import { Add, FilterList } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { Box, Divider, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { IItem } from '../../redux/items/itemsSlice';
import { NavigateFunction } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

interface ListItemsTableProps {
  t: TFunction<'translation', undefined>;
  items: IItem[];
  navigate: NavigateFunction;
  openSelectMenu: (event: React.MouseEvent<HTMLElement>) => void;
  openCreateModal: (event: React.MouseEvent<HTMLElement>) => void;
  handleIcreaseItemAmount?: (itemId: string) => Promise<void>;
}

export function ListItemsTable({ items, t, navigate, openSelectMenu, openCreateModal }: ListItemsTableProps) {
  const { register } = useFormContext();

  return (
    <Box sx={{ px: 1, mt: { xs: 2, md: 0 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <TextField
          size="small"
          label={t('searchListField')}
          variant="outlined"
          {...register('searchQuery')}
        />
        <Box display="flex" gap={1}>
          <Tooltip title="Add item">
            <IconButton onClick={openCreateModal} sx={{ mb: 1 }}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton onClick={openSelectMenu} sx={{ mb: 1 }}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />

      {items.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          NO ITEMS
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
          {items.map((item, index) => (
            <Grid key={index} size={2}>
              <Paper
                elevation={2}
                onClick={() => navigate(`/lists/${item.listId}/item/${item.itemId}`)}
                sx={{
                  borderRadius: '16px',
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    alignItems: 'start',
                  }}
                >
                  <Typography variant="body1" fontWeight={600}>
                    {item.name!.length > 7 ? `${item.name!.slice(0, 6)}...` : item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.amount}x
                  </Typography>
                  <Divider sx={{ width: '100%', my: 1 }} />
                  <Typography variant="body2">{item.price} Kč</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
