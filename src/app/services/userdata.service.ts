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
    public access_token: string;
    public provider: string;
    public logged: boolean = false;
    public data: {
        album:any, app:any, card:any, collectible:any,
        collection:any, container:any, copy:any, edition:any,
        envelop:any, inventory:any, item:any, profile:any, slot:any, publisher: any,
        pending: any[],
        dayliprice: {claimable?:boolean, remaining?:number},
        slug:{container:any, collectible:any, publisher:any}};

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
                this.access_token = this.vapaee.access_token;
                this.provider = this.vapaee.provider;
                var url = API_url+"userdata?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider;
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
