import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Navigate } from 'react-router';
import { useDispatch } from '../../services/store/store';
import { registerUser } from '../../services/thunk/userThunk';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, password, email }))
      .unwrap()
      .then(() => {
        <Navigate replace to='/login' />;
      })
      .catch((err) => {
        console.error('Ошибка регистрации:', err);
      });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
