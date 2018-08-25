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
            console.log(this.data.rows);
            this.data.rows = this.prepareRows(this.data.rows);
            this.rows = this.data.rows;
        });
    }

    prepareRows(current_rows:any[]) {
        for (var i=0; i<current_rows.length; i++) {
            if (typeof current_rows[i] == "number") {
                var rows = [];
                for (var j=0; j<current_rows[i]; j++) {
                    rows.push({});
                }
                current_rows[i] = rows;
            } else if (Array.isArray(current_rows[i])) {
                var rows = [];
                for (var j=0; j<current_rows[i].length; j++) {
                    var col = current_rows[i][j];
                    if (col.rows) {
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                        console.log(col.rows);
                        col.rows = this.prepareRows(col.rows);
                        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                        console.log(col.rows);

                    }
                    rows.push(col);
                }
                current_rows[i] = rows;
            }
        }
        return current_rows;
    }

    public static config(): any {
        return {

        };
    }
}
