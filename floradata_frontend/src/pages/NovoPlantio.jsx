import React, { useState } from "react";
import "../styles/CadastroPlantios.css"
import { enderecoServidor } from "../utils/utils.jsx";
import { useNavigate } from "react-router-dom";
import { MdLocalFlorist, MdCalendarToday, MdLocationOn,
  // MdImage, MdSensors 
  } from 'react-icons/md';

export default function NovoPlantio() {
  const navigate = useNavigate();

  // Estados para o formulário
  const [nomePlantio, setNomePlantio] = useState('');
  const [especie, setEspecie] = useState('');
  const [descricaoInicial, setDescricaoInicial] = useState('');
  const [imagemPlantio, setImagemPlantio] = useState(null);
  
  const [dataPlantio, setDataPlantio] = useState('');
  const [dataColheita, setDataColheita] = useState('');
  const [estagioAtual, setEstagioAtual] = useState('');
  const [tempoCiclo, setTempoCiclo] = useState('');
  
  const [setorCultivo, setSetorCultivo] = useState('');
  const [tipoCultivo, setTipoCultivo] = useState('estufa');
  const [adubacao, setAdubacao] = useState('');
  const [substrato, setSubstrato] = useState('');
  const [tipoSolo, setTipoSolo] = useState('');

  
  const [umidadeMin, setUmidadeMin] = useState('');
  const [umidadeMax, setUmidadeMax] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [regaMin, setRegaMin] = useState('');
  const [regaMax, setRegaMax] = useState('');

  // Função para salvar o plantio
  async function SalvarPlantio(e) {
    e.preventDefault();

    try{
        // Validação basica de preenchimento
        if (!nomePlantio || !especie){
            throw new Error("Preencha todos os campos obrigatórios");
        }

        if (dataPlantio && dataColheita && new Date(dataColheita) < new Date(dataPlantio)) {
          throw new Error("A data de colheita não pode ser anterior à data de plantio.");
        }

        const dadosPlantio = {
            nome: nomePlantio,
            variedade: especie,
            descricao: descricaoInicial,
            data_criacao: dataPlantio,
            data_colheita: dataColheita,
            estagio_atual: estagioAtual,
            dias_ciclo: parseInt(tempoCiclo) || null,
            tipo_local: tipoCultivo,
            area_plantio: setorCultivo,
            adubacao,
            substrato,
            tipo_solo: tipoSolo,
            umid_min: parseFloat(umidadeMin) || null,
            umid_max: parseFloat(umidadeMax) || null,
            };

            // chamada da API
            const resposta = await fetch(`${enderecoServidor}/cultivos/new`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dadosPlantio),
            });
            
            // ler como texto
            // const texto = await resposta.text();
            console.log("Resposta do servidor:", texto);
            console.log("Content-Type:", resposta.headers.get("content-type"));


            if (!resposta.ok) {
              const erro = await resposta.json();
              throw new Error(erro.message || "Erro ao cadastrar plantio");
            }

            alert('Plantio cadastrado com sucesso!✅');
            resetCampos();
            navigate("/dashboard")
        } catch (error){
            console.error('Erro ao cadastrar plantio: ', error);
            alert(error.message);
        }
    }   

  // Função para limpar sem confirmação (usada após salvar)
  function resetCampos() {
    setNomePlantio("");
    setEspecie("");
    setDescricaoInicial("");
    setImagemPlantio(null);
    setDataPlantio("");
    setDataColheita("");
    setEstagioAtual("");
    setTempoCiclo("");
    setSetorCultivo("");
    setTipoCultivo("estufa");
    setAdubacao('');
    setSubstrato('');
    setTipoSolo('');
    setUmidadeMin("");
    setUmidadeMax("");
    setTempMin("");
    setTempMax("");
    setRegaMin("");
    setRegaMax("");
  }

  // Função para limpar os campos com confirmação
  function limparCampos() {
    if (window.confirm('Tem certeza que deseja limpar todos os campos?')) {
      setNomePlantio('');
      setEspecie('');
      setDescricaoInicial('');
      setImagemPlantio(null);
      setDataPlantio('');
      setDataColheita('');
      setEstagioAtual('');
      setTempoCiclo('');
      setSetorCultivo('');
      setTipoCultivo('estufa');
      setAdubacao('');
      setSubstrato('');
      setTipoSolo('');
      setUmidadeMin('');
      setUmidadeMax('');
      setTempMin('');
      setTempMax('');
      setRegaMin('');
      setRegaMax('');
    }
  }

   // Função para cancelar
  function cancelar() {
    if (window.confirm('Tem certeza que deseja cancelar? Todos os dados serão perdidos.')) {
      navigate('/');
    }
  }

   return (
    <div className="cadastro-container-plantio bg-gradient-to-br from-lime-50 to-white">
      {/* Header com imagem de fundo */}
      {/* quero adaptar para ficar mais semelhante a da dash */}
      <div className="cadastro-header">
        <h1>Cadastro de Plantios</h1>
        <p>Registre e monitore suas plantações de forma inteligente</p>
      </div>

      {/* Formulário principal */}
      <div className="cadastro-content">
        <form onSubmit={SalvarPlantio}>
          
          {/* Seção 1: Informações Gerais */}
          <section className="form-section fade-in">
            <h2 className="section-title">📋 Informações Gerais</h2>
            
            <div className="info-grid">
              {/* Coluna Esquerda */}
              <div className="info-left">
                <div className="input-group-plantio full-width">
                  <label>Nome do Plantio *</label>
                  <input
                    type="text"
                    value={nomePlantio}
                    onChange={(e) => setNomePlantio(e.target.value)}
                    placeholder="Plantação de Morango Setor A"
                    required
                  />
                </div>

                <div className="input-row">
                  <div className="input-group-plantio">
                    <MdLocalFlorist className="inputIcon" />
                    <label>Espécie *</label>
                    <input
                      type="text"
                      value={especie}
                      onChange={(e) => setEspecie(e.target.value)}
                      placeholder="Ex: Morango"
                      style={{ paddingLeft: '35px' }}
                      required
                    />
                  </div>

                </div>

                <div className="upload-row">
                  <div className="upload-group">
                    <label>Imagem do Plantio</label>
                    {/* esqueci como faz o input para importar imagem */}
                  </div>
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="info-right">
                <div className="input-group-plantio full-width">
                  <label>Descrição Inicial</label>
                  <textarea
                    value={descricaoInicial}
                    onChange={(e) => setDescricaoInicial(e.target.value)}
                    placeholder="Descreva as características iniciais do plantio, condições do solo, preparação..."
                    rows="8"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Seção 2: Ciclo Produtivo */}
          <section className="form-section fade-in">
            <h2 className="section-title">🌱 Ciclo Produtivo</h2>
            
            <div className="input-row">
              <div className="input-group-plantio">
                <MdCalendarToday className="inputIcon" />
                <label>Data do Plantio</label>
                <input
                  type="date"
                  value={dataPlantio}
                  onChange={(e) => setDataPlantio(e.target.value)}
                  style={{ paddingLeft: '35px' }}
                />
              </div>

              <div className="input-group-plantio">
                <MdCalendarToday className="inputIcon" />
                <label>Data Estimada de Colheita</label>
                <input
                  type="date"
                  value={dataColheita}
                  onChange={(e) => setDataColheita(e.target.value)}
                  style={{ paddingLeft: '35px' }}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group-plantio">
                <label>Estágio Atual</label>
                <input
                  type="text"
                  value={estagioAtual}
                  onChange={(e) => setEstagioAtual(e.target.value)}
                  placeholder="Ex: Germinação, Vegetativo, Floração..."
                />
              </div>

              <div className="input-group-plantio">
                <label>Tempo Médio do Ciclo (dias)</label>
                <input
                  type="number"
                  value={tempoCiclo}
                  onChange={(e) => setTempoCiclo(e.target.value)}
                  placeholder="90"
                  min="1"
                />
              </div>
            </div>
          </section>

          {/* Seção 3: Localização */}
          <section className="form-section fade-in">
            <h2 className="section-title">📍 Localização</h2>
            
            <div className="input-group-plantio">
              <MdLocationOn className="inputIcon" />
              <label>Setor ou Área do Cultivo</label>
              <input
                type="text"
                value={setorCultivo}
                onChange={(e) => setSetorCultivo(e.target.value)}
                placeholder="Ex: Setor A - Estufa 1"
                style={{ paddingLeft: '35px' }}
              />
            </div>

            <div className="tipo-cultivo-group">
              <label className="tipo-label">Tipo de Cultivo:</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tipoCultivo"
                    value="estufa"
                    checked={tipoCultivo === 'estufa'}
                    onChange={(e) => setTipoCultivo(e.target.value)}
                  />
                  <span>Estufa</span>
                </label>
                
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tipoCultivo"
                    value="campo-aberto"
                    checked={tipoCultivo === 'campo-aberto'}
                    onChange={(e) => setTipoCultivo(e.target.value)}
                  />
                  <span>Campo Aberto</span>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="tipoCultivo"
                    value="outros"
                    checked={tipoCultivo === 'outros'}
                    onChange={(e) => setTipoCultivo(e.target.value)}
                  />
                  <span>Outros</span>
                </label>
              </div>
            </div>
          </section>

          {/* Seção 4: Características do Solo e Insumos */}
          <section className="form-section fade-in">
            <h2 className="section-title">🌾 Características do Solo e Insumos</h2>

            <div className="input-row">
              <div className="input-group-plantio">
                <label>Tipo de Adubação</label>
                <input
                  type="text"
                  value={adubacao}
                  onChange={(e) => setAdubacao(e.target.value)}
                  placeholder="Ex: Orgânica, NPK 10-10-10..."
                />
              </div>

              <div className="input-group-plantio">
                <label>Substrato Utilizado</label>
                <input
                  type="text"
                  value={substrato}
                  onChange={(e) => setSubstrato(e.target.value)}
                  placeholder="Ex: Turfa, fibra de coco, perlita..."
                />
              </div>
            </div>

            <div className="input-group-plantio full-width">
              <label>Tipo de Solo</label>
              <input
                type="text"
                value={tipoSolo}
                onChange={(e) => setTipoSolo(e.target.value)}
                placeholder="Ex: Arenoso, argiloso, misto..."
                />
            </div>
          </section>


          {/* Seção 5: Parâmetros Ideais */}
          <section className="form-section fade-in">
            <h2 className="section-title">📊 Parâmetros Ideais para Monitoramento</h2>
            
            <div className="parametros-grid">
              <div className="parametro-group">
                <label className="parametro-label">Umidade do Solo (%):</label>
                <div className="min-max-inputs">
                  <div className="input-group-plantio">
                    <label className="small-label">Mín:</label>
                    <input
                      type="number"
                      value={umidadeMin}
                      onChange={(e) => setUmidadeMin(e.target.value)}
                      placeholder="30"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  <div className="input-group-plantio">
                    <label className="small-label">Máx:</label>
                    <input
                      type="number"
                      value={umidadeMax}
                      onChange={(e) => setUmidadeMax(e.target.value)}
                      placeholder="70"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <div className="parametro-group">
                <label className="parametro-label">Temperatura (°C):</label>
                <div className="min-max-inputs">
                  <div className="input-group-plantio">
                    <label className="small-label">Mín:</label>
                    <input
                      type="number"
                      value={tempMin}
                      onChange={(e) => setTempMin(e.target.value)}
                      placeholder="15"
                      step="0.1"
                    />
                  </div>
                  <div className="input-group-plantio">
                    <label className="small-label">Máx:</label>
                    <input
                      type="number"
                      value={tempMax}
                      onChange={(e) => setTempMax(e.target.value)}
                      placeholder="28"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção 5: Associação com Sensores */}

          {/* Botões de Ação */}
          <div className="action-buttons">
            <button type="submit" className="btn-salvar">
              Salvar Plantio
            </button>
            <button type="button" onClick={limparCampos} className="btn-limpar">
              Limpar Campos
            </button>
            <button type="button" onClick={cancelar} className="btn-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
