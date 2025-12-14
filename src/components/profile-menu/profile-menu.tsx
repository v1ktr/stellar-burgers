import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store/store';
import { logoutUser } from '../../services/thunk/userThunk';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        <Navigate replace to='/' />;
      })
      .catch((err) => {
        console.error('Ошибка выхода:', err);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
