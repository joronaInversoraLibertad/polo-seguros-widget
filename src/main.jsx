import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log('🚀 MAIN: Iniciando aplicación React');
console.log('🚀 MAIN: URL actual:', window.location.href);
console.log('🚀 MAIN: Root element existe?', !!document.getElementById('root'));

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ MAIN: No se encontró el elemento root!');
} else {
  console.log('🚀 MAIN: Renderizando App en root');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('🚀 MAIN: App renderizada');
}

