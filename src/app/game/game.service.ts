import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoundModel } from './round/round.model';
var baseUrl = "https://localhost:44308/api";

@Injectable({ providedIn: 'root' })
export class GameService {
    constructor(
        private http: HttpClient
    ) {
    }

    EnterGame() {
        return this.http.get<RoundModel>(`${baseUrl}/Game/EnterGame`);
    }
    ExitGame(){
        return this.http.get<any>(`${baseUrl}/Game/ExitGame`);
    }
}