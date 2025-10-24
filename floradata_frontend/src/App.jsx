import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Principal from './pages/Principal.jsx';
import Login from './pages/PaginaLogin.jsx';
import { UsuarioProvider } from './UsuarioContext';
// import "./components/Index.css"

export default function App() {
    return(
        <UsuarioProvider>
             <Router>
                 <Routes>
                     <Route path='/login' element={<Login />} />
                     <Route path='/*' element={<Principal />} />
                 </Routes>
             </Router>
        </UsuarioProvider>

    )
}