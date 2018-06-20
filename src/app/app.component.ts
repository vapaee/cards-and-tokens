import { Component, ViewChild } from '@angular/core';
import { VapaeeUserService } from "./services/vapaee-user.service";
import { AppService } from "./services/app.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('loginModal') public loginModal;

    constructor(public vapaee: VapaeeUserService, public app: AppService) {
        this.app.init(this);
    }
}
