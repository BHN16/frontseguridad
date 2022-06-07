import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


/*root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);*/
