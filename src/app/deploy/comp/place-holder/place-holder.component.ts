import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'place-holder-comp',
    templateUrl: './place-holder.component.html',
    styleUrls: ['./place-holder.component.scss']
})
export class PlaceHolderComponent extends BaseComponent implements OnInit {
    
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

    get getStyle(): any {
        var style = {};
        // style["height"] = "50px";
        // style["background-color"] = "red";
        return style;
    }

}
