import "./PokeList.scss"

export interface IPokeListItem{
  name: string 
  url: string
}

interface IPokeListProps {
  list: IPokeListItem[]
  onItemClick: (name:string)=>void
  loading: boolean
}

export default function PokeList({list,onItemClick,loading}:IPokeListProps) {
  if (loading) return "Loading..."
  return (
    <div className="poke-list">
      {list.map((p, index) => {
        return (
          <button className="poke-list-item" onClick={()=>onItemClick(p.name)} key={index}>{p.name}</button>
        )
      })}
    </div>
  )
}