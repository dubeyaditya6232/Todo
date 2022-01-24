import React, { useState} from 'react';
import NotFound from './components/NotFound';
import Details from './components/Details';
import Main from './components/MainComponent';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

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
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              exact path="/home"
              element={<Main
                isDark={isDark}
                setIsDark={setIsDark}
              />} />
            <Route exact path="/details" element={<Details isDark={isDark} setIsDark={setIsDark} />} />
            <Route path="*" element={<NotFound isDark={isDark} setIsDark={setIsDark} />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
