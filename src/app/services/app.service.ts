import { Injectable, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { VapaeeUserService } from './vapaee-user.service';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    public path: string;
    router : Router;
    route : ActivatedRoute;
    state : string;
    prev_state : string;
    appcomp: AppComponent;

    constructor(public vapaee: VapaeeUserService, router: Router, route: ActivatedRoute) {
        this.router = router;
        this.route = route;

        this.router.events.subscribe((event) => {
            if (event.constructor.name === "NavigationEnd") {
                this.prev_state = this.state;
                this.path = this.router.url;
                this.state = this.route.root.firstChild.snapshot.data.state;
                
                if (this.getState().data.logged && !this.vapaee.logged) {
                    console.log("REDIRECTION --> home (attempt to enter state '"+this.state+"' not beign logged)");
                    this.router.navigate(['home']);
                }
            }
        });
        
        
    }

    init (appcomp: AppComponent) {
        this.appcomp = appcomp;
    }

    askForLogin() {
        this.appcomp.loginModal.show();
    }


    urlStartsWith (str: any) {
        if (typeof str == "number") str = "" + str;
        if (typeof str == "string") {
            return window.location.pathname.indexOf(str) == 0;
        } else {
            return false;
        }
    }
    
    urlEndsWith (str: any) {
        if (typeof str == "number") str = "" + str;                
        if (typeof str == "string") {
            var len = window.location.pathname.length;
            var substr = window.location.pathname.substr(len-str.length, str.length);
            return substr.indexOf(str) == 0;
        } else {
            return false;
        }
    }
    
    stateStartsWith (str: any) {
        if (!this.state) return false;
        if (typeof str == "number") str = "" + str;                
        if (typeof str == "string") {
            return this.state.indexOf(str) == 0;
        } else {
            return false;
        }
    }
    
    prevStateStartsWith (str: any) {
        if (!this.prev_state) return false;
        if (typeof str == "number") str = "" + str;                
        if (typeof str == "string") {
            return this.prev_state.indexOf(str) == 0;
        } else {
            return false;
        }
    }

    getState(name?:string) {
        name = name || this.route.root.firstChild.snapshot.data.state;
        console.log("getState----------------->", this.router.config.filter(e => e.data.state === name).pop());
        return this.router.config.filter(e => e.data.state === name).pop();
    }
    
}
