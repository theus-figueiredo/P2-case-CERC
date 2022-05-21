import React, { useState } from 'react';
import Context from "./Context";

export default function Provider({ children }) {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const context = {
    token,
    setToken,
    userId,
    setUserId,
  };

  return (
    <Context.Provider value={ context } >
      { children }
    </Context.Provider>
  );
};
