import React from "react";
import '../Styles/Item.css'

function Item ( {Card}) {
    console.log(Card.cvc)
    return(
        <div className='item-container' >
            <div className='item'>
                <p>Tarjeta</p>
                <p><b>CVC: </b>{Card.cvc}</p>
                <p><b>Number: </b>{Card.number}</p>
            </div>
      </div>
    )
}

export default Item