import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, IconButton, Paper, Divider } from '@mui/material';
import { Add, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { NavigateFunction } from 'react-router-dom';
import { UseFormRegister } from 'react-hook-form';
import { IList } from '../../redux/lists/listsSlice';
import { TFunction } from 'i18next';

interface ListsLayoutProps {
  t: TFunction<'translation', undefined>;
  navigate: NavigateFunction;
  downSm: boolean;
  register: UseFormRegister<{
    searchQuery: string;
    place: string;
    type: string;
  }>;
  toggleSortOrder: () => void;
  isAscending: boolean;
  places: IList[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ListsLayout({
  t,
  navigate,
  downSm,
  register,
  toggleSortOrder,
  isAscending,
  places,
  setOpen,
}: ListsLayoutProps) {
  return (
    <Box sx={{ m: 3 }}>
      <Box display={downSm ? '' : 'flex'} justifyContent="space-between" alignItems="center" pb={3}>
        {!downSm && <Typography variant="h4">{t('myLists')}</Typography>}
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            fullWidth={downSm}
            size="small"
            label={t('searchListField')}
            variant="outlined"
            {...register('searchQuery')}
          />
          <IconButton onClick={toggleSortOrder}>
            {isAscending ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
          {downSm ? (
            <IconButton onClick={() => setOpen(true)}>
              <Add />
            </IconButton>
          ) : (
            <Button startIcon={<Add />} variant="contained" onClick={() => setOpen(true)}>
              {t('addNewListBtn')}
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {places?.map((item, index) => (
          <Grid key={index} size={2}>
            <Paper
              elevation={5}
              onClick={() => navigate(`/lists/${item.listId}`)}
              sx={{
                padding: 2,
                textAlign: 'start',
                borderRadius: '16px',
                cursor: 'pointer',
              }}
            >
              <Typography variant="body1" fontWeight={600} mb={1}>
                {item.place}
              </Typography>
              <Divider />
              <Typography variant="body2" color="text.secondary" mt={1}>
                {item.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(item.createdAt!).toLocaleDateString('cs-CZ').replace(/\//g, '.')}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
