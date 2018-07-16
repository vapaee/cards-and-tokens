import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from '../services/cnt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cards-page',
    templateUrl: './cards.page.html',
    styleUrls: ['./cards.page.scss']
})
export class CardsPage implements OnInit {
    initResolve:(value?:void) => void;
    public waitInit: Promise<void> = null;

    constructor(public vapaee: VapaeeUserService, public app: AppService, private cnt: CntService, private route: ActivatedRoute) {
        this.cnt.getAllCards().then(e => {
            var slug = this.route.snapshot.paramMap.get('slug');
            if (slug) {
                this.cnt.getCardBySlug(slug).then(card => {
                    this.waitInit.then(() => {
                        var img = window.document.getElementById(slug);
                        this.deployCard(card, {target:img});    
                    });
                });    
            }
        });

        this.waitInit = new Promise((resolve) => {
            this.initResolve = resolve;
        });        
    }

    

    ngOnInit() {
        this.initResolve();
    }

    deployCard(card, e) {
        var img:HTMLImageElement = e.target;
        this.cnt.deployCard(card, img);
    }
    
}
