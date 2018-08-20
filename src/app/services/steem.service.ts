import { Injectable, Component, Input, OnChanges } from '@angular/core';
import * as steem from '@steemit/steem-js';
import * as sc2 from 'sc2-sdk';
import finallycomments from 'finallycomments'
import { CookieService } from 'ngx-cookie-service';
import { SteemJs, FinallyComments } from './datatypes.service';
import { AppComponent } from '../app.component';
import { DataService } from './data.service';

// TUTORIAL:
// https://steemit.com/utopian-io/@hsynterkr/how-to-create-an-app-with-steem-connect-2-0

// Generador de código:
// https://v2.steemconnect.com/sign

// codigo fuente 
// https://github.com/steemit/steemconnect-sdk

// DEMO
// https://steemit.github.io/example-steemconnect-angular/

export interface SteemCredentials {
    accessToken: string,
    expiresIn?: string,
    account?: string
}

interface SteemConnectAPI {
    options: object,
    setBaseURL: Function,
    setApp: Function,
    setCallbackURL: Function,
    setAccessToken: Function,
    removeAccessToken: Function,
    setScope: Function,
    getLoginURL: Function,
    send: Function,
    broadcast: Function,
    me: Function,
    vote: Function,
    comment: Function,
    reblog: Function,
    follow: Function,
    unfollow: Function,
    ignore: Function,
    claimRewardBalance: Function,
    revokeToken: Function,
    updateUserMetadata: Function,
    sign: Function
}



@Injectable({
    providedIn: 'root'
})
export class SteemService {
    logged:boolean;
    timeout: number;
    url:string;
    steemconnect:SteemConnectAPI;
    steemjs: SteemJs;
    finally: FinallyComments;
    user:any;
    metadata:any;
    public access_token: string;
    public waitLogged: Promise<void> = null;
    public waitTimeout: Promise<void> = null;
    public waitReady: Promise<void> = null;
    timeoutResolve:(value?:void) => void;
    loggedResolve:(value?:void) => void;
    loggedReject:(value?:void) => void;
    appcomp: AppComponent;

    constructor(private cookie: CookieService, private data: DataService) {

        this.waitTimeout = new Promise((resolve) => {
            this.timeoutResolve = resolve;
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
            this.steemconnect = api;
            resolve();
        });

        this.waitLogged = new Promise<any>((resolve, reject) => {
            this.loggedResolve = resolve;
            this.loggedReject = reject;
        });
        this.waitLogged.then(e => {
            console.log("STEEMCONNECT LOGGED !!!!!!!!!!!!!!!! ");
        }, (e) => {
            console.log("STEEMCONNECT NOT LOGGED !!!!!!!!!!!!!!!! ");
        });
    }
    
    askForLogin() {
        this.appcomp.loginModal.show();
    }

    init(appcomp: AppComponent) {
        this.appcomp = appcomp;
        
        if (this.cookie.get("steem.access_token")) {
            this.setCredentials({
                accessToken: this.cookie.get("steem.access_token"),
                account: this.cookie.get("steem.account")
            });
        } else {
            console.log("--- steem rejected ---");
            if (window.location.href.indexOf("access_token") < 0) {
                this.loggedReject();
            }            
        }
        
        // consultas
        this.steemjs = steem;
        this.finally = finallycomments;

        /*
        window.setTimeout(() => {
            console.log("*****************************************");
            this.finally.init();
        }, 5000);

        this.steemjs.api.getAccounts(['viterbo', 'gcalvete'], function(err, result) {
            console.log("STEEM: this.steemjs.api.getAccounts", err, result);
        });

        this.steemjs.api.getDiscussionsByBlog({tag: "gcalvete", limit: 10}, function(err, result) {
            console.log("STEEM: this.steemjs.api.getDiscussionsByBlog", err, result);
        });

        
        this.steemjs.api.getRepliesByLastUpdate("gcalvete", "prueba-con-rechazo-e-pago", 10, function(err, result) {
            console.log("STEEM: this.steemjs.api.getRepliesByLastUpdate", err, result);
        });
        
        this.steemjs.api.getStateAsync('bitcoin/@viterbo/can-be-bitcoin-replaced/comments', function(err, result) {
            console.log("STEEM: this.steemjs.api.getStateAsync(@itcoin/@viterbo/can-be-bitcoin-replaced/comments)", err, result);
        });
        
        this.steemjs.api.getContent("viterbo", "can-be-bitcoin-replaced", function(err, result) {
            console.log("STEEM: this.steemjs.api.getContent(viterbo, can-be-bitcoin-replaced)", err, result);
        });

        this.steemjs.api.getActiveVotes("gcalvete", "prueba-con-rechazo-e-pago", function(err, result) {
            console.log("STEEM: this.steemjs.api.getActiveVotes(gcalvete, prueba-con-rechazo-e-pago)", err, result);
        });
        */

        /*
        console.log("**************************************");
        console.log("STEEM finallycomments", this.finally);
        for (var name in this.finally) {
            console.log(name, typeof this.finally[name], [this.finally[name]]);
        }
        console.log("**************************************");
        */
    }
    updateDBVotes() {
        // this.cnt.updateDBVotes();
        // this.data.update("collectible", {id:});
        console.error("updateDBVotes() SIN IMPLEMENTAR");
    }

