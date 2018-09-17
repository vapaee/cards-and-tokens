import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SteemService } from './steem.service';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class VapaeeUserService {

    public foreign_token: string;
    public vapaee_client_id: string;
    public access_token: string;
    public refresh_token: string;
    public user_id: Number;
    public user_name: string;
    public steemuser: string;
    public logged: boolean = false;
    public ready: boolean = false;
    public afterReady: Promise<void> = null;
    public isAdmin: boolean = false;

    constructor(
        private cookies: CookieService, 
        public steem: SteemService, 
        public analytics: AnalyticsService
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
                this.logged = true;
                this.ready = true;
                this.user_name = this.steem.user.profile.name;
                this.steemuser = this.steem.user.name;
                this.isAdmin = this.steem.user.name == 'viterbo';
                // analytics
                if (this.cookies.get("login") == "init") {
                    this.analytics.emitEvent("user", "login", "success");
                }
                this.analytics.setUserId("steem@" + this.steemuser);
                this.cookies.delete("login");
                // console.log("--- vapaee.user ---");
                resolve();
            }, (err) => {
                this.ready = true;
                // console.log("--- vapaee.user reject ---");
                reject();
            });
        });

        this.afterReady.then(() => {}, e => {
            // console.log("--- vapaee.user rejected ---");
        });

    }

    askForLogin() {
        this.steem.askForLogin({'header':'steemconnect'});
        this.cookies.set("login", "init");
        this.analytics.emitEvent("user", "login", "init");
    }
}
