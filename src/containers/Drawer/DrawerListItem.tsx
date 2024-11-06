import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CustomListItemProps {
  navDestination: string;
  icon: React.ReactNode;
  text: string;
}

export function DrawerListItem({ navDestination, icon, text }: CustomListItemProps) {
  const navigate = useNavigate();
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => navigate(navDestination)}
        sx={{
          '&:hover': {
            color: 'primary.main',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
