import { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Container,
  Box,
  Tabs,
  Tab,
  MenuItem,
  Menu,
  IconButton,
} from '@mui/material';
import { Home, Today, ArrowBack, Edit, Delete } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { formatDate } from '../../helpers/functions/formatDate';
import { IList } from '../../redux/lists/listsSlice';
import { IItem } from '../../redux/items/itemsSlice';
import { ListItemsTable } from './ListItemsTable';
import { FormProvider, useForm } from 'react-hook-form';
import { useBreakpoints } from '../../helpers/functions/useBreakpoints';

interface ListLayoutProps {
  list: IList;
  items: IItem[];
  t: TFunction<'translation', undefined>;
  navigate: NavigateFunction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteModal: () => void;
}

export function ListLayout({
  list,
  items,
  t,
  navigate,
  setOpen,
  setCreateModalOpen,
  openDeleteModal,
}: ListLayoutProps) {
  const downSm = useBreakpoints();
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState<string>('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const formMethods = useForm({
    defaultValues: {
      searchQuery: '',
    },
  });

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

  const filteredItems = items
    ?.filter((item: IItem) =>
      item.name
        ?.toLowerCase()
        .split(' ')
        .some((word) => word.startsWith(formMethods.watch('searchQuery')))
    )
    .filter((item) => filter === 'All' || item.type === filter);

  const totalSpent = items.reduce((total, item) => total + parseFloat(item.price!) * item.amount!, 0);

  return (
    <FormProvider {...formMethods}>
      <Container maxWidth="md" sx={{ my: 2 }}>
        {!downSm && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate('/lists')}>
              {t('backToListsBtn')}
            </Button>
            <Button variant="outlined" size="medium" onClick={() => setOpen(true)}>
              {t('editListBtn')}
            </Button>
            <Button variant="outlined" size="medium" onClick={openDeleteModal}>
              {t('deleteListBtn')}
            </Button>
          </Box>
        )}
        {downSm && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate('/lists')} color="primary">
              <ArrowBack />
            </IconButton>
            <Box>
              <IconButton onClick={() => setOpen(true)}>
                <Edit />
              </IconButton>
              <IconButton onClick={openDeleteModal} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Box>
        )}

        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h1">
            {list?.place}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Home color="disabled" />
            <Typography variant="body2" color="text.secondary">
              {t('placeTypeText')}: {list?.type || t('placeSelectUndefined')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Today color="disabled" />
            <Typography variant="body2" color="text.secondary">
              {t('dayOfVisitText')}: <strong>{formatDate(list?.createdAt || '')}</strong>
            </Typography>
          </Stack>
        </Box>

        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label={t('spendingDetails')} />
          <Tab label={t('totalSpent')} />
        </Tabs>

        {tabIndex === 0 && (
          <ListItemsTable
            t={t}
            items={filteredItems}
            navigate={navigate}
            openSelectMenu={openSelectMenu}
            openCreateModal={() => setCreateModalOpen(true)}
          />
        )}

        {tabIndex === 1 && (
          <Box sx={{ p: 3, mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" mb={1}>
              {t('totalSpent')}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalSpent} Kč
            </Typography>
          </Box>
        )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem onClick={() => handleMenuItemClick('All')}>{t('itemsAllItems')}</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Beer')}>{t('itemsBeer')}</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Drink')}>{t('itemsDrinks')}</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Shot')}>{t('itemsShots')}</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Food')}>{t('itemsFood')}</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('NonAlco')}>{t('itemsNonAlco')}</MenuItem>
        </Menu>
      </Container>
    </FormProvider>
  );
}
