import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'grid-comp',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent extends BaseComponent implements OnInit {
    rows: any[] = [];
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver
    ) {
        super(vapaee, app, cnt, cfResolver);
        this.waitLoaded.then(() => {
            for (var i=0; i<this.data.rows.length; i++) {
                if (typeof this.data.rows[i] == "number") {
                    var rows = [];
                    for (var j=0; j<this.data.rows[i]; j++) {
                        rows.push({});
                    }
                    this.data.rows[i] = rows;
                }
            }
            console.log("DATA: ", this.data);
            this.rows = this.data.rows;
        });

    }

    public static config(): any {
        return {

        };
    }
}
