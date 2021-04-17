import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Modal1 from './components/Modal';
import ListContact from './components/ListContact';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from '@material-ui/core';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  }


  return (
    <div className="container-fluid">
      <Header/>
      <div className="p-3" align="center">
        <Button
          onClick={openCloseModal}
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}>
          Agregar Nuevo Contacto
        </Button>
      </div>

      <Modal1
        isOpen={isOpenModal}// en el componente modal.js es el parametro que llega llamado isOpen
        closeModal={openCloseModal}// en el componente modal.js es el parametro que llega llamado closeModal
      />
      <div className="container">
        <ListContact />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
