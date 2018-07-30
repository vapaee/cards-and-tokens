import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { DeployNode } from '../comp';
import { SectionI } from '../section/section.component';
import { AlbumComponent } from '../album/album.component';
import { ContainerCtrl } from '../../../services/datatypes.service';
import { ContainerService } from '../../../services/container.service';



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
        protected albums: ContainerService
    ) {
        super(vapaee, app, cnt, cfResolver, section, albums);
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

        // Tuve que hardcodear esten número acá que corresponde al ancho de 90% del padre de éste nodo
        var firstMargin = this.app.device.width * 0.05; // 5%
        var parentWidth = this.app.device.width * 0.9;
        var cols = Math.floor(parentWidth / 160);
        var margin = (parentWidth - (cols*cardWidth)) / (cols+1);

        this.data.cols = cols;
        this.data.name = "cards-and-tokens";
        this.data.capacity = this.data.capacity || this.data.cols * this.data.rows;
        var remaining = this.data.capacity;
        for (let r=0; r<this.data.rows; r++) {
            let page = {background:{"color": "rgba(0,0,0,0.5)"}, slots:[]};
            for (let s=0; s<this.data.cols && 0<remaining; s++, remaining--) {
                page.slots.push({ "position": { "top": "10px", "left": (firstMargin+margin*(s+1)+cardWidth*s) + "px" } });
            }
            this.data.pages.push(page);
        }
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
