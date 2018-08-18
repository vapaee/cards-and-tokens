import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';

@Component({
    selector: 'inventory-comp',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent extends BaseComponent implements OnInit {
    slots_cache:any[];

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
        this.slots_cache = [];
        this.waitReady.then(() => {
            console.log("inventoryComponent data", this.data);
        });
    }

    public static config(): any {
        return {

        };
    }

    get slots(): any {
        var capacity = 8;
        if (this.cnt.userdata.data) {
            capacity = this.cnt.userdata.data.slug.container["cards-and-tokens"].capacity;
        }
        if (capacity != this.slots_cache.length) {
            this.slots_cache = [];
            for (var i=0; i<capacity; i++) {
                this.slots_cache.push({
                    "container":"cards-and-tokens",
                    "index":i,
                    "style": {
                        "width":"13vw",
                        "max-width": "115px"
                    }
                });
            }
        }    

        return this.slots_cache;
    }

}
