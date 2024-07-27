import type { Entity } from "./models/entity";


export class GameState{
    private store: any;
    private state: Entity[]
    public uiStore: any;
    public playerId: string = ""
    
    constructor(){
        this.state = []
    }

    setStore(storeToSet: any){
        this.store = storeToSet
    }
    
    setUIStore(storeToSet: any){
        this.uiStore = storeToSet
    }
    
    clearGameState(){
        this.state = []
    }
    
    addItemToState(item: Entity){
        this.state.push(item)
    }
    
    getGameState(){
        return this.state
    }
}
