import { BarChart, Group, Notifications } from '@mui/icons-material';
import { Card, Container, Grid2, Typography } from '@mui/material';

const features = [
  {
    id: 1,
    icon: <BarChart color="primary" sx={{ fontSize: 40, mb: 2 }} />,
    title: 'Track Your Spendings',
    description: 'Easily log your spendings at any pub or restaurant. Keep track of every penny.',
  },
  {
    id: 2,
    icon: <Group color="primary" sx={{ fontSize: 40, mb: 2 }} />,
    title: 'Collaborate with Friends',
    description: 'Invite your friends and keep a shared list of spendings. Never argue about who owes what!',
  },
  {
    id: 3,
    icon: <Notifications color="primary" sx={{ fontSize: 40, mb: 2 }} />,
    title: 'History & Bill Splitting',
    description: 'Track spendings history and split the bill easily – no more awkward calculations.',
  },
];

export function HowItWorks({ downMd }: { downMd: boolean }) {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>
        Simple. Fun. Effective.
      </Typography>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        justifyContent="center"
        sx={{ pr: 3, pl: 3 }}
      >
        {features.map(({ id, icon, title, description }) => (
          <Grid2 key={id} size={{ xs: 11, sm: 6, md: 4 }}>
            <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'background.default' }}>
              {icon}
              <Typography variant={downMd ? undefined : 'h6'}>{title}</Typography>
              <Typography variant={downMd ? 'body2' : 'body1'} color="textSecondary">
                {description}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
