import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { VisualDebugger } from 'react-tailwindcss-debugger';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <VisualDebugger /> */}
  </StrictMode>,
)
