import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';

@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.css']
})
export class ProfilePage {

    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService,
        public steem: SteemService
    ) {

    }
}
