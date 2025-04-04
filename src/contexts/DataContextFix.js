import React, { createContext, useState, useEffect, useContext } from 'react';

// Criando o contexto
const DataContext = createContext();

// Hook personalizado para facilitar o uso do contexto
export const useData = () => useContext(DataContext);

// Provedor do contexto
export const DataProvider = ({ children }) => {
  // Estados principais
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, completos: 0, pendentes: 0, emAndamento: 0 });
  const [filterValue, setFilterValue] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ etapa: '', link: '', status: 'Pendente' });
  const [hasChanges, setHasChanges] = useState(false);

  // Atualiza estatísticas quando os itens mudam
  useEffect(() => {
    updateStats(items);
  }, [items]);

  // Atualiza itens filtrados quando o filtro ou itens mudam
  useEffect(() => {
    filterItems(filterValue);
  }, [items, filterValue]);

  // Função para atualizar estatísticas
  const updateStats = (data) => {
    const completos = data.filter(item => item.status === 'Completo').length;
    const pendentes = data.filter(item => item.status === 'Pendente').length;
    const emAndamento = data.filter(item => item.status === 'Em andamento').length;
    
    setStats({
      total: data.length,
      completos,
      pendentes,
      emAndamento
    });
  };

  // Função para filtrar itens
  const filterItems = (value) => {
    if (!value) {
      setFilteredItems(items);
      return;
    }
    
    const filtered = items.filter(item =>
      item.etapa.toLowerCase().includes(value.toLowerCase()) ||
      item.link.toLowerCase().includes(value.toLowerCase()) ||
      item.status.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredItems(filtered);
  };

  // Função para alterar o status de um item
  const toggleStatus = (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const newStatus = item.status === 'Completo' ? 'Pendente' : 'Completo';
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    setItems(newItems);
    setHasChanges(true);
  };

  // Função para iniciar a edição de um item
  const startEdit = (item) => {
    setEditingItem({ ...item });
  };

  // Função para salvar a edição de um item
  const saveEdit = () => {
    if (!editingItem || !editingItem.etapa || !editingItem.link) return;
    
    const newItems = items.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    
    setItems(newItems);
    setEditingItem(null);
    setHasChanges(true);
  };

  // Função para adicionar um novo item
  const addItem = () => {
    if (!newItem.etapa || !newItem.link) return;
    
    const id = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const itemToAdd = { ...newItem, id };
    
    setItems([...items, itemToAdd]);
    setNewItem({ etapa: '', link: '', status: 'Pendente' });
    setHasChanges(true);
  };

  // Função para remover um item
  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    setHasChanges(true);
  };

  // Função para resetar o formulário de item
  const resetForm = () => {
    setNewItem({ etapa: '', link: '', status: 'Pendente' });
  };

  // Valor fornecido pelo contexto
  const value = {
    items,
    setItems,
    filteredItems,
    loading,
    setLoading,
    error,
    setError,
    stats,
    filterValue,
    setFilterValue,
    editingItem,
    setEditingItem,
    newItem,
    setNewItem,
    hasChanges,
    setHasChanges,
    updateStats,
    filterItems,
    toggleStatus,
    startEdit,
    saveEdit,
    addItem,
    removeItem,
    resetForm
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
