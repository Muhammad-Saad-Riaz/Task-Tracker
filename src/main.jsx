import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import TaskList from './features/tasks/TaskList'
import TaskForm from './features/tasks/TaskForm'

import './index.css'
import App from './App.jsx'

const router=createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          index:true,
          element:<TaskList/>
        },
        {
          path:'new',
          element:<TaskForm/>
        }
      ]
    }
  ])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </StrictMode>
)
