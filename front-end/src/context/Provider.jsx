import React, { useState } from 'react';
import Context from "./Context";

export default function Provider({ children }) {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const context = {
    token,
    setToken,
    userInfo,
    setUserInfo,
    showError,
    setShowError,
    showSuccess,
    setShowSuccess
  };

  return (
    <Context.Provider value={ context } >
      { children }
    </Context.Provider>
  );
};
