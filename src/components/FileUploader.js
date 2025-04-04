import React, { useRef, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { readCSV, exportToCSV } from '../utils/csvUtils';

const FileUploader = () => {
  const { 
    items, 
    importItems,
    loading, 
    setLoading, 
    setError,
    hasChanges
  } = useData();
  
  const fileInputRef = useRef(null);
  const [importMode, setImportMode] = useState('replace'); // 'replace' ou 'append'
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setLoading(true);
      
      try {
        const data = await readCSV(file);
        
        if (importMode === 'replace') {
          // Use setItems diretamente através do contexto para substituir todos os itens
          importItems(data, true); // O segundo parâmetro indica substituição completa
        } else {
          // Use importItems para adicionar à lista existente
          importItems(data, false);
        }
        
        setError(null);
      } catch (error) {
        setError(`Erro ao ler o arquivo: ${error.message}`);
        console.error('Erro ao ler o arquivo:', error);
      } finally {
        setLoading(false);
        // Limpar o input file para permitir selecionar o mesmo arquivo novamente
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };
  
  const handleExport = () => {
    exportToCSV(items);
  };
  
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Gerenciar Arquivo</h2>
      
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <label 
            htmlFor="csv-upload" 
            className="inline-block mb-2 text-sm font-medium"
          >
            Importar CSV:
          </label>
          
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="replace-mode"
                name="import-mode"
                value="replace"
                checked={importMode === 'replace'}
                onChange={() => setImportMode('replace')}
              />
              <label htmlFor="replace-mode" className="text-sm">
                Substituir dados existentes
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="append-mode"
                name="import-mode"
                value="append"
                checked={importMode === 'append'}
                onChange={() => setImportMode('append')}
              />
              <label htmlFor="append-mode" className="text-sm">
                Adicionar aos dados existentes
              </label>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="block w-full text-sm
                         file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
          </div>
        </div>
        
        <div className="flex items-end ml-auto">
          <button
            onClick={handleExport}
            disabled={items.length === 0 || loading}
            className={`px-4 py-2 rounded font-medium 
                      ${items.length === 0 || loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'}
                      flex items-center gap-2`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Exportar CSV
          </button>
        </div>
      </div>
      
      {hasChanges && (
        <div className="mt-3">
          <span className="text-amber-600 text-sm italic">
            * Você tem alterações não salvas no localStorage
          </span>
        </div>
      )}
      
      {loading && (
        <div className="mt-2 text-blue-600 text-sm">
          Processando arquivo...
        </div>
      )}
    </div>
  );
};

export default FileUploader;
