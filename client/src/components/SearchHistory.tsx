import React, { useEffect, useState } from 'react'
import api from '../lib/axiosInstance'

interface SearchLog {
  id: number;
  name: string;
  created_at: Date;
  pinned: boolean;
}

export default function SearchHistory({setMenu, setSearch}: {
    setMenu: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
    const[logList, setLogList] = useState([] as SearchLog[])

    useEffect(()=>{
        const fetchSearchLog = async () => {
            const {data} = await api.get<SearchLog[]>("/search/list")
            console.log(data)
            setLogList(data)
        }
        fetchSearchLog()
    },[])

    const btn_delete = (id: number) => {
        console.log(id)
        const fetchDelete = async () => {
            await api.delete(`/search/${id}`)
        }
        fetchDelete()
        setLogList(prev=>prev.filter(v=>v.id!=id))
    }   
    const btn_pinned = (id: number) => {
        console.log(id)
        const fetchPinned = async () => {
            await api.patch(`/search/${id}`)
        }
        fetchPinned()
        setLogList(prev => 
        prev.map(item => 
            item.id === id 
            ? { ...item, pinned: !item.pinned }
            : item
        )
        );
    }
    const btn_search = (search: string) => {
        setSearch(search)
        setMenu("repository")
    }
    
    return (
        <>
        <h1>Search History</h1>
        <div style={{padding: "10px"}}>
            {logList.map((v,k)=>(
                <div key={k} style={{textAlign:"left"}}>
                    <hr/>
                    <span style={{padding: "10px", display:"flex", flexDirection:"row", gap:"10px"}}>
                        <span style={{cursor: "pointer"}} onClick={()=>btn_pinned(v.id)}>{v.pinned ?"●":"○"}</span>
                        <h2 style={{cursor: "pointer"}} onClick={()=>btn_search(v.name)}>{v.name}</h2>
                        <button onClick={()=>btn_delete(v.id)}>x</button>
                    </span>
                    <div style={{textAlign: "right"}}>{new Date(v.created_at).toLocaleString()}</div>
                </div>
            ))}
        </div>
        </>
    )
}
