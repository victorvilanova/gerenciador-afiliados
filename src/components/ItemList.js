import React from 'react';
import { useData } from '../contexts/DataContext';

const ItemList = () => {
  const { 
    filteredItems, 
    updateItem, 
    removeItem,
    checkSingleLink,
    isCheckingLinks
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
  
  // Retorna ícone e cor para o status do link
  const getLinkStatusInfo = (item) => {
    if (!item.lastChecked) {
      return { icon: '❓', color: 'gray-400', tooltip: 'Link não verificado' };
    }
    
    switch(item.linkStatus) {
      case 'active':
        return { icon: '✅', color: 'green-600', tooltip: 'Link ativo' };
      case 'inactive':
        return { icon: '❌', color: 'red-600', tooltip: item.linkMessage || 'Link inativo' };
      case 'timeout':
        return { icon: '⏱️', color: 'orange-500', tooltip: 'Tempo de resposta excedido' };
      case 'invalid':
        return { icon: '⚠️', color: 'yellow-600', tooltip: 'URL inválida' };
      default:
        return { icon: '❓', color: 'gray-400', tooltip: 'Status desconhecido' };
    }
  };
  
  // Formata data da última verificação
  const formatLastChecked = (dateString) => {
    if (!dateString) return 'Nunca verificado';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
              Link Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => {
              const linkStatus = getLinkStatusInfo(item);
              
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button onClick={() => toggleStatus(item.id)}>
                      {getStatusIcon(item.status)}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-sm text-gray-500">{item.description}</div>
                      )}
                    </div>
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
                    {item.lastChecked && (
                      <div className="text-xs text-gray-500 mt-1">
                        Verificado: {formatLastChecked(item.lastChecked)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className={`text-${linkStatus.color}`}
                      title={linkStatus.tooltip}
                    >
                      {linkStatus.icon}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {item.category || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => checkSingleLink(item.id)}
                      disabled={isCheckingLinks}
                      title="Verificar link"
                    >
                      Verificar
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => removeItem(item.id)}
                      title="Remover item"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
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