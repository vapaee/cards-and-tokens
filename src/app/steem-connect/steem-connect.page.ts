import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { SteemService } from '../services/steem.service';

@Component({
    selector: 'steem-connect-page',
    templateUrl: './steem-connect.page.html',
    styleUrls: ['./steem-connect.page.css']
})
export class SteemConnectPage implements OnInit {
    timeout: boolean;
    redirecting: number;
    constructor(public vapaee: VapaeeUserService, public app: AppService, public steem: SteemService) {

    }

    ngOnInit() {
        /// http://localhost:4200/steemconnect?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJ2YXBhZWUiLCJ1c2VyIjoidml0ZXJibyIsInNjb3BlIjpbInZvdGUiLCJjb21tZW50Il0sImlhdCI6MTUzMjIyMjIxNCwiZXhwIjoxNTMyODI3MDE0fQ.VXH1wMRTdDA1TDUHUp1XkY6gjsQAK5d7wpbboa_Pps8&expires_in=604800&username=viterbo

        let params = new URL(window.location.href).searchParams;
        let access_token = params.get('access_token');
        let expires_in = params.get('expires_in');
        let account = params.get('username');

        this.steem.setCredentials({
            accessToken: access_token,
            expiresIn: expires_in,
            account: account
        });

        this.steem.waitLogged.then(() => {
            this.app.navigate("profile");
            this.timeout = false;
            clearInterval(this.redirecting);
        });

        this.steem.waitTimeout.then(() => {
            this.timeout = true;
            this.redirecting = window.setTimeout(() => {
                this.app.navigate("home");
            }, 2000);
        });
    }

}
