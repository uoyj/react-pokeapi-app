import "./Pokemon.scss"
import IPokemonData, {IAbility, IMove, IPokemonDataLists} from "./IPokemonData"

interface PokemonDataPropKey{
    prop: keyof IPokemonData
    title: string
}

interface PokemonDataListPropKey{
    list: keyof IPokemonDataLists
    object: string /*this could be any of the keys in IPokemonDataLists. How do I it in table rendering call?*/
}

const DATA_PROPS:PokemonDataPropKey[] = [
    {prop: "name", title: "name"},
    {prop: "base_experience", title:"base  experience"},
    {prop: "height", title: "height"},
    {prop: "is_default", title:"is  default?"},
    {prop: "order", title: "order"},
    {prop: "weight", title: "weight"},
]

const DATA_LISTS:PokemonDataListPropKey[] = [
    {list: "abilities", object: "ability" as keyof IAbility},
    //{list: "forms", object: ""},
    //{list: "game_indices", object: ""},
    //{list: "held_items", object: ""},
    {list: "moves", object: "move" as keyof IMove},
    //{list: "stats", object: ""},
    //{list: "types", object: ""},
    //{list: "past_types", object: ""},
]

interface PokemonProps{
    data: IPokemonData
    loading: boolean
}

export default function Pokemon({data, loading}:PokemonProps) {
    function parseProps(prop: keyof IPokemonData):string {
        if(typeof data[prop] === "string") return ""+data[prop]
        if(typeof data[prop] === "boolean"){
            if(data[prop]) return "yes"
            else return "no"
        } 
        return JSON.stringify(data[prop])
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
                <section className="pokemon-details-section">
                    {DATA_PROPS.map((item, index) => {
                        return (
                            <div className="pokemon-details-item" key={index} >
                                <div className="pokemon-details-item-title">{item.title}</div>
                                <div className="pokemon-details-item-spacer"></div>
                                <div className="pokemon-details-item-value">{parseProps(item.prop)}</div>
                            </div>
                        )
                    })}
                </section>

                <div className="pokemon-details-table">
                    {DATA_LISTS.map((item, index) => {
                        return (   
                            <div className="pokemon-details-table-row" key={index}>
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-title">{item.list}</div>
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-value">
                                    {data[item.list].map((detail, j)=> {
                                        return (<span key={j}>{detail[item.object].name} | </span>)
                                    })}
                                </div>
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-aside">
                                    {">>"} 
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/*         
                <div>{data.forms}</div>
                <div>{data.game_indices}</div> 
                <div>location_area_encounters: {data.location_area_encounters}</div>
                <div>{data.held_items}</div>
                */}
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