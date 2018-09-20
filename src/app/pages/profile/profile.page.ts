import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';


import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login';


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
    }

    loginGoogle() {
        var socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
            console.log("GOOGLE sign in data : " , userData);
            // Now sign-in with userData
            // ...
            alert("Funcó??");
        }, (err) => {
            console.log("ERROR: GOOGLE sign in error : " , err);
            alert("NO Funcó !! :(");
        });
    }

}
