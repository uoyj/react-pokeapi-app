interface PaginationProps{
    goForward: (()=>void) | null 
    goBack: (()=>void) | null 
}

export default function Pagination( { goBack, goForward } : PaginationProps) {
  return (
    <div>
        {goBack && <button onClick={goBack}>Previous</button>}
        {goForward && <button onClick={goForward}>Next</button>}
    </div>
  )
}
