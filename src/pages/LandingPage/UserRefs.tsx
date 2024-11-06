import { Avatar, Card, Container, Grid2, Typography } from '@mui/material';

const testimonials = [
  {
    name: 'John',
    quote: 'BeerMeter makes going out with friends so much easier. I never lose track of my expenses!',
    avatar:
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1729516294~exp=1729516894~hmac=0d7d38fa59b4473de0d112dc408557de84e757589b93ebffdab3e3196bfce2e7',
  },
  {
    name: 'George',
    quote: 'Tracking our group expenses has never been this simple. BeerMeter is a game-changer!',
    avatar:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1729516323~exp=1729516923~hmac=c2415323235a084fb2e81524e2e0a9b73a4472b3cad5325c0248b78c3c3f80b4',
  },
  {
    name: 'Emily',
    quote: 'I love the collaborative feature – no more debates on who owes what!',
    avatar:
      'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?w=740&t=st=1729516360~exp=1729516960~hmac=87f49af85d759aa88db38500b91d459cafb5876af30e46396ffc9d24b43b01d5',
  },
];

export function UserRefs() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>
        What Our Users Are Saying
      </Typography>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        justifyContent="center"
        sx={{ pr: 3, pl: 3 }}
      >
        {testimonials.map((testimonial, index) => (
          <Grid2 size={{ xs: 11, sm: 6, md: 4 }} key={index}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 4, bgcolor: 'background.default' }}>
              <Avatar
                src={testimonial.avatar}
                alt={testimonial.name}
                sx={{ width: 60, height: 60, margin: '0 auto', mb: 2 }}
              />
              <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
                "{testimonial.quote}"
              </Typography>
              <Typography variant="subtitle2" color="textPrimary">
                – {testimonial.name}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
