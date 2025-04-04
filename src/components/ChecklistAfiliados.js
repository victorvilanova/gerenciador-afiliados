import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const ChecklistAfiliados = () => {
  const { addItem, items, updateItem, filteredItems } = useData();
  const [activeTab, setActiveTab] = useState('parte1');
  
  // Verificar se já existe um item do dia atual
  const today = new Date().toISOString().split('T')[0];
  const hasTodayChecklist = items.some(item => 
    item.checklistDate === today && item.type === 'checklist_afiliados'
  );

  // Listas de etapas para cada parte do checklist
  const checklistEtapas = {
    parte1: [
      { id: 'p1_1', text: 'Acessar Shopee Afiliados', link: 'https://affiliate.shopee.com.br' },
      { id: 'p1_2', text: 'Fazer login' },
      { id: 'p1_3', text: 'Ir em "Produtos em Alta" ou "Recomendados"' },
      { id: 'p1_4', text: 'Filtrar por categoria desejada' },
      { id: 'p1_5', text: 'Ordenar por Taxa de Comissão' },
      { id: 'p1_6', text: 'Selecionar 3 produtos com boas avaliações (4+ estrelas)' },
      { id: 'p1_7', text: 'Anotar: nome, preço, comissão, 3 características' },
      { id: 'p1_8', text: 'Baixar o vídeo oficial de cada produto' },
      { id: 'p1_9', text: 'Gerar link de afiliado para os 3 produtos' },
      { id: 'p1_10', text: 'Encurtar links no Bitly', link: 'https://bitly.com' },
      { id: 'p1_11', text: 'Testar e registrar os links encurtados' }
    ],
    parte2: [
      { id: 'p2_1', text: 'Acessar ChatGPT', link: 'https://chat.openai.com' },
      { id: 'p2_2', text: 'Criar roteiros para os 3 produtos usando o prompt sugerido' },
      { id: 'p2_3', text: 'Revisar e ajustar os roteiros no Google Docs ou Notion' }
    ],
    parte3: [
      { id: 'p3_1', text: 'Acessar CapCut Web', link: 'https://www.capcut.com/' },
      { id: 'p3_2', text: 'Criar projeto para cada produto' },
      { id: 'p3_3', text: 'Importar vídeo e cortar para 20-30 segundos' },
      { id: 'p3_4', text: 'Adicionar música de fundo e narração' },
      { id: 'p3_5', text: 'Inserir textos (hook, benefícios, CTA)' },
      { id: 'p3_6', text: 'Gerar auto legendas e revisar' },
      { id: 'p3_7', text: 'Adicionar efeitos visuais e logo' },
      { id: 'p3_8', text: 'Exportar os 3 vídeos em 1080p Alta Qualidade' }
    ],
    parte4: [
      { id: 'p4_1', text: 'Assistir os 3 vídeos' },
      { id: 'p4_2', text: 'Verificar áudio, legenda, CTA e duração' },
      { id: 'p4_3', text: 'Corrigir se necessário e reexportar' }
    ],
    parte5: [
      { id: 'p5_1', text: 'Publicar os 3 vídeos no TikTok', link: 'https://www.tiktok.com/upload' },
      { id: 'p5_2', text: 'Publicar os 3 vídeos no Kwai (emulador ou app)' },
      { id: 'p5_3', text: 'Incluir legenda, hashtags e Link na bio' }
    ],
    parte6: [
      { id: 'p6_1', text: 'Acessar Linktr.ee', link: 'https://linktr.ee/' },
      { id: 'p6_2', text: 'Atualizar links do dia com títulos atrativos' },
      { id: 'p6_3', text: 'Atualizar bio do TikTok e Kwai' }
    ],
    parte7: [
      { id: 'p7_1', text: 'Verificar visualizações e interações após 1h' },
      { id: 'p7_2', text: 'Responder comentários' },
      { id: 'p7_3', text: 'Registrar dados em planilha (hora, hashtags, desempenho)' }
    ],
    parte8: [
      { id: 'p8_1', text: 'Selecionar 5 novos produtos' },
      { id: 'p8_2', text: 'Salvar vídeos e dados iniciais' },
      { id: 'p8_3', text: 'Criar pasta com nome do dia' },
      { id: 'p8_4', text: 'Limpar arquivos e carregar equipamentos' }
    ]
  };

  // Função para iniciar um checklist do dia
  const iniciarChecklistDiario = () => {
    const checklistData = {
      title: `Checklist Afiliados - ${today}`,
      description: 'Checklist diário para produção de vídeos de afiliados',
      category: 'Afiliados',
      status: 'pendente',
      type: 'checklist_afiliados',
      checklistDate: today,
      checklistData: Object.keys(checklistEtapas).reduce((acc, parte) => {
        acc[parte] = checklistEtapas[parte].map(etapa => ({
          ...etapa,
          completed: false
        }));
        return acc;
      }, {})
    };
    
    addItem(checklistData);
  };

  // Encontrar o checklist do dia atual, se existir
  const todayChecklist = items.find(item => 
    item.checklistDate === today && item.type === 'checklist_afiliados'
  );

  // Função para atualizar o status de uma etapa
  const toggleEtapaStatus = (parte, etapaId) => {
    if (!todayChecklist) return;
    
    const updatedChecklistData = { ...todayChecklist.checklistData };
    const etapaIndex = updatedChecklistData[parte].findIndex(e => e.id === etapaId);
    
    if (etapaIndex >= 0) {
      updatedChecklistData[parte][etapaIndex].completed = 
        !updatedChecklistData[parte][etapaIndex].completed;
      
      updateItem(todayChecklist.id, {
        ...todayChecklist,
        checklistData: updatedChecklistData
      });
    }
  };

  // Calcular progresso total
  const calcularProgresso = () => {
    if (!todayChecklist) return 0;
    
    let totalEtapas = 0;
    let completadas = 0;
    
    Object.values(todayChecklist.checklistData).forEach(parte => {
      totalEtapas += parte.length;
      completadas += parte.filter(etapa => etapa.completed).length;
    });
    
    return totalEtapas > 0 ? Math.round((completadas / totalEtapas) * 100) : 0;
  };

  // Calcular progresso por parte
  const calcularProgressoParte = (parte) => {
    if (!todayChecklist || !todayChecklist.checklistData[parte]) return 0;
    
    const etapas = todayChecklist.checklistData[parte];
    const completadas = etapas.filter(etapa => etapa.completed).length;
    
    return etapas.length > 0 ? Math.round((completadas / etapas.length) * 100) : 0;
  };

  // Renderiza as etapas de uma parte específica
  const renderEtapas = (parte) => {
    if (!todayChecklist) return null;
    
    const etapas = todayChecklist.checklistData[parte] || [];
    
    return (
      <div className="mt-4">
        <ul className="space-y-2">
          {etapas.map(etapa => (
            <li key={etapa.id} className="flex items-start p-2 border rounded hover:bg-gray-50">
              <input
                type="checkbox"
                className="mt-1 mr-3"
                checked={etapa.completed}
                onChange={() => toggleEtapaStatus(parte, etapa.id)}
              />
              <div>
                <div className={etapa.completed ? "line-through text-gray-500" : ""}>
                  {etapa.text}
                </div>
                {etapa.link && (
                  <a 
                    href={etapa.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {etapa.link}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Se não houver checklist para hoje, mostra um botão para iniciar
  if (!todayChecklist) {
    return (
      <div className="mb-6 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Checklist Diário - Vídeos de Afiliados</h2>
        <p className="mb-4 text-gray-600">
          Nenhum checklist encontrado para hoje. Clique no botão abaixo para iniciar o checklist diário.
        </p>
        <button
          onClick={iniciarChecklistDiario}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Iniciar Checklist de Hoje
        </button>
      </div>
    );
  }

  // Calcular progresso total
  const progressoTotal = calcularProgresso();

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">
        Checklist Diário - Vídeos de Afiliados ({today})
      </h2>
      
      {/* Barra de progresso geral */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 mt-4">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all" 
          style={{ width: `${progressoTotal}%` }}
        ></div>
        <div className="text-center text-sm mt-1">{progressoTotal}% Concluído</div>
      </div>
      
      {/* Abas para cada parte do checklist */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {Object.keys(checklistEtapas).map((parte, index) => {
            const progresso = calcularProgressoParte(parte);
            const tituloParte = `Parte ${index + 1}`;
            
            return (
              <button
                key={parte}
                className={`py-2 px-4 text-sm font-medium relative ${
                  activeTab === parte
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(parte)}
              >
                {tituloParte}
                <span 
                  className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                    progresso === 100 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {progresso}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Conteúdo da aba selecionada */}
      <div className="mb-4">
        <h3 className="font-medium text-lg mb-2">
          {activeTab === 'parte1' && 'PARTE 1 – PESQUISA E LINKS'}
          {activeTab === 'parte2' && 'PARTE 2 – ROTEIRO COM CHATGPT'}
          {activeTab === 'parte3' && 'PARTE 3 – EDIÇÃO DE VÍDEOS (CapCut)'}
          {activeTab === 'parte4' && 'PARTE 4 – VERIFICAÇÃO DE QUALIDADE'}
          {activeTab === 'parte5' && 'PARTE 5 – PUBLICAÇÃO'}
          {activeTab === 'parte6' && 'PARTE 6 – BIO E LINK'}
          {activeTab === 'parte7' && 'PARTE 7 – MONITORAMENTO E OTIMIZAÇÃO'}
          {activeTab === 'parte8' && 'PARTE 8 – PRÉ-PREPARAÇÃO PARA O DIA SEGUINTE'}
        </h3>
        
        {renderEtapas(activeTab)}
      </div>
    </div>
  );
};

export default ChecklistAfiliados; 