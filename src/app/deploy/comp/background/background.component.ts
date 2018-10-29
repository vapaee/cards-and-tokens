import { Component, OnInit, ComponentFactoryResolver, HostBinding } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { BackgroundLayer } from 'src/app/services/datatypes.service';


@Component({
    selector: 'background-comp',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss']
})
export class BackgroundComponent extends BaseComponent implements OnInit {

    // expand
    @HostBinding('class.expand') expand = false;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver
    ) {
        super(vapaee, app, cnt, cfResolver);
        this.init();
    }
    
    public static config(): any {
        return {

        };
    }

    public init() {
        this.waitLoaded.then(() => {
            if (this.data.expand) {
                this.expand = true;
            }    
        });
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


    addBackgroundImage(style, obj:any, gradient:any) {
        if (obj.color=="#5C5949") {
            console.log(obj);
        }
        if (Array.isArray(obj)) {
            var layers: BackgroundLayer[] = <BackgroundLayer[]>obj;
            var image = "";
            var position = gradient?"center":"";
            var repeat = gradient?"repeat":"";
            var size = gradient?"auto":"";
            var blend = gradient?(gradient["blend-mode"] || "normal"):"";
            for (var i=0; i<layers.length; i++)  {
                if (i>0) image +=", ";
                if (i>0 || gradient) position +=", ";
                if (i>0 || gradient) repeat +=", ";
                if (i>0 || gradient) size +=", ";
                if (i>0 || gradient) blend +=", ";
                if (layers[i].url) {
                    image += "url(" + layers[i].url + ")";
                } else {
                    image += "none";
                }
                if (layers[i].position) {
                    position += layers[i].position;
                } else {
                    position += "center";
                }
                if (layers[i].repeat) {
                    repeat += layers[i].repeat;
                } else {
                    repeat += "repeat";
                }
                if (layers[i].size) {
                    size += layers[i].size;
                } else {
                    size += "auto";
                }
                if (layers["blend-mode"]) {
                    blend += layers["blend-mode"];
                } else {
                    blend += "normal";
                }                    
            }
            style["background-image"] = image;
            style["background-position"] = position;
            style["background-repeat"] = repeat;
            style["background-size"] = size;
            style["background-blend-mode"] = blend;
        } else {
            var layer: BackgroundLayer = <BackgroundLayer>obj;
            if (layer.url) {
                style["background-image"] = "url(" + layer.url + ")";
            }
            if (layer.position) {
                style["background-position"] = layer.position;
            }
            if (layer.repeat) {
                style["background-repeat"] = layer.repeat;
            }
            if (layer.size) {
                style["background-size"] = layer.size;
            }
            if (layer["blend-mode"]) {
                style["background-blend-mode"] = layer["blend-mode"];
            }
        }

        if (gradient) {
            var _gradient = " -webkit-linear-gradient("
            // top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0.64) 100%)";
            // top, left, -45deg
            _gradient += gradient.dir;
            for (var i=0; i<gradient.points.length; i++) {
                var point = gradient.points[i];
                _gradient += "," + point.color + " " + point.percent + "%";
            }
            _gradient += ")";

            var bg_image = "";
            if (style["background-image"]) {
                bg_image = ", " + style["background-image"];
            }
            style["background-image"] = _gradient + bg_image;
            // console.log("style", style);
        }
        
        return style;
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
            if (this.data.image || this.data.gradient) {
                style = this.addBackgroundImage(style, this.data.image || {}, this.data.gradient);
            }
        }
        // console.log("------------>", style);
        return style;
    }
}