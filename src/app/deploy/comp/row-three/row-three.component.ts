import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'row-three-comp',
    templateUrl: './row-three.component.html',
    styleUrls: ['./row-three.component.scss']
})
export class RowThreeComponent extends BaseComponent implements OnInit {

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver
    ) {
        super(vapaee, app, cnt, cfResolver);
    }

    public static config(): any {
        return {

        };
    }
}
