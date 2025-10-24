import React, { useState, useContext, useEffect } from "react";
import {UsuarioContext} from '../UsuarioContext';
import "./PaginaLogin.css";
import SenaiLogo from '../assets/SenaiLogo.png';
import { enderecoServidor } from "../pages/utils.jsx"
import { useNavigate, Link } from "react-router-dom";

import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdBarChart, MdNotifications, MdTrendingUp } from 'react-icons/md';

function PaginaLogin() {
  const {dadosUsuario, setDadosUsuario} = useContext(UsuarioContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  async function botaoLogin(e) {
    e.preventDefault();
    try {
      if (email === '' || senha === '') {
        throw new Error('Preencha todos os campos');
      }
      // Autenticando utilizando a API de backend com o fetch e recebendo o token
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      const dados = await resposta.json();
      if (resposta.ok) {
        localStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }));
				setDadosUsuario(dados); //Gravando os dados do usuário no contexto
				navigate("/principal")
      } else {
        setMensagem('Email ou senha incorretos ❌');
        throw new Error('Email ou senha incorretos ❌');
      }

    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert(error.message);
      return;
    }
  };



  function botaoLimpar() {
    setEmail('');
    setSenha('');
    setMensagem('');
  };

  const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await localStorage.getItem('UsuarioLogado');
            if (usuarioLogado){
                const usuario = JSON.parse(usuarioLogado);
                if (usuario.lembrar == true){
					setDadosUsuario(dados);
                    navigate('/principal')
                }
            }    
        }
        buscarUsuarioLogado()
    }, [])

  return (
    <div className="login-container">
      <div className="login-box">
       <img src={SenaiLogo} alt="Logo Senai" style={{width:'200px'}} />
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SENAI_S%C3%A3o_Paulo_logo.png/1024px-SENAI_S%C3%A3o_Paulo_logo.png" alt="Logo SENAI" className="logo" /> */}
        <h2>Login</h2>
        <div>
          <div className="input-group">
            <MdEmail className="inputIcon" />
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Digite seu email" required/>
          </div>
          <div className="input-group">
            <MdLock className="inputIcon" />
            <label>Senha</label>
            <input onChange={(e) => setSenha(e.target.value)} value={senha} type="password" placeholder="Digite sua senha" required />
            {/* <button
							type="button"
							onClick={togglePasswordVisibility}
							className="visibilityToggle"
							aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
						>
							{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
						</button> */}
          </div>
          
          <div className="between">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<input type="checkbox" style={{ marginRight: '5px' }} 
								checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}/>
							<label > Lembrar-me</label>
						</div>
						<a href="#" className="forgotPassword">Esqueceu a senha?</a>

					</div>

          <button onClick={botaoLogin} type="submit" className="login-button">Entrar</button>
          <button onClick={botaoLimpar} type="button" className="clear-button"> Limpar</button>
          <p className="signupText">
						Não tem uma conta? <a href="#" className="signupLink">Cadastre-se</a>
					</p>
        </div>
        <p>{mensagem}</p>
      </div>
      {/* Quero isso abaixo do login, não ao lado */}
      <div className="infoBoxes">
					<div className="infoBox">
						<MdBarChart className="infoIcon" />
						<span>Acompanhe seus gastos com gráficos</span>
					</div>
					<div className="infoBox">
						<MdNotifications className="infoIcon" />
						<span>Receba alertas financeiros importantes</span>
					</div>
				</div>
    </div>
  );
}

export default PaginaLogin;
