import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import GamePage from './pages/GamePage'
import Leaderboards from './pages/Leaderboards'


const router = createBrowserRouter([
  {
    path: '/',
    element: <GamePage />
  },
  {
    path: '/leaderboards',
    element: <Leaderboards />
  }
])

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>,
)

