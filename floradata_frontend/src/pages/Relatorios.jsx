import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, User, Bot, Calendar, X, Search, Filter } from 'lucide-react';
import Botao from '../components/Botao.jsx'

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [filteredRelatorios, setFilteredRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAutor, setFilterAutor] = useState('todos');
  
  const [formData, setFormData] = useState({
    id_cultivo: '',
    conteudo: '',
    id_usuario: 1
  });

  useEffect(() => {
    fetchRelatorios();
  }, []);

  useEffect(() => {
    filterRelatorios();
  }, [relatorios, searchTerm, filterAutor]);

  const fetchRelatorios = async () => {
    try {
      const mockData = [
        {
          id_relatorio: 1,
          id_usuario: 1,
          nome: 'João',
          sobrenome: 'Silva',
          conteudo: 'Relatório sobre o desenvolvimento da plantação de milho. Crescimento acima da média esperada.',
          data_relatorio: '2024-11-25T10:30:00',
          id_cultivo: 1,
          cultivo: 'Milho',
          tipo_autor: 'humano'
        },
        {
          id_relatorio: 2,
          id_usuario: null,
          nome: 'IA',
          sobrenome: 'Assistant',
          conteudo: 'Análise automatizada: Umidade do solo está em níveis ideais. Temperatura estável. Recomenda-se irrigação em 3 dias.',
          data_relatorio: '2024-11-26T08:15:00',
          id_cultivo: 1,
          cultivo: 'Milho',
          tipo_autor: 'ia'
        },
        {
          id_relatorio: 3,
          id_usuario: 2,
          nome: 'Maria',
          sobrenome: 'Santos',
          conteudo: 'Inspeção da plantação de soja. Identificadas algumas pragas na região norte, aplicado controle preventivo.',
          data_relatorio: '2024-11-27T14:20:00',
          id_cultivo: 2,
          cultivo: 'Soja',
          tipo_autor: 'humano'
        }
      ];
      
      setRelatorios(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      setLoading(false);
    }
  };

  const filterRelatorios = () => {
    let filtered = [...relatorios];

    if (searchTerm) {
      filtered = filtered.filter(rel => 
        rel.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rel.cultivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${rel.nome} ${rel.sobrenome}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterAutor !== 'todos') {
      filtered = filtered.filter(rel => rel.tipo_autor === filterAutor);
    }

    setFilteredRelatorios(filtered);
  };

  const handleSubmit = async () => {
    if (!formData.id_cultivo || !formData.conteudo) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const dataAtual = new Date().toISOString();
      const novoRelatorio = {
        ...formData,
        data_relatorio: dataAtual
      };

      console.log('Criando relatório:', novoRelatorio);
      
      setShowModal(false);
      setFormData({ id_cultivo: '', conteudo: '', id_usuario: 1 });
      fetchRelatorios();
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
      try {
        console.log('Excluindo relatório:', id);
        fetchRelatorios();
      } catch (error) {
        console.error('Erro ao excluir relatório:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const RelatorioCard = ({ relatorio }) => {
    const isIA = relatorio.tipo_autor === 'ia';
    
    return (
      <div 
        className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${
          isIA ? 'border-purple-500' : 'border-green-500'
        }`}
        onClick={() => {
          setSelectedRelatorio(relatorio);
          setShowDetailModal(true);
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {isIA ? (
              <Bot className="w-5 h-5 text-purple-600" />
            ) : (
              <User className="w-5 h-5 text-green-600" />
            )}
            <span className={`font-semibold ${isIA ? 'text-purple-700' : 'text-green-700'}`}>
              {isIA ? 'IA Assistant' : `${relatorio.nome} ${relatorio.sobrenome}`}
            </span>
          </div>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {!isIA && (
              <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
            )}
            <button 
              onClick={() => handleDelete(relatorio.id_relatorio)}
              className="p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">{relatorio.conteudo}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(relatorio.data_relatorio)}</span>
          </div>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
            {relatorio.cultivo}
          </span>
        </div>
      </div>
    );
  };

  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
            </div>
            <Botao  onClick={() => setShowModal(true)} tipo="verde" width="100px" height="50px">
              <Plus className="w-5 h-5" />
              Novo Relatório
            </Botao>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              {/* <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" /> */}
              <input
                type="text"
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-lime-300 rounded-xl py-3 pl-12 pr-4 
                      text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700 text-lg">
                🔍
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterAutor}
                onChange={(e) => setFilterAutor(e.target.value)}
                className="w-full border border-lime-300 rounded-xl py-2 px-4
                    bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400
                    focus:outline-none"
              >
                <option value="todos">Todos os Autores</option>
                <option value="humano">Relatórios Humanos</option>
                <option value="ia">Relatórios IA</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRelatorios.length > 0 ? (
            filteredRelatorios.map((relatorio) => (
              <RelatorioCard key={relatorio.id_relatorio} relatorio={relatorio} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow-md">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nenhum relatório encontrado</p>
            </div>
          )}
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Novo Relatório</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cultivo
                </label>
                <select
                  value={formData.id_cultivo}
                  onChange={(e) => setFormData({ ...formData, id_cultivo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione o cultivo</option>
                  <option value="1">Milho</option>
                  <option value="2">Soja</option>
                  <option value="3">Trigo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conteúdo do Relatório
                </label>
                <textarea
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Descreva as observações e informações do relatório..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                  <Botao onClick={() => setShowModal(false)} tipo="vermelho" width="200px" height="50px">
                    <Edit2 className="w-4 h-4" />
                    Cancelar
                  </Botao>
                 <Botao onClick={handleSubmit} tipo="verde" width="200px" height="50px">
                    <Edit2 className="w-4 h-4" />
                    Criar relatório
                  </Botao>
              </div>
            </div>
          </div>
        </Modal>

        <Modal show={showDetailModal} onClose={() => setShowDetailModal(false)}>
          {selectedRelatorio && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {selectedRelatorio.tipo_autor === 'ia' ? (
                    <Bot className="w-7 h-7 text-purple-600" />
                  ) : (
                    <User className="w-7 h-7 text-green-600" />
                  )}
                  <h2 className="text-2xl font-bold text-gray-800">Detalhes do Relatório</h2>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Autor</p>
                  <p className="font-semibold text-gray-800">
                    {selectedRelatorio.tipo_autor === 'ia' 
                      ? 'IA Assistant' 
                      : `${selectedRelatorio.nome} ${selectedRelatorio.sobrenome}`}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Cultivo</p>
                  <p className="font-semibold text-gray-800">{selectedRelatorio.cultivo}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Data e Hora</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(selectedRelatorio.data_relatorio)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Conteúdo</p>
                  <p className="text-gray-800 leading-relaxed">{selectedRelatorio.conteudo}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {selectedRelatorio.tipo_autor !== 'ia' && (
                   <Botao tipo="verde" width="200px" height="50px">
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Botao>
                )}
                <Botao onClick={() => {
                    handleDelete(selectedRelatorio.id_relatorio);
                    setShowDetailModal(false);
                  }}
                 tipo="vermelho" width="200px" height="50px">
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </Botao>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Relatorios;