import './App.scss'
import { useEffect, useState } from 'react'
import Pokemon from './components/Pokemon'
import { PokemonData } from './components/IPokemonData'
import PokeList, { IPokeListItem } from './components/PokeList'
import Pagination from './components/Pagination'
import axios from 'axios'
import PokemonAside from './components/PokemonAside'

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
  const [listLoading, setListLoading] = useState(true)
  const [pokemonAside, setPokemonAside] = useState<object| []>({})

  useEffect(() => { 
    let isMounted = true
    setListLoading(true)

    const cancelControl = new AbortController()
    axios.get(currentListUrl, {
      signal: cancelControl.signal
    }).then(resp => {
      const data: ResourceList = resp.data
      setNextListUrl(data.next)
      setPrevListUrl(data.previous)
      setPokemonList(data.results)
      setListLoading(false)
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

  function PokemonOnExpand(data: object|[]){
    setPokemonAside(data)
  }

  return (
    <>
      <header className="header">
        <h2 className='header-title'>PokeAPI Responsive Exercise App</h2>
      </header>
      <main className="container col-wrapper">
        <article className="col-main">
          <Pokemon data={currentPokemon} loading={currentPokemonLoading} onExpand={PokemonOnExpand}/>
        </article>
        <aside className="col-aside col-aside-left">
          <PokeList list={pokemonList} onItemClick={onPokeListItemClick} loading={listLoading} />
          <Pagination goBack={prevListUrl ? previousList : undefined} goForward={nextListUrl ? nextList : undefined} />
        </aside>
        <aside className="col-aside col-aside-right">
          <PokemonAside data={pokemonAside}/>
        </aside>
      </main>
      
      <footer className="footer">uoyj @ github</footer>
    </>
  )
}

export default App
