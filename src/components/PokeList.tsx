import "./PokeList.scss"

export interface IPokeListItem{
  name: string 
  url: string
}

interface IPokeListProps {
  list: IPokeListItem[]
  onItemClick: (name:string)=>void
}

export default function PokeList({list,onItemClick}:IPokeListProps) {
  return (
    <div className="poke-list">
      {list.map((p, index) => {
        return (
          <div className="poke-list-item" onClick={()=>onItemClick(p.name)} key={index}>{p.name}</div>
        )
      })}
    </div>
  )
}