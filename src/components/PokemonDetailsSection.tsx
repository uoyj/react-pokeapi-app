import "./PokemonDetailsSection.scss"
import IPokemonData from "./IPokemonData"
import PokemonDetailsSectionItem from "./PokemonDetailsSectionItem"

export interface PokemonDataPropKey{
    prop: string
    title: string
}

export default function PokemonDetailsSection({data, props}:{data:IPokemonData, props?:PokemonDataPropKey[]}) {
   
    const DATA_PROPS:PokemonDataPropKey[] = props || [
        {prop: "name", title: "name"},
        {prop: "base_experience", title:"base  experience"},
        {prop: "height", title: "height"},
        {prop: "is_default", title:"is  default?"},
        {prop: "order", title: "order"},
        {prop: "weight", title: "weight"}
    ]

    function parseProps(prop: string):string {
        if(prop == "species") return data.species.name

        const key = prop as keyof IPokemonData
        if(!data[key]) return "undefined"
        if(typeof data[key] === "string") return ""+data[key]
        if(typeof data[key] === "boolean"){
            if(data[key]) return "yes"
            else return "no"
        } 
        return JSON.stringify(data[key])
    }

    return (
    <section className="pokemon-details-section">
        {DATA_PROPS.map((item, index) => {
            return (
                <PokemonDetailsSectionItem title={item.title} value={parseProps(item.prop)} key={index} />
            )
        })}
    </section>
    )
}
