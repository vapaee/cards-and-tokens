import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

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
            this.data.rows = this.prepareRows(this.data.rows);
            this.rows = this.data.rows;
            console.log("ROWS:" , this.data.rows);
        });
    }

    prepareRows(current_rows:any[]) {
        console.log("Grid.prepareRows()", current_rows);
        
        for (var i=0; i<current_rows.length; i++) {
            // console.log(i, current_rows[i]);
            if (typeof current_rows[i] == "number") {
                var row:any = {cols:[]}
                for (var j=0; j<current_rows[i]; j++) {
                    row.cols.push({});
                }
                current_rows[i] = row;
            } else if (typeof current_rows[i] == "object") {
                var row:any = {cols:[]};
                if (Array.isArray(current_rows[i])) {
                    row.cols = current_rows[i];
                } else if (Array.isArray(current_rows[i].cols)) {
                    row = current_rows[i];
                }
                console.log("row:", row);
                
                for (var j=0; j<row.cols.length; j++) {
                    var col = row.cols[j];
                    if (col.height) {
                        row.grow = 0;
                    }
                    if (col.rows) {
                        col.rows = this.prepareRows(col.rows);
                    }
                    if (typeof col.class == "string") {
                        var obj = {}
                        col.class.split(" ").map(_class => {
                            obj[_class] = true;
                        });
                        col.class = obj;
                    }
                }
                if (typeof row.class == "string") {
                    var obj = {}
                    row.class.split(" ").map(_class => {
                        obj[_class] = true;
                    });
                    row.class = obj;
                }
                
                current_rows[i] = row;
            }
        }
        return current_rows;
    }

    public getRowClass(row:any) {
        var classes = row.class || {};
        classes["text-right"] = row.align == 'right';
        classes["text-center"] = row.align == 'center';
        classes["padding"] = row.padding == true;
        return classes;
    }

    public getColClass(col:any) {
        var classes = col.class || {};
        classes["text-right"] = col.align == 'right';
        classes["text-center"] = col.align == 'center';
        classes["padding"] = col.padding == true;
        return classes;
    }

    public static config(): any {
        return {

        };
    }
}
