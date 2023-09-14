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
        <div>id: {data.id}</div>
        <div>name: {data.name}</div>
        <div>base_experience: {data.base_experience}</div>
        <div>height: {data.height}</div>
        <div>is_default: {data.is_default}</div>
        <div>order: {data.order}</div>
        <div>weight: {data.weight}</div>
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
    </>
  )
}