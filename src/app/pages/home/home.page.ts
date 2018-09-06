import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { SteemService } from '../../services/steem.service';

declare var $:any;
declare var FlipClock:any;

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

    constructor(public vapaee: VapaeeUserService, public app: AppService, public cnt: CntService, public steem: SteemService) {
    }

    ngOnInit() {
        if (this.app.countdown) {
            this.createCountDownClock(this.app.countdown);
        }
    }

    clock:any;
    
    destroyCountdown(){
        if (this.clock) {
            this.clock.stop();
            this.clock = null;
        }        
    }

    createCountDownClock(sec:number) {
        var self = this;
        // flipClock Count Down
        $(function () {

            // weblog("flipClock Count Down Start");
            // http://flipclockjs.com/
            var clock = new FlipClock($('.count-down'), sec, {
                clockFace: 'DailyCounter',
                countdown: true,
                autoStart: false,
                autoPlay: false,
                showSeconds: true
            });

            clock.face.options.countdown = true;
            clock.face.options.autoStart = false;
            clock.face.options.autoPlay = false;
            clock.face.options.showSeconds = true;
            console.log("clock.face.options", clock.face.options);
            console.log("clock", clock);
            // clock.face.value = clock.face.value - 4;
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

            window.setTimeout(function() {
                var html = '<span class="flipclock-divider"><span class="flipclock-label">Hours</span><span class="flipclock-dot top"></span><span class="flipclock-dot bottom"></span></span>';
                var t = $('ul.flip.play')[1];
                $(html).insertAfter(t);
                
                $('.flipclock-divider').each(function (a,b,c) {
                    console.log(this);
                    var text = "";
                    if (a==0) text = "days";
                    if (a==1) text = "hours";
                    if (a==2) text = "minutes";
                    if (a==3) text = "seconds";
                    $(this).addClass(text).find(".flipclock-label").text(text);
                });
                
            }, 100);
            
        });        
    }

}
