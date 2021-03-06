import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';

@Component({
    selector: 'comming-soon-page',
    templateUrl: './comming-soon.page.html',
    styleUrls: ['./comming-soon.page.scss']
})
export class CommingSoonPage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService, public cnt: CntService) {
    }
    
    ngOnInit() {
        this.cnt.updateFB();
    }

}
