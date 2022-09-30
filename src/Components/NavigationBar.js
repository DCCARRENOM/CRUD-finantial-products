import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/NavigationBar.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {Routes, Route, useNavigate} from 'react-router-dom';



function NavigationBar (props) {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const [usuario, setInput] = useState({
    id: "",
    password:""
  });

  const [newUser, setNewUser] = useState({
    id:"",
    name:"",
    lastname:"",
    address:"",
    email:"",
    password:"",
  })

  const sendNewUser = async (user) =>{
    try{
      user.id = parseInt(user.id)
      const response = await fetch('https://crud-financial-products.herokuapp.com/person/save', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log(data)
      alert("Usuario registrado")
  
    }catch (error){
      alert("Ingrese datos Validos");
    }
  }

  const sendLogin = async (User) =>{
    /*User.id = parseInt(User.id)*/
    const response = await fetch(`https://crud-financial-products.herokuapp.com/person/login?id=${User.id}&password=${User.password}`)
    const data = await response.json()

    if(data){
      navigate('/products', {state: {id: usuario.id}});
    }
    }
  

  const manejarCambioLogin = (e) => {
    setInput({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const manejarCambioRegister = (e) =>{
    setNewUser({
      ...newUser,
      [e.target.name]:e.target.value
    });
  };

  const manejarEnvioLogin = (e) => {
    e.preventDefault();
    sendLogin(usuario);
  };

  const manejarEnvioRegister = (e) =>{
    e.preventDefault();
    console.log(newUser);
    sendNewUser(newUser);
  }


    return(
      <>
        <Navbar >
        <Container >
          <Navbar.Brand className="Texto" href="home">Productos Financieros</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="Texto" onClick={()=>setShowLogin(true)}>Ingresar</Nav.Link>
                <Nav.Link className="Texto" onClick={()=>setShowRegister(true)}>Registrar</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Ingresar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='formulario' onSubmit={manejarEnvioLogin}>
            <input 
              className='login-input' 
              type='text' 
              placeholder='Escriba su usuario' 
              name='id'
              onChange={manejarCambioLogin}
            />
            <input 
              className='login-input' 
              type='text' 
              placeholder='Escriba su contraseña' 
              name='password'
              onChange={manejarCambioLogin}
            />
            <button className='login-boton'>
              Ingresar
            </button>
            </form>
        </Modal.Body>
      </Modal>
      {/*MODAL REGISTER*/}
      <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Registrarse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formulario-container">
            <form className='formulario' onSubmit={manejarEnvioRegister}>
            <label className="label"> Numero de Cedula</label>
              <input 
                className='input' 
                type='text' 
                placeholder='Escriba su numero de Cedula' 
                name='id'
                onChange={manejarCambioRegister}
              />
              <label className="label"> Nombre</label>
              <input 
                className='input' 
                type='text' 
                placeholder='Escriba su nombre' 
                name='name'
                onChange={manejarCambioRegister}
              />
              <label className="label">Apellido</label>
              <input 
                className='input' 
                type='text' 
                placeholder='Escriba su apellido' 
                name='lastname'
                onChange={manejarCambioRegister}
              />
              <label className="label">Dirección</label>
              <input 
                className='input' 
                type='text' 
                placeholder='Escriba su dirección' 
                name='address'
                onChange={manejarCambioRegister}
              />
              <label className="label">Correo</label>
              <input 
                className='input' 
                type='text' 
                placeholder='Escriba su correo electronico' 
                name='email'
                onChange={manejarCambioRegister}
              />
              <label className="label"> Contraseña</label>
              <input 
                className='input' 
                type='text' 
                placeholder='Escriba su contraseña' 
                name='password'
                onChange={manejarCambioRegister}
              />

              <button className='register-boton' >
                Registrarse
              </button>
              </form>
            </div>
        </Modal.Body>
      </Modal>
    </>    
    );
}


export default NavigationBar