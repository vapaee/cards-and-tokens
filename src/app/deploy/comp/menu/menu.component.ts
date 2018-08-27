import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
// import { ETIME } from 'constants';

@Component({
    selector: 'menu-comp',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseComponent implements OnInit {
    
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private section: SectionService
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.waitReady.then(() => {
            // console.log("MenuComponent data", this.data);
        });
    }

    public static config(): any {
        return {

        };
    }

    public onMenuEntry(entry:any) {
        if (entry.section && entry.value) {
            this.section.setSection(entry.section, entry.value);
        }
        if (entry.section && entry.move) {
            if (entry.move > 0) {
                this.section.nextSection(entry.section);
            } else {
                this.section.prevSection(entry.section);
            }            
        }
    }

    public getEntryClass (entry) {
        // console.log("getEntryClass() <-", entry.class);
        if (entry.class) {
            if (typeof entry.class == "string") {
                entry.class = this.createClassObject(entry.class.split(" "));
            }
        } else {
            if (this.data.class) {
                entry.class = this.data.class;
                return this.getEntryClass(entry);
            } else {
                entry.class = {};
            }            
            entry.class = this.createClassObject("btn btn-info btn-sm my-0 waves-effect waves-light".split(" "));
        }
        // console.log("getEntryClass() ->", entry.class);
        return entry.class; 
    }

    public createClassObject(list:string[]):any {
        var obj = {};
        for (var i=0; i<list.length; i++) {
            obj[list[i]] = true;
        }
        return obj;
    }

    public getEntryStyle (entry) {
        if (entry.style) {
            return entry.style;
        } else {
            if (this.data.style) {
                return this.data.style;
            } else {
                return {}
            }
        }
    }

}
