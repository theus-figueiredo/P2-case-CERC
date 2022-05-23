import React, { useContext } from 'react';
import Context from '../context/Context';

export default function ErrorMsg(props) {
  const { showError, setShowError } = useContext(Context);

  function handleCloseClick () {
    setShowError(false);
  }

  return (
    <div>
      {
        showError &&
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>Erro!</strong> {props.message}.
          <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={ handleCloseClick }></button>
        </div>
      }
    </div>
  );
}