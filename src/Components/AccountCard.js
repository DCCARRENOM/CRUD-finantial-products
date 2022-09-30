import React from "react";
import {useState, useEffect} from 'react';
import '../Styles/AccountCard.css'

function AccountCard( {idUsuario} ){
    console.log(idUsuario)
    const [tieneCuenta, setTieneCuenta] = useState(false);

   useEffect(() =>{
        consultarPersona();
    }, [])

    useEffect(()=>{
        consultarCuenta();
    }, [])


    const [Account, setAccount] = useState({
        number:"",
        password:"",
        owner_id:""
    });

    const [User, setUser] = useState({
        id:"",
        name:"",
        lastname:"",
        address:"",
        email:"",
        password:"",
    })

    const consultarPersona = async () =>{
        const response = await fetch(`http://localhost:8081/person/findById/${idUsuario.id}`)
        const data = await response.json()

        setUser(data)
    }

    const consultarCuenta = async () =>{
        try{
        const response = await fetch(`http://localhost:8081/account/findByOwnerId/${idUsuario.id}`)
        const data = await response.json()

        setTieneCuenta(true)
        setAccount(data)
        }catch (error){
            setTieneCuenta(false);
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        crearCuenta();
    }

    const crearCuenta = () =>{
        let min = 1000000000;
        let max = 9999999999;
        let numCuenta = (Math.round(Math.random() * (max - min) + min))
        let cuenta={
            number: numCuenta,
            password:User.password,
            owner_id:User.id
        };

        sendAccount(cuenta);
    }

    const sendAccount = async (cuenta) => {
        const response = await fetch('http://localhost:8081/account/save', {
          method: 'POST',
          body: JSON.stringify(cuenta),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    }
    
    return(
        <div className="Account-card">
            <h2> Num cuenta: {Account.number}</h2>
            <div className="info-container">
                <p><b>Cedula del propietario: </b>{User.id}</p>
                <p><b>Nombre: </b>{User.name}</p>
                <p><b>Apellido: </b>{User.lastname}</p>
                <p><b>correo: </b>{User.email}</p>
                <p><b>Dirección: </b>{User.address}</p>
            </div>
            <div className="container-boton-cuenta">
                <button className={tieneCuenta ? 'Boton-crear-cuenta' : 'Ocultar-boton'} onClick= {handleClick}>
                    Crear Cuenta
                </button>
            </div>
        </div>
    );
}

export default AccountCard