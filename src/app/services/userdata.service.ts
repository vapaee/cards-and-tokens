import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { VapaeeUserService } from './vapaee-user.service';

@Injectable()
export class UserdataService {
    public afterReady: Promise<void> = null;

    constructor(private http: HttpClient, public vapaee: VapaeeUserService) {
        this.afterReady = new Promise((resolve, reject) => {
            this.vapaee.afterReady.then(() => {
                if (!this.vapaee.logged) return resolve();
                var API_url = "/api/";
                var url = API_url+"userdata?access_token="+this.vapaee.access_token;
                this.http.get(url).subscribe(result => {
                    console.log('-------- userdata ----------');
                    console.log(result);
                    console.log('----------------------------');
                    resolve();
                });
            });    
        });
    }
}
