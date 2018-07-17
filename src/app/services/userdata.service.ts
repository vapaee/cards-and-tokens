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

/*

'use strict';

angular.module('userdata.service', ["vapaee.services"])
.service('LocalUserData',[
    "$http",
    "$q",
    "User",
    "API_url",
    function ($http, $q, User, API_url) {
        var UserData = this,
            ready_def = $q.defer(),
            cache = {},
            is_ready = false;
        this.ready = ready_def.promise;        
        
        Object.defineProperty(UserData, 'logged', {
            get: function() { return User.logged; },
            enumerable: true  
        });
        
        User.ready.then(function () {
            if (parseInt(User.vapaee_id) == 0) {
                cookie.set("user_id",0);
            }
            var url = API_url+"userdata?access_token="+User.access_token;
            $http.get(url).then(function (response) {
                is_ready = true;
                UserData = angular.extend(UserData, response.data);
                ready_def.resolve(UserData);
            })
        });

        this.isReady = function () {
            return is_ready;
        }
    }
]);
*/