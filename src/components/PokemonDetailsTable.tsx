import "./PokemonDetailsTable.scss"
import IPokemonData, {INamedAPIResource, IPokemonDataList, IPokemonDataLists} from "./IPokemonData"
import { ReactNode } from "react"

export default function PokemonDetailsTable({data}:{data: IPokemonData}) {

    interface PokemonDataListPropKey{
        list: keyof IPokemonDataLists
        prop: string | null //it's either an object with an INamedAPIResource property or it's a INamedAPIResource itself
        title: string
    }

    const DATA_LISTS:PokemonDataListPropKey[] = [
        {list: "abilities", prop: "ability", title: "abilities"},
        {list: "forms", prop: null, title: "forms"},
        {list: "game_indices", prop: "version", title: "game indices"},
        {list: "held_items", prop: "item", title: "held items"},
        {list: "moves", prop: "move", title:"moves"},
        {list: "stats", prop: "stat", title:"stats"},
        {list: "types", prop: "type", title: "types"},
        {list: "past_types", prop: "generation", title: "past type generation"},
    ]

    function parseListObject(propKey:PokemonDataListPropKey):ReactNode{
        const array = data[propKey.list]
        if(array.length == 0) return (<span>None</span>)
        
        return array.map((item, i) => {
            const objectKey = propKey.prop ? propKey.prop as keyof IPokemonDataList : null
            const resource = objectKey ? item[objectKey] : item as INamedAPIResource 

            return (<span key={i}>{resource.name} {i!=array.length-1 ? " | " : ""}</span>)
        })
    }
  
    return (
    <div className="pokemon-details-table">
    {DATA_LISTS.map((item, index) => {
        return (   
            <div className="pokemon-details-table-row" key={index}>
                <div className="pokemon-details-table-cell pokemon-details-table-cell-title">{item.title}</div>
                <div className="pokemon-details-table-cell pokemon-details-table-cell-value">
                    {parseListObject(item)}
                </div>
                <div className="pokemon-details-table-cell pokemon-details-table-cell-aside">
                    <button>Expand{">>"}</button>
                </div>
            </div>
        )
    })}
    </div>
  )
}
