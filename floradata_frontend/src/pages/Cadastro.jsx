import { useNavigate } from "react-router-dom";
import Cadastro from '../components/Cadastro.jsx'
import {
  corFundo,
  corTitulo,
  corConteudo,
  creme,
  verdeClaro,
  verdeEscuro,
} from "../styles/Estilos";
import "../styles/Cadastro.css"

export default function PaginaCadastro() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${corFundo}, ${verdeClaro}, ${verdeEscuro} 80%)`, minHeight: "100vh", 
        display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem", overflow: "hidden", //Remove o Scroll
      }}>
      <div
        className="w-full max-w-screen-xl flex flex-col md:flex-row justify-center items-center"
        style={{ maxWidth: "1250px", // Limita a largura para não ficar muito largo
        }}>
        {/* Texto à Esquerda */}
        <div
          className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4"
          style={{ padding: "0 20px", // Adiciona um padding para não colar nos lados
          }}>
          <h1 className="text-3xl font-semibold md:text-4xl" style={{ color: corTitulo }}>Bem-vindo ao FloraData!</h1>
          <h3 className="text-xl  mb-4 md:mb-8" style={{ color: verdeEscuro }}>Cadastre sua conta e comece a cultivar!</h3>
          <p className="text-lg md:text-xl" style={{ color: corConteudo }}>
            Acompanhe suas plantações com inteligência, automação e dados em tempo real.</p>
        </div>

        {/* Formulário de Cadastro */}
        <div
          className="flex-1 flex justify-center items-center p-4"
          style={{ padding: "20px"}}
        >
         <Cadastro />
        </div>
      </div>
    </div>
  );
}
