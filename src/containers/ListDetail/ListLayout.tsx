import { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Paper,
  Divider,
  Container,
  Box,
  Tabs,
  Tab,
  MenuItem,
  Menu,
} from '@mui/material';
import { Home, Today, ArrowBack } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { formatDate } from '../../helpers/functions/formatDate';
import { IList } from '../../redux/lists/listsSlice';
import { IItem } from '../../redux/items/itemsSlice';
import { ListItemsTable } from './ListItemsTable';
import { useIncreaseItemAmountMutation } from '../../redux/items/itemsRtk';

interface ListLayoutProps {
  list: IList;
  items: IItem[];
  t: TFunction<'translation', undefined>;
  navigate: NavigateFunction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ListLayout({ list, items, t, navigate, setOpen, setCreateModalOpen }: ListLayoutProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState<string>('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [increaseAmount] = useIncreaseItemAmountMutation();

  const openSelectMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value: string) => {
    handleFilterChange(value);
    setAnchorEl(null);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleIcreaseItemAmount = async (itemId: string) => {
    if (!itemId) {
      console.error('ItemId not defined');
      return;
    }
    try {
      await increaseAmount(itemId).unwrap();
    } catch {
      console.error('error');
    }
  };

  const filteredSpendings = filter === 'All' ? items : items.filter((item) => item.type === filter);
  const totalSpent = items.reduce((total, item) => total + parseFloat(item.price!), 0);

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate('/lists')}>
          {t('backToListsBtn')}
        </Button>
        <Button variant="outlined" size="medium" onClick={() => setOpen(true)}>
          {t('editListBtn')}
        </Button>
      </Box>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h1">
          {list?.place}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Home />
          <Typography variant="body2">
            {t('placeTypeText')}: {list?.type || t('placeSelectUndefined')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Today />
          <Typography variant="body2">
            {t('dayOfVisitText')}: <strong>{formatDate(list?.createdAt || '')}</strong>
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, justifyContent: 'center' }}>
        <ListItemsTable
          t={t}
          items={filteredSpendings}
          openSelectMenu={openSelectMenu}
          openCreateModal={() => setCreateModalOpen(true)}
          handleIcreaseItemAmount={handleIcreaseItemAmount}
        />
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 250, textAlign: 'center' }}>
          <Typography variant="h6" mb={2}>
            {t('totalSpent')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
            {totalSpent} Kč
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label={t('spendingDetails')} />
          <Tab label={t('totalSpent')} />
        </Tabs>

        {tabIndex === 0 && (
          <ListItemsTable
            t={t}
            items={filteredSpendings}
            openSelectMenu={openSelectMenu}
            openCreateModal={() => setCreateModalOpen(true)}
            handleIcreaseItemAmount={handleIcreaseItemAmount}
          />
        )}

        {tabIndex === 1 && (
          <Paper elevation={3} sx={{ p: 3, mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" mb={1}>
              {t('totalSpent')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              {totalSpent} Kč
            </Typography>
          </Paper>
        )}
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={() => handleMenuItemClick('All')}>{t('itemsAllItems')}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Beer')}>{t('itemsBeer')}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Drink')}>{t('itemsDrinks')}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Shot')}>{t('itemsShots')}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Food')}>{t('itemsFood')}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('NonAlco')}>{t('itemsNonAlco')}</MenuItem>
      </Menu>
    </Container>
  );
}
