import { Component, ViewChild, HostListener } from '@angular/core';
import { VapaeeUserService } from "./services/vapaee-user.service";
import { AppService } from "./services/app.service";
import { CntService } from "./services/cnt.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('loginModal') public loginModal;

    constructor(public vapaee: VapaeeUserService, public app: AppService, public cnt: CntService) {
        this.app.init(this);
        this.cnt.init(null);
    }

    ngOnInit() {
        this.app.onWindowsResize();
    }

    @HostListener('window:resize')
    onWindowsResize() {
        this.app.onWindowsResize();
    }
}