    vote(author:string, permlink:string, percent:number = 10000): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.user) {
                this.askForLogin();
            } else {
                this.steemconnect.vote(this.user.name, author, permlink, percent, function (err, res) {
                    console.log("STEEM this.steemconnect.vote", err, res);
                    if (err) reject(err);
                    else resolve(res);
                });    
            }
        });
    }

    unvote(author:string, permlink:string): Promise<any> {
        // console.assert(false, "ERROR: not implemented");
        return this.vote(author, permlink, 0);
    }

    setCredentials(credentials: SteemCredentials) {
        console.log("SteemService.setCredentials()", [credentials]);
        this.waitReady.then(() => {
            this.timeout = window.setTimeout(() => {
                console.log("TIME OUT: this.timeoutResolve();");
                if (this.timeoutResolve) this.timeoutResolve();
            }, 10000);
            this.steemconnect.setAccessToken(credentials.accessToken);
            this.steemconnect.me((err, result) => {
                if (err) {
                    console.log("this.steemconnect.me ERROR:", err);
                    console.log("--- steem rejected ---");
                    this.loggedReject(err);
                    this.logged = false;
                    setTimeout(() => {
                        this.logout();
                    }, 1000);
                } else {
                    this.logged = true;
                    this.user = result.account;
                    this.user.profile = (JSON.parse(this.user.json_metadata) || {}).profile || {};
                    this.user.profile.avatar = "https://steemitimages.com/u/" + this.user.name + "/avatar";
                    this.user.profile.name = this.user.profile.name || this.user.name;
                    var expire = new Date(2040, 1, 1);
                    this.cookie.set("steem.access_token", credentials.accessToken,expire,"/");
                    this.cookie.set("steem.account", this.user.name,expire,"/");
                    this.cookie.set("steem.avatar", this.user.profile.avatar,expire,"/");
                    this.cookie.set("access_token", credentials.accessToken,expire,"/");
                    this.access_token = credentials.accessToken;
                    console.log("*************** Steem Service ****************");
                    console.log([this]);
                    console.log("**********************************************");
                    window.clearTimeout(this.timeout);
                    this.timeoutResolve = null;
                    this.timeout = 0;
                    this.loggedResolve();
                }
            });
        });
        return this.waitLogged;
    }

    logout() {
        console.log("logout");
        this.cookie.delete("steem.access_token","/");
        this.cookie.delete("steem.account","/");
        this.cookie.delete("steem.avatar","/");
        this.cookie.delete("access_token","/");
        this.user = null;
        
        this.waitLogged = new Promise((resolve, reject) => {
            this.loggedResolve = resolve;
            this.loggedReject = reject;
        });
        
    }
}


