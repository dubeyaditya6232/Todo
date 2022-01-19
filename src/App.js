import React from 'react';
import NotFound from './components/NotFound';
import Details from './components/Details';
import Main from './components/MainComponent';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'
import { configureStore } from './redux/configureStore';

const store = configureStore();

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<Main />} />
          <Route exact path="/details" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
