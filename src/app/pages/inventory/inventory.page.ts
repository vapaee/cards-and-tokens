import { Component, OnInit, ViewChild } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ComponentHost } from '../../deploy/comp/comp';
import { ComponentService } from '../../deploy/comp/component.service';

declare var $:any;
declare var FlipClock:any;

@Component({
    selector: 'inventory-page',
    templateUrl: './inventory.page.html',
    styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;

    inventory:any;
    slots:any[];
    dailycard:any;

    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public comp: ComponentService, 
        public cnt: CntService
    ) {
        
    }

    ngOnInit() {
        this.dailycard = {backface:true, id:"dailycard"};
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
        
        this.updateCountdown();
    }

    updateCountdown() {
        this.cnt.getDailyPrizeCountdown().then((sec) => {
            this.dailycard.claimable = this.cnt.userdata.data.dayliprice.claimable;
            if (!this.dailycard.claimable) {
                this.dailycard.remaining = sec;
                this.createCountDownClock();
            } else {
                this.dailycard.remaining = 0;
            }
        });
    }

    claimDailyPrize() {
        if (this.cnt.userdata.data.dayliprice.claimable) {
            this.cnt.claimDailyPrize().then(() => {
                this.updateCountdown();
            });
        } else {
            alert("You have to wait " + this.cnt.userdata.data.dayliprice.remaining + " seconds to claim your daily price");
        }
    }

    createCountDownClock() {
        var self = this;
        // flipClock Count Down
        $(function () {
            var now = new Date();
            var night = new Date(
                2019,
                5,
                2,
                0, 0, 0 // ...at 00:00:00 hours
            );
            var msTillMidnight = night.getTime() - now.getTime();
            var sec = self.cnt.userdata.data.dayliprice.remaining;


            // weblog("flipClock Count Down Start");
            // http://flipclockjs.com/
            var clock = new FlipClock($('.count-down'), sec, {

                // Create a minute counter
                clockFace: 'HourlyCounterFace',
                showSeconds: true,
                countdown: sec > 0,

                // The onStart callback
                onStart: function() {
                    console.log("onStart()");
                },
            
                // The onStop callback
                onStop: function() {
                    console.log("onStop()");
                },
            
                // The onReset callback
                onReset: function() {
                    console.log("onReset()");
                }
            });
            
            clock.start();
            // weblog("flipClock Count Down END", $('.count-down').html());
        });        
    }

}
