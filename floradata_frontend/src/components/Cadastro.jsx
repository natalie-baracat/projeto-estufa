// import React, { useState, useContext } from "react";
// import { UsuarioContext } from "../UsuarioContext";
// import "./Cadastro.css";
// import logo from "../assets/logo.png";
// import { enderecoServidor } from "../utils/utils.jsx";
// import { useNavigate, Link } from "react-router-dom";
// import { MdEmail, MdPhone, MdWork, MdPerson, MdLock } from "react-icons/md";


// function Cadastro() {
//   const { setDadosUsuario } = useContext(UsuarioContext);

// export default function Cadastro() {
//   const [nome, setNome] = useState("");
//   const [sobrenome, setSobrenome] = useState("");
//   const [email, setEmail] = useState("");
//   const [cargo, setCargo] = useState("");
//   const [telefone, setTelefone] = useState("");
//   const [senha, setSenha] = useState("");
//   const [confirmarSenha, setConfirmarSenha] = useState("");

  

//   const handleCadastrar = (e) => {
//     e.preventDefault();
//     console.log({
//       nome,
//       sobrenome,
//       email,
//       cargo,
//       telefone,
//       senha,
//       confirmarSenha,
//     });
//     alert("Cadastro realizado!");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.imageContainer}>
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MWA70PICJUDpVP0jHgH3HncxXRuqLmtZfQ&s"
//           alt="Agricultor"
//           style={styles.image}
//         />
//       </div>

//       <form style={styles.form} onSubmit={handleCadastrar}>
//         <h2 style={styles.title}>Cadastra-se</h2>

//         <label style={styles.label}>Nome:</label>
//         <input
//           style={styles.input}
//           type="text"
//           value={nome}
//           onChange={(e) => setNome(e.target.value)}
//         />

//         <label style={styles.label}>Sobrenome:</label>
//         <input
//           style={styles.input}
//           type="text"
//           value={sobrenome}
//           onChange={(e) => setSobrenome(e.target.value)}
//         />

//         <label style={styles.label}>Email:</label>
//         <input
//           style={styles.input}
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <div style={styles.row}>
//           <div style={styles.half}>
//             <label style={styles.label}>Cargo:</label>
//             <input
//               style={styles.input}
//               type="text"
//               value={cargo}
//               onChange={(e) => setCargo(e.target.value)}
//             />
//           </div>
//           <div style={styles.half}>
//             <label style={styles.label}>Telefone:</label>
//             <input
//               style={styles.input}
//               type="tel"
//               value={telefone}
//               onChange={(e) => setTelefone(e.target.value)}
//             />
//           </div>
//         </div>

//         <div style={styles.row}>
//           <div style={styles.half}>
//             <label style={styles.label}>Crie uma senha:</label>
//             <input
//               style={styles.input}
//               type="password"
//               value={senha}
//               onChange={(e) => setSenha(e.target.value)}
//             />
//           </div>
//           <div style={styles.half}>
//             <label style={styles.label}>Confirme a senha:</label>
//             <input
//               style={styles.input}
//               type="password"
//               value={confirmarSenha}
//               onChange={(e) => setConfirmarSenha(e.target.value)}
//             />
//           </div>
//         </div>

//         <div style={styles.buttonRow}>
//           <button type="submit" style={styles.button}>
//             Cadastrar
//           </button>
//           <button type="button" style={styles.button}>
//             Acessar
//           </button>
//         </div>
//       </form>
//     </div>
//     );
//   }
// }
// export default function Cadastro()

