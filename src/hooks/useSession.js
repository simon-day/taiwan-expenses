import { useContext } from 'react';
import UserContext from '../context/UserContext';

export const useSession = () => {
  const { user } = useContext(UserContext);
  return user;
};
