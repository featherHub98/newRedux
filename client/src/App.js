// App.js (Final Structure)
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/loginPage/loginPage.tsx';
import NavBar from './components/navBar/navBar.tsx';
import UploadPage from './components/uploadPage/uploadPage.tsx';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './components/homePage/HomePage.tsx'; 
import DashboardPage from './components/dashboardPage/DashboardPage.tsx'; 
import { useEffect } from 'react';
import { initializeAuth } from './redux/reducers/loginSlice.tsx';
import RegisterPage from './components/registerPage/registerPage.tsx';


const ProtectedRoute = ({ isLoggedIn, element: Element }) => {
  return isLoggedIn ? Element : <Navigate to="/login" replace />;
};

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn || false);
  
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? <NavBar /> : null}
        <Routes>
          <Route 
            path='/' 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <HomePage />} 
          />
          <Route 
            path='/login' 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path='/register' 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
          />
          <Route 
            path='/dashboard' 
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<DashboardPage />} />} // 👈 USES DashboardPage
          />
          <Route 
            path='/upload' 
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<UploadPage />} />} 
          />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;