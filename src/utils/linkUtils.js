/**
 * Utilitários para verificação de links
 */

/**
 * Verifica se um link está ativo através de uma requisição fetch
 * @param {string} url - URL a ser verificada
 * @returns {Promise<{status: string, message: string}>} Resultado da verificação
 */
export const checkLink = async (url) => {
  try {
    // Verifica se a URL é válida
    if (!url || !url.trim() || !url.startsWith('http')) {
      return {
        status: 'invalid',
        message: 'URL inválida'
      };
    }
    
    // Usamos o endpoint de proxy CORS Anywhere para evitar problemas de CORS
    // Em produção, seria melhor usar um servidor backend próprio ou um serviço dedicado
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    
    // Tenta acessar a URL com um timeout de 10 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      method: 'HEAD', // Usamos HEAD para economizar banda
      mode: 'no-cors', // Modo no-cors para evitar problemas de CORS
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Como estamos usando no-cors, não podemos verificar o status real
    // Mas se a requisição não falhou, provavelmente o link está acessível
    return {
      status: 'active',
      message: 'Link ativo'
    };
  } catch (error) {
    // Se o erro for de timeout, retorna um status específico
    if (error.name === 'AbortError') {
      return {
        status: 'timeout',
        message: 'Tempo limite excedido'
      };
    }
    
    // Para outros erros, considera o link como inativo
    return {
      status: 'inactive',
      message: `Erro: ${error.message}`
    };
  }
};

/**
 * Verifica múltiplos links em paralelo (com limite de concorrência)
 * @param {Array} links - Array de objetos com links para verificar
 * @param {Function} progressCallback - Função de callback para atualizar progresso
 * @returns {Promise<Array>} - Links com resultados da verificação
 */
export const checkMultipleLinks = async (links, progressCallback) => {
  const results = [...links];
  let completed = 0;
  
  // Limita a verificação a 3 links simultaneamente para não sobrecarregar
  const concurrencyLimit = 3;
  const chunks = [];
  
  for (let i = 0; i < links.length; i += concurrencyLimit) {
    chunks.push(links.slice(i, i + concurrencyLimit));
  }
  
  for (const chunk of chunks) {
    // Verifica cada chunk de links em paralelo
    await Promise.all(
      chunk.map(async (link) => {
        const index = results.findIndex(item => item.id === link.id);
        if (index !== -1) {
          const checkResult = await checkLink(link.link);
          
          results[index] = {
            ...results[index],
            linkStatus: checkResult.status,
            linkMessage: checkResult.message,
            lastChecked: new Date().toISOString()
          };
          
          completed++;
          
          // Chama o callback de progresso a cada link verificado
          if (progressCallback) {
            progressCallback(completed, links.length, results);
          }
        }
      })
    );
  }
  
  return results;
}; 