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
    // https://www.npmjs.com/package/ngx-markdown
    
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

    getClass() {
        // console.log("MarkDownComponent.getClass()", this.data ? this.data.class : "null", [this.data]);
        if (!this.data) return {};
        if (typeof this.data.class == "object") {
            return this.data.class;
        }
        if (typeof this.data.class == "string") {
            var list = this.data.class.split(" ");
            var _class = {};
            for (let i in list) {
                _class[list[i]] = true;
            }
            this.data.class = _class;
        }
        return this.data.class;
    }
}
