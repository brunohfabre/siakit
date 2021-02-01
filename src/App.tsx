import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyle />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
