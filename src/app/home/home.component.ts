import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../account/user.model';
import { HomeService } from './home.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    message = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private homeService: HomeService,
        private accountService: AccountService
    ) {
        this.user = this.accountService.userValue;
    }

    public ngOnInit() {

    }

    public enterGame() {

        this.router.navigateByUrl('/game');
        
    }
}