import { Component, OnInit, ViewChild } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ComponentHost } from '../../deploy/comp/comp';
import { ComponentService } from '../../deploy/comp/component.service';
import { ContainerService } from '../../services/container.service';

@Component({
    selector: 'inventory-page',
    templateUrl: './inventory.page.html',
    styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;

    inventory:any;

    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public comp: ComponentService, 
        public cnt: CntService,
        private containers: ContainerService
    ) {
        this.inventory = {
            deploy: {
                "comp": "float",
                "data": {
                    "style": {
                        "width": "100%",
                        "height": "240px",
                        "bottom": "0px",
                        "left": "0%"
                    }
                },
                "children": [
                    {
                        "comp": "inventory",
                        "data": {
                            "rows": 1
                        }
                    }
                ]
            }
        }

        this.inventory = {
            deploy: {
                "comp": "inventory",
                "data": {
                    "rows": 2,
                    "cols": 4
                }
            }
        }
    }

    ngOnInit() {
        
        this.comp.createAndDeployTree(this.inventory, this.main.view);
        
        this.cnt.getUserInventory("cards-and-tokens").then(inventory => {
            // this.containers.setContent("cards-and-tokens", inventory.container_id, inventory.slots);
        });
        
        
    }

    getDailyPrice() {
        this.cnt.getDailyPrize().then(inventory => {
            console.log("InventoryPage.getDailyPrice() me llegó inventory: ", inventory);
            this.containers.setContent("cards-and-tokens", inventory.container_id, inventory.slots);
        });
    }

}
