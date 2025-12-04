import React, { useState, useEffect, useCallback  } from 'react';
import { FileText, Plus, Edit2, Trash2, User, Bot, Calendar, X, Search, Filter, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import Botao from '../components/Botao.jsx';

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [filtradoRelatorios, setFiltradoRelatorios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalEdicao, setAbrirModalEdicao] = useState(false);
  const [abrirModalDetalhes, setAbrirModalDetalhes] = useState(false);
  const [abrirModalConfirmacao, setAbrirModalConfirmacao] = useState(false);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);
  const [relatorioParaExcluir, setRelatorioParaExcluir] = useState(null);
  const [pesquisarTermo, setPesquisarTermo] = useState('');
  const [filtrarAutor, setFiltrarAutor] = useState('todos');
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [cultivos, setCultivos] = useState([]);
  
  const [formData, setFormData] = useState({
    id_cultivo: '',
    conteudo: '',
    id_usuario: 1
  });

  const [formEdicao, setFormEdicao] = useState({
    id_cultivo: '',
    conteudo: ''
  });

    // Handlers otimizados para evitar re-renders
  const handleFormDataChange = React.useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFormEdicaoChange = React.useCallback((field, value) => {
    setFormEdicao(prev => ({ ...prev, [field]: value }));
  }, []);

  // URL base da API
  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetchRelatorios();
    fetchCultivos();
  }, []);

  useEffect(() => {
    filtrarRelatorios();
  }, [relatorios, pesquisarTermo, filtrarAutor]);

  

  // Buscar cultivos disponíveis
    const fetchCultivos = useCallback(async () => {
    try {
      // Obter token do localStorage (ajuste conforme seu sistema de auth)
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/cultivos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCultivos(data);
        console.log('relatorio carregados:', data);
      } else {
        console.error('Erro ao buscar relatorio - Status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar relatorio:', error);
      mostrarMensagem('Erro ao carregar relatorio', 'erro');
    }
  // };
  }, []);

  // Buscar relatórios da API
    const fetchRelatorios = useCallback(async () => {
    setCarregando(true);
    try {
      const response = await fetch(`${API_URL}/relatorios`);
      if (response.ok) {
        const data = await response.json();
        // Adiciona tipo_autor baseado em id_usuario
        const relatoriosComTipo = data.map(rel => ({
          ...rel,
          tipo_autor: rel.id_usuario === null ? 'ia' : 'humano'
        }));
        setRelatorios(relatoriosComTipo);
      } else {
        mostrarMensagem('Erro ao carregar relatórios', 'erro');
      }
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      mostrarMensagem('Erro de conexão com o servidor', 'erro');
    } finally {
      setCarregando(false);
    }
  // };
}, []);


  const filtrarRelatorios = useCallback(() => {
    let filtrado = [...relatorios];

    if (pesquisarTermo) {
      filtrado = filtrado.filter(rel =>
        rel.conteudo.toLowerCase().includes(pesquisarTermo.toLowerCase()) ||
        rel.cultivo.toLowerCase().includes(pesquisarTermo.toLowerCase()) ||
        (rel.nome && `${rel.nome} ${rel.sobrenome}`.toLowerCase().includes(pesquisarTermo.toLowerCase()))
      );
    }

    if (filtrarAutor !== 'todos') {
      filtrado = filtrado.filter(rel => rel.tipo_autor === filtrarAutor);
    }

    setFiltradoRelatorios(filtrado);
  }, [relatorios, pesquisarTermo, filtrarAutor]);

  // Criar novo relatório
  const salvar = async () => {
    if (!formData.id_cultivo || !formData.conteudo.trim()) {
      mostrarMensagem('Preencha todos os campos obrigatórios', 'erro');
      return;
    }

    setSalvando(true);
    try {
      const dataAtual = new Date().toISOString();
      const novoRelatorio = {
        ...formData,
        data_relatorio: dataAtual
      };

      const response = await fetch(`${API_URL}/relatorios/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoRelatorio),
      });

      if (response.ok) {
        mostrarMensagem('Relatório criado com sucesso!', 'sucesso');
        setAbrirModal(false);
        setFormData({ id_cultivo: '', conteudo: '', id_usuario: 1 });
        fetchRelatorios();
      } else {
        mostrarMensagem('Erro ao criar relatório', 'erro');
      }
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
      mostrarMensagem('Erro de conexão ao criar relatório', 'erro');
    } finally {
      setSalvando(false);
    }
  };

  // Editar relatório
  const editarRelatorio = async () => {
    console.log("conteudo:", formEdicao.conteudo);
    if (!formEdicao.conteudo.trim()) {
      mostrarMensagem('O conteúdo não pode estar vazio', 'erro');
      return;
    }

    setSalvando(true);
    try {
      const response = await fetch(`${API_URL}/relatorios/editar/${relatorioSelecionado.id_relatorio}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formEdicao),
      });

      if (response.ok) {
        mostrarMensagem('Relatório atualizado com sucesso!', 'sucesso');
        setAbrirModalEdicao(false);
        setRelatorioSelecionado(null);
        fetchRelatorios();
      } else {
        mostrarMensagem('Erro ao atualizar relatório', 'erro');
      }
    } catch (error) {
      console.error('Erro ao editar relatório:', error);
      mostrarMensagem('Erro de conexão ao editar relatório', 'erro');
    } finally {
      setSalvando(false);
    }
  };

  // Excluir relatório
  const excluirRelatorio = async () => {
    setSalvando(true);
    try {
      const response = await fetch(`${API_URL}/relatorios/${relatorioParaExcluir.id_relatorio}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mostrarMensagem('Relatório excluído com sucesso!', 'sucesso');
        setAbrirModalConfirmacao(false);
        setRelatorioParaExcluir(null);
        fetchRelatorios();
      } else {
        mostrarMensagem('Erro ao excluir relatório', 'erro');
      }
    } catch (error) {
      console.error('Erro ao excluir relatório:', error);
      mostrarMensagem('Erro de conexão ao excluir relatório', 'erro');
    } finally {
      setSalvando(false);
    }
  };

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem(null), 4000);
  };

  const abrirEdicao = (relatorio) => {
    setRelatorioSelecionado(relatorio);
    setFormEdicao({
      id_cultivo: relatorio.id_cultivo,
      conteudo: relatorio.conteudo
    });
    setAbrirModalEdicao(true);
  };

  const confirmarExclusao = (relatorio) => {
    setRelatorioParaExcluir(relatorio);
    setAbrirModalConfirmacao(true);
  };

  const formatarData = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Componente de Card de Relatório
  const RelatorioCard = ({ relatorio }) => {
    const isIA = relatorio.tipo_autor === 'ia';
    
    return (
      <div
        onClick={() => {
          setRelatorioSelecionado(relatorio);
          setAbrirModalDetalhes(true);
        }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-100"
      >
        <div className="p-6">
          <div className=" flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isIA ? 'bg-purple-100' : 'bg-green-100'}`}>
                {isIA ? (
                  <Bot className="w-5 h-5 text-purple-600" />
                ) : (
                  <User className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div>
                <p className={`font-semibold ${isIA ? 'text-purple-700' : 'text-green-700'}`}>
                  {isIA ? 'IA Assistant' : `${relatorio.nome} ${relatorio.sobrenome}`}
                </p>
                <p className="text-xs text-gray-500">{isIA ? 'Relatório Automático' : 'Relatório Manual'}</p>
              </div>
            </div>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {!isIA && (
                <button
                  onClick={() => abrirEdicao(relatorio)}
                  className="p-2 hover:bg-blue-50 rounded-full transition-colors group"
                  title="Editar relatório"
                >
                  <Edit2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                </button>
              )}
              <button
                onClick={() => confirmarExclusao(relatorio)}
                className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                title="Excluir relatório"
              >
                <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
            {relatorio.conteudo}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatarData(relatorio.data_relatorio)}</span>
            </div>
            <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-medium">
              {relatorio.cultivo}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Modal
  // const Modal = ({ show, onClose, children }) => {
  // Componente de Modal com React.memo
  const Modal = React.memo(({ show, onClose, children }) => {
    if (!show) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      >
        <div
          className="absolute inset-0 bg-black backdrop-blur-sm"
          style={{ 
            animation: 'fadeIn 0.2s ease-out',
            opacity: 0.85
          }}
          onClick={onClose}
        />
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {children}
        </div>
      </div>
    );
  // };
  });

  // Componente de Mensagem Toast
  const Toast = ({ mensagem }) => {
    if (!mensagem) return null;

    const isErro = mensagem.tipo === 'erro';
    
    return (
      <div 
        className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-slideInRight ${
          isErro ? 'bg-red-500' : 'bg-green-500'
        }`}
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        {isErro ? (
          <AlertCircle className="w-6 h-6 text-white" />
        ) : (
          <CheckCircle className="w-6 h-6 text-white" />
        )}
        <p className="text-white font-semibold">{mensagem.texto}</p>
      </div>
    );
  };

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>
      <div className="flex justify-between pt-4">
        <div className="h-3 bg-gray-200 rounded w-32" />
        <div className="h-6 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  );

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-10 bg-white rounded w-48 animate-pulse mb-4" />
            <div className="h-12 bg-white rounded w-32 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-8">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>

      <Toast mensagem={mensagem} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 rounded-2xl shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Relatórios</h1>
          </div>
          <Botao 
            onClick={() => setAbrirModal(true)} 
            tipo="verde" 
            width="180px" 
            height="50px"
          >
            <Plus className="w-5 h-5" />
            Novo Relatório
          </Botao>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar relatórios..."
              value={pesquisarTermo}
              onChange={(e) => setPesquisarTermo(e.target.value)}
              className="w-full bg-white border-2 border-lime-200 rounded-xl py-3 pl-12 pr-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime-600" />
          </div>

          <div className="relative">
            <select
              value={filtrarAutor}
              onChange={(e) => setFiltrarAutor(e.target.value)}
              className="w-full border-2 border-lime-200 rounded-xl py-3 px-4 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="todos">📋 Todos os Autores</option>
              <option value="humano">👤 Relatórios Humanos</option>
              <option value="ia">🤖 Relatórios IA</option>
            </select>
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime-600 pointer-events-none" />
          </div>
        </div>

        {/* Grid de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtradoRelatorios.length > 0 ? (
            filtradoRelatorios.map((relatorio) => (
              <RelatorioCard key={relatorio.id_relatorio} relatorio={relatorio} />
            ))
          ) : (
            <div className="col-span-2 text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">Nenhum relatório encontrado</p>
              <p className="text-gray-400 mt-2">Tente ajustar os filtros ou criar um novo relatório</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criação */}
      <Modal show={abrirModal} onClose={() => setAbrirModal(false)}>
        <div>Testando Modal</div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
              <h2 className="text-2xl font-bold text-gray-800">Novo Relatório</h2>
              </div>
              <button
                onClick={() => setAbrirModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Cultivo <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="selectCultivo"
                    defaultValue={formData.id_cultivo} // valor inicial
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium bg-white"
                  >
                    <option value="" className="text-gray-500">Selecione o cultivo</option>
                    {cultivos.length > 0 ? (
                      cultivos.map((cultivo) => (
                        <option key={cultivo.id_cultivo} value={cultivo.id_cultivo} className="text-gray-900">
                          {cultivo.nome} {cultivo.variedade ? `- ${cultivo.variedade}` : ''}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled className="text-gray-400">Nenhum cultivo disponível</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Conteúdo do Relatório <span className="text-red-500">*</span>
                </label>
              <textarea
                id="textareaEdicao"
                defaultValue={formEdicao.conteudo}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Descreva as observações e informações do relatório..."
              />
              </div>

              {/* Botão IA (não funcional ainda) */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <p className="font-semibold text-purple-900">Geração com IA</p>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Em breve você poderá gerar relatórios automaticamente com inteligência artificial
                </p>
                <button
                  disabled
                  className="w-full py-2 bg-purple-300 text-purple-600 rounded-lg font-medium cursor-not-allowed opacity-60"
                >
                  🤖 Gerar com IA (Em breve)
                </button>
              </div>

            <div className="flex gap-3 mt-6">
              <Botao 
                onClick={() => setAbrirModal(false)} 
                tipo="vermelho" 
                width="50%" 
                height="50px"
              >
                <X className="w-4 h-4" />
                Cancelar
              </Botao>
              <Botao 
                onClick={salvar} 
                tipo="verde" 
                width="50%" 
                height="50px"
                disabled={!formData.id_cultivo || !formData.conteudo.trim() || salvando}
              >
                {salvando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Criar Relatório
                  </>
                )}
              </Botao>
            {/* </div> */}
          </div>
        </div>
      </Modal>

      {/* Modal de Edição */}
      <Modal show={abrirModalEdicao} onClose={() => setAbrirModalEdicao(false)}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            {/* flex flex-col  */}
            <div className="flex items-center gap-3">
{/* flex  */}
              <div className="p-2 bg-blue-100 rounded-xl">
                <Edit2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Editar Relatório</h2>
            </div>
            <button
              onClick={() => setAbrirModalEdicao(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
               <label className="block text-sm font-semibold text-gray-800 mb-2">
                Cultivo <span className="text-red-500">*</span>
              </label>
              <select
                id="selectCultivo"
                defaultValue={formData.id_cultivo} // valor inicial
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium bg-white"
              >
                <option value="" className="text-gray-500">Selecione o cultivo</option>
                {cultivos.length > 0 ? (
                  cultivos.map((cultivo) => (
                    <option key={cultivo.id_cultivo} value={cultivo.id_cultivo} className="text-gray-900">
                      {cultivo.nome} {cultivo.variedade ? `- ${cultivo.variedade}` : ''}
                    </option>
                  ))
                ) : (
                  <option value="" disabled className="text-gray-400">Nenhum cultivo disponível</option>
                )}
              </select>
            </div>
             <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Conteúdo do Relatório <span className="text-red-500">*</span>
                </label>
              <textarea
                id="textareaEdicao"
                defaultValue={formEdicao.conteudo}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Descreva as observações e informações do relatório..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Botao 
              onClick={() => setAbrirModalEdicao(false)} 
              tipo="vermelho" 
              width="50%" 
              height="50px"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Botao>
            <Botao 
              onClick={editarRelatorio} 
              tipo="verde" 
              width="50%" 
              height="50px"
              disabled={!formEdicao.conteudo.trim() || salvando}
            >
              {salvando ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Salvar Alterações
                </>
              )}
            </Botao>
          </div>
        </div>
            <div>Testando Modal</div>
      </Modal>

      {/* Modal de Detalhes */}
      <Modal show={abrirModalDetalhes} onClose={() => setAbrirModalDetalhes(false)}>
        {relatorioSelecionado && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {relatorioSelecionado.tipo_autor === 'ia' ? (
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Bot className="w-7 h-7 text-purple-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-green-100 rounded-xl">
                    <User className="w-7 h-7 text-green-600" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-800">Detalhes do Relatório</h2>
              </div>
              <button
                onClick={() => setAbrirModalDetalhes(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                <p className="text-sm font-semibold text-gray-600 mb-2">👤 Autor</p>
                <p className="font-bold text-gray-800 text-lg">
                  {relatorioSelecionado.tipo_autor === 'ia' 
                    ? '🤖 IA Assistant' 
                    : `${relatorioSelecionado.nome} ${relatorioSelecionado.sobrenome}`}
                </p>
              </div>

              <div className="bg-gradient-to-br from-lime-50 to-green-100 p-5 rounded-xl border border-lime-200">
                <p className="text-sm font-semibold text-gray-600 mb-2">🌱 Cultivo</p>
                <p className="font-bold text-gray-800 text-lg">{relatorioSelecionado.cultivo}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-xl border border-blue-200">
                <p className="text-sm font-semibold text-gray-600 mb-2">📅 Data e Hora</p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatarData(relatorioSelecionado.data_relatorio)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-5 rounded-xl border border-amber-200">
                <p className="text-sm font-semibold text-gray-600 mb-2">📝 Conteúdo</p>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {relatorioSelecionado.conteudo}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {relatorioSelecionado.tipo_autor !== 'ia' && (
                <Botao 
                  onClick={() => {
                    setAbrirModalDetalhes(false);
                    abrirEdicao(relatorioSelecionado);
                  }}
                  tipo="verde" 
                  width="50%" 
                  height="50px"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </Botao>
              )}
              <Botao
                onClick={() => {
                  setAbrirModalDetalhes(false);
                  confirmarExclusao(relatorioSelecionado);
                }}
                tipo="vermelho"
                width={relatorioSelecionado.tipo_autor !== 'ia' ? '50%' : '100%'}
                height="50px"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </Botao>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={abrirModalConfirmacao} onClose={() => setAbrirModalConfirmacao(false)}>
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este relatório? Esta ação não pode ser desfeita.
            </p>
            
            {relatorioParaExcluir && (
              <div className="w-full bg-gray-50 p-4 rounded-xl mb-6 text-left">
                <p className="text-sm text-gray-600 mb-1">Relatório:</p>
                <p className="text-gray-800 line-clamp-2">{relatorioParaExcluir.conteudo}</p>
              </div>
            )}

            <div className="flex gap-3 w-full">
              <Botao
                onClick={() => setAbrirModalConfirmacao(false)}
                tipo="verde"
                width="50%"
                height="50px"
              >
                <X className="w-4 h-4" />
                Cancelar
              </Botao>
              <Botao
                onClick={excluirRelatorio}
                tipo="vermelho"
                width="50%"
                height="50px"
                disabled={salvando}
              >
                {salvando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Sim, Excluir
                  </>
                )}
              </Botao>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Relatorios