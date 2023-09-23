import "./Pokemon.scss"
import IPokemonData, {INamedAPIResource, IPokemonDataList, IPokemonDataLists} from "./IPokemonData"
import { ReactNode } from "react"

interface PokemonDataPropKey{
    prop: keyof IPokemonData
    title: string
}

interface PokemonDataListPropKey{
    list: keyof IPokemonDataLists
    prop: string | null //it's either an object with an INamedAPIResource property or it's a INamedAPIResource itself
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
    {list: "abilities", prop: "ability", title: "abilities"},
    {list: "forms", prop: null, title: "forms"},
    {list: "game_indices", prop: "version", title: "game indices"},
    {list: "held_items", prop: "version", title: "held items"},
    {list: "moves", prop: "move", title:"moves"},
    {list: "stats", prop: "stat", title:"stats"},
    {list: "types", prop: "type", title: "types"},
    {list: "past_types", prop: "generation", title: "past type generation"},
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

    function parseListObject(propKey:PokemonDataListPropKey):ReactNode{
        const array = data[propKey.list]
        if(array.length == 0) return (<span>None</span>)
        
        return array.map((item, i) => {
            const objectKey = propKey.prop ? propKey.prop as keyof IPokemonDataList : null
            const resource = objectKey ? item[objectKey] : item as INamedAPIResource 

            return (<span key={i}>{resource.name} {i!=array.length-1 ? " | " : ""}</span>)
        })
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
                                    {parseListObject(item)}
                                </div>
                                <div className="pokemon-details-table-cell pokemon-details-table-cell-aside">
                                    <button>{">>"}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <section className="pokemon-details-section">
                    <div className="pokemon-details-item" >
                        <div className="pokemon-details-item-title">Species Name</div>
                        <div className="pokemon-details-item-spacer"></div>
                        <div className="pokemon-details-item-value">{data.species.name}</div>
                    </div>
                </section>
                <div className="pokemon-details-sprites-container">
                    <div className="pokemon-details-sprites-container block">
                    <div className="pokemon-details-sprites-container block-title">Male</div>
                        <div className="block-img"><img src={data.sprites.front_default} /></div>
                        <div className="block-img"><img src={data.sprites.back_default} /></div>
                    </div>
                    <div className="pokemon-details-sprites-container block">
                    <div className="pokemon-details-sprites-container block-title">Female</div>
                        <div className="block-img"><img src={data.sprites.front_female} /></div>
                        <div className="block-img"><img src={data.sprites.back_female} /></div>
                    </div>
                    <div className="pokemon-details-sprites-container block">
                    <div className="block-title">Shiny</div>
                        <div className="block-img"><img src={data.sprites.front_shiny} /></div>
                        <div className="block-img"><img src={data.sprites.back_shiny} /></div>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  )
}