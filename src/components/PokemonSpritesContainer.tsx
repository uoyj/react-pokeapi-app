import "./PokemonSpritesContainer.scss"
import { IPokemonSprites, IPokemonSpritesOther, IPokemonSpritesVersions } from "./IPokemonData"

export default function PokemonSpritesContainer({sprites, onExpand}:{sprites:IPokemonSprites | undefined, onExpand: (data:IPokemonSpritesOther|IPokemonSpritesVersions)=>void}) {
    if(typeof sprites === "undefined") return

    const spriteTypes = Object.keys(sprites).map((key)=>{
        return {
            prop: key as keyof IPokemonSprites, 
            title: key.split("_").join(" ")
        }
    })
    
    function parseImg(prop: keyof IPokemonSprites){
        if(typeof sprites === "undefined") return
        
        const sprite = sprites[prop]
        if (typeof sprite === "string") return(
            <div className="block-img">
                <img src={sprite} />
            </div>
        )
        if(sprite == null) return(
            <div className="block-img">
                <p> No sprite availabe </p>
            </div>
        )        
        if(prop == "other"){
            const other = sprite as IPokemonSpritesOther
            return(
            <>
            <div className="block-img-wrapper">
                <div className="block-img-category">Dream World</div>                
                <div className="block-img">
                    <img src={other.dream_world.front_default} />
                </div>
            </div>
            <div className="block-img-wrapper">
                <div className="block-img-category right">Home</div>
                <div className="block-img">
                    <img src={other.home.front_default} />
                </div>
            </div>
            <div className="block-img-wrapper">
                <div className="block-img-category">Official Artwork</div>
                <div className="block-img">
                    <img src={other["official-artwork"].front_default} />
                </div>
            </div>
            <div className="expand-wrapper">
                <button onClick={()=>onExpand(other)}>Expand{">>"}</button>
            </div>
            </>
            )
        }
        if(prop == "versions"){
            const versions = sprite as IPokemonSpritesVersions
            return(
            <>
            <div className="block-img-wrapper">
                <div className="block-img-category">Generation I</div>                
                <div className="block-img">
                    <img src={versions['generation-i']['red-blue'].front_default} />
                </div>
            </div>
            <div className="block-img-wrapper">
                <div className="block-img-category right">Generation II</div>
                <div className="block-img">
                    <img src={versions['generation-ii']['silver'].front_default} />
                </div>
            </div>
            <div className="block-img-wrapper">
                <div className="block-img-category">Generation III</div>
                <div className="block-img">
                    <img src={versions['generation-iii']['ruby-sapphire'].front_default} />
                </div>
            </div>
            <div className="expand-wrapper">
                <button onClick={()=>onExpand(versions)}>Expand{">>"}</button>
            </div>
            
            </>
            )
        }
    }

    return (
    <div className="pokemon-details-sprites-container">
        {spriteTypes.map((type, index) =>{            
            return(
            <div className="pokemon-details-sprites-container block" key={index}>
                <div className="pokemon-details-sprites-container block-title">{type.title}</div>
                {parseImg(type.prop)}
            </div>
            )            
            })
        }        
    </div>
  )
}