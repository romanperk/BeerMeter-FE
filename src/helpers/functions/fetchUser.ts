import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../redux/users/userRtk';
import supabase from '../../services/supabase';

export const useFetchUser = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const {
    data: user,
    error,
    isLoading,
    refetch: refetchUser,
  } = useGetUserQuery(userId || '', {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserId(session.user.id);
      } else {
        setUserId(null);
      }
    });

    const fetchUserSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserId(data.user.id);
      }
    };
    fetchUserSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, error, isLoading, refetchUser };
};
