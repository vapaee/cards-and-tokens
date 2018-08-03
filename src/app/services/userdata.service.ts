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
    public logged: boolean = false;
    public data: any;
    constructor(private http: HttpClient, public vapaee: VapaeeUserService, public cookie: CookieService) {
        this.afterReady = new Promise((resolve, reject) => {
            this.vapaee.afterReady.then(() => {
                if (!this.vapaee.logged) return resolve();
                var API_url = "http://api.cardsandtokens.com/";
                // var url = API_url+"userdata?access_token="+this.vapaee.access_token;
                var url = API_url+"steem/user?access_token="+this.cookie.get("steem.access_token");
                //url +="&name="+encodeURIComponent(this.vapaee.user_name);
                //url +="&avatar="+encodeURIComponent(this.cookie.get("steem.avatar"))
                //url +="&account="+encodeURIComponent(this.cookie.get("steem.account"));
                this.http.get<any>(url).subscribe(result => {
                    // console.log('-------- userdata ----------');
                    // console.log(result);
                    // console.log('----------------------------');
                    this.data = result.data;
                    this.id = result.id;
                    this.name = result.name;
                    this.logged = true;
                    resolve();
                });
            });    
        });
    }
}
