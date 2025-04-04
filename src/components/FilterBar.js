import React from 'react';
import { useData } from '../contexts/DataContext';

const FilterBar = () => {
  const { filters, updateFilters } = useData();
  
  const handleSearchChange = (e) => {
    updateFilters({ searchTerm: e.target.value });
  };
  
  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value });
  };
  
  const handleStatusChange = (e) => {
    updateFilters({ status: e.target.value });
  };
  
  const clearFilters = () => {
    updateFilters({
      searchTerm: '',
      category: '',
      status: ''
    });
  };
  
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
            Pesquisar
          </label>
          <div className="relative">
            <input
              type="text"
              id="searchTerm"
              placeholder="Buscar por título, descrição ou link..."
              className="w-full p-2 border border-gray-300 rounded-md pl-8"
              value={filters.searchTerm}
              onChange={handleSearchChange}
            />
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
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="category"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas as categorias</option>
            <option value="midia">Mídia</option>
            <option value="produto">Produto</option>
            <option value="afiliacao">Afiliação</option>
            <option value="contrato">Contrato</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="completo">Completo</option>
          </select>
        </div>
      </div>
      
      {(filters.searchTerm || filters.category || filters.status) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-red-600 hover:text-red-800"
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
              className="mr-1"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
