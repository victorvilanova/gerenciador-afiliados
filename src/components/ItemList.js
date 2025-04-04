import React from 'react';
import { useData } from '../contexts/DataContext';

const ItemList = () => {
  const { 
    filteredItems, 
    updateItem, 
    removeItem 
  } = useData();

  // Função para alternar o status de um item
  const toggleStatus = (id) => {
    const item = filteredItems.find(item => item.id === id);
    if (!item) return;
    
    let newStatus;
    // Rotação dos status
    if (item.status === 'pendente') {
      newStatus = 'em_andamento';
    } else if (item.status === 'em_andamento') {
      newStatus = 'completo';
    } else {
      newStatus = 'pendente';
    }
    
    updateItem(id, { ...item, status: newStatus });
  };

  // Retorna o ícone de status adequado
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completo':
        return '✅';
      case 'em_andamento':
        return '🔄';
      default:
        return '⏳';
    }
  };

  return (
    <div className="overflow-hidden border rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <button onClick={() => toggleStatus(item.id)}>
                    {getStatusIcon(item.status)}
                  </button>
                </td>
                <td className="px-4 py-4">
                  {item.title}
                </td>
                <td className="px-4 py-4">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.link}
                  </a>
                </td>
                <td className="px-4 py-4">
                  {item.category || '-'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => removeItem(item.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                Nenhum item encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;