# Gerenciador de Checklist de Afiliados

Uma aplicação web para gerenciar e acompanhar links de afiliados e suas respectivas etapas de implementação.

## Funcionalidades

- Dashboard com visão geral de progresso
- Adição e edição de itens (links de afiliados)
- Filtragem por categoria e status
- Importação e exportação de dados via CSV
- Armazenamento local (dados persistentes no navegador)

## Tecnologias Utilizadas

- React.js
- Tailwind CSS para estilização
- Context API para gerenciamento de estado
- localStorage para persistência de dados
- PapaParse para processamento de arquivos CSV

## Como Usar

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm start
   ```
4. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

- `/src/components` - Componentes React
- `/src/contexts` - Context API para gerenciamento de estado
- `/src/utils` - Utilitários (processamento CSV, etc)

## Formatos de Dados

A aplicação gerencia itens com a seguinte estrutura:

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "link": "string",
  "category": "string",
  "status": "pendente" | "em_andamento" | "completo",
  "notes": "string"
}
```

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes. 