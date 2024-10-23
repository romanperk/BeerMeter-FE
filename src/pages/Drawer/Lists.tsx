import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, IconButton, Paper } from '@mui/material';
import { Add, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useBreakpoints } from '../../helpers/functions/useBreakpoints';
import { useNavigate } from 'react-router-dom';

interface ListItem {
  id: number;
  place: string;
  date: string;
}

export function Lists() {
  const navigate = useNavigate();
  const { downSm } = useBreakpoints();
  const lists = [
    { place: 'Plnej pekac', date: '2024-10-15', id: 1 },
    { place: 'Vytopna', date: '2024-08-20', id: 2 },
    { place: 'Srdcovka', date: '2023-02-15', id: 3 },
    { place: 'Kozlovna', date: '2022-10-20', id: 4 },
    { place: 'Dva kohouti', date: '2024-10-01', id: 5 },
    { place: 'Las Adelitas', date: '2024-07-02', id: 6 },
  ];

  const { register, watch } = useForm({
    defaultValues: {
      searchQuery: '',
    },
  });

  const [isAscending, setIsAscending] = useState(false);

  const searchQuery = watch('searchQuery');

  const sortLists = (listArray: ListItem[]): ListItem[] => {
    return listArray.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredItems = sortLists(
    lists.filter((item) =>
      item.place
        .toLowerCase()
        .split(' ')
        .some((word) => word.startsWith(searchQuery.toLowerCase()))
    )
  );

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <Box sx={{ m: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pb={3}>
        {!downSm && <Typography variant="h4">My lists</Typography>}
        <Box display="flex" alignItems="center" gap={2}>
          <TextField size="small" label="Search" variant="outlined" {...register('searchQuery')} />
          <IconButton onClick={toggleSortOrder}>
            {isAscending ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
          {downSm ? (
            <IconButton>
              <Add />
            </IconButton>
          ) : (
            <Button startIcon={<Add />} variant="contained">
              Add new list
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredItems.map((item, index) => (
          <Grid key={index} size={2}>
            <Paper
              elevation={3}
              onClick={() => navigate(`/lists/${item.id}`)}
              sx={{
                padding: 2,
                bgcolor: 'background.default',
                textAlign: 'center',
                borderRadius: 1,
                cursor: 'pointer',
              }}
            >
              <Typography variant="body1">{item.place}</Typography>
              <Typography variant="body2">
                {new Date(item.date).toLocaleDateString('cs-CZ').replace(/\//g, '.')}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
