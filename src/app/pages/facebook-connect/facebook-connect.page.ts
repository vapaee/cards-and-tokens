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
        /*

        let params = new URL(window.location.href).searchParams;
        let access_token = params.get('access_token');
        let expires_in = params.get('expires_in');
        let account = params.get('username');

        
        this.facebook.setCredentials({
            accessToken: access_token,
            expiresIn: expires_in,
            account: account
        });

        this.facebook.waitLogged.then(() => {
            this.app.navigate("profile");
            this.timeout = false;
            clearInterval(this.redirecting);
        });

        console.log("FacebookConnectPage.ngOnInit() this.facebook.waitTimeout.then(() => ....");
        this.facebook.waitTimeout.then(() => {
            console.log("FacebookConnectPage.ngOnInit() recibí un time out");
            this.timeout = true;
            this.redirecting = window.setTimeout(() => {
                this.app.navigate("home");
            }, 2000);
        });

        */
    }

}
