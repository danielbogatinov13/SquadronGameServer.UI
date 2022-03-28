export class RoundModel {
    Id!: number;
    AnswerBody: string | undefined;
    QuestionId!: number;
    QuestionBody!: string;
    GameId!: number;
    IsAnswerCorrect!: boolean;
    AnswerMessage!: string;
}