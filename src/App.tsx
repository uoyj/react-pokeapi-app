import './App.css'
import { useEffect, useState } from 'react'
import {PokeListItem, PokeList} from './components/PokeList'

function App() {

  const [pokemonList, setPokemonList] = useState<PokeListItem[]>([])

  useEffect(() => {
    fetchPokemon().then(p => {
      console.log(p)
      setPokemonList(p.results)
    })
  }, [])
  
  async function fetchPokemon(){
    return await (await fetch("https://pokeapi.co/api/v2/pokemon/")).json()
  } 

  return (
    <>
      <PokeList list={pokemonList}></PokeList>
    </>
  )
}

export default App
