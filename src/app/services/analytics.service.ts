import { Injectable } from '@angular/core';

declare var ga:Function;
// declare var Date:Function;

@Injectable()
export class AnalyticsService {
    pageviewTimer: number;
    waitReady: Promise<any>;
    constructor() {
        this.waitReady = new Promise((resolve)=> {
            if (typeof ga === 'function') {
                resolve(ga);
            }
        });
    }

    sendPageView(url) {
        this.waitReady.then(ga => {
            if (this.pageviewTimer) {
                window.clearTimeout(this.pageviewTimer);
                this.pageviewTimer = 0;
            };
    
            this.pageviewTimer = window.setTimeout(() => {
                console.log("AnalyticsService.sendPageView() -------> ", url);
                // ga('set', 'page', url);
                // ga('send', 'pageview');
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
            console.log("AnalyticsService.emitEvent() -------> ", category, action, label, value);
            // ga('send', 'event', category, action, label, value); 
        });
    }
    
}
