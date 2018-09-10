import { Component, OnInit, ComponentFactoryResolver, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SlotI } from '../../../services/datatypes.service';



@Component({
    selector: 'slot-comp',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss']
})
export class SlotComponent extends BaseComponent implements OnInit, OnChanges, SlotI  {
    @ViewChild('img') img:ElementRef;
    @ViewChild('placeholder') placeholder:ElementRef;
    // copy: any;
    acceptingDrop: boolean;
    dark: boolean = false;
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.acceptingDrop = false;
        this.waitReady.then(() => {
            // this.container.registerSlot(this.data.container, this, this.data.index);
            if (this.data.dark) {
                this.dark = this.data.dark;
            }
            console.log("------->>>>>>>><", this.data);
        });
    }

    public static config(): any {
        return {

        };
    }

    ngOnChanges() {
        if (this.data.backface) {
            console.log("SLOT BACKFACE", [this.data]);
            if (this.data.backface === true) {
                this.data.thumbnail = "/assets/jumbocard_dbbb-full.jpg";
            } else if (typeof this.data.backface == "string") {
                this.data.thumbnail = this.data.backface;
            }
        }
    }
    
    public acceptsDrop(copy: any) {
        if (this.copy && this.copy.id == copy.id) return false;
        if (typeof this.data.drops != "undefined") {
            return this.data.drops;
        }
        if (!this.acceptingDrop) {
            this.acceptingDrop = true;
            return true
        }
        return false;
    }

    public dragLeave() {
        this.acceptingDrop = false;
    }

    public isDraggable(): boolean {
        if (typeof this.data.draggable != "undefined") {
            console.log("isDraggable returnning ", this.data.draggable);
            return this.data.draggable;
        }
        return true;
    }

    public onClick(e) {
        console.log("SlotComponent.onClick()", [e]);
        if (!this.copy) return;
        if (this.data.backface) return;
        this.cnt.deployCard(this.copy.collectible, this.img.nativeElement);
        // this.container.HacerAlgo(data)

        // si está en modo "view" simplemente despliega la carta que esté en ese slot
        // si está en modo "fill" y tiene una carta, la regresa al inventario? startDragging?
    }

    get copy(): any {
        // console.log("copy()", this.data.container, this.data.index);
        if (this.data.backface) {
            return this.data;
        }
        if (!this.cnt.userdata.data) return null;
        if (!this.cnt.userdata.data.slug) return null;
        var contaienr = this.cnt.userdata.data.slug.container[this.data.container];
        if (!contaienr) return null;
        var slot = contaienr.slots[this.data.index];
        if (!slot) return null;
        return slot.item;
    }

}
