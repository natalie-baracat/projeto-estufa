import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import { useNavigate, Link, Routes, Route, useLocation} from 'react-router-dom';
import '../components/Login.css';
import Estilos, {corFundo, corBarraLateral} from "../styles/Estilos";

import { MdClose, MdGridView, MdMenu, MdTimeline, MdSettings, MdPeople  } from 'react-icons/md';
import { FaRobot } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { PiPlantFill } from "react-icons/pi";

import Dashboard from './Dashboard';
import NovoPlantio from './NovoPlantio';
import AlertasNotificacoes from './AlertasNotificacoes';
import ConfiguracoesAutomacao from './ConfiguracoesAutomacao';
import ControleInteligente from './ControleInteligente';
import DiagnosticoSistema from './DiagnosticoSistema';
import MonitoriamentoPlantio from './MonitoriamentoPlantio';
import Usuarios from './Usuarios';
import logo from "../assets/logo.png";
import Cadastro from './Cadastro';


export default function Principal() {
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);
    
    const [ menuAberto, setMenuAberto ] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!dadosUsuario && !carregando){
            navigate('/login');
        }
    }, [dadosUsuario, carregando, navigate]);

    const botaoLogout = () => {
        try {
            localStorage.removeItem('UsuarioLogado');
            setDadosUsuario(null);
            navigate('/');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };

    return(
       
        <div className='flex h-screen font-sans' style={{backgroundColor: corFundo}}>
            <div className={`fixed inset-0 bg-transparent bg-opacity-80 z-30 md:hidden 
            ${menuAberto == true ? 'block' : 'hidden'}`}
            onClick={() => setMenuAberto(false)}>
            </div>

            {/* Barra lateral / Sidebar */}
            <section className={`fixed top-0 left-0 h-full w-64 flex flex-col justify-between z-40 transform transition-transform md:relative md:w-20 lg:w-64 md:translate-x-0
            ${menuAberto == true? 'translate-x-0' : '-translate-x-full'} 
            `} style={{backgroundColor: corBarraLateral, color: corFundo}}>
            <div className='flex justify-between items-center mb-6 p-4 '>
                <div className='flex gap-2 items-center'>
                    {/* <img src={logo} alt='logo Floradata' className='w-8 h-8' /> não sei se vamos colocar a logo aqui ou não */}
                    <span className='text-xl font-bold md:hidden lg:block h1Login'>FloraData</span>
                </div>
                <button className='md:hidden hover:text-[#b4d7a3] transition-colors' onClick={() => setMenuAberto(false)}>
                    <MdClose className='w-6 h-6' />
                </button>
            </div>
            <nav className='flex-1'>
                <div className='px-4 lg:px-6 mb-2 flex flex-col gap-3'>


                    {/* Perfil */}
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#b4d7a3] cursor-pointer">
                        {/* A foto vem encima */}
                        <div>
                        <img src="" alt="Foto do usuário" className="w-10 h-10 rounded-full object-cover"/>
                        </div>
                        <div>
                            <p className="font-semibold text-white"></p>
                            <p className="text-sm text-[#d0d0d0]"></p>
                            <Link to="/perfil" className="text-xs text-[#b4d7a3] hover:underline">Ver Perfil</Link>
                        </div>
                    </div>

                    {/* preciso diminuir esses botões estão muito grandes, além dissos eles ficam mais proximos do final da tela, ´lá em baixo o ultimo começa e vai subindo, não comeca logo de */}


                    {/* Dashboard */}
                    <Link to='/dashboard' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors.
                            duration-200 ${location.pathname == '/dashboard' ?
                            'bg-[#628b4e] text-white text-sm shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <MdGridView className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Dashboard</span>
                    </Link>
           

                     {/*Usuarios  */}
                    <Link to='/usuarios' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/usuarios' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <MdPeople className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Usuarios</span>
                    </Link> 


                    {/* Novo Plantio */}
                    <Link to='/novoplantio' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/novoplantio' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <PiPlantFill className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Novo Plantio</span>
                    </Link>                    


                    {/* monitoriamento Plantio */}
                    <Link to='/monitoriamentoplantio' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/monitoriamentoplantio' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <MdTimeline className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Monitoriamento do Plantio</span>
                    </Link>


                    {/* Controle Inteligente */}
                    <Link to='/controleinteligente' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/controleinteligente' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <FaRobot className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Controle Inteligente</span>
                    </Link>


                    {/* Alertas e notificações */}
                    <Link to='/alertasenotificacoes' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/alertasenotificacoes' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <IoIosWarning className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Alertas e Notificações</span>
                    </Link>


                    {/* Configurações e automação */}
                    <Link to='/configuracoes' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/configuracoes' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <MdSettings className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Configurações e Automação</span>
                    </Link>


                    {/* Diagnóstico do Sistema */}
                    <Link to='/diagnosticosistema' onClick={() => setMenuAberto(false)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/diagnosticosistema' ?
                            'bg-[#628b4e] text-white shadow-md' : 'hover:bg-[#b4d7a3]'}`}>
                        <IoAnalyticsOutline className='w-6 h-6 text-white' />
                        <span className='font-medium md:hidden lg:block text-white h1Login'>Diagnóstico do Sistema</span>
                    </Link>
                </div>
            </nav>
            </section>

            {/* Conteúdo Principal */}
            <section className='flex-1 p-4 text-gray-100 overflow-auto'>
                <header className='flex items-center mb-3'>
                    <button className='md:hidden' onClick={() => setMenuAberto(true)}>
                        <MdMenu className='w-8 h-8 text-white'/>
                    </button>
                    <div className='flex items-center justify-center flex-1 gap-2 md:hidden'>
                        <img src={logo} alt="Logo Floradata" className='w-8 h-8' />
                        <span className='font-bold text-xl h1Login'>Floradata</span>
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/usuarios' element={<Usuarios />} />
                        <Route path='/cadastro' element={<Cadastro />} />
                        <Route path='/novoplantio' element={<NovoPlantio />} />
                        <Route path='/monitoriamentoplantio' element={<MonitoriamentoPlantio />} />
                        <Route path='/controleinteligente' element={<ControleInteligente />} />
                        <Route path='/alertasenotificacoes' element={<AlertasNotificacoes />} />
                        <Route path='/configuracoes' element={<ConfiguracoesAutomacao />} />
                        <Route path='/diagnosticosistema' element={<DiagnosticoSistema />} />
                    </Routes>
                </main>
            </section>
        </div>
    )
}
