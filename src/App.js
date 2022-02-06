import React, { useState } from 'react';
import NotFound from './components/NotFound';
import Details from './components/Details';
import Main from './components/MainComponent';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Login from './components/Login';
import { useAuth, UserAuthContext } from './useContext';
import Loading from './components/Loading';
import Profile from './components/Profile';

function CheckAuthentication() {
  const { user } = useAuth();
  if (!user && localStorage.getItem("user")) {
    return <Loading />
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

function App() {
  const [isDark, setIsDark] = useState(false);

  const theme = createTheme({
    palette: {
      mode: !isDark ? 'light' : 'dark',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0}>
        <CssBaseline />
        <BrowserRouter>
          <UserAuthContext>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<CheckAuthentication />} >
                <Route path="" element={<Main isDark={isDark} setIsDark={setIsDark} />} />
                <Route path="me" element={<Profile isDark={isDark} setIsDark={setIsDark} />} />
                <Route path="details" element={<Details isDark={isDark} setIsDark={setIsDark} />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserAuthContext>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
