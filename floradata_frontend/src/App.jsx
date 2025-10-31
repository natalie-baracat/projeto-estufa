import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Principal from './pages/Principal.jsx';
import Login from './pages/PaginaLogin.jsx';
import { UsuarioProvider } from './UsuarioContext';
import Cadastro from './components/Cadastro.jsx';
import NovoPlantio from './pages/NovoPlantio.jsx';
import EditarPlantio from './pages/EditarPlantio.jsx'
// import TesteDiag from './pages/TesteDiagnostico.jsx';
// import "./components/Index.css"

export default function App() {
    return(
        <UsuarioProvider>
             <Router>
                 <Routes>
                     <Route path='/login' element={<Login />} />
                     <Route path='/cadastro' element={<Cadastro />} />
                     <Route path='/*' element={<Principal />} />
                     <Route path='/novoplantio' element={<NovoPlantio />} />
                     <Route path="/editar-plantio" element={<EditarPlantio />} />
                     {/* <Route path="/testediag" element={<TesteDiag />} /> */}
                 </Routes>
             </Router>
        </UsuarioProvider>

    )
}