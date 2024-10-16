import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export const getCurrentUserEmail = () => {
  let email: string | null = '';
  onAuthStateChanged(auth, (user) => {
    if (user) {
      email = user.email;
      return email;
    }
    return email;
  });
  return email;
};
