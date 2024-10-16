import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../redux/users/userRtk';

const auth = getAuth();

export const useFetchUser = () => {
  const [uid, setUid] = useState<string | null>(null);

  const {
    data: user,
    error,
    isLoading,
    refetch: refetchUser,
  } = useGetUserQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, error, isLoading, refetchUser };
};
