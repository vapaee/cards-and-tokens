import { Component, OnInit, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { HttpEvent } from '@angular/common/http';

@Component({
    selector: 'inventory-comp',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent extends BaseComponent implements OnInit {
    slots_cache:any[];
    current:number; // posición actual del scroll (cauntas cartas se deben correr)
    max:number; // cantidad máxima de 
    step:number; // ancho/alto de una celda conteniendo una carta
    total: number; // ancho/alto de toda la ventana visible del inventario (por donde scrollea la cinta)

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private section: SectionService,
        private renderer: Renderer2,
        private elRef: ElementRef
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.slots_cache = [];
        this.current = 0;
        this.waitReady.then(() => {
            // console.log("inventoryComponent data", this.data);
            window.setTimeout(() => {
                this.onResize();
            }, 200);
        });
    }

    public static config(): any {
        return {

        };
    }

    onResize(skip = false) {
        this.updateVars();
        this.updateOffset();
    }

    public updateVars() {
        var container = this.elRef.nativeElement.querySelector(".inventory-container");
        var viewport = this.elRef.nativeElement.querySelector(".inventory-scroll");
        var target = this.elRef.nativeElement.querySelector(".inventory-scroll-content");
        var firstchild = target.children[0];
        var capacity = target.children.length;
        if (this.data.vertical) {

        } else {
            var total = parseInt(window.getComputedStyle(container,null).getPropertyValue("width"));
            this.total = parseInt(window.getComputedStyle(viewport,null).getPropertyValue("width"));
            this.step = parseInt(window.getComputedStyle(firstchild,null).getPropertyValue("width"));
            this.max = Math.max(0, capacity - Math.floor(this.total / this.step));

            if (Math.max(0, capacity - Math.floor(total / this.step)) == 0) {
                this.max = 0;
            }
        }
        // console.log("inventoriComp.updateVars()", this.total, this.step, this.current, this.max);
    }

    public updateOffset() {
        var target = this.elRef.nativeElement.querySelector(".inventory-scroll-content");
        var current = this.current;
        if (current<0) current = 0;
        if (current > this.max) current = this.max;

        if (this.data.vertical) {

        } else {
            var offset = this.step * current;
            var value = "-" + offset + "px";
            this.renderer.setStyle(target, 'margin-left', value);
            // console.log("inventoriComp.updateOffset()", value);            
        }
    }

    public next() {
        this.updateVars();
        this.current++;
        if (this.current > this.max) this.current = this.max;
        this.updateOffset();
    }

    public prev() {
        this.updateVars();
        this.current--;
        if (this.current < 0) this.current = 0;
        this.updateOffset();
    }

    get slots(): any {
        var capacity = 8;
        if (this.cnt.userdata.data) {
            capacity = this.cnt.userdata.data.slug.container["cards-and-tokens"].capacity;
        }
        if (capacity != this.slots_cache.length) {
            this.slots_cache = [];
            for (var i=0; i<capacity; i++) {
                this.slots_cache.push({
                    "container":"cards-and-tokens",
                    "index":i,
                    "style": {
                        "width":"115px",
                        "max-width": "23vh"
                    }
                    
                    /*{
                        "width":"13vw",
                        "max-width": "115px"
                    }*/
                });
            }
        }    

        return this.slots_cache;
    }

}
