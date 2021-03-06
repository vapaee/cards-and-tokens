import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";

@Component({
    selector: 'not-found-page',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss']
})
export class NotFoundPage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService) {
    }

    ngOnInit() {
        console.log("NOT FOUND 404: ", window.location.href);
    }

}
