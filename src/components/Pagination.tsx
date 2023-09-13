import "./Pagination.scss"

interface PaginationProps{
    goForward: (()=>void) | undefined 
    goBack: (()=>void) | undefined 
}

export default function Pagination( { goBack, goForward } : PaginationProps) {
  return (
    <div className="pagination">
        <button onClick={goBack} disabled={!goBack}>Previous</button>
        <button onClick={goForward} disabled={!goForward}>Next</button>
    </div>
  )
}
