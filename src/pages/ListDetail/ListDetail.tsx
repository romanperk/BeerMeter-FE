import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserId } from '../../redux/users/userSelectors';
import { useGetListQuery } from '../../redux/lists/listsRtk';

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const userId = useSelector(getUserId)!;
  const { data: list } = useGetListQuery(
    { listId: id || '', userId },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(id, userId);
  return (
    <div>
      <Typography variant="h3">List detail for id: {list?.listId}</Typography>
    </div>
  );
};

export default ListDetail;
