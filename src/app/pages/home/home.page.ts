import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { SteemService } from '../../services/steem.service';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService, public cnt: CntService, public steem: SteemService) {
    }

    ngOnInit() {
    }

}
