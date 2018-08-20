import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
export class InventoryPage implements OnInit, OnDestroy {
    @ViewChild(ComponentHost) public main: ComponentHost;
    clock:any;

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
        this.dailycard = {backface:true,draggable:false,drops:false, id:"dailycard"};
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
        }, e => {
            console.log("this.cnt.getUserInventory nop");
        });
        
        this.updateCountdown();
    }

    ngOnDestroy() {
        this.destroyCountdown();
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

    destroyCountdown(){
        if (this.clock) {
            this.clock.stop();
            this.clock = null;
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
                clockFace: 'HourlyCounterFace',
                countdown: true,
                autoStart: false,
                autoPlay: false,
                showSeconds: true
            });
            
            clock.face.options.countdown = true;
            clock.face.options.autoStart = false;
            clock.face.options.autoPlay = false;
            clock.face.value = clock.face.value - 4;
            clock.stop();
            clock.start();
            /*
            window.setTimeout(() => {
                console.log(clock);
                // clock.start();
            }, 5000);
            */
            // weblog("flipClock Count Down END", $('.count-down').html());
            self.clock = clock;
        });        
    }

}
