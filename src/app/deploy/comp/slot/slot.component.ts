import { Component, OnInit, ComponentFactoryResolver, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { ContainerService } from '../../../services/container.service';
import { SlotI } from '../../../services/datatypes.service';



@Component({
    selector: 'slot-comp',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss']
})
export class SlotComponent extends BaseComponent implements OnInit, SlotI {
    @ViewChild('img') img:ElementRef;
    copy: any;
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private container: ContainerService
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.waitReady.then(() => {
            this.container.registerSlot(this.data.container, this, this.data.index, this.data.slot);
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
        this.copy.style = {
            "display": "block",
            "width": "140px",
            "height": "197px",
            "background-size": "contain",
            "background-image": "url("+copy.edition.preview.images.fullsize+"), url("+copy.edition.preview.images.thumbnail+")"
        }
    }

    public onClick(e) {
        console.log("SlotComponent.onClick()", [e]);
        this.cnt.deployCard(this.copy.collectible, this.img.nativeElement);
        // this.container.HacerAlgo(data)

        // si está en modo "view" simplemente despliega la carta que esté en ese slot
        // si está en modo "fill" y tiene una carta, la regresa al inventario? startDragging?
        
    }

}
