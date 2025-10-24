import React from 'react';
import '../components/Login.css';
import Estilos from '../styles/Estilos';

export default function MonitoramentoPlantio() {
    return (
        <div className="container">
            <h1 className="titulo">Monitoramento do Plantio</h1>
            
            <h2 className="subtitulo">Morango <span role="img" aria-label="morango">🍓</span></h2>
            
            <img 
                src="https://cdn.pixabay.com/photo/2017/01/12/14/37/strawberries-1970677_1280.jpg" 
                alt="Morangos" 
                className=""
            />
            
            <p className="descricao">
                Monitoramento da fruta para evitar situações de fungos e doenças
            </p>
        </div>
    );
}
