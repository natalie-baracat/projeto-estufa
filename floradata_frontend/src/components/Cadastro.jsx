import React, { useState, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";
import logo from "../assets/logo.png";
import { enderecoServidor } from "../utils/utils.jsx";
import { useNavigate, Link } from "react-router-dom";
import { MdEmail, MdPhone, MdWork, MdPerson, MdLock } from "react-icons/md";
import "./Cadastro.css";

function Cadastro() {
  const { dadosUsuario, setDadosUsuario } = useContext(UsuarioContext);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

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

      const resposta = await fetch(`${enderecoServidor}/usuarios/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, sobrenome, email, cargo, telefone, senha }),
      });

      if (resposta.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
      } else {
        throw new Error("Erro ao cadastrar. Verifique os dados.");
      }
    } catch (error) {
      setMensagem(error.message);
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-content">
        <div className="cadastro-image-container"></div>

        <form className="cadastro-form" onSubmit={botaoCadastro}>
          <img src={logo} alt="Logo Floradata" className="cadastro-logo" />
          <h2 className="cadastro-title">Cadastra-se</h2>

          <div className="cadastro-row">
            <div className="cadastro-half">
              <label>Nome:</label>
              <div className="cadastro-input-wrapper">
                <MdPerson className="cadastro-icon" />
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cadastro-half">
              <label>Sobrenome:</label>
              <div className="cadastro-input-wrapper">
                <MdPerson className="cadastro-icon" />
                <input
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <label>Email:</label>
          <div className="cadastro-input-wrapper">
            <MdEmail className="cadastro-icon" />
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="cadastro-row">
            <div className="cadastro-half">
              <label>Cargo:</label>
              <div className="cadastro-input-wrapper">
                <MdWork className="cadastro-icon" />
                <input
                  type="text"
                  placeholder="Digite seu cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cadastro-half">
              <label>Telefone:</label>
              <div className="cadastro-input-wrapper">
                <MdPhone className="cadastro-icon" />
                <input
                  type="tel"
                  placeholder="Digite seu telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="cadastro-row">
            <div className="cadastro-half">
              <label>Senha:</label>
              <div className="cadastro-input-wrapper">
                <MdLock className="cadastro-icon" />
                <input
                  type="password"
                  placeholder="Crie sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cadastro-half">
              <label>Confirmar Senha:</label>
              <div className="cadastro-input-wrapper">
                <MdLock className="cadastro-icon" />
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {mensagem && <p className="cadastro-error">{mensagem}</p>}

          <div className="cadastro-button-row">
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
