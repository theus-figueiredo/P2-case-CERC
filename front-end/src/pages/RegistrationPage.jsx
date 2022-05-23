import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';
import Context from '../context/Context';
import axios from 'axios';


export default function RegistrationPage() {
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    name: '',
    phone: 0,
    password1: '',
    password2: ''
  });
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { showError, setShowError, setUserInfo } = useContext(Context);

  const navigate = useNavigate();

  const verifyRegister = useCallback(() => {
    const { email, name, phone, password1, password2 } = registerInfo;
    const regexEmail = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const two = 2
    const eight = 8
    const passwordsMatch = password1 === password2;
    const passwordsLengthOk = password1.length >= 5

    if(regexEmail.test(email) && passwordsMatch && passwordsLengthOk && name.length > two && phone.length >= eight) {
      setDisabled(false);
    }else {
      setDisabled(true);
    }
  }, [registerInfo]);

  useEffect(() => { verifyRegister(); }, [registerInfo, verifyRegister]);

  const handleInputChange = ({ target: { id, value } }) => setRegisterInfo({ ...registerInfo, [id]: value });

  const handleRegisterClick  = async() => {
    try {
      const { email, password1, name, phone } = registerInfo;
      const { data } = await axios.post('http://localhost:3001/register', { email, password: password1, name, phone });

      setUserInfo(data);
      navigate(`/users/${data._id}`);

    } catch (error) {
      console.log(error);
      if (error.response) {

        setErrorMsg(error.response.data);
        setShowError(true);
      } else if (error.request) console.log(error.request);
    };
  };

  return (
  <div className='p-5 bg-light' style={ { margin: 7 + '%' } } >
      <form>
        <div className="form-group">
          {showError && <ErrorMsg message={ errorMsg } />}
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={ handleInputChange } />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input type="text" className="form-control" id="name" placeholder="Nome" onChange={ handleInputChange } />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input type="number" className="form-control" id="phone" placeholder="Telefone" onChange={ handleInputChange } />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Senha:</label>
          <input type="password" className="form-control" id="password1" placeholder="Digite a senha" onChange={ handleInputChange }/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirme a senha:</label>
          <input type="password" className="form-control" id="password2" placeholder="Digite a senha novamente" onChange={ handleInputChange } />
        </div>
          <button type="button" className="btn btn-primary" style={ {marginTop: 15 + 'px'}} disabled={disabled} onClick={ handleRegisterClick }>Cadastrar</button>
      </form>
    </div>
  );
};
