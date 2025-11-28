import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store/store';
import { selectUser } from '../../services/selector/userSelector';
import { updateUser } from '../../services/thunk/userThunk';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      })
    )
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({ ...prev, password: '' }));
      })
      .catch((err) => {
        console.error('Ошибка обновления данных пользолвателя:', err);
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
