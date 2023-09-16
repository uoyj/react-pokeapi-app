export interface IPokemonDataLists{
    abilities:IAbility[]
    forms:INamedAPIResource[]
    game_indices:[]
    held_items:[]
    moves:IMove[]
    stats:[]
    types:[]
    past_types:[]
}

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
    sprites:{back_default:string, back_female:string, back_shiny:string, back_shiny_female:string, front_default:string, front_female:string, front_shiny:string, front_shiny_female:string}
}

export interface INamedAPIResource{
    name: string,
    url: string
}

export interface IAbility{
    ability:INamedAPIResource
    is_hidden:boolean
    slot:number
}

export interface IMove{
    move:INamedAPIResource
    version_group_details:{level_learned_at:number, move_learn_method:INamedAPIResource, version_group:INamedAPIResource}[]
}

export class PokemonData implements IPokemonData{
    name:string
    id:number
    base_experience:number
    height:number
    is_default:boolean
    order:number
    weight:number
    abilities:IAbility[]
    forms:INamedAPIResource[]
    game_indices:[]
    location_area_encounters:string
    held_items:[]
    moves:IMove[]
    species:INamedAPIResource
    sprites:{back_default:string, back_female:string, back_shiny:string, back_shiny_female:string, front_default:string, front_female:string, front_shiny:string, front_shiny_female:string}
    stats:[]
    types:[]
    past_types:[]

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
        this.sprites = obj?.sprites || {back_default:"", back_female:"", back_shiny:"", back_shiny_female:"", front_default:"", front_female:"", front_shiny:"", front_shiny_female:""}
        this.stats = obj?.stats || []
        this.types = obj?.types || []
        this.past_types = obj?.past_types || []
    }
}