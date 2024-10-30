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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Tooltip,
  IconButton,
  Toolbar,
  Menu,
} from '@mui/material';
import { Home, Today, AttachMoney, ArrowBack, FilterList } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { formatDate } from '../../helpers/functions/formatDate';
import { IList } from '../../redux/lists/listsSlice';

interface SpendingItem {
  description: string;
  amount: number;
  type: string;
}

interface ListLayoutProps {
  list: IList | undefined;
  t: TFunction<'translation', undefined>;
  navigate: NavigateFunction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockSpendings: SpendingItem[] = [
  { description: 'Beer', amount: 5.0, type: 'Drink' },
  { description: 'Fries', amount: 3.5, type: 'Food' },
  { description: 'Cocktail', amount: 8.0, type: 'Drink' },
  { description: 'Nachos', amount: 4.0, type: 'Snack' },
  { description: 'Whiskey', amount: 10.0, type: 'Drink' },
];

export function ListLayout({ list, t, navigate, setOpen }: ListLayoutProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState<string>('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const filteredSpendings =
    filter === 'All' ? mockSpendings : mockSpendings.filter((item) => item.type === filter);
  const totalSpent = mockSpendings.reduce((total, item) => total + item.amount, 0).toFixed(2);

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
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 500 }}>
          <Toolbar
            sx={[
              {
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              },
            ]}
          >
            <Typography variant="h6" sx={{ flex: '1 1 100%' }} mb={2} component="div">
              {t('spendingDetails')}
            </Typography>
            <Tooltip title="Filter list">
              <IconButton onClick={openSelectMenu} sx={{ mb: 1 }}>
                <FilterList />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem onClick={() => handleMenuItemClick('All')}>{t('allItems')}</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Food')}>{t('food')}</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Drink')}>{t('drink')}</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Snack')}>{t('snack')}</MenuItem>
          </Menu>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('description')}</TableCell>
                  <TableCell>{t('type')}</TableCell>
                  <TableCell align="right">{t('amount')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSpendings.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AttachMoney fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {item.amount.toFixed(2)}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 250, textAlign: 'center' }}>
          <Typography variant="h6" mb={2}>
            {t('totalSpent')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
            ${totalSpent}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label={t('spendingDetails')} />
          <Tab label={t('totalSpent')} />
        </Tabs>

        {tabIndex === 0 && (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Toolbar
              sx={[
                {
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                },
              ]}
            >
              <Typography variant="h6" sx={{ flex: '1 1 100%' }} mb={2} component="div">
                {t('spendingDetails')}
              </Typography>
              <Tooltip title="Filter list">
                <IconButton onClick={openSelectMenu} sx={{ mb: 1 }}>
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem onClick={() => handleMenuItemClick('All')}>{t('allItems')}</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Food')}>{t('food')}</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Drink')}>{t('drinks')}</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Snack')}>{t('snacks')}</MenuItem>
            </Menu>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('description')}</TableCell>
                    <TableCell>{t('type')}</TableCell>
                    <TableCell align="right">{t('amount')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSpendings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AttachMoney fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {item.amount.toFixed(2)}
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {tabIndex === 1 && (
          <Paper elevation={3} sx={{ p: 3, mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" mb={1}>
              {t('totalSpent')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              ${totalSpent}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
