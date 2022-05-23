import React from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import UserPage from '../pages/UserPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <LoginPage />} />
        <Route path='/register' element={ <RegistrationPage /> } />
        <Route path='/users/:id' element={ <UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};