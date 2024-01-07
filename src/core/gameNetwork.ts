import {emitCustomEvent} from "@/core/utilities/customEventEmitter";
import * as signalR from "@microsoft/signalr"

export class NetworkSystemComponent{
    private connection: signalR.HubConnection

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5282/mainHub")
            .build()
    }

    public initConnection(){
        this.connection.on('connect', () => {
            console.log('Connected to the server')
        })

        this.connection.on('message', (message: string) => {
            emitCustomEvent('chatMessage', message)
            console.log("Message received: "+message)
        })

        this.connection.start().then(()=> {
            console.log('Connected to the server')
        }
        ).catch((err) => console.log('Failed to connect: '+err))
    }

    public sendMessage(event: string, message: object){
        this.connection.send(event, message).then(() => console.log('Message sent')).catch((err) => console.log('Failed to send message: '+err))
    }
}