import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import OClube from './pages/OClube'
import OEspaco from './pages/OEspaco'
import Experiencia from './pages/Experiencia'
import Contato from './pages/Contato'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/o-clube', element: <OClube /> },
      { path: '/o-espaco', element: <OEspaco /> },
      { path: '/experiencia', element: <Experiencia /> },
      { path: '/contato', element: <Contato /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
