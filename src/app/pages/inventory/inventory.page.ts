import { Component, OnInit, ViewChild } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ComponentHost } from '../../deploy/comp/comp';
import { ComponentService } from '../../deploy/comp/component.service';

@Component({
    selector: 'inventory-page',
    templateUrl: './inventory.page.html',
    styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;

    inventory:any;
    slots:any[];

    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public comp: ComponentService, 
        public cnt: CntService
    ) {
        
    }

    ngOnInit() {
        var inventory_name = "cards-and-tokens";
        this.slots = [[],[]];
        var cols = 4;
        for (var r=0;r<this.slots.length; r++) {
            for (var i=0;i<cols; i++) {
                this.slots[r].push({
                    "index": i+r*cols, "container": inventory_name
                });
            }
        }
        this.cnt.getUserInventory(inventory_name).then(inventory => {
            // acá puedo consultar la capacidad total (por si en algún momento tiene más de 8)
            // console.log(this.cnt.userdata.data.slug.container[inventory_name].capacity);
        });
    }

    getDailyPrice() {
        this.cnt.getDailyPrize()
    }

}
