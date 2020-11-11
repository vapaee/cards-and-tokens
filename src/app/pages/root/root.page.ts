import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
        public steem: SteemService,
        private renderer: Renderer2,
        private elRef: ElementRef) {
    }
    
    ngOnInit() {

    }

    printData() {
        console.log("Userdata", this.cnt.userdata.data);
        console.log(this.cnt);
    }

    collapseMenu() {
        var target = this.elRef.nativeElement.querySelector("div.navbar-collapse.show");
        if (target) {
            this.renderer.removeClass(target, "show");
        }
        
    }
}
