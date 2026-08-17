import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'

// A Home entra estática — é a porta de entrada e não deve pagar um round trip
// extra. As páginas internas viram chunks próprios, carregados na navegação.
const OClube = lazy(() => import('./pages/OClube'))
const OEspaco = lazy(() => import('./pages/OEspaco'))
const Experiencia = lazy(() => import('./pages/Experiencia'))
const Contato = lazy(() => import('./pages/Contato'))

// Placeholder na cor da navbar: cobre o intervalo entre rotas sem piscar branco.
const carregando = <div className="min-h-svh bg-navy" aria-busy="true" aria-live="polite" />
const suspenso = (el) => <Suspense fallback={carregando}>{el}</Suspense>

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/o-clube', element: suspenso(<OClube />) },
      { path: '/o-espaco', element: suspenso(<OEspaco />) },
      { path: '/experiencia', element: suspenso(<Experiencia />) },
      { path: '/contato', element: suspenso(<Contato />) },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
