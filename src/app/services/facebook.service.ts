import { Injectable } from '@angular/core';
// import * as facebook from '@facebookit/facebook-js';
import * as sc2 from 'sc2-sdk';
import { CookieService } from 'ngx-cookie-service';

export interface FacebookCredentials {
    accessToken: string,
    expiresIn?: string,
    account?: string
}



@Injectable({
    providedIn: 'root'
})
export class FacebookService {
    constructor(private cookie: CookieService) {}

    /*
    logged:boolean;
    timeout: number;
    url:string;
    api:any;
    user:any;
    metadata:any;
    public access_token: string;
    public waitLogged: Promise<void> = null;
    public waitTimeout: Promise<void> = null;
    public waitReady: Promise<void> = null;
    timeoutResolve:(value?:void) => void;
    loggedResolve:(value?:void) => void;
    loggedReject:(value?:void) => void;
    
    constructor(private cookie: CookieService) {
        this.waitLogged = new Promise((resolve, reject) => {
            this.loggedResolve = resolve;
            this.loggedReject = reject;
        });
        this.waitTimeout = new Promise((resolve) => {
            this.timeoutResolve = resolve;
        });        
        this.waitReady = new Promise((resolve) => {
            var api = sc2.Initialize({
                baseURL: 'https://facebookconnect.com',
                app: 'vapaee',
                accessToken: 'access_token',
                callbackURL: window.location.origin + '/facebookconnect',
                scope: ['login', 'offline', 'vote', 'comment', 'delete_comment', 'comment_options']
            });
            this.url = api.getLoginURL();
            this.api = api;
            resolve();
        });
        this.waitLogged.catch(e => {
            console.log("facebookCONNECT ERROR: ", e);
        });
    }

    init(app) {
        
        if (this.cookie.get("facebook.access_token")) {
            this.setCredentials({
                accessToken: this.cookie.get("facebook.access_token"),
                account: this.cookie.get("facebook.account")
            });
        }
        
        // consultas 
        
        // facebook.api.getAccounts(['viterbo', 'darrenclaxton'], function(err, result) {
        //     console.log("facebook:", err, result);
        // });
        
        
    }

    setCredentials(credentials: facebookCredentials) {
        this.waitReady.then(() => {
            this.timeout = window.setTimeout(() => {
                console.log("TIME OUT: this.timeoutResolve();");
                this.timeoutResolve();
            }, 10000);
            this.api.setAccessToken(credentials.accessToken);
            this.api.me((err, result) => {
                if (err) {
                    console.log("this.api.me ERROR:", err);
                    this.loggedReject(err);
                    this.logged = false;
                    setTimeout(() => {
                        this.logout();
                    }, 1000);
                } else {
                    this.logged = true;
                    this.user = result.account;
                    this.user.profile = (JSON.parse(this.user.json_metadata) || {}).profile || {};
                    this.user.profile.avatar = "https://facebookitimages.com/u/" + this.user.name + "/avatar";
                    this.user.profile.name = this.user.profile.name || this.user.name;
                    var expire = new Date(2040, 1, 1);
                    this.cookie.set("facebook.access_token", credentials.accessToken,expire,"/");
                    this.cookie.set("facebook.account", this.user.name,expire,"/");
                    this.cookie.set("facebook.avatar", this.user.profile.avatar,expire,"/");
                    this.cookie.set("access_token", credentials.accessToken,expire,"/");
                    this.access_token = credentials.accessToken;
                    console.log("*************** facebook Service ****************");
                    console.log([this]);
                    console.log("**********************************************");
                    window.clearTimeout(this.timeout);
                    this.timeout = 0;
                    this.loggedResolve();
                }
            });
        });
        return this.waitLogged;
    }

    logout() {
        console.log("logout");
        this.cookie.delete("facebook.access_token","/");
        this.cookie.delete("facebook.account","/");
        this.cookie.delete("facebook.avatar","/");
        this.cookie.delete("access_token","/");
        this.user = null;
        this.waitLogged = new Promise((resolve, reject) => {
            this.loggedResolve = resolve;
            this.loggedReject = reject;
        });
    }

    */
}
