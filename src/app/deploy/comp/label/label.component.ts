import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { LabelService } from './label.service';

@Component({
    selector: 'label-comp',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseComponent implements OnInit {
    
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private labels: LabelService
    ) {
        super(vapaee, app, cnt, cfResolver);
        
    }

    public static config(): any {
        return {

        };
    }

    public get text(): string {
        if (this.data.text) {
            return this.data.text;
        }
        if (this.data.textid) {
            return this.labels.getLabel(this.data.textid);
        }
        return "";
    }

    get class(): any {
        var _class = {};
        if (typeof this.data.class == "string") {
            this.data.class = this.data.class.split(" ");
            var newclass = {};
            for (var i in this.data.class) {
                newclass[this.data.class[i]] = true;
            }
            this.data.class = newclass;
        }
        if (typeof this.data.class == "object") {
            _class = this.data.class;
        }
        console.log(_class);
        return _class;
    }

    get style(): any {
        var style = {};
        

        
        // style["height"] = "50px";
        // style["background-color"] = "red";
        return style;
    }

}
