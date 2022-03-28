import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { BehaviorSubject } from 'rxjs';
import { RoundModel } from 'src/app/game/round/round.model';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    public round!: RoundModel;
    private hubConnection!: signalR.HubConnection;

    private newRound = new BehaviorSubject(this.round);
    currentRound = this.newRound.asObservable();

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44308/api/signalR')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch((err: any) => console.log('Error while starting connection: ' + err))
    }

    public nextRoundListener = () => {
        this.hubConnection.on('nextRound', (data: any) => {
            this.round = data;
            console.log(data);
            this.newRound.next(this.round)
        });
    }
}