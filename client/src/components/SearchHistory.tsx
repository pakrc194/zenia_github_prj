import React, { useEffect, useState } from 'react'
import api from '../lib/axiosInstance'

interface SearchLog {
  id: number;
  name: string;
  created_at: Date;
  pinned: boolean;
}

export default function SearchHistory() {
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

    return (
        <>
        <h1>Search History</h1>
        <div style={{padding: "10px"}}>
            {logList.map((v,k)=>(
                <div key={k} style={{textAlign:"left"}}>
                    <hr/>
                    <span style={{padding: "10px", display:"flex", flexDirection:"row", gap:"10px"}}>
                        <span style={{cursor: "pointer"}}>{v.pinned ?"●":"○"}</span>
                        <h2>{v.name}</h2>
                        <button onClick={()=>btn_delete(v.id)}>x</button>
                    </span>
                    <div style={{textAlign: "right"}}>{new Date(v.created_at).toLocaleString()}</div>
                </div>
            ))}
        </div>
        </>
    )
}
