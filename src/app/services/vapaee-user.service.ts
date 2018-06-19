import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class VapaeeUserService {

    foreign_token: string;
    vapaee_client_id: string;
    access_token: string;
    refresh_token: string;
    public user_id: Number;
    public user_name: string;
    public logged: boolean = false;

    constructor(private http: HttpClient, private cookieService: CookieService) {
        console.log('Hello VapaeeUserService Provider');
        /*
        if (foreign_token) {
            cookie.remove("foreign_token");
            //var URL = "http://accounts.vapaee.com/index.php?route=oauth/endpoint/useforeign";            
            var URL = "http://accounts.vapaee.com/index.php?route=extension/module/oauth/endpoint/useforeign";
            var url = URL + "&foreign_token="+foreign_token+"&client_id="+vapaee_client_id;
            this.http.get(url);
        }
        */
       this.init();
    }

    init() {
        this.vapaee_client_id = this.cookieService.get('vapaee_client_id');
        this.foreign_token = this.cookieService.get('foreign_token');
        setTimeout(() => {this.cookieService.delete("foreign_token");}, 1000);
        if (this.foreign_token) {
            console.log("this.foreign_token", this.foreign_token);
            var URL = "http://accounts.vapaee.com/index.php?route=extension/module/oauth/endpoint/useforeign";
            var url = URL + "&foreign_token="+this.foreign_token+"&client_id="+this.vapaee_client_id;
            this.http.get(url).subscribe(result => {
                console.log('------------------');
                console.log(result);
                console.log('------------------');
                this.logged = result["logged"];
                if (this.logged) {
                    this.access_token = result["access_token"];
                    this.refresh_token = result["refresh_token"];
                    this.user_id = result["user_id"];
                    this.user_name = result["user_name"];
                }
            });
        } else {
            console.log("this.vapaee_client_id:", this.vapaee_client_id);
            console.log("this.foreign_token:", this.foreign_token);
        }
    }
}
