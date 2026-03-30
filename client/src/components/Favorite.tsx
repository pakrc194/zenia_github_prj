import React, { useEffect, useState } from 'react'
import { useVisitorId } from '../lib/useVisitId'

interface FavoriteItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  created_at: Date;
  pinned: boolean;
}

const getStorageKey = (visitorId: string) => `favorites_${visitorId}`

const loadFavorites = (visitorId: string): FavoriteItem[] => {
  try {
    const raw = localStorage.getItem(getStorageKey(visitorId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveFavorites = (visitorId: string, items: FavoriteItem[]) => {
  localStorage.setItem(getStorageKey(visitorId), JSON.stringify(items))
}

export const toggleFavorite = (visitorId: string, item: Omit<FavoriteItem, 'pinned' | 'created_at'>) => {
  const favorites = loadFavorites(visitorId)
  const exists = favorites.some(v => v.full_name === item.full_name)

  const updated = exists
    ? favorites.filter(v => v.full_name !== item.full_name)
    : [...favorites, { ...item, pinned: true, created_at: new Date() }]

  saveFavorites(visitorId, updated)
  return !exists
}

export const isFavorited = (visitorId: string, full_name: string): boolean => {
  const favorites = loadFavorites(visitorId)
  return favorites.some(v => v.full_name === full_name)
}

export default function Favorite({ setMenu }: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const visitorId = useVisitorId()
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([])

  useEffect(() => {
    if (!visitorId) return
    const data = loadFavorites(visitorId)
    setFavoriteList(data.map(item => ({ ...item, pinned: true })))
  }, [visitorId])

  const fn_toggle = (favorite: FavoriteItem) => {
    if (!visitorId) return

    if (favorite.pinned) {
      // 삭제
      const updated = favoriteList.filter(v => v.full_name !== favorite.full_name)
      setFavoriteList(updated)
      saveFavorites(visitorId, updated)
    } else {
      // 추가
      const updated = favoriteList.map(item =>
        item.full_name === favorite.full_name ? { ...item, pinned: true } : item
      )
      setFavoriteList(updated)
      saveFavorites(visitorId, updated.filter(v => v.pinned))
    }
  }

  return (
    <>
      <h1>Favorite</h1>
      <div className="board_section">
        <div className='section_result'>
          {favoriteList.map((v, k) => (
            <div key={k} className='section_result_wrapper' style={{ textAlign: 'left' }}>
              <div className='line'>
                <hr />
              </div>
              <div className='section_result_item'>
                <div className='section_result_faviorate'>
                  <span style={{ cursor: "pointer" }} onClick={() => fn_toggle(v)}>
                    {v.pinned ? "★" : "☆"}
                  </span>
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