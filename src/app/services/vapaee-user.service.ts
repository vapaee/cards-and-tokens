import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SteemService } from './steem.service';

@Injectable()
export class VapaeeUserService {

    public foreign_token: string;
    public vapaee_client_id: string;
    public access_token: string;
    public refresh_token: string;
    public user_id: Number;
    public user_name: string;
    public logged: boolean = false;
    public ready: boolean = false;
    public afterReady: Promise<void> = null;

    constructor(private http: HttpClient, private cookieService: CookieService, public steem: SteemService) {
        console.log('Hello VapaeeUserService Provider');
        this.init();
        /*
        console.log("*****************************");
        console.log("*****************************");
        var count = 0;
        for (var i=0; i<50; i++) {
            var price = 5000 - (i*10);
            // console.log(price, count, i+1);
            count += price;
        }
        console.log(count, i);
        console.log("*****************************");
        console.log("*****************************");
        */
    }

    logout() {
        this.steem.logout();
        setTimeout(() => {
            document.location.reload();
        }, 500);
    }

    init() {
        this.logged = false;
        this.user_name = "Guest";
        this.ready = false;
        this.afterReady = new Promise((resolve, reject) => {
            this.steem.waitLogged.then(() => {
                this.logged = true;
                this.ready = true;
                this.user_name = this.steem.user.profile.name;
                resolve();
            }, (err) => {
                this.ready = true;
                reject();
            });
        });
        
        /*
        this.afterReady = new Promise((resolve, reject) => {
            this.vapaee_client_id = this.cookieService.get('vapaee_client_id');
            this.foreign_token = this.cookieService.get('foreign_token');
            this.cookieService.delete("foreign_token");
            // Solución temporal al problema del foreign_token -----
            setTimeout(() =>  {this.cookieService.delete("foreign_token");}, 1000);
            setInterval(() => {this.cookieService.delete("foreign_token");}, 10000);
            // -----------------------------------------------------
            if (this.foreign_token) {
                var current_url = btoa(document.location.origin + document.location.pathname);
                // console.log("this.foreign_token", this.foreign_token);
                var URL = "http://accounts.vapaee.com/index.php?route=extension/module/oauth/endpoint/useforeign";
                var url = URL + "&foreign_token="+this.foreign_token+"&client_id="+this.vapaee_client_id+"&redirect="+current_url;
                this.http.get(url).subscribe(result => {
                    console.log('--------- user ---------');
                    console.log(result);
                    console.log('------------------------');
                    this.logged = result["logged"];
                    if (this.logged) {
                        this.access_token = result["access_token"];
                        this.refresh_token = result["refresh_token"];
                        this.user_id = result["user_id"];
                        this.user_name = result["user_name"];
                    }
                    this.ready = true;
                    resolve();
                });
            } else {
                console.log("this.vapaee_client_id:", this.vapaee_client_id);
                console.log("this.foreign_token:", this.foreign_token);
                this.ready = true;
                resolve();
            }    
        });
        */
    }
}
