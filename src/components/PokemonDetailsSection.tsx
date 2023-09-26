import "./PokemonDetailsSection.scss"
import IPokemonData from "./IPokemonData"
import PokemonDetailsSectionItem from "./PokemonDetailsSectionItem"

export interface PokemonDataPropKey{
    prop: keyof IPokemonData
    title: string
}

export default function PokemonDetailsSection({data}:{data:IPokemonData}) {
    const DATA_PROPS:PokemonDataPropKey[] = [
        {prop: "name", title: "name"},
        {prop: "base_experience", title:"base  experience"},
        {prop: "height", title: "height"},
        {prop: "is_default", title:"is  default?"},
        {prop: "order", title: "order"},
        {prop: "weight", title: "weight"},
    ]

    function parseProps(prop: keyof IPokemonData):string {
        if(typeof data[prop] === "string") return ""+data[prop]
        if(typeof data[prop] === "boolean"){
            if(data[prop]) return "yes"
            else return "no"
        } 
        return JSON.stringify(data[prop])
    }

    return (
    <section className="pokemon-details-section">
        {DATA_PROPS.map((item, index) => {
            return (
                <PokemonDetailsSectionItem item={item} parseFn={parseProps} key={index} />
            )
        })}
    </section>
    )
}
