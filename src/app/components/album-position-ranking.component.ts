import { Component, Input, OnChanges } from '@angular/core';
import { CntService } from '../services/cnt.service';
import { SteemService } from '../services/steem.service';

@Component({
    selector: 'album-position-ranking',
    styles: [
        ":host { color: white; }"
    ],
    template: `
    <h3>Ranking</h3>
    <pre style="text-align: left; color: white !important;">{{data|json}}</pre>
    `
})
export class AlbumPositionRankingComponent implements OnChanges {
    @Input() data: any;

    constructor(public steem:SteemService, public cnt:CntService) {
        
    }

    ngOnChanges() {
        console.log("AlbumPositionRankingComponent.ngOnChanges()", this.data);
    }

}

