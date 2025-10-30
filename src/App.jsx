import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className=''>
      <div className='flex border-b justify-between p-5 bg-gray-900 text-white'>
        <h1 className='ml-8 text-3xl font-bold text-center'>Task-Tracker</h1>
        <nav className="flex items-center gap-4 mr-8">
          <Link className=' bg-gray-800 rounded-4xl hover:bg-gray-700 px-3 py-2' to='/'>View Tasks</Link>
          <Link className=' bg-gray-800 rounded-4xl hover:bg-gray-700 px-3 py-2' to='/new'>Add new Task</Link>
        </nav>
      </div>
      <Outlet/>
    </div>
  )
}

export default App
