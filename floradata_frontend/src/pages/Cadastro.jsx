// import { enderecoServidor } from '../utils/utils.js'
// import { useNavigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom';
import React from 'react';
import Estilos from '../styles/Estilos';
// import { dadosUsuario } from '../utils/utils.jsx';

export default function CadastroUsuario () {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('')
    const [cargo, setCargo] = useState('')
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    // const navigate = useNavigate();
     const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const novoUsuario = {
      nome, sobrenome, email, cargo, telefone, senha,
    };

    console.log("Usuário cadastrado:", novoUsuario);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#FFF8D8" }}>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h2 className="text-2xl font-bold text-center" style={{ color: "#2A6041" }}>
          Cadastra-se
        </h2>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Sobrenome:</label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Cargo:</label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Telefone:</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Nova Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold" style={{ color: "#2A6041" }}>Confirme a Senha:</label>
          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md font-semibold transition"
          style={{ backgroundColor: "#7BAE44", color: "#FFF8D8" }}
        >
          Cadastrar
        </button>

        <p className="text-center text-sm mt-2" style={{ color: "#2A6041" }}>
          Ja tem uma conta?{" "}
          <a href="/login" className="font-semibold" style={{ color: "#7BAE44" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
