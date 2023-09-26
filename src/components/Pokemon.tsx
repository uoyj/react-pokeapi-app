import "./Pokemon.scss"
import IPokemonData from "./IPokemonData"
import PokemonDetailsSection from "./PokemonDetailsSection"
import PokemonDetailsTable from "./PokemonDetailsTable"
import PokemonSpritesContainer from "./PokemonSpritesContainer"

interface PokemonProps{
    data: IPokemonData
    loading: boolean
}

export default function Pokemon({data, loading}:PokemonProps) {
    

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

                <PokemonDetailsTable data={data} />
        
                <section className="pokemon-details-section">
                    <div className="pokemon-details-item" >
                        <div className="pokemon-details-item-title">Species Name</div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.species.name}</div>
                    </div>
                </section>

                <PokemonSpritesContainer sprites={data.sprites}/>
            </div>
        </div>
    </>
  )
}