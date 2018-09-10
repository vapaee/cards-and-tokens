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
    public waitData: Promise<void> = null;
    public id: Number;
    public name: string;
    public access_token:string;
    public logged: boolean = false;
    public data: any = {};
    constructor(private http: HttpClient, public vapaee: VapaeeUserService, public cookie: CookieService) {
        this.waitData = new Promise((resolve) => {
            // reject();
            this.vapaee.afterReady.then(() => {
                if (!this.vapaee.logged) {
                    // NO ENTIENDO PORQUE ENTRA ACÁ SI EJECUTÉ REJECT
                    // console.log('------------------------------');
                    // console.log('---- userdata rejected 0 -----');
                    // console.log('------------------------------');                    
                    // return reject();
                    return ;
                }
                var API_url = "http://api.cardsandtokens.com/";
                // var url = API_url+"userdata?access_token="+this.vapaee.access_token;
                this.access_token = this.cookie.get("steem.access_token");
                var url = API_url+"steem/user?access_token="+this.access_token;
                //url +="&name="+encodeURIComponent(this.vapaee.user_name);
                //url +="&avatar="+encodeURIComponent(this.cookie.get("steem.avatar"))
                //url +="&account="+encodeURIComponent(this.cookie.get("steem.account"));
                this.http.get<any>(url).toPromise().then(result => {
                    this.data = result.data;
                    this.id = result.id;
                    this.name = result.name;
                    this.logged = true;
                    resolve();
                }, (ee) => {
                    // console.log('------------------------------');
                    // console.log('---- userdata rejected 1 -----');
                    // console.log('------------------------------');
                    // reject();
                    return;
                });
            }, (ee) => {
                // console.log('------------------------------');
                // console.log('---- userdata rejected 2 -----');
                // console.log('------------------------------');
                // reject();
                return;
            });
            
        });

        this.waitData.then(() => {}, e => {
            console.log('this.waitData rejected');
        });
    }
}
