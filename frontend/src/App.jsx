import { Outlet } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { Header } from './components'
function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  )
}

export default App
