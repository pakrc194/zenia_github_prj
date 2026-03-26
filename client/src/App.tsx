import { useEffect, useState } from 'react'
import api from './lib/axiosInstance.ts'
import './App.css'
import { Repository } from './components/Repository.tsx'
import SearchHistory from './components/SearchHistory.tsx'



function App() {
  const [menu, setMenu] = useState("repository")

  return <>
    <div>
      <span onClick={()=>setMenu("repository")}>repository</span>/
      <span onClick={()=>setMenu("history")}>history</span>
    </div>
    {menu==="repository" && <Repository/>}
    {menu==="history" && <SearchHistory/>}
  </>
}

export default App


