import { Injectable } from '@angular/core';
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
    prev_state : string = "none";
    appcomp: AppComponent;
    device: {big?:boolean, small?:boolean, tiny?:boolean, portrait?:boolean, wide?:boolean, height?:number, width?: number} = {};

    constructor(public vapaee: VapaeeUserService, router: Router, route: ActivatedRoute) {
        this.router = router;
        this.route = route;

        this.router.events.subscribe((event) => {
            if (event.constructor.name === "NavigationEnd") {
                this.prev_state = this.state;
                this.path = this.router.url;
                this.state = this.getDeepestChild(this.route.root).snapshot.data.state;
                this.checkRedirect();
            }
        });
    }

    getDeepestChild(node:any):any {
        if (node.firstChild) {
            return this.getDeepestChild(node.firstChild);
        } else {
            return node;
        }
    }

    init (appcomp: AppComponent) {
        this.appcomp = appcomp;
    }

    onWindowsResize() {
        this.device.small = false;
        this.device.tiny = false;
        this.device.height = window.innerHeight;
        this.device.width = window.innerWidth;
        var w = window.innerWidth;
        var h = window.innerHeight;

        if (w / h > 1) {
            this.device.portrait = false;
            this.device.wide = true;
        } else {
            this.device.portrait = true;
            this.device.wide = false;
        }

        if (this.device.portrait && h < 700) {
            this.device.small = true;
        }

        if (this.device.wide && w < 800) {
            this.device.small = true;
        }
        
        if ( w < 650 || h < 700) {
            this.device.small = true;
        }
        
        if ( w < 560 || h < 650) {
            this.device.tiny = true;
        }        
    }

    private checkRedirect() {
        console.log("app.checkRedirect()....  State: ", this.prev_state, this.state, "ready:", this.vapaee.ready);
        if (this.vapaee.ready) {
            if (this.state === 'loading') {
                if (this.vapaee.logged || !this.getStateData(this.prev_state).logged) {
                    console.log("app.checkRedirect() ta todo bien REDIRECTION --> ", this.prev_state);
                    this.router.navigate([this.prev_state]);
                } else {
                    console.log("app.checkRedirect() no esta logueado REDIRECTION --> home (attempt to enter state '"+this.prev_state+"' not beign logged)");
                    this.router.navigate(['home']);
                }
            } else {
                if (this.getStateData().logged && !this.vapaee.logged) {
                    console.log("app.checkRedirect() REDIRECTION --> home (attempt to enter state '"+this.state+"' not beign logged)");
                    this.router.navigate(['home']);
                }    
            }
        } else {
            if (this.getStateData().logged) {
                console.log("app.checkRedirect() El estado '"+this.state+"' necesita que estemos logueados. -----> Loading ");
                this.router.navigate(['loading']);
                this.vapaee.afterReady.then(() => {
                    this.checkRedirect();
                });                
            } else {
                console.log("app.checkRedirect() El estado '"+this.state+"' NO necesita que estemos logueados");
            }            
        }
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

    getStateData(name?:string) {
        name = name || this.getDeepestChild(this.route.root).snapshot.data.state;
        var data = this.getRouteData(name, this.router.config);
        return data;
    }

    getRouteData(name:string, obj:any[]) {
        var found:any = null;
        for (let i=0; !found && i<obj.length; i++) {
            if (obj[i].data.state === name) {
                found = obj[i].data;
            } else if (obj[i].children) {
                found = this.getRouteData(name, obj[i].children);
            }
        }
        return found;
    }
    
}
