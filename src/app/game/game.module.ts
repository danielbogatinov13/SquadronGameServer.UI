import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { DeactivateGuard } from '../infrastructure/guards/deactivate.guard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GameRoutingModule
    ],
    declarations: [
        GameComponent
    ],
    providers:[
        DeactivateGuard
    ]
})
export class GameModule { }