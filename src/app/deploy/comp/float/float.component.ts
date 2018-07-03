import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'float-comp',
    templateUrl: './float.component.html',
    styleUrls: ['./float.component.scss']
})
export class FloatComponent extends BaseComponent implements OnInit {

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.waitReady.then(() => {
            console.log("FloatComponent data", this.data);
        });
    }

    public static config(): any {
        return {

        };
    }

    get getStyle(): any {
        return this.data.style
    }

}
