import IPokemonData from "./IPokemonData"
import { PokemonDataPropKey } from "./PokemonDetailsSection"
import "./PokemonDetailsSectionItem.scss"

export default function PokemonDetailsSectionItem({item, parseFn, title}:{item:PokemonDataPropKey, parseFn:(prop:keyof IPokemonData)=>string, title?:string}) {
    
  return (
    <div className="pokemon-details-item">
        <div className="pokemon-details-item-title">{title || item.title}</div>
        <div className="pokemon-details-item-spacer"></div>
        <div className="pokemon-details-item-value">{parseFn(item.prop)}</div>
    </div>
  )
}
