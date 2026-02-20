import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WelcomePage from './WelcomePage.tsx'
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WelcomePage />
  </StrictMode>,
)
