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

    get class(): any {
        var _class = {};
        if (this.data.fadein) {
            _class["animated"] = true;
            _class["fadeIn"] = true;
        }
        if (this.data.fadeinside) {
            _class["animated"] = true;
            _class["fadeinside"] = true;
        }        
        if (this.data["padding"])    { _class["padding"] = true; }
        if (this.data["padding-sm"]) { _class["padding-sm"] = true; }

        return _class;
    }

    get style(): any {
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
                if (this.data.image["blend-mode"]) {
                    style["background-blend-mode"] = this.data.image["blend-mode"];
                }
            }
            if (this.data.gradient) {
                var gradient = " -webkit-linear-gradient("
                // top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0.64) 100%)";
                // top, left, -45deg
                gradient += this.data.gradient.dir;
                for (var i=0; i<this.data.gradient.points.length; i++) {
                    var point = this.data.gradient.points[i];
                    gradient += "," + point.color + " " + point.percent + "%";
                }
                gradient += ")";

                var bg_image = "";
                if (style["background-image"]) {
                    bg_image = ", " + style["background-image"];
                }
                style["background-image"] = gradient + bg_image;
                
                // console.log("style", style);
            }
        }
        return style;
    }
}