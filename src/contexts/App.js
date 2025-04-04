import React from 'react';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FileUploader from './components/FileUploader';
import FilterBar from './components/FilterBar';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          <Dashboard />
          <FileUploader />
          <FilterBar />
          <ItemForm />
          <ItemList />
        </main>
        
        <footer className="bg-gray-200 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            Gerenciador de Checklist de Afiliados &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </DataProvider>
  );
}

export default App;