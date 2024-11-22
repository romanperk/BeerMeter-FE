import { MoreVert } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import { IItem } from '../../redux/items/itemsSlice';

interface ListItemsTableProps {
  t: TFunction<'translation', undefined>;
  items: IItem[];
  openEditMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export function ListItemsTable({ items, openEditMenu, t }: ListItemsTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('itemName')}</TableCell>
            <TableCell>{t('itemType')}</TableCell>
            <TableCell>{t('itemSize')}</TableCell>
            <TableCell>{t('itemAmount')}</TableCell>
            <TableCell>{t('itemPrice')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell align="right">{item.amount}</TableCell>
              <TableCell align="right">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                >
                  {item.price} Kč
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton onClick={openEditMenu}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
