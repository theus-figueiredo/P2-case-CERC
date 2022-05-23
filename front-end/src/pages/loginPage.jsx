import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';
import ErrorMsg from '../components/ErrorMsg';

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [errorMessage, setError] = useState('');
  const { setUserInfo, setToken, setShowError } = useContext(Context);

  const navigate = useNavigate();

  const handleInputChange = ({ target: { id, value } }) => setLoginInfo({ ...loginInfo, [id]: value });

  const handleLoginClick = async () => {
    try{
      const { email, password } = loginInfo;
      const { data } = await axios.post('http://localhost:3001/login', { email, password });
      const redirectlink = `/users/${ data.userInfo._id }`;

      setUserInfo(data.userInfo);
      setToken(data.token);
      setShowError(false);
      navigate(redirectlink);

    }catch (error) {
      if (error.response) {

        setError(error.response.data.message);
        setShowError(true);

      } else if (error.request) console.log(error.request);
    };
  };

  const handleRegisterClick = () => {
    const redirectLink = '/register';
    setShowError(false);
    navigate(redirectLink);
  };

  return (
    <div className='p-5 text-center bg-light' style={ { margin: 13 + '%' } }>
      <h2 className='h2 mb-2 fw-normal'>Portal Publica</h2>
      <div className='sign-in'>
        <form>
          <div className='form-floating'>
          <h1 className='h3 mb-3 fw-normal'>Login</h1>
            {errorMessage.length > 0 && <ErrorMsg message={ errorMessage } />}
            <input
              placeholder='Email'
              id='email'
              type="email"
              onChange={ handleInputChange }
            />
          </div>
          <div>
            <input
              placeholder='Senha'
              id='password'
              type='password'
              onChange={ handleInputChange }
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
