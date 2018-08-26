import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';
import { CntService } from '../../services/cnt.service';

@Component({
    selector: 'root-page',
    templateUrl: './root.page.html',
    styleUrls: ['./root.page.scss']
})
export class RootPage implements OnInit {

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService,
        public cnt: CntService,
        public steem: SteemService) {
    }
    
    ngOnInit() {

    }

    printData() {
        console.log("Userdata", this.cnt.userdata.data);
        console.log(this.cnt);
    }


}
