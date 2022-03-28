import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../account/user.model';
import { SignalRService } from '../infrastructure/services/signalr.service';
import { GameService } from './game.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDeactivateComponent } from '../infrastructure/components/deactivate.component';
import { RoundService } from './round/round.service';
import { RoundModel } from './round/round.model';

@Component({
    selector: 'game',
    templateUrl: 'game.component.html',
    styleUrls: ['game.component.scss']
})
export class GameComponent implements IDeactivateComponent {
    loading = false;
    user: User;
    answerMessage = "";
    message = "";
    roundForm!: FormGroup;
    answered!: boolean;
    loaded = false;
    rounds: any[] = [];
    currentRound!: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gameService: GameService,
        private accountService: AccountService,
        private signalRService: SignalRService,
        private roundService: RoundService,
        private formBuilder: FormBuilder
    ) {
        this.user = this.accountService.userValue;
    }

    public ngOnInit() {
        this.loaded = false;
        this.signalRService.startConnection();
        this.signalRService.nextRoundListener();
        this.gameService.EnterGame()
            .pipe(first())
            .subscribe(
                (data: RoundModel) => {
                    this.rounds.push(data)
                    this.loaded = true;
                    this.roundForm = this.formBuilder.group({
                        answerBody: ''
                    });
                },
                error => {
                    this.message = "There are already 5 players in the game. Please try again later";
                    this.router.navigate(['../home'], { relativeTo: this.route });
                });

        this.signalRService.currentRound.subscribe(round => {
            var lastRound = this.rounds[this.rounds.length - 1];
            if (round) {
                if (!lastRound.isAnswered) {
                    this.rounds[this.rounds.length - 1].answerMessage = "MISSED";
                    this.rounds[this.rounds.length - 1].isAnswered = true;
                }
                this.rounds.push(round)
            }
        });
    }

    public onEnter(round: any) {
        this.loading = true;

        round.answerBody = this.roundForm.value.answerBody;
        this.roundService.AnswerRound(round)
            .pipe(first())
            .subscribe(
                data => {
                    round = data;
                    if (round.isAnswerCorrect) {
                        this.rounds[this.rounds.length - 2].answerMessage = round.answerMessage;
                        this.rounds[this.rounds.length - 2].answerBody = round.answerBody;
                        this.rounds[this.rounds.length - 2].isAnswered = true;
                        this.rounds[this.rounds.length - 2].isCorrect = round.isCorrect;
                    }
                    else {
                        this.rounds[this.rounds.length - 1].answerMessage = round.answerMessage;
                        this.rounds[this.rounds.length - 1].answerBody = round.answerBody;
                        this.rounds[this.rounds.length - 1].isAnswered = true;
                        this.rounds[this.rounds.length - 1].isCorrect = round.isCorrect;
                    }

                    this.loading = false;
                    this.roundForm = this.formBuilder.group({
                        answerBody: ''
                    });
                },
                error => {
                    console.log(error);
                    this.message = error;

                    this.loading = false;
                });

    }

    canExit(): boolean {
        this.gameService.ExitGame().pipe(first())
            .subscribe(
                data => {
                    this.message = "Success";
                },
                error => {
                    this.message = error;
                });;
        return false;
    }
}