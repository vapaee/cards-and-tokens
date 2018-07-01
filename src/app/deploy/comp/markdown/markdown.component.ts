import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'markdown-comp',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss']
})
export class MarkDownComponent extends BaseComponent implements OnInit {
    
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
            console.log("MarkDownComponent data", this.data);
        });
    }

    public static config(): any {
        return {

        };
    }

}
