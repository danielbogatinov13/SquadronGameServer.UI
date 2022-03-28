import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { DeactivateGuard } from './infrastructure/guards/deactivate.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./game/game.module').then(x => x.Game);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'game', component: GameComponent, canActivate: [AuthGuard], canDeactivate:[DeactivateGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }