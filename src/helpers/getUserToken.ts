import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export const getUserToken = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await getIdToken(user);
          resolve(token);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};
