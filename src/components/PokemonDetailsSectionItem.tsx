import "./PokemonDetailsSectionItem.scss"


export default function PokemonDetailsSectionItem({title, value}:{title:string, value:string}) {
  
  return (
    <div className="pokemon-details-item">
        <div className="pokemon-details-item-title">{title}</div>
        <div className="pokemon-details-item-spacer"></div>
        <div className="pokemon-details-item-value">{value}</div>
    </div>
  )
}
