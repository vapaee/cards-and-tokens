import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SteemService } from './steem.service';
import { AnalyticsService } from './analytics.service';
import { AuthService, GoogleLoginProvider } from '../modules/social-login';
import { AppComponent } from '../app.component';

@Injectable()
export class VapaeeUserService {

    public foreign_token: string;
    public vapaee_client_id: string;
    public access_token: string;
    public provider: string;
    public avatar: string;
    public refresh_token: string;
    public user_id: Number;
    public user_name: string;
    public steemuser: string;
    public googleuser: string;
    public logged: boolean = false;
    public ready: boolean = false;
    public afterReady: Promise<any> = null;
    public isAdmin: boolean = false;
    public appcomp: AppComponent;
    public readyResolve: Function;
    public readyReject: Function;
    public googleWaitLogged: Promise<any> = null;
    public googleResolve: Function;

    constructor(
        private cookies: CookieService, 
        public steem: SteemService, 
        public analytics: AnalyticsService,
        private socialAuthService: AuthService,
        private http: HttpClient,
        private cookie: CookieService
    ) {
        // this.init(null);
        this.afterReady = new Promise((resolve, reject) => {
            this.readyResolve = resolve;
            this.readyReject = reject;
        });
        this.googleWaitLogged = new Promise((resolve) => {
            this.googleResolve = resolve;
        });
    }

    logout() {
        this.steem.logout();
        this.socialAuthService.signOut().then(() => {}, () => {});
        this.analytics.emitEvent("user", "logout");
        setTimeout(() => {
            document.location.reload();
        }, 500);
    }

    init(appcomp: AppComponent) {
        this.appcomp = appcomp;
        this.logged = false;
        this.user_name = "Guest";
        this.ready = false;

    
        // console.log("Vapaee.user subscribe to steem.waitLogged");
        this.steem.waitLogged.then(() => {
            console.assert(!this.ready, "ERROR: será que se resolvió primero el timeout y depués el login con steemit????", [this]);
            this.logged = true;
            this.ready = true;
            this.user_name = this.steem.user.profile.name;
            this.steemuser = this.steem.user.name;
            this.isAdmin = this.steem.user.name == 'viterbo';
            this.access_token = this.cookie.get("steem.access_token");
            this.provider = "steem";
            this.avatar = this.steem.user ? this.steem.user.profile.avatar : '/assets/noavatar.png';
            // analytics
            if (this.cookies.get("login") == "init") {
                this.analytics.emitEvent("user", "login", "steem");
            }
            this.analytics.setUserId("steem@" + this.steemuser);
            this.cookies.delete("login");
            
            // console.log("--- vapaee.user ---");
            this.readyResolve();
        }, (err) => {
            console.log("this.steem.waitLogged --> REJECTED");
        });

        this.googleWaitLogged.then((userData) => {
            console.assert(!this.ready, "ERROR: será que se resolvió primero el timeout y depués el login con google????", [this]);
            console.log(userData);
            this.logged = true;
            this.ready = true;
            this.provider = "google";
            this.access_token = userData.idToken;
            this.user_name = userData.name;
            this.googleuser = userData.email.substr(0, userData.email.indexOf("@"));
            this.isAdmin = userData.email == 'viter.rod@gmail.com';
            this.avatar = userData.picture || userData.image;
            // analytics
            if (this.cookies.get("login") == "init") {
                this.analytics.emitEvent("user", "login", "google");
            }
            this.analytics.setUserId("google@" + this.googleuser);
            this.cookies.delete("login");            
            console.log(this);
            this.readyResolve();
            this.appcomp.loginModal.hide();
        });
        
        this.socialAuthService.isSignedIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
            console.log("this.socialAuthService.isSignedIn", userData);
            this.googleResolve(userData);
        }, (err) => {
            console.log("this.socialAuthService.isSignedIn --> REJECTED");
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
            this.readyResolve();
        }, (err) => {
            // this never executes   
        });
*/
        

        /*
        window.setTimeout(() => {
            if (!this.ready) {
                this.ready = true;
                this.logged = false;
                readyReject();
                console.log("vapaee.user.timeout reject");
            } else {
                console.log("vapaee.user.timeout YA ESTABA READY. this.logged", this.logged, this.user_name);
            }
        }, 1500);

        */
        

        this.afterReady.then(() => {}, e => {
            // console.log("--- vapaee.user rejected ---");
        });

    }

    askForLogin(provider: string) {
        switch(provider) {
            case "steem":
                this.appcomp.loginModal.show({"header":"steemconnect"});
                break;
            case "google":
                this.appcomp.loginModal.show({'header':'google'});
                break;
            case "vapaee":
                this.appcomp.loginModal.show({'header':'vapaee'});
                break;
        }
        
        this.cookies.set("login", "init");
        this.analytics.emitEvent("user", "login", "init");
    }

    login(provider: string) {
        switch(provider) {
            case "steem":
                console.log("LOGIN STEEM NOT IMPLEMENTED");
                break;
            case "google":
                this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
                    this.googleResolve(userData);
                }, (err) => {
                    console.log("ERROR: GOOGLE sign in error : " , err);
                });        
                break;
        }
    }
}
