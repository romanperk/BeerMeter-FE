import axios from 'axios';
import { IUser } from '../../redux/users/authSlice';

export const createUser = async (email: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', {
      email,
    });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const getUser = async (email: string): Promise<IUser | null> => {
  try {
    const response = await axios.get<IUser>(`http://localhost:5000/api/users/getUser/${email}`);
    console.log('User retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null;
  }
};

export const updateUserInfo = async (
  email: string | undefined,
  firstName: string,
  lastName: string,
  favDrink: string
) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/updateUserInfo/${email}`, {
      firstName,
      lastName,
      favDrink,
    });
    console.log('User updated:', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
