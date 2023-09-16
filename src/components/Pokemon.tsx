import "./Pokemon.scss"
import IPokemonData from "./IPokemonData"

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
            <div>id: {data.id}</div>
            <div className="pokemon-details-wrapper">
                <section className="pokemon-details-section">
                    <div className="pokemon-details-item">
                        <div className="pokemon-details-item-title">name</div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.name}</div>
                    </div>
                    <div className="pokemon-details-item">
                        <div className="pokemon-details-item-title">base_experience</div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.base_experience}</div>
                    </div>
                    <div className="pokemon-details-item">
                        <div className="pokemon-details-item-title">height</div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.height}</div>
                    </div>
                    <div className="pokemon-details-item">
                        <div className="pokemon-details-item-title">is_default </div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.is_default}</div>
                    </div>
                    <div className="pokemon-details-item">
                        <div className="pokemon-details-item-title">order </div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.order}</div>
                    </div>
                    <div className="pokemon-details-item">
                        <div className="pokemon-details-item-title">weight </div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.weight}</div>
                    </div>
                </section>
                <div>abilites:
                    <div className="pokemon-detail-list">
                        {data.abilities.map((item, index)=> {
                            return (<span key={index}>{item.ability.name} | </span>)
                        })}
                    </div>
                </div>
                {/*         
                <div>{data.forms}</div>
                <div>{data.game_indices}</div> 
                <div>location_area_encounters: {data.location_area_encounters}</div>
                <div>{data.held_items}</div>
                */}
                <div>moves:
                    <div className="pokemon-detail-list">
                        {data.moves.map((item, index)=> {
                            return (<span key={index}>{item.move.name} | </span>)
                        })}
                    </div>
                </div>
                <div>species_name: {data.species.name}</div>
                <div><img src={data.sprites.front_default} /></div>
                {/*
                <div>{data.stats}</div>
                <div>{data.types}</div>
                <div>{data.past_types}</div>
                */}
            </div>
        </div>
    </>
  )
}