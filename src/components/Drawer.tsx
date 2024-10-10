import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

function CustomDrawer({ open, onClose }: CustomDrawerProps) {
  const navigate = useNavigate();
  const { uid } = useParams<{ uid: string }>();

  //   const firstNav = ['Home', 'Lists', 'Drinks', 'Food'];
  //   const secondNav = ['History', 'Favorite places'];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>
        <ListItem key={'home'} disablePadding>
          <ListItemButton>
            <ListItemIcon onClick={() => navigate(`/${uid}/home`)}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['History', 'Favorite places'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Drinking buddies', 'General info'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}

export default CustomDrawer;
