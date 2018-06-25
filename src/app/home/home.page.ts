import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService) {
    }

    ngOnInit() {
    }

}
