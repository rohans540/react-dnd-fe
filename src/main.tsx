import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function deferRender() {
  const { worker } = await import('./mocks/browser.ts');
  return worker.start({
    serviceWorker: {
      url: '/react-dnd-fe/mockServiceWorker.js',
    }
  })
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
