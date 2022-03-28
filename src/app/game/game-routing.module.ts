import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../infrastructure/guards/auth.guard';
import { DeactivateGuard } from '../infrastructure/guards/deactivate.guard';
import { GameComponent } from './game.component';

const routes: Routes = [
    {
        path: '', component: GameComponent, canActivate: [AuthGuard], canDeactivate:[DeactivateGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }