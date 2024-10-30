import { Box, Paper, Typography } from '@mui/material';
import { useGetAllUsersQuery } from '../../redux/users/userRtk';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { getUserId } from '../../redux/users/userSelectors';
import { useTranslation } from 'react-i18next';

export function DrinkingBuddies() {
  const { t } = useTranslation();
  const actualUserId = useSelector(getUserId);
  const { data: users } = useGetAllUsersQuery();
  const filteredUsers = users?.filter((user) => user.userId !== actualUserId);

  return (
    <Box sx={{ textAlign: 'center', m: 2 }}>
      <Typography variant="h4" mb={2}>
        {t('drBuddies')}
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredUsers?.map((user, index) => (
          <Grid key={index} size={2}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                bgcolor: 'background.default',
                textAlign: 'center',
                borderRadius: 1,
              }}
            >
              <Typography variant="body1">
                {user.firstName} {user.lastName}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
