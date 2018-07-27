import { Component, OnInit, ComponentFactoryResolver, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { AlbumService } from '../album/album.service';



export interface SlotI {
    loadCopy(copy:any);
    // API
    // 
}

@Component({
    selector: 'slot-comp',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss']
})
export class SlotComponent extends BaseComponent implements OnInit {
    @ViewChild('img') img:ElementRef;
    copy: any;
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private section: SectionService,
        private album: AlbumService
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.waitReady.then(() => {
            this.album.registerSlot(this, this.data.index, this.data.slot);
        });
    }

    public static config(): any {
        return {

        };
    }


    public loadCopy(copy:any) {
        console.log("SlotComponent.loadCopy()", [copy]);
        this.copy = copy;
        this.copy.collectible.edition = copy.edition;
    }

    public onClick(e) {
        console.log("SlotComponent.onClick()", [e]);
        this.cnt.deployCard(this.copy.collectible, this.img.nativeElement);
        // this.album.HacerAlgo(data)

        // si está en modo "view" simplemente despliega la carta que esté en ese slot
        // si está en modo "fill" y tiene una carta, la regresa al inventario? startDragging?
        
    }

}
