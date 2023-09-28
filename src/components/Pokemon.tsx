import "./Pokemon.scss"
import IPokemonData from "./IPokemonData"
import PokemonDetailsSection from "./PokemonDetailsSection"
import PokemonDetailsTable from "./PokemonDetailsTable"
import PokemonSpritesContainer from "./PokemonSpritesContainer"

interface PokemonProps{
    data: IPokemonData
    loading: boolean
    onExpand: (data: object | [])=>void
}

export default function Pokemon({data, loading, onExpand}:PokemonProps) {
    if(!onExpand) onExpand = (data: object | [])=>{
        console.table(data);
    }
    
    if (!data.id) return "Please click on a Pokemon name."
    if (loading) return "Loading..."
    return (
    <>    
        <div className="pokemon-wrapper">
            
            <div className="pokemon-api-id">
                <div className="pokemon-api-id-title">PokeAPI ID</div>
                <div className="pokemon-api-id-value">{data.id}</div>
            </div>
            <div className="pokemon-details-wrapper">
                <PokemonDetailsSection data={data}/>

                <PokemonDetailsTable data={data} onExpand={onExpand}/>
                
                <PokemonDetailsSection data={data} props={[{prop:"species", title:"Species Name"}]}/>

                <PokemonSpritesContainer sprites={data.sprites} onExpand={onExpand}/>
            </div>
        </div>
    </>
  )
}