import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cards-page',
    templateUrl: './cards.page.html',
    styleUrls: ['./cards.page.scss']
})
export class CardsPage implements OnInit {
    initResolve:(value?:void) => void;
    public waitInit: Promise<void> = null;

    constructor(public vapaee: VapaeeUserService, public app: AppService, public cnt: CntService, private route: ActivatedRoute) {
        this.cnt.getAllCards().then(e => {
            console.log(this.cnt.cards.length, this.cnt.cards);
            var slug = this.route.snapshot.paramMap.get('slug');
            if (slug) {
                this.waitInit.then(() => {
                    this.tryTodeployCard(slug);
                });                
            } else {
                if (this.app.countdown > 0) {
                    this.app.navigate("home");
                } else {
                    console.error("sacar esto");
                }                
            }
        });

        this.waitInit = new Promise((resolve) => {
            this.initResolve = resolve;
        });
    }

    ngOnInit() {
        this.initResolve();
    }

    tryTodeployCard(slug:string) {
        if (this.cnt.cards.length == 0) return;
        var img = window.document.getElementById(slug);
        if (img) {
            this.cnt.getCardBySlug(slug).then(card => {
                this.deployCard(card, {target:img});
            });
        } else {
            window.setTimeout(() => {
                this.tryTodeployCard(slug);
            }, 100);
        }
    }

    deployCard(card, e) {

        var img:HTMLImageElement = e.target;
        this.cnt.deployCard(card, img);
    }

    getCardStyle(card) {
        var obj = {};
        obj["background-image"] = "url("+card.edition.preview.images.thumbnail+"), url(/assets/loading.gif)";
        obj["background-repeat"] = "no-repeat, no-repeat";
        obj["background-position"] = "center";
        obj["background-size"] = "contain, auto"; 
        return obj;
    }
    
}
