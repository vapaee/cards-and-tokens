import { Component, OnInit, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { DeployNode } from '../comp';
import { SectionI } from '../section/section.component';
import { AlbumComponent } from '../album/album.component';
import { ContainerCtrl } from '../../../services/datatypes.service';



@Component({
    selector: 'inventory-comp',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent extends AlbumComponent implements OnInit, SectionI, ContainerCtrl {

    capacity: number;
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        protected cfResolver: ComponentFactoryResolver,
        protected section: SectionService,
        private element: ElementRef
    ) {
        super(vapaee, app, cnt, cfResolver, section);
    }

    public static config(): any {
        return {

        };
    }
    
    protected prepareData(structure: DeployNode) {
        this.data = structure.data;
        this.data.pages = [];
        this.children = [];
        console.assert(Array.isArray(this.data.pages),
            "ERROR: Section data.pages missing or is not an Array. Got ",
            typeof this.data.pages,
            this.data.pages);

        // Tnego que parametrizar el ancho de las cartas
        var cardWidth = 160; // 140px más margen de ambos lados de 10px
        var cardHeight = 217; // 197px más margen de ambos lados de 10px

        // Tuve que hardcodear esten número acá que corresponde al ancho de 90% del padre de éste nodo
        var firstMargin = this.element.nativeElement.parentNode.offsetWidth * 0.05; // 5%
        var parentWidth = this.element.nativeElement.parentNode.offsetWidth * 0.9;


        var cols = Math.floor(parentWidth / 160);
        
        this.data.cols = this.data.cols || cols;
        this.data.name = "cards-and-tokens";
        this.data.capacity = this.data.capacity || this.data.cols * this.data.rows;
        var remaining = this.data.capacity;
        var background = {"color": "rgba(0,0,0,0.5)"};
        let page = {background:background, slots:[]};
        var margin = (parentWidth - (this.data.cols*cardWidth)) / (this.data.cols+1);

        for (let r=0; r<this.data.rows; r++) {
            for (let s=0; s<this.data.cols && 0<remaining; s++, remaining--) {
                page.slots.push({ "position": {
                    "top": (10*(r+1)+cardHeight*r) + "px",
                    "left": (firstMargin+margin*(s+1)+cardWidth*s) + "px" }
                });
            }
        }

        this.data.pages.push(page);
        console.log("InventoryComponent.prepareData()", this.data);

        // -----------------------------------------------
        this.data.current = "page-0";
        var pageslist = [];
        var pages:number[] = [];
        for (var i in this.data.pages) {
            pageslist.push("page-" + i);
            let page = this.data.pages[i];
            pages.push(this.data.pages[i].slots.length);
            var child = this.service.createDeployTree(this.createPageChild(page));
            this.children.push(child);
        }
        
        return {pages:pages, pageslist:pageslist};
    }

}
