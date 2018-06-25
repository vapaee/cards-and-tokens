import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.page.html',
    styleUrls: ['./editor.page.css']
})
export class EditorPage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService) {
        
    }

    ngOnInit() {
    }

}
