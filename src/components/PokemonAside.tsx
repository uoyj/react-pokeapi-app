import "./PokemonAside.scss"

export default function PokemonAside({data}:{data:object|[]}) {
  
  function parseItem(item: object|string|number, key:string){
    switch (typeof item){
      case "object":
        return(
          <div className="pokemon-details-item">
            {
              Object.keys(item).map(itemKey => {
                return parseItem(item[itemKey], itemKey)
              })
            }
          </div>
        );
      default:
        return (
          <div className="pokemon-details-item">
            <div className="pokemon-details-item-title">{key}</div>
            <div className="pokemon-details-item-spacer"></div>
            <div className="pokemon-details-item-value">{item}</div>
          </div>
        )
    }
  }

  const list = Array.isArray(data) ? data : [data]
  return (
    <>
    {
      list.map((item, i) =>{
        return Object.keys(item).map(key=>{
          return (
            <div key={""+i+key}>
              {parseItem(item[key], key)}
            </div>
          )
        })
      })
    }
    </>
  )
}
