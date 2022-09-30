import React from "react";
import { useState, useEffect } from "react";
import Item from "./Item";
import "../Styles/ItemsCard.css";
import Modal from "react-bootstrap/Modal";

function ItemsCard({ idUsuario }) {
  console.log(idUsuario.id);

  /*useEffect(() =>{
        consultarPersona();
    }, [])*/

  useEffect(() => {
    consultarCuenta();
  }, []);

  const [showCreate, setShowCreate] = useState(false);
  const [Cards, setCards] = useState({
    1: {
      cvc: "",
      number: "",
      expiration_date: "",
      account_id: "",
    },
  });

  const [newCard, setNewCard] = useState({
    type: "",
    date: "",
  });

  const [Transactions, setTransactions] = useState();
  let prueba = [1, 2, 3, 4];

  const [Account, setAccount] = useState({
    id: "",
    number: "",
    password: "",
    owner_id: "",
  });

  const [User, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    address: "",
    email: "",
    password: "",
  });

  /*const consultarPersona = async () =>{
        const response = await fetch(`https://crud-financial-products.herokuapp.com/person/findById/${idUsuario.id}`)
        const data = await response.json()

        setUser(data)
    }*/

  const consultarCuenta = async () => {
    const response = await fetch(
      `https://crud-financial-products.herokuapp.com/account/findByOwnerId/${idUsuario.id}`
    );
    const data = await response.json();

    setAccount(data);
    consultarTarjetas(data);
  };

  const consultarTarjetas = async (datos) => {
    const response = await fetch(
      `https://crud-financial-products.herokuapp.com/card/findByAccountIdentification/${datos.id}`
    );
    const data = await response.json();

    setCards(data);
  };

  const manejarCambioTarjeta = (e) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    console.log(newCard.date);
  };

  const manejarEnvioTarjeta = (e) => {
    e.preventDefault();
    if (newCard.type === "credito") {
      createCard();
    } else {
      if (newCard.type === "debito") {
        createCard();
      } else {
        alert("Ingrese un valor valido");
      }
    }
  };

  const createCard = () => {
    let minNum = 1000000000000000;
    let maxNum = 9999999999999999;
    let minId = 100;
    let maxId = 999;
    let minCvc = 100;
    let maxCvc = 999;
    let nuevaTarjeta = {
      cvc: Math.round(Math.random() * (maxCvc - minCvc) + minCvc),
      expiration_date: newCard.date + "T12:46:19-0700",
      number: Math.round(Math.random() * (maxNum - minNum) + minNum),
      account_id: Account.id,
    };
    console.log(nuevaTarjeta);
    sendNewCard(nuevaTarjeta);
  };

  const sendNewCard = async (Tarjeta) => {
    const response = await fetch(
      "https://crud-financial-products.herokuapp.com/card/save",
      {
        method: "POST",
        body: JSON.stringify(Tarjeta),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (newCard.type === "credito") {
      sendCreditCard(data);
    } else {
      if (newCard.type === "debito") {
        sendDebitCard(data);
      }
    }
  };

  const sendCreditCard = async (data) => {
    let minDeb = 1000000;
    let maxDeb = 9999999;
    let TarjetaCredito = {
      debt: 0,
      quota: Math.round(Math.random() * (maxDeb - minDeb) + minDeb),
      card_id: data.id,
    };
    const response = await fetch(
      "https://crud-financial-products.herokuapp.com/credit/save",
      {
        method: "POST",
        body: JSON.stringify(TarjetaCredito),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert("Producto Creado");
  };

  const sendDebitCard = async (data) => {
    let minDeb = 1000000;
    let maxDeb = 9999999;
    let TarjetaDebito = {
      balance: Math.round(Math.random() * (maxDeb - minDeb) + minDeb),
      card_id: data.id,
    };
    const response = await fetch(
      "https://crud-financial-products.herokuapp.com/debit/save",
      {
        method: "POST",
        body: JSON.stringify(TarjetaDebito),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert("Producto Creado");
  };

  return (
    <>
      <div className="Items-card">
        {Object.entries(Cards).map(([key, value]) => {
          return <Item Card={value} />;
        })}

        <div className="container-boton-productos">
          <button
            className="boton-productos"
            onClick={() => setShowCreate(true)}
          >
            Crear Producto
          </button>
        </div>
      </div>

      <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Ingresar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formulario" onSubmit={manejarEnvioTarjeta}>
            <label>Escriba el tipo de tarjeta que desea crear</label>
            <input
              className="login-input"
              type="text"
              placeholder="Credito o Debito"
              name="type"
              onChange={manejarCambioTarjeta}
            />
            <label>Selecciona la fecha</label>
            <input
              className="login-input"
              type="date"
              placeholder="Credito o Debito"
              name="date"
              onChange={manejarCambioTarjeta}
            />
            <button className="login-boton">Ingresar</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemsCard;
