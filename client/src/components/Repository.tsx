import { useEffect, useState } from 'react'
import api from '../lib/axiosInstance.ts'

interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

interface RepoResponse {
  total_count: number;
  items: RepoItem[];
}

interface SearchLog {
  id: number;
  name: string;
  created_at: Date;
  pinned: boolean;
}




export function Repository({search, setSearch}:{
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  
  const [searchData, setSearchData] = useState(""as string)
  const [searchList, setSearchList] = useState([] as RepoItem[])
  const [isLoading, setIsLoading] = useState(false)
  const [searchLog, setSearchLog] = useState([] as SearchLog[])

  const fn_search = async (search: string) => {
    setSearchData(search)
    setIsLoading(true)
    const {data} = await api.get<RepoResponse>("/github/repo", {
      params:{
        q:search
      }
    })
    console.log(data)
    setSearchList(data.items)
    setIsLoading(false)
  }

  useEffect(()=>{
    const fetchSearchLog = async () => {
      const {data} = await api.get<SearchLog[]>("/search/list", {
        params: {
            limit: 5
        }
      })
      console.log(data)
      setSearchLog(data)
    }
    fetchSearchLog()
  },[searchList])


  useEffect(()=>{
    if(search==null || search=="")
        return;

    fn_search(search);

  },[search])

  return (
    <>
      <div className='board_wrapper'>
        <div className='board_title'>
          <h1>GitHub Repositories</h1>
        </div>
        <div className='board_nav'>
          <div className='board_nav_header'>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <button onClick={()=>fn_search(search)}>검색</button>
            <div className='search_logs pinned'>
              {searchLog.filter(v=>v.pinned).map(v=>(
                <span key={v.id} className='search_logs_item' onClick={()=>fn_search(v.name)}>{v.pinned && "● "}{v.name}</span>
              ))}
            </div>
            <div className='search_logs'>
              {searchLog.filter(v=>!v.pinned).map(v=>(
                <span key={v.id} className='search_logs_item' onClick={()=>fn_search(v.name)}>{v.name}</span>
              ))}
            </div>
          </div>
          {searchData != "" && <div className='board_nav_body'>
            {isLoading ? <div>{`"${searchData}" 을 검색중입니다.`}</div> : <div>{`"${searchData}" 에 대한 검색결과입니다.`}</div>}
          </div>}
        </div>
        <div className="board_section">
          <div className='section_result'>
            {searchList.map((v,k)=>(
              <div key={k} className='section_result_item' style={{textAlign : 'left'}}>
                <hr/>
                <span>{`[${v.name}]`}</span>
                <div><h2><a href={v.html_url} target="_blank" rel="noopener noreferrer">{v.full_name}</a>{` ☆(${v.stargazers_count})`}</h2></div>
                <div><h4>{v.description}</h4></div>
                <span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}



