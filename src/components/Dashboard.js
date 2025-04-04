import React from 'react';
import { useData } from '../contexts/DataContext';

const Dashboard = () => {
  const { stats, clearAllData } = useData();
  
  // Calcula a porcentagem de conclusão
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completos / stats.total) * 100) 
    : 0;
  
  // Calcula a porcentagem de conclusão dos checklists
  const checklistCompletionPercentage = stats.checklistsAtivos > 0
    ? Math.round((stats.checklistsConcluidos / stats.checklistsAtivos) * 100)
    : 0;
  
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        
        {stats.total > 0 && (
          <button
            onClick={clearAllData}
            className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded border border-red-200 hover:bg-red-100 transition-colors"
            title="Remover todos os itens"
          >
            Limpar dados
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-blue-800">Total de Etapas</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-green-800">Completos</h3>
          <p className="text-2xl font-bold">{stats.completos}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-yellow-800">Em Andamento</h3>
          <p className="text-2xl font-bold">{stats.emAndamento}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-red-800">Pendentes</h3>
          <p className="text-2xl font-bold">{stats.pendentes}</p>
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-sm font-medium">Progresso Geral: {completionPercentage}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      {/* Seção de checklists de afiliados */}
      <h3 className="text-lg font-semibold mb-3 mt-6 border-t pt-4">Estatísticas de Checklists de Afiliados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-purple-800">Checklists Ativos</h3>
          <p className="text-2xl font-bold">{stats.checklistsAtivos || 0}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-indigo-800">Checklists Concluídos</h3>
          <p className="text-2xl font-bold">{stats.checklistsConcluidos || 0}</p>
        </div>
        <div className="bg-teal-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-teal-800">Taxa de Conclusão</h3>
          <p className="text-2xl font-bold">{checklistCompletionPercentage}%</p>
        </div>
      </div>
      
      {/* Estatísticas de links */}
      <h3 className="text-lg font-semibold mb-3 mt-6 border-t pt-4">Status dos Links</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-gray-800">Links Verificados</h3>
          <p className="text-2xl font-bold">{stats.linksChecked || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-green-800">Links Ativos</h3>
          <p className="text-2xl font-bold">{stats.linksActive || 0}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-orange-800">Links Inativos</h3>
          <p className="text-2xl font-bold">{stats.linksInactive || 0}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-1 text-red-800">Links Inválidos</h3>
          <p className="text-2xl font-bold">{stats.linksInvalid || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
