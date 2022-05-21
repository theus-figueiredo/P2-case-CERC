import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');
  const { setUserId, setToken } = useContext(Context);

  const navigate = useNavigate();

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleLoginClick = async () => {
    try{
      const { data } = await axios.post('http://localhost:3001/login', { email, password });
      const redirectlink = `/user/${ data.id }`;
      setUserId(data.id);
      setToken(data.token);
      navigate(redirectlink);
    }catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) console.log(error.request);
    }
  };

  const handleRegisterClick = () => {
    const redirectLink = '/register';
    navigate(redirectLink);
  };

  return (
    <div className='text-center'>
      <div className='sign-in'>
        <form>
          <h1 className='h3 mb-3 fw-normal'>Login</h1>
          <div className='form-floating'>
            {errorMessage.length > 0 && <h5>{ errorMessage }</h5>}
            <input
              placeholder='Email'
              type="email"
              onChange={ handleEmailChange }
            />
          </div>
          <div>
            <input
              placeholder='Senha'
              type='password'
              onChange={ handlePasswordChange }
            />
          </div>
          <br />
          <button 
            type='button'
            className='btn btn-sm btn-primary'
            onClick={ handleLoginClick }
          >
            Entrar
          </button>
          <br />
          <br />
          <button
              type='button'
              className='btn btn-sm btn-secondary'
              onClick={ handleRegisterClick }
            >
              Criar uma conta
            </button>
        </form>
      </div>
    </div>
  );
};
