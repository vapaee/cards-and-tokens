import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ActivatedRoute } from '@angular/router';
import { BroadcastService } from '../../services/broadcast.service';
import { SteemService } from '../../services/steem.service';

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
        private events: BroadcastService,
        private steem: SteemService
    ) {
        this.ranking = {claimed:[], unclaimed:[]};
        this.cnt.getAllCards().then(e => {
            this.proccessData();
            for (let i in this.ranking.claimed) {
                this.updateCardVotes(this.ranking.claimed[i]);
            }            
        });

        this.waitInit = new Promise((resolve) => {
            this.initResolve = resolve;
        });

        this.events.on("card-votes-updated").subscribe(() => {
            this.sortCards();
        });
    }

    updateCardVotes(card) {
        this.steem.getActiveVotes(card.steem.author, card.steem.permlink, card.steem_votes, card.slug).then((response) => {
            /*if (!response.error) {
                if (response.votes != card.steem_votes) {
                    this.cnt.updateCollectibleVotes(card.slug, response.votes);
                }
            }*/
        })
    }

    proccessData() {
        this.ranking.unclaimed = [];
        this.ranking.claimed = [];

        for (let i in this.cnt.cards) {
            let card = this.cnt.cards[i];
            if (card.steem.empty) {
                this.ranking.unclaimed.push(card);
            } else if (card.steem.permlink && (card.steem.permlink.indexOf("telos") == 0 || card.steem.permlink.indexOf("elos") == 0)) {
                this.ranking.unclaimed.push(card);
            } else {
                this.ranking.claimed.push(card);
            }
        }

        this.sortCards();
    }

    sortTimer = null;
    sortCards() {
        if (this.sortTimer) {
            window.clearTimeout(this.sortTimer);
            this.sortTimer = null;
        }
        this.sortTimer = window.setTimeout(() => {
            this.sortTimer = null;
            console.log("Sorting Ranking");
            this.ranking.claimed.sort((a,b) => {
                if (b.steem_votes != a.steem_votes) return b.steem_votes - a.steem_votes;
                if (a.edition.data.position != b.edition.data.position) return a.edition.data.position - b.edition.data.position;
                if (a.edition.data.week != b.edition.data.week) return a.edition.data.week - b.edition.data.week; // cuanto más viejo mejor
                return (a.slug > b.slug) ? 1 : -1;
            });
    
            this.ranking.unclaimed.sort((a,b) => {
                if (a.edition.data.week != b.edition.data.week) return b.edition.data.week - a.edition.data.week;
                if (a.edition.data.position != b.edition.data.position) return a.edition.data.position - b.edition.data.position;
                return (a.slug > b.slug) ? 1 : -1;
            });    
        }, 250);
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
