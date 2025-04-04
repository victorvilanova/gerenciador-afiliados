import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const ItemForm = () => {
  const { newItem, setNewItem, addItem, resetForm } = useData();
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [checklistDate, setChecklistDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Verificação de segurança para evitar o erro
  if (!newItem) {
    return <div>Carregando formulário...</div>;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
  };
  
  // Listas de etapas para cada parte do checklist
  const createChecklistEtapas = () => {
    return {
      parte1: [
        { id: 'p1_1', text: 'Acessar Shopee Afiliados', link: 'https://affiliate.shopee.com.br', completed: false },
        { id: 'p1_2', text: 'Fazer login', completed: false },
        { id: 'p1_3', text: 'Ir em "Produtos em Alta" ou "Recomendados"', completed: false },
        { id: 'p1_4', text: 'Filtrar por categoria desejada', completed: false },
        { id: 'p1_5', text: 'Ordenar por Taxa de Comissão', completed: false },
        { id: 'p1_6', text: 'Selecionar 3 produtos com boas avaliações (4+ estrelas)', completed: false },
        { id: 'p1_7', text: 'Anotar: nome, preço, comissão, 3 características', completed: false },
        { id: 'p1_8', text: 'Baixar o vídeo oficial de cada produto', completed: false },
        { id: 'p1_9', text: 'Gerar link de afiliado para os 3 produtos', completed: false },
        { id: 'p1_10', text: 'Encurtar links no Bitly', link: 'https://bitly.com', completed: false },
        { id: 'p1_11', text: 'Testar e registrar os links encurtados', completed: false }
      ],
      parte2: [
        { id: 'p2_1', text: 'Acessar ChatGPT', link: 'https://chat.openai.com', completed: false },
        { id: 'p2_2', text: 'Criar roteiros para os 3 produtos usando o prompt sugerido', completed: false },
        { id: 'p2_3', text: 'Revisar e ajustar os roteiros no Google Docs ou Notion', completed: false }
      ],
      parte3: [
        { id: 'p3_1', text: 'Acessar CapCut Web', link: 'https://www.capcut.com/', completed: false },
        { id: 'p3_2', text: 'Criar projeto para cada produto', completed: false },
        { id: 'p3_3', text: 'Importar vídeo e cortar para 20-30 segundos', completed: false },
        { id: 'p3_4', text: 'Adicionar música de fundo e narração', completed: false },
        { id: 'p3_5', text: 'Inserir textos (hook, benefícios, CTA)', completed: false },
        { id: 'p3_6', text: 'Gerar auto legendas e revisar', completed: false },
        { id: 'p3_7', text: 'Adicionar efeitos visuais e logo', completed: false },
        { id: 'p3_8', text: 'Exportar os 3 vídeos em 1080p Alta Qualidade', completed: false }
      ],
      parte4: [
        { id: 'p4_1', text: 'Assistir os 3 vídeos', completed: false },
        { id: 'p4_2', text: 'Verificar áudio, legenda, CTA e duração', completed: false },
        { id: 'p4_3', text: 'Corrigir se necessário e reexportar', completed: false }
      ],
      parte5: [
        { id: 'p5_1', text: 'Publicar os 3 vídeos no TikTok', link: 'https://www.tiktok.com/upload', completed: false },
        { id: 'p5_2', text: 'Publicar os 3 vídeos no Kwai (emulador ou app)', completed: false },
        { id: 'p5_3', text: 'Incluir legenda, hashtags e Link na bio', completed: false }
      ],
      parte6: [
        { id: 'p6_1', text: 'Acessar Linktr.ee', link: 'https://linktr.ee/', completed: false },
        { id: 'p6_2', text: 'Atualizar links do dia com títulos atrativos', completed: false },
        { id: 'p6_3', text: 'Atualizar bio do TikTok e Kwai', completed: false }
      ],
      parte7: [
        { id: 'p7_1', text: 'Verificar visualizações e interações após 1h', completed: false },
        { id: 'p7_2', text: 'Responder comentários', completed: false },
        { id: 'p7_3', text: 'Registrar dados em planilha (hora, hashtags, desempenho)', completed: false }
      ],
      parte8: [
        { id: 'p8_1', text: 'Selecionar 5 novos produtos', completed: false },
        { id: 'p8_2', text: 'Salvar vídeos e dados iniciais', completed: false },
        { id: 'p8_3', text: 'Criar pasta com nome do dia', completed: false },
        { id: 'p8_4', text: 'Limpar arquivos e carregar equipamentos', completed: false }
      ]
    };
  };
  
  // Criar checklist para data específica
  const criarChecklistManual = () => {
    const checklistData = {
      title: `Checklist Afiliados - ${checklistDate}`,
      description: 'Checklist diário para produção de vídeos de afiliados',
      category: 'Afiliados',
      status: 'pendente',
      type: 'checklist_afiliados',
      checklistDate: checklistDate,
      checklistData: createChecklistEtapas()
    };
    
    addItem(checklistData);
    setShowChecklistModal(false);
  };
  
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="mr-2"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Adicionar Nova Etapa
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="etapa" className="block text-sm font-medium mb-1">
              Nome da Etapa *
            </label>
            <input
              id="etapa"
              type="text"
              placeholder="Nome da Etapa"
              className="w-full p-2 border border-gray-300 rounded"
              value={newItem.etapa}
              onChange={(e) => setNewItem({...newItem, etapa: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label htmlFor="link" className="block text-sm font-medium mb-1">
              Link Relevante *
            </label>
            <input
              id="link"
              type="url"
              placeholder="https://exemplo.com/link"
              className="w-full p-2 border border-gray-300 rounded"
              value={newItem.link}
              onChange={(e) => setNewItem({...newItem, link: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <div className="flex gap-2">
              <select
                id="status"
                className="p-2 border border-gray-300 rounded flex-grow"
                value={newItem.status}
                onChange={(e) => setNewItem({...newItem, status: e.target.value})}
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Completo">Completo</option>
              </select>
              
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Adicionar
              </button>
              
              <button 
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400 transition"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <label htmlFor="categoria" className="block text-sm font-medium mb-1">
            Categoria (opcional)
          </label>
          <input
            id="categoria"
            type="text"
            placeholder="Ex: Material Promocional, Tutorial, etc."
            className="w-full p-2 border border-gray-300 rounded"
            value={newItem.categoria || ''}
            onChange={(e) => setNewItem({...newItem, categoria: e.target.value})}
          />
        </div>
      </form>
      
      {/* Botão para criar checklist manual */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowChecklistModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M9 16l2 2 4-4"></path>
          </svg>
          Criar Checklist de Afiliados para Data Específica
        </button>
      </div>
      
      {/* Modal para criar checklist */}
      {showChecklistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Criar Checklist para Data Específica</h2>
            
            <div className="mb-4">
              <label htmlFor="checklistDate" className="block text-sm font-medium mb-1">
                Data do Checklist
              </label>
              <input
                id="checklistDate"
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={checklistDate}
                onChange={(e) => setChecklistDate(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowChecklistModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={criarChecklistManual}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Criar Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemForm;
