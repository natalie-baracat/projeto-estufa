import { useState, useEffect, createContext, useContext } from 'react';

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [dadosUsuario, setDadosUsuario ] = useState(null);
    const [carregando, setCarregando ] = useState(true);

    useEffect(() => {
        const UsuarioLogado = localStorage.getItem('UsuarioLogado')
        if (UsuarioLogado) {
            setDadosUsuario(JSON.parse(UsuarioLogado));
        }
        setCarregando(false);
    }, [])

    return(
        <UsuarioContext.Provider value={{dadosUsuario, setDadosUsuario, carregando, setCarregando}}>
            {children}
        </UsuarioContext.Provider>
    )
}