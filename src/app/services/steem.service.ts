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
            // console.log("STEEMCONNECT LOGGED !!!!!!!!!!!!!!!! ");
        }, (e) => {
            // console.log("STEEMCONNECT NOT LOGGED !!!!!!!!!!!!!!!! ");
        });
    }
    
    askForLogin(config:any) {
        this.appcomp.loginModal.show(config);
    }

    init(appcomp: AppComponent) {
        this.appcomp = appcomp;
        
        if (this.cookie.get("steem.access_token")) {
            this.setCredentials({
                accessToken: this.cookie.get("steem.access_token"),
                account: this.cookie.get("steem.account")
            });
        } else {
            // console.log("--- steem rejected ---");
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
       /*
        this.steemjs.api.getDiscussionsByBlog({tag: "gcalvete", limit: 10}, function(err, result) {
            console.log("**************************************");
            console.log("STEEM: this.steemjs.api.getDiscussionsByBlog", err, result);
            console.log("**************************************");
        });
        
        this.steemjs.api.getContent("viterbo", "prueba-con-rechazo-e-pago-re-kbqgb", function(err, result) {
            console.log("**************************************");
            console.log("STEEM: this.steemjs.api.getContent(viterbo, prueba-con-rechazo-e-pago-re-kbqgb)", err, result);
            console.log("**************************************");
        });
        */
    }

    publishOpenmicCardOnSteem(card) {
        var parentAuthor = "";
        var parentPermlink = "cards-and-tokens";
        var permlink = card.edition.data.slug;
        
        var link = "http://cardsandtokens.com/deploy/card/"+card.edition.data.slug;
        var image = "http://cardsandtokens.com/assets/cards/openmic/images/steem-image/"+card.edition.data.slug+".png";
        var jsonMetadata = {
            "tags": [parentPermlink, "openmic", "eos", "project", "card"],
            "data": card.edition.data,
            "image": [image],
            "links": [link],
            "app": "cardsandtokens/0.1.0",
            "format": "markdown"
        };
        var title = "OpenMic Trading Card: " + card.edition.data.title + " by @" + card.edition.data.steemuser;
        var body = 
        '<h1>'+card.edition.data.title+' ' + (card.edition.data.original?'(original)':'(cover)') +'</h1> ' + 
        '<h3>by @' + card.edition.data.steemuser + '</h3>' + 
        '<p><center><a href="'+link+'"><img src="'+image+'"></a></center></p>';

        console.log(parentAuthor, parentPermlink, this.user.name, permlink, title, jsonMetadata);
        console.log(body);
        console.log("--------------------");
        console.log([jsonMetadata]);
        
        card.loading = true;        
        this.steemconnect.comment(parentAuthor, parentPermlink, this.user.name, permlink, title, body, jsonMetadata, (err, res) => {
            console.log(err, res);
            if (err) {
                if (err.error_description) {
                    alert("ERROR: " + err.error_description);
                } else {
                    alert("ERROR: " + JSON.stringify(err,null,4));
                }
                
            } else {
                this.data.update("card", {
                    "id": card.id,
                    "steem": {
                        "author": this.user.name,
                        "permlink": permlink
                    }
                }).then(() => {
                    card.loading = false;
                    card.steem = {
                        "author": this.user.name,
                        "permlink": permlink
                    }
                });
            }
        });
    }



    pruebaDePost() {
        // https://steemit.com/debug/@gcalvete/prueba-con-rechazo-e-pago
        var parentAuthor = "gcalvete";
        var parentPermlink = "prueba-con-rechazo-e-pago";
        var permlink = "prueba-con-rechazo-e-pago-re-" + Math.random().toString(36).replace(/[^a-z]+/g, '');//.substr(0, 5);;
        var jsonMetadata = '{"jsonMetadata":true}';
        var title = "Cards & Tokens - test 2";
        var body = '<p><center><img src="http://cardsandtokens.com/assets/cards/openmic/images/steem-image/openmic-w100-pechichemena-el-balcon.png"></center></p>';
        // ------------------------
        parentAuthor = "";
        parentPermlink = "debug";
        permlink = "this-is-a-test-2";
        console.log(parentAuthor, parentPermlink, this.user.name, permlink, title, body, jsonMetadata);
        
        this.steemconnect.comment(parentAuthor, parentPermlink, this.user.name, permlink, title, body, jsonMetadata, function (err, res) {
            /*
            res = {
                block_num: 25823163,
                expiration: "2018-09-10T00:40:03",
                expired: false,
                extensions: [],
                id: "f50128dc47caa36fd0363e74137cc8b27bb7f213",
                operations: [
                    [
                        "comment",
                        {,
                            author: "gcalvete",
                            body: "body",
                            json_metadata: ""{\"jsonMetadata\":true}"",
                            parent_author: "",
                            parent_permlink: "debug",
                            permlink: "this-is-a-test",
                            title: "title"
                        }
                    ]
                ],
                ref_block_num: 1960,
                ref_block_prefix: 3094508356,
                signatures: ["20344f2479748f796b6a6b52efb3b131288c221452ef358415…98ed71954ce65ba258c785a8809f7a3f3084dbab1d2d228ce"],
                trx_num: 18
            }
            */
            console.log(err, res);
        });
        
    }

    vote(author:string, permlink:string, percent:number = 10000): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.user) {
                this.askForLogin({'header':'steemconnect'});
            } else {
                this.steemconnect.vote(this.user.name, author, permlink, percent, function (err, res) {
                    // console.log("STEEM this.steemconnect.vote", err, res);
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
        // console.log("SteemService.setCredentials()", [credentials]);
        this.waitReady.then(() => {
            this.timeout = window.setTimeout(() => {
                // console.log("TIME OUT: this.timeoutResolve();");
                if (this.timeoutResolve) this.timeoutResolve();
            }, 10000);
            this.steemconnect.setAccessToken(credentials.accessToken);
            this.steemconnect.me((err, result) => {
                if (err) {
                    // console.log("this.steemconnect.me ERROR:", err);
                    // console.log("--- steem rejected ---");
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

