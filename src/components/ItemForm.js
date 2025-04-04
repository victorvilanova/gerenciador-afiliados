import React from 'react';
import { useData } from '../contexts/DataContext';

const ItemForm = () => {
  const { newItem, setNewItem, addItem, resetForm } = useData();
  
  // Verificação de segurança para evitar o erro
  if (!newItem) {
    return <div>Carregando formulário...</div>;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
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
    </div>
  );
};

export default ItemForm;
