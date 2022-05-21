import React from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};