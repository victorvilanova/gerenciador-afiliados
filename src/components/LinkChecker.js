import React from 'react';
import { useData } from '../contexts/DataContext';

const LinkChecker = () => {
  const { 
    stats, 
    checkAllLinks, 
    isCheckingLinks, 
    checkProgress,
    error,
    filters,
    updateFilters
  } = useData();
  
  // Formata a data em um formato mais amigável
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Status com ícones e cores
  const getLinkStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { icon: '✅', color: 'text-green-600', label: 'Ativos' };
      case 'inactive':
        return { icon: '❌', color: 'text-red-600', label: 'Inativos' };
      case 'timeout':
        return { icon: '⏱️', color: 'text-orange-500', label: 'Timeout' };
      case 'invalid':
        return { icon: '⚠️', color: 'text-yellow-600', label: 'Inválidos' };
      default:
        return { icon: '❓', color: 'text-gray-400', label: 'Não verificados' };
    }
  };
  
  // Configurando o filtro de status de link
  const handleLinkStatusFilter = (status) => {
    updateFilters({ linkStatus: status === filters.linkStatus ? '' : status });
  };
  
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Verificação de Links</h2>
        
        <button
          onClick={checkAllLinks}
          disabled={isCheckingLinks || stats.total === 0}
          className={`px-4 py-2 rounded font-medium flex items-center gap-2
                     ${isCheckingLinks || stats.total === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {isCheckingLinks ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verificando... ({checkProgress.completed}/{checkProgress.total})
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verificar todos os links
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div 
          className={`p-3 rounded-lg border ${filters.linkStatus === 'active' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} cursor-pointer`}
          onClick={() => handleLinkStatusFilter('active')}
        >
          <div className="flex items-center text-green-600 mb-1">
            <span className="text-lg mr-2">✅</span>
            <span className="font-medium">Links Ativos</span>
          </div>
          <p className="text-2xl font-bold">{stats.linksActive}</p>
        </div>
        
        <div 
          className={`p-3 rounded-lg border ${filters.linkStatus === 'inactive' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} cursor-pointer`}
          onClick={() => handleLinkStatusFilter('inactive')}
        >
          <div className="flex items-center text-red-600 mb-1">
            <span className="text-lg mr-2">❌</span>
            <span className="font-medium">Links Inativos</span>
          </div>
          <p className="text-2xl font-bold">{stats.linksInactive}</p>
        </div>
        
        <div 
          className={`p-3 rounded-lg border ${filters.linkStatus === 'invalid' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'} cursor-pointer`}
          onClick={() => handleLinkStatusFilter('invalid')}
        >
          <div className="flex items-center text-yellow-600 mb-1">
            <span className="text-lg mr-2">⚠️</span>
            <span className="font-medium">Links Inválidos</span>
          </div>
          <p className="text-2xl font-bold">{stats.linksInvalid}</p>
        </div>
        
        <div className="p-3 rounded-lg border bg-gray-50 border-gray-200">
          <div className="flex items-center text-blue-600 mb-1">
            <span className="text-lg mr-2">🔍</span>
            <span className="font-medium">Verificados</span>
          </div>
          <p className="text-2xl font-bold">{stats.linksChecked} / {stats.total}</p>
        </div>
      </div>
      
      {isCheckingLinks && (
        <div className="mt-2 mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Progresso: {Math.round((checkProgress.completed / checkProgress.total) * 100)}%</span>
            <span className="text-sm text-gray-500">{checkProgress.completed}/{checkProgress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(checkProgress.completed / checkProgress.total) * 100}%` }}></div>
          </div>
        </div>
      )}
      
      <div className="text-sm text-gray-500 mt-4">
        <p>Dica: Clique nos cards acima para filtrar os links por status.</p>
        {stats.linksChecked > 0 && (
          <p>Útima verificação: {formatDate(new Date().toISOString())}</p>
        )}
      </div>
    </div>
  );
};

export default LinkChecker; 