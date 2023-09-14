import './App.scss'
import { useEffect, useState } from 'react'
import Pokemon from './components/Pokemon'
import { PokemonData } from './components/IPokemonData'
import PokeList, { IPokeListItem } from './components/PokeList'
import Pagination from './components/Pagination'
import axios from 'axios'

interface ResourceList {
  count: number
  next: string
  previous: string
  results: []
}

function App() {

  const [pokemonList, setPokemonList] = useState<IPokeListItem[]>([])
  const [currentListUrl, setCurrentListUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextListUrl, setNextListUrl] = useState("")
  const [prevListUrl, setPrevListUrl] = useState("")
  const [currentPokemon, setCurrentPokemon] = useState<PokemonData>(new PokemonData())
  const [currentPokemonLoading, setCurrentPokemonLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    let isMounted = true
    setLoading(true)

    const cancelControl = new AbortController()
    axios.get(currentListUrl, {
      signal: cancelControl.signal
    }).then(resp => {
      const data: ResourceList = resp.data
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
  }, [currentListUrl]) //end useEffect, this block will run only when currentListUrl changes

  async function onPokeListItemClick(name:string){
    setCurrentPokemonLoading(true)

    const cancelControl = new AbortController()
    axios.get("https://pokeapi.co/api/v2/pokemon/" + name, {
      signal: cancelControl.signal
    }).then(resp => {
      setCurrentPokemon(resp.data)
      console.log(resp.data)
      setCurrentPokemonLoading(false)
    }).catch((error) => {
      if (axios.isCancel(error)) throw error
      else return
    })
  }

  function nextList() {
    setCurrentListUrl(nextListUrl)
  }

  function previousList() {
    setCurrentListUrl(prevListUrl)
  }

  if (loading) return "Loading..."
  return (
    <>
      <div className="wrapper" style={{marginBottom:'3em'}}>
        <header className="header">
          <h2 className='header-title'>PokeAPI Exercise App</h2>
        </header>
        <article className="main-container">
          <Pokemon data={currentPokemon} loading={currentPokemonLoading} />
        </article>
        <aside className="aside aside-1">
          <PokeList list={pokemonList} onItemClick={onPokeListItemClick} />
          <Pagination goBack={prevListUrl ? previousList : undefined} goForward={nextListUrl ? nextList : undefined} />
        </aside>
        <aside className="aside aside-2">Aside 2</aside>
        <footer className="footer">Footer</footer>
      </div>
      
      
    </>
  )
}

export default App
