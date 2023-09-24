export interface IPokemonDataLists{
    abilities:IPokemonAbility[]
    forms:INamedAPIResource[]
    game_indices:IVersionGameIndex[]
    held_items:IPokemonHeldItem[]
    moves:IPokemonMove[]
    stats:IPokemonStat[]
    types:IPokemonType[]
    past_types:IPokemonTypePast[]
}

export type IPokemonDataList = IPokemonAbility | INamedAPIResource | IVersionGameIndex | IPokemonHeldItem | IPokemonMove | IPokemonStat | IPokemonType | IPokemonTypePast

export default interface IPokemonData extends IPokemonDataLists{
    name:string
    id:number
    base_experience:number
    height:number
    is_default:boolean
    order:number
    weight:number
    location_area_encounters:string
    species:INamedAPIResource
    sprites?:IPokemonSprites
}

export interface INamedAPIResource{
    name: string,
    url: string
}

export interface IPokemonAbility{
    ability:INamedAPIResource
    is_hidden:boolean
    slot:number
}

export interface IVersionGameIndex{
    game_index: number
    version: INamedAPIResource
}

export interface IPokemonHeldItem{
    version:INamedAPIResource
    rarity: number
}

export interface IPokemonMove{
    move:INamedAPIResource
    version_group_details:{level_learned_at:number, move_learn_method:INamedAPIResource, version_group:INamedAPIResource}[]
}

export interface IPokemonStat{
    stat:INamedAPIResource
    effort:number
    base_stat:number
}

export interface IPokemonType{
    type:INamedAPIResource
    slot: number
}

export interface IPokemonTypePast{
    generation:INamedAPIResource
    types: IPokemonType
}

export interface IPokemonSprites{
    back_default:string
    back_female:string
    back_shiny:string
    back_shiny_female:string
    front_default:string
    front_female:string
    front_shiny:string
    front_shiny_female:string
    other: IPokemonSpritesOther
    versions: IPokemonSpritesVersions
}

export interface IPokemonSpritesOther{
    dream_world:{front_default:string, front_female:string}
    home:{front_default:string, front_female:string, front_shiny:string, front_shiny_female:string}
    "official-artwork":{front_default:string, front_female:string}
}

export interface IPokemonSpritesVersions{
    'generation-i': {'red-blue':{front_default:string}},
    'generation-ii': {'silver':{front_default:string}},
    'generation-iii': {'ruby-sapphire':{front_default:string}}
}

export class PokemonData implements IPokemonData{
    name:string
    id:number
    base_experience:number
    height:number
    is_default:boolean
    order:number
    weight:number
    abilities:IPokemonAbility[]
    forms:INamedAPIResource[]
    game_indices:IVersionGameIndex[]
    location_area_encounters:string
    held_items:IPokemonHeldItem[]
    moves:IPokemonMove[]
    species:INamedAPIResource
    sprites?:IPokemonSprites
    stats:IPokemonStat[]
    types:IPokemonType[]
    past_types:IPokemonTypePast[]

    constructor()
    constructor(obj: IPokemonData)
    constructor(obj?: IPokemonData){
        this.name = obj?.name || ""
        this.id = obj?.id || 0
        this.base_experience = obj?.base_experience || 0
        this.height = obj?.height || 0
        this.is_default = obj?.is_default || false
        this.order = obj?.order || 0
        this.weight = obj?.weight || 0
        this.abilities = obj?.abilities || []
        this.forms = obj?.forms || []
        this.game_indices = obj?.game_indices || []
        this.location_area_encounters = obj?.location_area_encounters || ""
        this.held_items = obj?.held_items || []
        this.moves = obj?.moves || []
        this.species = obj?.species || {name:"", url:""}
        this.sprites = obj?.sprites
        this.stats = obj?.stats || []
        this.types = obj?.types || []
        this.past_types = obj?.past_types || []
    }
}