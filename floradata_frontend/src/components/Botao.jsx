import React, { useState } from 'react';

const Botao = ({ tipo, children, width, height, onClick, type = "button" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Defina os estilos para cada tipo de botão
  const estilosBotao = {
    verde: {
      backgroundColor: 'oklch(64.8% 0.2 131.684)',
      color: 'white',
      fontWeight: 'bold',
      border: '2px solid oklch(76.8% 0.233 130.85)',
      borderRadius: '0.5rem',
      padding: '10px 20px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: '0.3s',
      width: width || '100%',
      height: height || 'auto',
      maxWidth: '50%',
      ...(isHovered && {
        backgroundColor: '#6fa23e',
        border: '2px solid #43752d',
      }),
    },
    bege: {
      backgroundColor: '#FFF8D8',
      color: '#432716',
      fontWeight: 'bold',
      border: '2px solid oklch(93.3% 0.065 92.39)',
      borderRadius: '0.5rem',
      padding: '10px 20px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: '0.3s',
      width: width || '100%',
      height: height || 'auto',
      maxWidth: '50%',
      ...(isHovered && {
        backgroundColor: '#f6edb0',
        border: '2px solid #FFF8D8',
      }),
    },
    vermelho: {
      backgroundColor: '#D30F0F',
      color: 'white',
      fontWeight: 'bold',
      border: '2px solid oklch(54.3% 0.708 6.12)',
      borderRadius: '0.5rem',
      padding: '10px 20px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: '0.3s',
      width: width || '100%',
      height: height || 'auto',
      maxWidth: '50%',
      ...(isHovered && {
        backgroundColor: '#b50d0d',
        border: '2px solid oklch(54.3% 0.708 6.12)',
      }),
    },
  };

  const estiloAtual = estilosBotao[tipo];

  return (
    <button
      type={type}  // ← ADICIONADO: passa o type (submit/button)
      onClick={onClick}  // ← ADICIONADO: passa a função onClick
      style={estiloAtual}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Botao;