import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { useEffect } from 'react'
import axios from 'axios'
function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  )
}

export default App
