import React, { useEffect, useState } from 'react'
import api from '../lib/axiosInstance';

interface FavoriteItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  created_at: Date;
  pinned: boolean;
}

export default function Favorite({setMenu}:{
    setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [favoriteList, setFavoriteList] = useState([] as FavoriteItem[])

  useEffect(()=>{
    const fetchList = async () => {
      const {data} = await api.get<FavoriteItem[]>("/favorite")
      const pinnedData = data.map(item=>({...item, pinned: true}))
        
      setFavoriteList(pinnedData)
    }
    fetchList()
  },[])

  const fn_delete = async (id: number) => {
    //await api.delete(`/favorite/${id}`)
    
    setFavoriteList(prev => 
        prev.map(item => 
            item.id === id 
            ? { ...item, pinned: !item.pinned }
            : item
        )
    );
  }

  

  return (
    <>
        <h1>Favorite</h1>
        <div className="board_section">
          <div className='section_result'>
            {favoriteList.map((v,k)=>(
              <div key={k} className='section_result_wrapper' style={{textAlign : 'left'}}>
                <div className='line'>
                    <hr/>
                </div>
                <div className='section_result_item'>
                    <div className='section_result_faviorate'>
                        <span style={{cursor:"pointer"}} onClick={()=>fn_delete(v.id)}>{v.pinned ? "★" : "☆"}</span>
                    </div>
                    <div className='section_result_info'>
                        <span>{`[${v.name}]`}</span>
                        <div><h2><a href={v.html_url} target="_blank" rel="noopener noreferrer">{v.full_name}</a></h2></div>
                        <div><h4>{v.description}</h4></div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
    
  )
}
