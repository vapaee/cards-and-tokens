import { Component, OnInit, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { DeployNode } from '../comp';
import { SectionI } from '../section/section.component';
import { ContainerCtrl } from '../../../services/datatypes.service';

@Component({
    selector: 'album-comp',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends BaseComponent implements OnInit, SectionI, ContainerCtrl {

    capacity: number;
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        protected cfResolver: ComponentFactoryResolver,
        protected section: SectionService,
        private renderer: Renderer2,
        private elRef: ElementRef,
    ) {
        super(vapaee, app, cnt, cfResolver);
        this.init();
    }

    public init() {
        this.capacity = 0;
        this.waitReady.then(() => {
            window.setTimeout(() => {
                this.onResize();
            }, 200);
        });        
    }

    public static config(): any {
        return {

        };
    }

    protected prepareData(structure: DeployNode) {
        console.log("AlbumComponent.prepareData()", structure);
        this.data = structure.data;
        this.children = [];
        console.assert(Array.isArray(this.data.pages),
            "ERROR: Section data.pages missing or is not an Array. Got ",
            typeof this.data.pages,
            this.data.pages);
        this.data.current = "page-0";
        this.data.name = this.data.name || "album";
        var pageslist = [];
        var pages:number[] = [];
        for (var i in this.data.pages) {
            pageslist.push("page-" + i);
            var page = this.data.pages[i];
            pages.push(this.data.pages[i].slots.length);
            var child = this.service.createDeployTree(this.createPageChild(page));
            this.children.push(child);
        }
        return {pages:pages, pageslist:pageslist};
    }

    protected registerAndLoad(pages:number[], pageslist: any[]) {
        this.section.registerSection(this.data.name, this.data.current, pageslist, this);
        this.loadedResolve();
        this.section.setSection(this.data.name, this.data.current);
    }
    
    loadStructure(structure: DeployNode) {
        // console.log("loadStructure()", structure);
        var data = this.prepareData(structure);
        this.registerAndLoad(data.pages, data.pageslist);
        return Promise.resolve(<any[]>[]);
    }

    createPageChild(page: {slots:{position?:any}[], background:any}): {comp: string, data?: any, children?: any[]} {
        console.log("createPageChild()", page);
        let _children:any[] = [];
        let _positions:any[] = [];
        let _slot:number = 0;
        for (let i=0; i<page.slots.length; i++, this.capacity++) {
            console.log("this.capacity", this.capacity);
            let position = page.slots[i].position;
            position["width"] = "15%";
            position["max-width"] = "140px";
            let _child = {
                "comp": "slot",
                "data": {
                    "position": position,
                    "index": this.capacity,
                    "container": this.data.name
                }
            }
            _children.push(_child);
            _positions.push(position);
        }
        let child = null;

        if (this.data.grid) {
            child = {
                "comp": "grid",
                "data": {
                    
                },
                "children": _children
            }
        } else {
            child = {
                "comp": "float",
                "data": {
                    "positions": _positions
                },
                "children": _children
            }
        }

        page.background.float = true;

        var pageChild = {
            "comp":"background",
            "data": page.background,
            "children": [child]
        };


        return pageChild;
    }

    // invocado por SectionService cuando alguien cambia la sección actual.
    public setSection(current: string) {
        console.log("AlbumComponent.setSection()", current);
        this.waitReady.then(() => {
            var num = parseInt(current.substr(5));
            console.log("parseInt(current.substr(5))", current.substr(5), num);
            let child = this.children[num];
            let host = this.hosts.toArray()[0];
            // console.error("Hay que generar una animación (movimiento horizontal + fadeout) 2s y luego recién sacar la página");
            while (host.view.length > 0) {
                host.view.remove(host.view.length-1);
            }
            
            let componentFactory = this.cfResolver.resolveComponentFactory(child.component);
            let componentRef = host.view.createComponent(componentFactory);
            (<BaseComponent>componentRef.instance).loadStructure(child);

            var target = this.elRef.nativeElement.querySelector(".embed-responsive background-comp");
            this.renderer.addClass(target, 'float');
        });
    }

    getPadding() {
        return 20;
    }

    timer:number = 0;
    onResize(skip = false) {
        console.log("AlbumComponent.onResize() ******************************");
        var target = this.elRef.nativeElement.querySelector(".embed-responsive");
        var ratio = 16/9;
        var maxHeight = this.elRef.nativeElement.offsetHeight - 2 * this.getPadding();
        var maxWidth = maxHeight * ratio;
        this.renderer.setStyle(target, 'max-width', maxWidth + "px");
        if (!skip) {
            if (!this.timer) {
                this.timer = 1;
                window.setTimeout(() => {
                    this.onResize(true);
                }, 100);
                window.setTimeout(() => {
                    this.onResize(true);
                    this.timer = 0;
                }, 200);
            }    
        }
    }
    
    get getStyle(): any {
        return {
            "padding": this.data.padding || this.getPadding() + "px"
        }
    }
}
