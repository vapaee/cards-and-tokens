import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from '../services/cnt.service';

@Component({
    selector: 'cards-page',
    templateUrl: './cards.page.html',
    styleUrls: ['./cards.page.scss']
})
export class CardsPage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService, private cnt: CntService) {
        this.cnt.getAllCards();
    }

    ngOnInit() {
    }

    deployCard(slug, e) {
        console.log("deployCard()", slug, e);
        var img:HTMLImageElement = e.target;
        this.cnt.deployCard(slug, img);
    }
    
}
