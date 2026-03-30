import React, { useEffect, useState } from 'react'
import { useVisitorId } from '../lib/useVisitId'

interface SearchLog {
  id: string;
  name: string;
  created_at: Date;
  pinned: boolean;
}

const getStorageKey = (visitorId: string) => `search_history_${visitorId}`

const loadLogs = (visitorId: string): SearchLog[] => {
  try {
    const raw = localStorage.getItem(getStorageKey(visitorId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveLogs = (visitorId: string, logs: SearchLog[]) => {
  localStorage.setItem(getStorageKey(visitorId), JSON.stringify(logs))
}

export const addSearchLog = (visitorId: string, name: string) => {
  const logs = loadLogs(visitorId)
  
  // 중복 제거 (같은 이름이면 기존 것 삭제 후 최신으로 추가)
  const filtered = logs.filter(v => v.name !== name)
  
  const newLog: SearchLog = {
    id: crypto.randomUUID(),
    name,
    created_at: new Date(),
    pinned: false,
  }
  
  saveLogs(visitorId, [newLog, ...filtered])
}

export default function SearchHistory({ setMenu, setSearch }: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const visitorId = useVisitorId()
  const [logList, setLogList] = useState<SearchLog[]>([])

  useEffect(() => {
    if (!visitorId) return
    setLogList(loadLogs(visitorId))
  }, [visitorId])

  const btn_delete = (id: string) => {
    const updated = logList.filter(v => v.id !== id)
    setLogList(updated)
    if (visitorId) saveLogs(visitorId, updated)
  }

  const btn_pinned = (id: string) => {
    const updated = logList.map(item =>
      item.id === id ? { ...item, pinned: !item.pinned } : item
    )
    setLogList(updated)
    if (visitorId) saveLogs(visitorId, updated)
  }

  const btn_search = (search: string) => {
    setSearch(search)
    setMenu("repository")
  }

  return (
    <>
      <h1>Search History</h1>
      <div style={{ padding: "10px" }}>
        {logList.map((v) => (
          <div key={v.id} style={{ textAlign: "left" }}>
            <hr />
            <span style={{ padding: "10px", display: "flex", flexDirection: "row", gap: "10px" }}>
              <span style={{ cursor: "pointer" }} onClick={() => btn_pinned(v.id)}>
                {v.pinned ? "●" : "○"}
              </span>
              <h2 style={{ cursor: "pointer" }} onClick={() => btn_search(v.name)}>
                {v.name}
              </h2>
              <button onClick={() => btn_delete(v.id)}>x</button>
            </span>
            <div style={{ textAlign: "right" }}>
              {new Date(v.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}