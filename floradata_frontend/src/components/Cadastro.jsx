import React, { useState, useContext } from "react";
import "../styles/Cadastro.css"
import logo from "../assets/logo.png";
import { enderecoServidor } from "../utils/utils.jsx";
import { useNavigate, Link } from "react-router-dom";

import { MdEmail, MdPhone, MdWork, MdPerson, MdLock, MdPhotoCamera } from "react-icons/md";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imgPerfil, setImgPerfil] = useState(null);

  const navigate = useNavigate();


  async function botaoCadastro(e) {
  e.preventDefault();
  try {
    if (!nome || !sobrenome || !email || !cargo || !telefone || !senha || !confirmarSenha) {
      throw new Error("Preencha todos os campos.");
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("sobrenome", sobrenome);
    formData.append("usuario", usuario);
    formData.append("email", email);
    formData.append("id_cargo", cargo);
    formData.append("telefone", telefone);
    formData.append("senha", senha);
    // if (imgPerfil) formData.append("imgPerfil", imgPerfil);

    const resposta = await fetch(`${enderecoServidor}/usuarios/new`, {
      method: "POST",
      body: formData
    });

    // Verifica se a resposta é JSON
    const conteudo = await resposta.text();
    let dados;
    try {
      dados = JSON.parse(conteudo);
    } catch {
      dados = null;
    }

    if (resposta.ok) {
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } else {
      const msgErro = dados?.mensagem || "Erro ao cadastrar usuário.";
      throw new Error(msgErro);

  // async function botaoCadastro(e) {
  //   e.preventDefault();
  //   try {
  //     if (!nome || !sobrenome || !email || !cargo || !telefone || !senha || !confirmarSenha) {
  //       throw new Error("Preencha todos os campos.");
  //     }

  //     if (senha !== confirmarSenha) {
  //       alert("As senhas não coincidem!");
  //       return;
  //     }

  //     const resposta = await fetch(`${enderecoServidor}/usuarios/new`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         nome,
  //         sobrenome,
  //         usuario,
  //         email,
  //         id_cargo: cargo,
  //         telefone,
  //         senha
  //       }),
  //     });

  //     if (resposta.ok) {
  //       alert("Usuário cadastrado com sucesso!");
  //       navigate("/login");
  //     } else {
  //       console.log(await resposta.text());
  //       const erroServidor = await resposta.json();
  //       throw new Error(erroServidor.mensagem || "❌Erro ao cadastrar.");
      }
    } catch (error) {
      console.error('Erro ao realizar Cadastro:', error);
      alert(error.message);
      return;
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <img src={logo} alt="Logo Floradata" style={{width:'120px'}} className="cadastro-logo"/>
        <h2 className="titulo">Cadastre-se</h2>
        
        <form onSubmit={botaoCadastro}>
          <div className="cadastro-half">
            <div className="input-group">
              <MdPerson className="cadastro-icon" />
              <label>Nome</label>
              <input onChange={(e) => setNome(e.target.value)} value={nome} type="text"
              placeholder="Digite seu nome" required />
            </div>
            <div className="input-group">
              <MdPerson className="cadastro-icon" />
              <label>Sobrenome</label>
              <input onChange={(e) => setSobrenome(e.target.value)} value={sobrenome} type="text"
              placeholder="Digite seu Sobrenome Completo" required />
            </div>
          </div>

          <div className="cadastro-half">
            <div className="input-group">
              <MdPerson className="cadastro-icon" />
              <label>Usuário</label>
              <input
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario}
                type="text"
                placeholder="Escolha um nome de usuário"
                required
              />
            </div>
            <div className="input-group">
              <MdPhotoCamera className="cadastro-icon"/>
              <label>Foto de Perfil</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImgPerfil(e.target.files[0])}
              />
            </div>

          </div>

          <div className="input-group">
              <MdPerson className="cadastro-icon" />
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"
              placeholder="Digite seu email" required />
          </div>

          <div className="cadastro-half">
            {/* fazer select */}
            <div className="input-group">
                <MdWork className="cadastro-icon" />
                <label>Cargo</label>
                <select value={cargo} onChange={(e) => setCargo(e.target.value)} required>
                  <option value="">Selecione seu cargo</option>
                  <option value="1">Técnico de Automação</option>
                  <option value="2">Especialista em IOT</option>
                  <option value="3">Analista de Dado</option>
                  <option value="4">Agrônomo</option>
                </select>
              </div>
            <div className="input-group">
              <MdPhone className="cadastro-icon" />
              <label>Telefone</label>
              <input onChange={(e) => setTelefone(e.target.value)} value={telefone} type="tel"
              placeholder="Digite seu telefone" required />
            </div>
          </div>
          
          <div className="cadastro-half">
            <div className="input-group">
              <MdLock className="cadastro-icon" />
              <label>Senha</label>
              <input onChange={(e) => setSenha(e.target.value)} value={senha} type="password"
              placeholder="Crie sua Senha" required />
            </div>
            <div className="input-group">
              <MdLock className="cadastro-icon" />
              <label>Confirmar Senha</label>
              <input onChange={(e) => setConfirmarSenha(e.target.value)} value={confirmarSenha} type="password"
              placeholder="Confirme sua senha" required />
            </div>
          </div>
        
          {mensagem && <p className="cadastro-error">{mensagem}</p>}

          <div className="cadastro-half ">
              <button type="submit" className="cadastro-button">
                Cadastrar
              </button>
              <Link to="/login" className="cadastro-button acesso">
                Acessar
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
