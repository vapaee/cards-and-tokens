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

}
