import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { Navigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  selectUser,
  selectUserError,
  selectUserIsAuthChecked
} from '../../services/selector/userSelector';
import { loginUser } from '../../services/thunk/userThunk';
import { hideError } from '../../services/slice/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthChecked = useSelector(selectUserIsAuthChecked);
  const user = useSelector(selectUser);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (error) {
      dispatch(hideError());
    }
    if (isAuthChecked && user) {
      <Navigate replace to={from} />;
    }
  }, [isAuthChecked, user, location]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ password, email }))
      .unwrap()
      .then(() => {
        <Navigate replace to={from} />;
      })
      .catch((err) => {
        console.error('Ошибка авторизации:', err);
      });
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
