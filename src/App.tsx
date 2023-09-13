import './App.css'
import { useEffect, useState } from 'react'
import PokeList, { PokeListItem } from './components/PokeList'
import Pagination from './components/Pagination'
import axios from 'axios'

interface ResourceList{
  count:number
  next:string
  previous:string
  results: []
}

function App() {

  const [pokemonList, setPokemonList] = useState<PokeListItem[]>([])
  const [currentListUrl, setCurrentListUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextListUrl, setNextListUrl] = useState("")
  const [prevListUrl, setPrevListUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    
    const cancelControl = new AbortController()
    axios.get(currentListUrl,{
      signal: cancelControl.signal
    }).then(resp =>{
      const data:ResourceList = resp.data
      setNextListUrl(data.next)
      setPrevListUrl(data.previous)
      setPokemonList(data.results)
      setLoading(false)
    }).catch((error) => {
      if (axios.isCancel(error)) throw error
      else return
    })

    return () => { //destructor
      isMounted = false
      isMounted && cancelControl.abort()
    } 
  }, [currentListUrl]) //end useEffect

  function nextList(){
    setCurrentListUrl(nextListUrl)
  }

  function previousList(){
    setCurrentListUrl(prevListUrl)
  }

  if(loading) return "Loading..."
  return (
    <>
      <PokeList list={pokemonList} />
      <Pagination goBack={prevListUrl ? previousList : undefined} goForward={nextListUrl ? nextList : undefined}/>
    </>
  )
}

export default App