@Component({
    selector: 'steem-upvote-button',
    styles: [
        ":host {display:inline-block;}",
        // "span.upvote {display: inline-block; margin-left: 0; border-radius: 50%; white-space: nowrap !important; vertical-align: middle;}",
        // ".Icon > svg, .Icon span.icon {vertical-align: top; overflow: hidden; white-space: nowrap !important;}",
        "circle {stroke: #1FBF8F;}",
        ".steem-vote-btn {font-weight: 500; border-radius: 5px; background-color: white; padding: 2px 10px; color: #1FBF8F !important; font-size: smaller; }",
        ".upvoted .Icon:hover { -webkit-animation: none !important; animation: none !important; }",
        ".upvoted circle { fill: #06D6A9; stroke: #06D6A9; }",
        ".loading svg { border: 1px solid #06D6A9; border-radius: 50%; border-right-color: transparent; border-top-color: transparent; -webkit-animation: loading 500ms infinite linear; animation: loading 500ms infinite linear; }",
        "@keyframes loading { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }"
    ],
    template: `
        <a [ngClass]="{'loading': loading}" [hidden]="voted" class="steem-vote-btn waves-effect waves-light" (click)="vote()">
            <span class="Icon chevron-up-circle upvote" style="display: inline-block; width: 1.12rem; height: 1.12rem; vertical-align: middle;"><svg enable-background="new 0 0 33 33" version="1.1" viewBox="0 0 33 33" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Chevron_Up_Circle"><circle cx="16" cy="16" r="15" stroke="#1FBF8F" fill="none"></circle><path d="M16.699,11.293c-0.384-0.38-1.044-0.381-1.429,0l-6.999,6.899c-0.394,0.391-0.394,1.024,0,1.414 c0.395,0.391,1.034,0.391,1.429,0l6.285-6.195l6.285,6.196c0.394,0.391,1.034,0.391,1.429,0c0.394-0.391,0.394-1.024,0-1.414 L16.699,11.293z" fill="#1FBF8F"></path></g></svg></span>
            <span [hidden]="!loading">&nbsp;loading</span>
            <span [hidden]="loading">&nbsp;{{votes}} votes</span>
        </a>
        
        <a [ngClass]="{'loading': loading}" [hidden]="!voted" class="steem-vote-btn waves-effect waves-light upvoted" (click)="unvote()">
            <span class="Icon chevron-up-circle upvote" style="display: inline-block; width: 1.12rem; height: 1.12rem; vertical-align: middle;"><svg enable-background="new 0 0 33 33" version="1.1" viewBox="0 0 33 33" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Chevron_Up_Circle"><circle cx="16" cy="16" r="15" stroke="#121313" fill="none"></circle><path d="M16.699,11.293c-0.384-0.38-1.044-0.381-1.429,0l-6.999,6.899c-0.394,0.391-0.394,1.024,0,1.414 c0.395,0.391,1.034,0.391,1.429,0l6.285-6.195l6.285,6.196c0.394,0.391,1.034,0.391,1.429,0c0.394-0.391,0.394-1.024,0-1.414 L16.699,11.293z" fill="#ffffff"></path></g></svg></span>
            <span [hidden]="!loading">&nbsp;loading</span>
            <span [hidden]="loading">&nbsp;{{votes}} votes</span>
        </a>
    `
})
export class SteemUpvoteButtonComponent implements OnChanges {
    @Input() steemdata: {author: string, permlink: string, votes:number}
    voted:boolean;
    loading:boolean;
    votes:number;
    list:any[];
    constructor(public steem:SteemService) {
        
    }

    update() {
        this.loading = true;
        
        return new Promise((resolve,reject) => {

            this.steem.steemjs.api.getActiveVotes(this.steemdata.author, this.steemdata.permlink, (err, result) => {
                // console.log("--------------------", err, result);
                console.assert(Array.isArray(result), result);
                if (err) {
                    this.loading = false;
                    resolve(err);
                    return;
                }
                this.voted = false;
                this.votes = 0;
                this.list = result;
                for (var i=0; i<this.list.length; i++) {
                    if (this.list[i].weight > 0) {
                        this.votes++;
                    }
                }
                
                if (this.votes != this.steemdata.votes) {
                    this.steem.updateDBVotes();
                }
                this.steem.waitLogged.then(() => {
                    for (var i=0; i<this.list.length; i++) {
                        if (this.list[i].voter == this.steem.user.name && this.list[i].weight > 0) {
                            this.voted = true;
                        }
                    }
                    this.loading = false;
                    resolve();
                }).catch(() => {
                    this.loading = false;
                    resolve();
                });
            });    
            
        })
    }

    ngOnChanges() {
        if (typeof this.steemdata.author == "string" && typeof this.steemdata.permlink == "string") {
            this.update();
        }
    }

    vote() {
        if (this.loading) return;
        this.loading = true;
        this.steem.vote(this.steemdata.author, this.steemdata.permlink).then(() => {
            this.voted = true;
            this.update();
            // this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    unvote() {
        if (this.loading) return;
        this.loading = true;
        this.steem.unvote(this.steemdata.author, this.steemdata.permlink).then(() => {
            this.voted = false;
            // this.loading = false;
            this.update();
        }).catch(() => {
            this.loading = false;
        });
    }


}

