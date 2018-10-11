import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ActivatedRoute } from '@angular/router';
import { BroadcastService } from '../../services/broadcast.service';

@Component({
    selector: 'cards-ranking-page',
    templateUrl: './cards-ranking.page.html',
    styleUrls: ['./cards-ranking.page.scss']
})
export class CardsRankingPage implements OnInit {
    initResolve:(value?:void) => void;
    public waitInit: Promise<void> = null;
    public ranking: {claimed:any[], unclaimed:any[]};

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService,
        public cnt: CntService,
        private route: ActivatedRoute,
        private events: BroadcastService
    ) {
        this.ranking = {claimed:[], unclaimed:[]};
        this.cnt.getAllCards().then(e => {
            this.proccessData();
        });

        this.waitInit = new Promise((resolve) => {
            this.initResolve = resolve;
        });

        this.events.on("card-votes-updated").subscribe(() => {
            this.proccessData();
        });
    }

    proccessData() {
        console.log("CardsRankingPage.proccessData() cards: ", this.cnt.cards);
        this.ranking.unclaimed = [];
        this.ranking.claimed = [];

        for (let i in this.cnt.cards) {
            let card = this.cnt.cards[i];
            console.log(card);
            if (card.steem.empty) {
                this.ranking.unclaimed.push(card);
            } else {
                this.ranking.claimed.push(card);
            }
        }

        this.ranking.claimed.sort((a,b) => {
            if (b.steem_votes != a.steem_votes) return b.steem_votes - a.steem_votes;
            if (a.edition.data.week != b.edition.data.week) return b.edition.data.week - a.edition.data.week;
            if (a.edition.data.position != b.edition.data.position) return a.edition.data.position - b.edition.data.position;
            return (a.slug > b.slug) ? 1 : -1;
        });

        this.ranking.unclaimed.sort((a,b) => {
            if (a.edition.data.week != b.edition.data.week) return b.edition.data.week - a.edition.data.week;
            if (a.edition.data.position != b.edition.data.position) return a.edition.data.position - b.edition.data.position;
            return (a.slug > b.slug) ? 1 : -1;
        });

    }

    ngOnInit() {
        this.initResolve();
    }

    getCardStyle(card) {
        var obj = {};
        obj["background-image"] = "url("+card.edition.preview.images.thumbnail+"), url(/assets/loading.gif)";
        obj["background-repeat"] = "no-repeat, no-repeat";
        obj["background-position"] = "center";
        obj["background-size"] = "contain, auto"; 
        obj["margin"] = ".375rem";
        return obj;
    }
    
    getPositionNumber(i) {
        var n = i;
        var str = "th";
        if  (n==1) str = "st";
        if  (n==2) str = "nd";
        if  (n==3) str = "rd";
        return n+str;
    }
    
    deployCard(card) {
        var img:HTMLImageElement = <HTMLImageElement>window.document.getElementById(card.slug);
        this.cnt.deployCard(card, img);
    }

}
