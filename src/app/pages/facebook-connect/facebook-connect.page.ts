import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { FacebookService } from '../../services/facebook.service';

@Component({
    selector: 'facebook-connect-page',
    templateUrl: './facebook-connect.page.html',
    styleUrls: ['./facebook-connect.page.scss']
})
export class FacebookConnectPage implements OnInit {
    timeout: boolean;
    redirecting: number;
    constructor(public vapaee: VapaeeUserService, public app: AppService, public facebook: FacebookService) {
        console.log("FacebookConnectPage !!!!!!!!!!!!!!!!!!!", window.location.href, facebook);
    }

    ngOnInit() {
        
    }

}
