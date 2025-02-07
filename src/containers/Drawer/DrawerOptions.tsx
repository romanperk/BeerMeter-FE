import { Box, Divider, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import HistoryIcon from '@mui/icons-material/History';
// import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GroupIcon from '@mui/icons-material/Group';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DrawerListItem } from './DrawerListItem';
import { TFunction } from 'i18next';

interface DrawerListProps {
  onClose: () => void;
  t: TFunction<'translation', undefined>;
}

export function DrawerOptions({ onClose, t }: DrawerListProps) {
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'background.default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={onClose}
    >
      <Box>
        <List>
          <DrawerListItem navDestination="/" icon={<HomeIcon />} text={t('home')} />
          <DrawerListItem navDestination="/lists" icon={<FormatListBulletedIcon />} text={t('lists')} />
        </List>
        {/* <Divider />
      <List>
        <DrawerListItem navDestination="/history" icon={<HistoryIcon />} text={t('history')} />
        <DrawerListItem navDestination="/favoritePlaces" icon={<FmdGoodIcon />} text={t('favPlaces')} />
      </List> */}
        <Divider />
        <List>
          <DrawerListItem navDestination="/drinkingBuddies" icon={<GroupIcon />} text={t('drBuddies')} />
        </List>
      </Box>
      <Box>
        <List>
          <DrawerListItem navDestination="/suggestEdit" icon={<EditNoteIcon />} text={t('suggestEdit')} />
        </List>
      </Box>
    </Box>
  );
}
