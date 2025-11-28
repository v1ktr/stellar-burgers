import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  AppHeader,
  OrderInfo,
  ProtectedRoute,
  Modal,
  IngredientDetails
} from '@components';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store/store';
import { isAuthChecked } from '../../services/slice/userSlice';
import { getUser } from '../../services/thunk/userThunk';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getUser());
    } else {
      dispatch(isAuthChecked());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal onClose={() => goBack()} title='Детали заказа'>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={() => goBack()} title='Ингредиенты'>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
          <Routes>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal onClose={() => goBack()} title='Детали заказа'>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
