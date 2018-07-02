import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'background-comp',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss']
})
export class BackgroundComponent extends BaseComponent implements OnInit {

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
        if (this.data) {
            if (this.data.color) {
                style["background-color"] = this.data.color;
            }
            if (this.data.fgcolor) {
                style["color"] = this.data.fgcolor;
            }
            if (this.data.image) {
                
                if (this.data.image.url) {
                    style["background-image"] = "url(" + this.data.image.url + ")";
                }
                if (this.data.image.position) {
                    style["background-position"] = this.data.image.position;
                }
                if (this.data.image.repeat) {
                    style["background-repeat"] = this.data.image.repeat;
                }
                if (this.data.image.size) {
                    style["background-size"] = this.data.image.size;
                }
            }
        }
        return style;
    }
}