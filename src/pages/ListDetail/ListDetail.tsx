import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ListDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Typography variant="h3">List detail for id: {id}</Typography>
    </div>
  );
};

export default ListDetail;
