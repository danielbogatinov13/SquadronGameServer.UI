import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoundModel } from './round.model';
var baseUrl = "https://localhost:44308/api";

@Injectable({ providedIn: 'root' })
export class RoundService {
    constructor(
        private http: HttpClient
    ) {
    }

    GetRound() {
        return this.http.get(`${baseUrl}/Round/Index`);
    }

    AnswerRound(round: any) {
        let roundDto = {
            Id: round.id,
            AnswerBody: round.answerBody as number,
            AnswerMessage: round.answerMessage,
            QuestionBody: round.questionBody
        }
        return this.http.put(`${baseUrl}/Round?${round.id}`, roundDto);
    }
}