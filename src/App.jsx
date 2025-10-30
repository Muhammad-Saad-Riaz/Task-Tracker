import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import './App.css'

function App() {
 
  return (
    <div className=''>
      <div className='w-[100%vw] sm:flex border-b justify-between p-5 bg-gray-900 text-white'>
        <h1 className='sm:ml-8 text-3xl font-bold text-center mb-2'>Task-Tracker</h1>
        <nav className="flex items-center justify-center gap-4 sm:mr-8">
          <Link className=' bg-gray-800 rounded-4xl hover:bg-gray-700 px-3 py-2' to='/'>View Tasks</Link>
          <Link className=' bg-gray-800 rounded-4xl hover:bg-gray-700 px-3 py-2' to='/new'>Add new Task</Link>
        </nav>
      </div>
      <Outlet/>
    </div>
  )
}

export default App
