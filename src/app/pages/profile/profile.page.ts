import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';

@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService, public steem: SteemService) {
        if (this.app.countdown == 0) {
            this.app.navigate("home");
        } else {
            console.error("sacar esto");
        }
    }

    ngOnInit() {
    }

    

}
