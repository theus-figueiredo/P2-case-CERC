import React, { useContext, useState, useCallback, useEffect } from 'react';
import Context from '../context/Context';
import ErrorMsg from '../components/ErrorMsg';
import axios from 'axios';

export default function UserPage() {
  const [editavel, setEditavel] = useState({email: false, name: false, phone: false});
  const [error, setError] = useState('');
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [phoneDisabled, setPhoneDisabled] = useState(true);
  const [nameDisabled, setNameDisabled] = useState(true);
  const [newUserInfo, setNewUserInfo] = useState({
    email: '',
    name: '',
    phone: '',
  });

  const { userInfo, token, setUserInfo, showError, setShowError } = useContext(Context);
  const { name, email, phone } = userInfo;

  const verifyUpdate = useCallback(() => {
    const { email, name, phone} = newUserInfo;
    const regexEmail = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const two = 2
    const eight = 8

    if (regexEmail.test(email)) {
      setEmailDisabled(false);
    }else{
      setEmailDisabled(true);
    }

    if (name.length >= two) {
      setNameDisabled(false);
    }else {
      setNameDisabled(true);
    };

    if(phone.length >= eight) {
      setPhoneDisabled(false);
    }else {
      setPhoneDisabled(true);
    }
  }, [newUserInfo]);

  useEffect(() => { verifyUpdate(); }, [newUserInfo, verifyUpdate, userInfo]);

  const handleEditClick = ({ target: { id } }) => {
    setEditavel({...editavel, [id]: !editavel[id]});
  };

  const handleInputChange = ({ target: { value, id } }) => setNewUserInfo({ ...newUserInfo, [id]: value });

  const updateUserInformation = async ({ target: { id } }) => {
    try {
      const config = {
        headers: { auth: token },
      };

      const dataToUpdate = {
        newInfo: {position: id, newValue: newUserInfo[id] }
      }

      await axios.patch(`http://localhost:3001/users/${userInfo._id}`, dataToUpdate, config);

      setUserInfo({ ...userInfo, [id]: newUserInfo[id] });
      setEditavel({...editavel, [id]: !editavel[id]});
      setNewUserInfo({...newUserInfo, [id]: '' });
      if(id === 'email') setEmailDisabled(true);
      if(id === 'name') setNameDisabled(true);
      if(id === 'phone') setPhoneDisabled(true);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        setShowError(true);
      };
    };
  };

  return (
    <div className='p-5 text-center' style={ { margin: 13 + '%' } }>
      <div className='list-group w-auto'>
      {showError && <ErrorMsg message={error}/>}
        <a href='#' className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current="true">
          <div className='d-flex gap-2 w-100 justify-content-between'>
            <div>
              <h6 className='mb-0'>Nome:</h6>
              {!editavel.name && <p className='mb-0 opacity-75'>{ name }</p>}
              {editavel.name  && <input type="email" placeholder="Novo nome" onChange={handleInputChange} id="name"/>}
            </div>
            {!editavel.name && <small className='opacity-50 text-nowrap' id="name" onClick={ handleEditClick }>Editar</small>}
            {editavel.name && <button type="button" id="name" className='btn btn-dark btn-sm' disabled={nameDisabled} onClick={ updateUserInformation }>Salvar</button>}
            {editavel.name  && <small className='opacity-50 text-nowrap' id="name" onClick={ handleEditClick }>Cancelar</small>}
          </div>
        </a>
        <a href='#' className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current="true">
          <div className='d-flex gap-2 w-100 justify-content-between'>
            <div>
              <h6 className='mb-0'>Email:</h6>
              {!editavel.email && <p className='mb-0 opacity-75'>{ email }</p>}
              {editavel.email  && <input type="email" placeholder="Novo email" onChange={handleInputChange} id="email"/>}
            </div>
            {!editavel.email && <small className='opacity-50 text-nowrap' id="email" onClick={ handleEditClick }>Editar</small>}
            {editavel.email && <button type="button" id="email" className='btn btn-dark btn-sm' disabled={emailDisabled} onClick={ updateUserInformation }>Salvar</button>}
            {editavel.email  && <small className='opacity-50 text-nowrap' id="email" onClick={ handleEditClick }>Cancelar</small>}
          </div>
        </a>
        <a href='#' className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current="true">
          <div className='d-flex gap-2 w-100 justify-content-between'>
            <div>
              <h6 className='mb-0'>Telefone:</h6>
              {!editavel.phone && <p className='mb-0 opacity-75'>{ phone }</p>}
              {editavel.phone  && <input type="number" placeholder="Novo Telefone" onChange={handleInputChange} id="phone"/>}
            </div>
            {!editavel.phone && <small className='opacity-50 text-nowrap' id="phone" onClick={ handleEditClick }>Editar</small>}
            {editavel.phone && <button type="button" id="phone" className='btn btn-dark btn-sm' disabled={phoneDisabled} onClick={ updateUserInformation }>Salvar</button>}
            {editavel.phone  && <small className='opacity-50 text-nowrap' id="phone" onClick={ handleEditClick }>Cancelar</small>}
          </div>
        </a>
      </div>
    </div>
  );
};
