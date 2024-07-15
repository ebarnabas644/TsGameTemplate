export class UserInterfaceSystemComponent{
    updateUI(uiStore: any, x: number, y: number){
        uiStore.cordinateX = x
        uiStore.cordinateY = y
    }
}