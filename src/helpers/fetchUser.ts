import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../redux/users/userRtk';

const auth = getAuth();

const getCurrentUserUid = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

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
    const fetchUid = async () => {
      const currentUid = await getCurrentUserUid();
      setUid(currentUid);
    };

    fetchUid();
  }, []);

  return { user, error, isLoading, refetchUser };
};
