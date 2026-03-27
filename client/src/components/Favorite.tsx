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

  const fn_toggle = async (favorite: FavoriteItem) => {
    //
    if(favorite.pinned) {
      console.log("delete")
      
      await api.delete(`/favorite`,{
        params : {
          fullName : favorite.full_name
        }
      })
    } else {
      console.log("insert")
      await api.post(`/favorite`, favorite)
    }

    setFavoriteList(prev => 
        prev.map(item => 
            item.id === favorite.id 
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
                        <span style={{cursor:"pointer"}} onClick={()=>fn_toggle(v)}>{v.pinned ? "★" : "☆"}</span>
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
