import { Add, FilterList, MoreVert } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import { IItem } from '../../redux/items/itemsSlice';
import { isItemBeverage } from './helpers/isItemBeverage';
import { useState } from 'react';

interface ListItemsTableProps {
  t: TFunction<'translation', undefined>;
  items: IItem[];
  openSelectMenu: (event: React.MouseEvent<HTMLElement>) => void;
  openCreateModal: (event: React.MouseEvent<HTMLElement>) => void;
  handleIcreaseItemAmount: (itemId: string) => Promise<void>;
}

export function ListItemsTable({
  items,
  t,
  openSelectMenu,
  openCreateModal,
  handleIcreaseItemAmount,
}: ListItemsTableProps) {
  const [anchorElEdit, setAnchorElEdit] = useState<HTMLElement | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const openEditMenu = (event: React.MouseEvent<HTMLElement>, itemId: string) => {
    setAnchorElEdit(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const closeEditMenu = () => {
    setAnchorElEdit(null);
    setSelectedItemId(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: { xs: 2, md: 0 } }}>
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
        <Tooltip title="Add item">
          <IconButton onClick={openCreateModal} sx={{ mb: 1 }}>
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter list">
          <IconButton onClick={openSelectMenu} sx={{ mb: 1 }}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('itemName')}</TableCell>
              <TableCell align="center">{t('itemSize')}</TableCell>
              <TableCell align="center">{t('itemAmount')}</TableCell>
              <TableCell align="center">{t('itemPrice')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{isItemBeverage(item.type) ? item.size : '-'}</TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                    >
                      {item.price} Kč
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => openEditMenu(event, item.itemId)}>
                      <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorElEdit} open={Boolean(anchorElEdit)} onClose={closeEditMenu}>
                      <MenuItem
                        onClick={() => {
                          if (selectedItemId) {
                            handleIcreaseItemAmount(selectedItemId);
                            closeEditMenu();
                          }
                        }}
                      >
                        {t('itemIncreaseAmount')}
                      </MenuItem>
                      <MenuItem>{t('itemDecreaseAmount')}</MenuItem>
                      <MenuItem>{t('itemEdit')}</MenuItem>
                      <MenuItem>{t('itemDelete')}</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
