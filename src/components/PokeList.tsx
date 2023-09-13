export interface PokeListItem{
  name: string 
  url: string
}

interface PokeListProps {
  list: PokeListItem[]
}

export default function PokeList({list}:PokeListProps) {
  return (
    <div>
      {list.map((p, index) => {
        return (
          <div key={index}>{p.name}</div>
        )
      })}
    </div>
  )
}