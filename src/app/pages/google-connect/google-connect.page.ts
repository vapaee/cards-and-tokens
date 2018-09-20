import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";

@Component({
    selector: 'google-connect-page',
    templateUrl: './google-connect.page.html',
    styleUrls: ['./google-connect.page.css']
})
export class GoogleConnectPage implements OnInit {
    timeout: boolean;
    redirecting: number;
    constructor(public vapaee: VapaeeUserService, public app: AppService) {

    }

    // https://developers.google.com/identity/sign-in/web/sign-in
    ngOnInit() {

    }

}
