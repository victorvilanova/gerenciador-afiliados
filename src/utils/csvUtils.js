import Papa from 'papaparse';

// Função para ler um arquivo CSV e convertê-lo em um array de objetos
export const readCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`Erro na análise do CSV: ${results.errors[0].message}`));
        } else {
          // Processar os dados para garantir que tenham as propriedades necessárias
          const processedData = results.data.map((item, index) => ({
            id: item.id || `import-${Date.now()}-${index}`,
            title: item.title || '',
            description: item.description || '',
            link: item.link || '',
            category: item.category || '',
            status: item.status || 'pendente',
            notes: item.notes || ''
          }));
          resolve(processedData);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Função para exportar dados para um arquivo CSV
export const exportToCSV = (data) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Criar um link temporário para download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `afiliados-export-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  
  // Simular clique no link
  link.click();
  
  // Limpar
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
