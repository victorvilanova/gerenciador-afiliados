import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Chave para armazenar dados no localStorage
const STORAGE_KEY = 'gerenciador-afiliados-data';

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Carrega os dados iniciais do localStorage
  const loadInitialData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      return [];
    }
  };

  const [items, setItems] = useState(loadInitialData);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Salvar dados no localStorage quando items mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      // Uma vez que os dados foram salvos, não há mais alterações pendentes
      setHasChanges(false);
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
      // Se houve erro ao salvar, mantenha o flag de alterações
    }
  }, [items]);

  // Calcular estatísticas para o dashboard
  const calculateStats = () => {
    const total = items.length;
    const completos = items.filter(item => item.status === 'completo').length;
    const emAndamento = items.filter(item => item.status === 'em_andamento').length;
    const pendentes = items.filter(item => item.status === 'pendente').length;
    
    return {
      total,
      completos,
      emAndamento,
      pendentes
    };
  };

  // Stats calculados com base nos itens
  const stats = calculateStats();

  // Efeito para aplicar filtros quando items ou filtros mudarem
  useEffect(() => {
    let result = [...items];
    
    if (filters.category) {
      result = result.filter(item => item.category === filters.category);
    }
    
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchLower) || 
        item.description.toLowerCase().includes(searchLower) ||
        item.link.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredItems(result);
  }, [items, filters]);

  // Função para adicionar um novo item
  const addItem = (newItem) => {
    setItems(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
    setHasChanges(true);
  };

  // Função para atualizar um item existente
  const updateItem = (id, updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    setHasChanges(true);
  };

  // Função para remover um item
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setHasChanges(true);
  };

  // Função para importar itens de um arquivo CSV
  const importItems = (newItems, replaceAll = false) => {
    if (replaceAll) {
      setItems(newItems);
    } else {
      setItems(prev => [...prev, ...newItems]);
    }
    setHasChanges(true);
  };

  // Função para limpar todos os dados
  const clearAllData = () => {
    if (window.confirm('Tem certeza que deseja remover todos os itens? Esta ação não pode ser desfeita.')) {
      setItems([]);
      setHasChanges(true);
    }
  };

  // Função para atualizar os filtros
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Valores e funções expostos pelo contexto
  const value = {
    items,
    setItems,
    filteredItems,
    filters,
    loading,
    setLoading,
    error,
    setError,
    hasChanges,
    setHasChanges,
    stats,
    addItem,
    updateItem,
    removeItem,
    importItems,
    clearAllData,
    updateFilters
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
