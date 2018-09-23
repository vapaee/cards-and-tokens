import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SteemService } from './steem.service';
import { AnalyticsService } from './analytics.service';
import { AuthService, GoogleLoginProvider } from '../modules/social-login';

@Injectable()
export class VapaeeUserService {

    public foreign_token: string;
    public vapaee_client_id: string;
    public access_token: string;
    public refresh_token: string;
    public user_id: Number;
    public user_name: string;
    public steemuser: string;
    public googleuser: string;
    public logged: boolean = false;
    public ready: boolean = false;
    public afterReady: Promise<void> = null;
    public isAdmin: boolean = false;

    constructor(
        private cookies: CookieService, 
        public steem: SteemService, 
        public analytics: AnalyticsService,
        private socialAuthService: AuthService,
        private http: HttpClient
    ) {
        this.init();
    }

    logout() {
        this.steem.logout();
        this.analytics.emitEvent("user", "logout");
        setTimeout(() => {
            document.location.reload();
        }, 500);
    }

    init() {
        this.logged = false;
        this.user_name = "Guest";
        this.ready = false;

        this.afterReady = new Promise((resolve, reject) => {
            // console.log("Vapaee.user subscribe to steem.waitLogged");
            this.steem.waitLogged.then(() => {
                console.assert(!this.ready, "ERROR: será que se resolvió primero el timeout y depués el login con steemit????", [this]);
                this.logged = true;
                this.ready = true;
                this.user_name = this.steem.user.profile.name;
                this.steemuser = this.steem.user.name;
                this.isAdmin = this.steem.user.name == 'viterbo';
                // analytics
                if (this.cookies.get("login") == "init") {
                    this.analytics.emitEvent("user", "login", "steem");
                }
                this.analytics.setUserId("steem@" + this.steemuser);
                this.cookies.delete("login");
                // console.log("--- vapaee.user ---");
                resolve();
            }, (err) => {
                // this.ready = true;
                // console.log("--- vapaee.user reject ---");
                // reject();
            });

                        
            this.socialAuthService.isSignedIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
                // userData
                console.log("this.socialAuthService.isSignedIn", userData);
                var url = "http://api.cardsandtokens.com/google/user?id_token="+userData.idToken;
                this.http.get(url).toPromise().then((response) => {
                    console.log("Response", response)
                });
            });

/*

            
            this.socialAuthService.isSignedIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
                console.assert(!this.ready, "ERROR: será que se resolvió primero el timeout y depués el login con google????", [this]);
                this.logged = true;
                this.ready = true;
                this.user_name = userData.name;
                this.googleuser = userData.email.substr(0, userData.email.indexOf("@"));
                this.isAdmin = userData.email == 'viter.rod@gmail.com';
                // analytics
                if (this.cookies.get("login") == "init") {
                    this.analytics.emitEvent("user", "login", "google");
                }
                this.analytics.setUserId("google@" + this.googleuser);
                this.cookies.delete("login");
                // console.log("--- vapaee.user ---");
                resolve();
            }, (err) => {
                // this never executes   
            });
*/
            

            
            window.setTimeout(() => {
                if (!this.ready) {
                    this.ready = true;
                    this.logged = false;
                    reject();
                    console.log("vapaee.user.timeout reject");
                } else {
                    console.log("vapaee.user.timeout YA ESTABA READY. this.logged", this.logged, this.user_name);
                }
            }, 1500);
            
        });

        this.afterReady.then(() => {}, e => {
            // console.log("--- vapaee.user rejected ---");
        });

    }

    askForLogin() {
        this.steem.askForLogin({'header':'vapaee'});
        this.cookies.set("login", "init");
        this.analytics.emitEvent("user", "login", "init");
    }
}
