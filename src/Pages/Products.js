import React from "react";
import '../Styles/Products.css';
import AccountCard from "../Components/AccountCard";
import ItemsCard from "../Components/ItemsCard";
import Banner from "../Components/Banner";
import { useLocation } from 'react-router-dom';

function Products (){
    const {state} = useLocation();
    const id = state;

    return(
        <>
            <div className="Banner-Container"><Banner /></div>
            <div className="principal-container">
                <AccountCard idUsuario={id}/>
                <ItemsCard idUsuario={id}/>
            </div>
        </>
    );
}

export default Products