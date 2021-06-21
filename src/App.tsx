import React from 'react';
import './styles/global.css';

import { Header } from './components/Header';
import { Main } from './pages/Main';
  
function App() {
  return (
    <>
      <Header />
      <Main />
    </>  
  );
}

export default App;
