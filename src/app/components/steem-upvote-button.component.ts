import { Component, Input, OnChanges } from '@angular/core';
import { CntService } from '../services/cnt.service';
import { SteemService } from '../services/steem.service';

@Component({
    selector: 'steem-upvote-button',
    styles: [
        ":host {display:inline-block;}",
        // "span.upvote {display: inline-block; margin-left: 0; border-radius: 50%; white-space: nowrap !important; vertical-align: middle;}",
        // ".Icon > svg, .Icon span.icon {vertical-align: top; overflow: hidden; white-space: nowrap !important;}",
        "circle {stroke: #1FBF8F;}",
        ".steem-vote-btn {font-weight: 500; border-radius: 5px; background-color: white; padding: 2px 10px; color: #1FBF8F !important; font-size: smaller; }",
        ".upvoted .Icon:hover { -webkit-animation: none !important; animation: none !important; }",
        ".upvoted circle { fill: #06D6A9; stroke: #06D6A9; }",
        "svg { vertical-align: top; }",
        ".loading svg { border: 1px solid #06D6A9; border-radius: 50%; border-right-color: transparent; border-top-color: transparent; -webkit-animation: loading 500ms infinite linear; animation: loading 500ms infinite linear; }",
        "@keyframes loading { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }"
    ],
    template: `
        <a [ngClass]="{'loading': loading}" [hidden]="voted || !steemdata.author" class="steem-vote-btn waves-effect waves-light" (click)="vote()">
            <span class="Icon chevron-up-circle upvote" style="display: inline-block; width: 1.12rem; height: 1.12rem; vertical-align: middle;"><svg enable-background="new 0 0 33 33" version="1.1" viewBox="0 0 33 33" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Chevron_Up_Circle"><circle cx="16" cy="16" r="15" stroke="#1FBF8F" fill="none"></circle><path d="M16.699,11.293c-0.384-0.38-1.044-0.381-1.429,0l-6.999,6.899c-0.394,0.391-0.394,1.024,0,1.414 c0.395,0.391,1.034,0.391,1.429,0l6.285-6.195l6.285,6.196c0.394,0.391,1.034,0.391,1.429,0c0.394-0.391,0.394-1.024,0-1.414 L16.699,11.293z" fill="#1FBF8F"></path></g></svg></span>
            <span [hidden]="!loading">&nbsp;loading</span>
            <span [hidden]="loading">&nbsp;{{votes}} votes</span>
        </a>
        
        <a [ngClass]="{'loading': loading}" [hidden]="!voted || !steemdata.author" class="steem-vote-btn waves-effect waves-light upvoted" (click)="unvote()">
            <span class="Icon chevron-up-circle upvote" style="display: inline-block; width: 1.12rem; height: 1.12rem; vertical-align: middle;"><svg enable-background="new 0 0 33 33" version="1.1" viewBox="0 0 33 33" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Chevron_Up_Circle"><circle cx="16" cy="16" r="15" stroke="#121313" fill="none"></circle><path d="M16.699,11.293c-0.384-0.38-1.044-0.381-1.429,0l-6.999,6.899c-0.394,0.391-0.394,1.024,0,1.414 c0.395,0.391,1.034,0.391,1.429,0l6.285-6.195l6.285,6.196c0.394,0.391,1.034,0.391,1.429,0c0.394-0.391,0.394-1.024,0-1.414 L16.699,11.293z" fill="#ffffff"></path></g></svg></span>
            <span [hidden]="!loading">&nbsp;loading</span>
            <span [hidden]="loading">&nbsp;{{votes}} votes</span>
        </a>

        <!--a [ngClass]="{'loading': loading}" [hidden]="steemdata.author" class="steem-vote-btn waves-effect waves-light upvoted" (click)="encorage()">
            <span>Encourage @{{card.edition.data.steemuser}} to claim this card authorship</span>
        </a-->        
    `
})
export class SteemUpvoteButtonComponent implements OnChanges {
    @Input() steemdata: {author: string, permlink: string, votes:number}
    @Input() card: any;
    voted:boolean;
    loading:boolean;
    votes:number;
    list:any[];
    constructor(public steem:SteemService, public cnt:CntService) {
        
    }

    update() {
        console.log("SteemUpvoteButtonComponent.update() ------------- ", this.steemdata, this.card);
        this.loading = true;
        
        return new Promise((resolve,reject) => {
            if (!this.steemdata.author) {
                return resolve();
            }

            this.steem.getActiveVotes(this.steemdata.author, this.steemdata.permlink, this.steemdata.votes, this.card.slug).then((response) => {
                this.loading = false;
                this.votes = response.votes;
            });

        })
    }

    ngOnChanges() {
        if (typeof this.steemdata.author == "string" && typeof this.steemdata.permlink == "string") {
            this.update();
        }
    }

    vote() {
        if (this.loading) return;
        this.loading = true;
        this.steem.vote(this.steemdata.author, this.steemdata.permlink).then(() => {
            this.voted = true;
            this.update();
            // this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    unvote() {
        if (this.loading) return;
        this.loading = true;
        this.steem.unvote(this.steemdata.author, this.steemdata.permlink).then(() => {
            this.voted = false;
            // this.loading = false;
            this.update();
        }).catch(() => {
            this.loading = false;
        });
    }

    encorage() {
        var url = "https://steemit.com/openmic/@"+this.card.edition.data.steemuser+"/"+this.card.edition.data.permlink;

        this.steem.steemjs.api.getRepliesByLastUpdate(this.card.edition.data.steemuser, this.card.edition.data.permlink, 100, function(err, result) {
            console.log("STEEM: this.steem.steemjs.api.getRepliesByLastUpdate", err, result);
        });
        window.open(url,'_blank');
    }


}

