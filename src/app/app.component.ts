import { Component, ViewChild, HostListener } from '@angular/core';
import { VapaeeUserService } from "./services/vapaee-user.service";
import { AppService } from "./services/app.service";
import { CntService } from "./services/cnt.service";
import { SteemService } from './services/steem.service';
import { UserdataService } from './services/userdata.service';
import { DragAndDropService } from './services/drag-and-drop.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('loginModal') public loginModal;
    
    constructor(
        public vapaee: VapaeeUserService,
        public user: UserdataService,
        public app: AppService, 
        public cnt: CntService,
        public steem: SteemService,
        public dnd: DragAndDropService
    ) {
        this.vapaee.init(this);
        this.app.init(this);
        this.cnt.init(this.app.device);
        this.steem.init(this);
        this.dnd.init();
    }

    ngOnInit() {
        this.app.onWindowsResize();
    }

    @HostListener('window:resize')
    onWindowsResize() {
        this.app.onWindowsResize();
    }
}
