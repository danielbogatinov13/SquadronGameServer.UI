import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var baseUrl = "https://localhost:44308/api";

@Injectable({ providedIn: 'root' })
export class HomeService {
    constructor(
        private http: HttpClient
    ) {
    }

    enterGame() {
        return this.http.get(`${baseUrl}/Game/EnterGame`);
    }
}