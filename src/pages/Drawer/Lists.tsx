import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  ...theme.applyStyles('light', {
    backgroundColor: '#63a4ff',
  }),
}));

export function Lists() {
  return (
    <Box sx={{ m: 3 }}>
      <Container sx={{ pb: 3 }}>
        <Button>BUTTON</Button>
      </Container>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(40)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>{index + 1}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
