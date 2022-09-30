import React from "react";
import {useState} from 'react';
import Item from './Item';
import '../Styles/ItemsCard.css';
import Modal from 'react-bootstrap/Modal';

function ItemsCard(idUsuario){
    const[showCreate,setShowCreate] = useState(false);
    const [Cards, setCards] = useState();
    const [Transactions, setTransactions] = useState();
    let prueba= [1,2,3,4];
    
    const handleClick = (e) =>{

    }

    return(
        <>  
            <div className="Items-card">
                {/*map de las cards y transacciones*/}
                {
                    prueba.map ((prueba)=> <Item props={prueba}/>)
                }

                <div className="container-boton-productos">
                        <button className="boton-productos" onClick={handleClick}>
                            Crear Producto
                        </button>
                </div>
            </div>

            <Modal
            show={showCreate}
            onHide={() => setShowLogin(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">
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
        </>
    );
}

export default ItemsCard