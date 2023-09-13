import "./PokeList.scss"

export interface PokeListItem{
  name: string 
  url: string
}

interface PokeListProps {
  list: PokeListItem[]
}

export default function PokeList({list}:PokeListProps) {
  return (
    <div className="poke-list">
      {list.map((p, index) => {
        return (
          <div className="poke-list-item" key={index}>{p.name}</div>
        )
      })}
    </div>
  )
}