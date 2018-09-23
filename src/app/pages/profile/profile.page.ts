import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';

import {
    AuthService,
    GoogleLoginProvider
} from "../../modules/social-login/index";;


@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {

    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public steem: SteemService,
        private socialAuthService: AuthService
    ) {

    }

    ngOnInit() {
        /*
        this.socialAuthService.isSignedIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
            console.log("GOOGLE isSignedIn : " , userData);
            // Now sign-in with userData
            // ...
        }, (err) => {
            console.log("ERROR: GOOGLE isSignedIn : " , err);
        });
        */
    }

    loginGoogle() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
            console.log("GOOGLE sign in data : " , userData);
            // Now sign-in with userData
            // ...
        }, (err) => {
            console.log("ERROR: GOOGLE sign in error : " , err);
            alert("NO Funcó !! :(");
        });
    }

}
