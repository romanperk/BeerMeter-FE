import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBreakpoints } from '../../helpers/functions/useBreakpoints';
import { useNavigate } from 'react-router-dom';
import { ListsLayout } from '../../containers/Lists/ListsLayout';
import { CreateListModal } from '../../containers/Lists/CreateListModal';
import { useCreateListMutation, useGetListsQuery } from '../../redux/lists/listsRtk';
import { IList } from '../../redux/lists/listsSlice';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserId } from '../../redux/users/userSelectors';

export interface SetUpListFormProps {
  place: string;
  type: string;
}

export function Lists() {
  const userId = useSelector(getUserId);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { downSm } = useBreakpoints();
  const [createList] = useCreateListMutation();
  const [open, setOpen] = useState(false);
  const {
    data: lists,
    isLoading,
    refetch: refetchLists,
  } = useGetListsQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      searchQuery: '',
      place: '',
      type: '',
    },
  });

  const onSubmit = async (data: SetUpListFormProps) => {
    if (userId) {
      try {
        await createList({
          userId,
          ...data,
        }).unwrap();
        setOpen(false);
        // showSnackBarSuccess('User updated');
        refetchLists();
      } catch {
        // showSnackBarError('User not updated');
      }
    }
  };

  const [isAscending, setIsAscending] = useState(false);

  const searchQuery = watch('searchQuery');

  const sortLists = (listArray: IList[]): IList[] => {
    return listArray?.sort((a, b) => {
      const dateA = new Date(a.createdAt!).getTime();
      const dateB = new Date(b.createdAt!).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredItems = sortLists(
    lists?.filter((item: IList) =>
      item.place
        ?.toLowerCase()
        .split(' ')
        .some((word) => word.startsWith(searchQuery.toLowerCase()))
    )
  );

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <>
      {!isLoading && (
        <>
          <ListsLayout
            t={t}
            navigate={navigate}
            downSm={downSm}
            register={register}
            places={filteredItems}
            isAscending={isAscending}
            toggleSortOrder={toggleSortOrder}
            setOpen={setOpen}
          />
          <CreateListModal
            t={t}
            open={open}
            handleClose={() => setOpen(false)}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
          />
        </>
      )}
    </>
  );
}
