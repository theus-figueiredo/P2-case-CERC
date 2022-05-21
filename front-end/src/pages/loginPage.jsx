import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleLoginClick = async () => {
    try{
      const canLogin = await axios.post('http://localhost:3001/login', { email, password });
      const redirectlink = `/registro/${ canLogin._id }`;
      navigate(redirectlink);
    }catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) console.log(error.request);
    }
  };

  return (
    <div className='text-center'>
      <div className='sign-in'>
        <form>
          <h1 className='h3 mb-3 fw-normal'>Login</h1>
          {errorMessage.length > 0 && <h4>{ errorMessage }</h4>}
          <div className='form-floating'>
            <input
              placeholder='Email'
              type="email"
              onChange={ handleEmailChange }
            />
            <input
              placeholder='Senha'
              type='password'
              onChange={ handlePasswordChange }
            />
          </div>
          <br />
          <button 
            type='button'
            className='btn btn-lg btn-primary'
            onClick={ handleLoginClick }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
