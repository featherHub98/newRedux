import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './components/loginPage/loginPage.tsx';
import NavBar from './components/navBar/navBar.tsx';
import UploadPage from './components/uploadPage/uploadPage.tsx';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './components/homePage/HomePage.tsx';
import { useEffect } from 'react';
import { initializeAuth } from './redux/reducers/loginSlice.tsx';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  // Initialize auth state on app load
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? <NavBar /> : null}
        <Routes>
          <Route path='/' element={!isLoggedIn ? <LoginPage /> :null} />
          <Route 
            path='/upload' 
            element={isLoggedIn ? <UploadPage /> : <LoginPage />} 
          />
          <Route 
            path='/home' 
            element={isLoggedIn ? <HomePage /> : <LoginPage />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;