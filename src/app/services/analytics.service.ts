import { Injectable } from '@angular/core';

declare var ga:Function;
// declare var Date:Function;

@Injectable()
export class AnalyticsService {
    pageviewTimer: number;
    waitReady: Promise<any>;
    constructor() {
        console.log("Analytics()");
        this.waitReady = new Promise((resolve)=> {
            var interval = 0;
            window.setTimeout(() => {
                if (typeof ga === 'function') {
                    resolve(ga);
                } else {
                    console.error("ERROR: AnalyticsService() ga not found");
                }    
                window.clearInterval(interval);
            }, 10000);
            window.setInterval(() => {
                if (typeof ga === 'function') {
                    resolve(ga);
                    window.clearInterval(interval);
                } else {
                    console.log("Analytics() not ga found");
                }               
            }, 250);
        });
    }
    
    setUserId(id) {
        this.waitReady.then(ga => {
            console.log("Analytics::UserId --> ", id);
            ga('set', 'userId', id);
        });
    }

    sendPageView(url) {
        this.waitReady.then(ga => {
            if (this.pageviewTimer) {
                window.clearTimeout(this.pageviewTimer);
                this.pageviewTimer = 0;
            };
    
            this.pageviewTimer = window.setTimeout(() => {
                console.log("Analytics::Pageview --> ", url);
                ga('set', 'page', url);
                ga('send', 'pageview');
            }, 1000);    
        });
    }

    public emitEvent(
        category: string,
        action: string,
        label: string = null,
        value: number = null
    ) {
        this.waitReady.then(ga => {
            console.log("Analytics::Event --> ", category, action, label, value);
            ga('send', 'event', category, action, label, value); 
        });
    }
    
}
