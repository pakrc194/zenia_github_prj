import { useEffect, useState } from 'react'
import './App.css'
import { Repository } from './components/Repository.tsx'
import SearchHistory from './components/SearchHistory.tsx'
import Favorite from './components/Favorite.tsx'



function App() {
  const [menu, setMenu] = useState("repository")
  const [search, setSearch] = useState("" as string)
  return <>
    <div>
      <span onClick={()=>setMenu("repository")}>repository</span>/
      <span onClick={()=>setMenu("history")}>history</span>/
      <span onClick={()=>setMenu("faviorate")}>faviorate</span>
    </div>
    {menu==="repository" && <Repository search={search} setSearch={setSearch}/>}
    {menu==="history" && <SearchHistory setSearch={setSearch} setMenu={setMenu}/>}
    {menu==="faviorate" && <Favorite setMenu={setMenu}/>}
  </>
}

export default App




