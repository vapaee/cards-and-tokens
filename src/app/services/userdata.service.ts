import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { VapaeeUserService } from './vapaee-user.service';

interface UserData {
    album: any,
    app: any,
    collectible: {sticker:any,card:any},
    collection: any,
    copy: any,
    envelop: any,
    inventory: any,
    profile: any
}

@Injectable()
export class UserdataService {
    public afterReady: Promise<void> = null;
    public id: Number;
    public name: string;
    public access_token:string;
    public logged: boolean = false;
    public data: any;
    constructor(private http: HttpClient, public vapaee: VapaeeUserService, public cookie: CookieService) {
        this.afterReady = new Promise((resolve, reject) => {
            // reject();
            this.vapaee.afterReady.then(() => {
                if (!this.vapaee.logged) {
                    // NO ENTIENDO PORQUE ENTRA ACÁ SI EJECUTÉ REJECT
                    // console.log('------------------------------');
                    // console.log('---- userdata rejected 0 -----');
                    // console.log('------------------------------');                    
                    return reject();
                }
                var API_url = "http://api.cardsandtokens.com/";
                // var url = API_url+"userdata?access_token="+this.vapaee.access_token;
                this.access_token = this.cookie.get("steem.access_token");
                var url = API_url+"steem/user?access_token="+this.access_token;
                //url +="&name="+encodeURIComponent(this.vapaee.user_name);
                //url +="&avatar="+encodeURIComponent(this.cookie.get("steem.avatar"))
                //url +="&account="+encodeURIComponent(this.cookie.get("steem.account"));
                this.http.get<any>(url).toPromise().then(result => {
                    console.log('-------- userdata ----------');
                    console.log(result);
                    console.log('----------------------------');
                    this.data = result.data;
                    this.id = result.id;
                    this.name = result.name;
                    this.logged = true;
                    resolve();
                }, (ee) => {
                    // console.log('------------------------------');
                    // console.log('---- userdata rejected 1 -----');
                    // console.log('------------------------------');
                    reject();
                });
            }, (ee) => {
                // console.log('------------------------------');
                // console.log('---- userdata rejected 2 -----');
                // console.log('------------------------------');
                reject();
            });
        });

        this.afterReady.then(() => {}, e => {
            console.log('this.afterReady rejected');
        });
    }
}
