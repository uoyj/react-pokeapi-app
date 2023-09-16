import "./Pokemon.scss"
import IPokemonData, {IPokemonAbility, IPokemonMove, INamedAPIResource, IPokemonDataLists, IVersionGameIndex, IPokemonHeldItem, IPokemonStat, IPokemonType} from "./IPokemonData"

interface PokemonDataPropKey{
    prop: keyof IPokemonData
    title: string
}

interface PokemonDataListPropKey{
    list: keyof IPokemonDataLists
    object: string /*this could be any of the keys in IPokemonDataLists. How do I it in table rendering call?*/
    title: string
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
    {list: "abilities", object: "ability" as keyof IPokemonAbility, title: "abilities"},
    {list: "forms", object: "forms" as keyof INamedAPIResource, title: "forms"},
    {list: "game_indices", object: "version" as keyof IVersionGameIndex, title: "game indices"},
    {list: "held_items", object: "version" as keyof IPokemonHeldItem, title: "held items"},
    {list: "moves", object: "move" as keyof IPokemonMove, title:"moves"},
    {list: "stats", object: "stat" as keyof IPokemonStat, title:"stats"},
    {list: "types", object: "type" as keyof IPokemonType, title: "types"},
    {list: "past_types", object: "generation", title: "past type generation"},
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

    function parseList(list:IPokemonDataLists, object:keyof IPokemonDataLists):string{
        if(list[object]) return list[object].name
        return list.name
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
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-title">{item.title}</div>
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-value">
                                    {
                                    data[item.list].map((detail, j)=> {
                                        return (<span key={j}>{parseList(detail, item.object)} | </span>)
                                    })
                                    }{data[item.list].length==0 && "None"}
                                </div>
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-aside">
                                    <button>{">>"}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>species_name: {data.species.name}</div>
                <div><img src={data.sprites.front_default} /></div>
                <div><img src={data.sprites.front_shiny} /></div>
                <div><img src={data.sprites.front_female} /></div>
                <div><img src={data.sprites.back_default} /></div>
                <div><img src={data.sprites.back_female} /></div>
                <div><img src={data.sprites.back_shiny} /></div>
                
            </div>
        </div>
    </>
  )
}