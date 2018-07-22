import { Injectable } from '@angular/core';
import * as steem from '@steemit/steem-js';
import * as sc2 from 'sc2-sdk';
import { CookieService } from 'ngx-cookie-service';

// TUTORIAL:
// https://steemit.com/utopian-io/@hsynterkr/how-to-create-an-app-with-steem-connect-2-0

// Generador de código:
// https://v2.steemconnect.com/sign

// codigo fuente 
// https://github.com/steemit/steemconnect-sdk

export interface SteemCredentials {
    accessToken: string,
    expiresIn?: string,
    username?: string
}



@Injectable({
    providedIn: 'root'
})
export class SteemService {
    url:string;
    api:any;
    user:any;
    metadata:any;
    public waitLogged: Promise<void> = null;
    public waitReady: Promise<void> = null;
    loggedResolve:(value?:void) => void;
    loggedReject:(value?:void) => void;

    constructor(private cookie: CookieService) {
        this.waitLogged = new Promise((resolve, reject) => {
            this.loggedResolve = resolve;
            this.loggedReject = reject;
        });
        this.waitReady = new Promise((resolve) => {
            var api = sc2.Initialize({
                baseURL: 'https://steemconnect.com',
                app: 'vapaee',
                accessToken: 'access_token',
                callbackURL: window.location.origin + '/steemconnect',
                scope: ['login', 'offline', 'vote', 'comment', 'delete_comment', 'comment_options']
            });
            this.url = api.getLoginURL();
            this.api = api;
            resolve();
        });
    }

    init(app) {
        
        if (this.cookie.get("steem.access_token")) {
            this.setCredentials({
                accessToken: this.cookie.get("steem.access_token"),
                username: this.cookie.get("steem.username")
            });
        }
        

        /*
        api.me(function (err, result) {
            console.log('/me', err, result);
        });
        */


        // consultas 
        /*
        steem.api.getAccounts(['viterbo', 'darrenclaxton'], function(err, result) {
            console.log("STEEM:", err, result);
        });
        */
        
    }

    setCredentials(credentials: SteemCredentials) {
        var self = this;
        this.waitReady.then(() => {
            console.log("-------------------------------------------");
            console.log("SteemService.setCredentials()", credentials);
            console.log("-------------------------------------------");
            this.api.setAccessToken(credentials.accessToken);
            this.api.me(function (err, result) {
                console.log("**********************************************");
                console.log("this.api.me", result);
                console.log("**********************************************");
                if (err) {
                    console.log("this.api.me ERROR:", err);
                    self.loggedReject(err);
                } else {
                    self.user = result.account;
                    self.user.profile = JSON.parse(self.user.json_metadata).profile;
                    self.cookie.set("steem.access_token", credentials.accessToken);
                    self.cookie.set("steem.username", credentials.username);
                    console.log("FIN !!!!",[self]);
                    self.loggedResolve();
                }
            });
        });
        return this.waitLogged;
    }

    logout() {
        this.cookie.delete("steem.access_token");
        this.cookie.delete("steem.username");
        this.user = null;
        this.waitLogged = new Promise((resolve, reject) => {
            this.loggedResolve = resolve;
            this.loggedReject = reject;
        });
    }
}
