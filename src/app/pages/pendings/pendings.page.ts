import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';
import { CntService } from '../../services/cnt.service';
import { DataService } from '../../services/data.service';
import { AnalyticsService } from '../../services/analytics.service';

interface CompSpec {
    comp:string,
    data?:any,
    children?:CompSpec[]
}


@Component({
    selector: 'pendings-page',
    templateUrl: './pendings.page.html',
    styleUrls: ['./pendings.page.scss']
})
export class PendingsPage implements OnInit {
    model:any;
    _deploy:CompSpec;
    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public steem: SteemService,
        public cnt: CntService,
        public data: DataService,
        public analytics: AnalyticsService
    ) {
    }

    ngOnInit() {

    }

    publishOpenmicCardOnSteem(card) {
        this.analytics.emitEvent("cards", "claim", "init");
        this.steem.publishOpenmicCardOnSteem(card).then(() => {
            this.analytics.emitEvent("cards", "claim", "success");
        }, (err) => {
            if (err.error_description) {
                alert("ERROR: " + err.error_description);
            } else {
                alert("ERROR: " + JSON.stringify(err,null,4));
            }            
            this.analytics.emitEvent("cards", "claim", "fail");
        });
    }
        
}
