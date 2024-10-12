import { Box, Divider, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LiquorIcon from '@mui/icons-material/Liquor';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HistoryIcon from '@mui/icons-material/History';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import { DrawerListItem } from './DrawerListItem';

interface DrawerListProps {
  onClose: () => void;
}

export function DrawerOptions({ onClose }: DrawerListProps) {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>
        <DrawerListItem navDestination="/" icon={<HomeIcon />} text="Home" />
        <DrawerListItem navDestination="/beerlist" icon={<FormatListBulletedIcon />} text="Beerlist" />
        <DrawerListItem navDestination="/beverage" icon={<LiquorIcon />} text="Beverage" />
        <DrawerListItem navDestination="/food" icon={<LunchDiningIcon />} text="Food" />
      </List>
      <Divider />
      <List>
        <DrawerListItem navDestination="/history" icon={<HistoryIcon />} text="History" />
        <DrawerListItem navDestination="/favoritePlaces" icon={<FmdGoodIcon />} text="Favorite places" />
      </List>
      <Divider />
      <List>
        <DrawerListItem navDestination="/drinkingBuddies" icon={<GroupIcon />} text="Drinking buddies" />
        <DrawerListItem navDestination="/generalInfo" icon={<InfoIcon />} text="General info" />
      </List>
    </Box>
  );
}
