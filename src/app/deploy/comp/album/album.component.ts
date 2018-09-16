import { Component, OnInit, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { DeployNode } from '../comp';
import { SectionI } from '../section/section.component';
import { ContainerCtrl } from '../../../services/datatypes.service';
import { LabelService } from '../label/label.service';
import { AnalyticsService } from '../../../services/analytics.service';

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
        private labels: LabelService,
        private analytics: AnalyticsService
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
        this.analytics.sendPageView(window.location.href + "#page-0");
    }

    public static config(): any {
        return {

        };
    }

    protected prepareData(structure: DeployNode) {
        // console.log("AlbumComponent.prepareData()", structure);
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
            this.data.pages[i].slots = this.data.pages[i].slots || [];
            pages.push(this.data.pages[i].slots.length);
            var child = this.service.createDeployTree(this.createPageChild(page));
            this.children.push(child);
        }

        this.labels.setLabel("album-name", this.data.title);
        // this.labels.setLabel("album-ranking","Ranking: 123");
        // this.labels.setLabel("album-points","Points: 21");

        this.cnt.getAlbumCollectionBySlug(this.data.name).then(collection => {
            // console.log("this.cnt.getAlbumCollectionBySlug() -> ", collection);
            this.labels.setLabel("album-ranking","Ranking: " + collection.position);
            this.labels.setLabel("album-points","Points: " + collection.points);
            this.cnt.getCollectionStats(collection.id).then(new_coll => {
                this.labels.setLabel("album-ranking","Ranking: " + new_coll.position);
                this.labels.setLabel("album-points","Points: " + new_coll.points);    
                // console.log("this.cnt.updateCollectionSteemPoints() -> ", new_coll, " !!!!!!!");
                if (collection.points != new_coll.points) {
                    // console.log("CAMBIARON??? Que pasó con la posición??  -->", new_coll.position);
                }
            });
        });
        
        return {pages:pages, pageslist:pageslist};
    }

    protected registerAndLoad(pages:number[], pageslist: any[]) {
        this.section.registerSection(this.data.name, pageslist, this);
        this.loadedResolve();
        this.section.setSection(this.data.name, this.data.current);
        delete this.data.current;
    }
    
    loadStructure(structure: DeployNode) {
        // console.log("loadStructure()", structure);
        var data = this.prepareData(structure);
        this.registerAndLoad(data.pages, data.pageslist);
        return Promise.resolve(<any[]>[]);
    }

    createPageChild(page: {slots:{position?:any, dark?:boolean}[], background:any}): {comp: string, data?: any, children?: any[]} {
        // console.log("createPageChild()", page);
        let _children:any[] = [];
        let _positions:any[] = [];
        let _slot:number = 0;
        for (let i=0; i<page.slots.length; i++, this.capacity++) {
            // console.log("this.capacity", this.capacity);
            let position = page.slots[i].position;
            let dark = page.slots[i].dark;
            position["width"] = "15%";
            position["max-width"] = "140px";
            let _child = {
                "comp": "slot",
                "data": {
                    "position": position,
                    "index": this.capacity,
                    "container": this.data.name,
                    "dark": dark
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
    current:any;
    public setSection(current: string) {
        // console.log("AlbumComponent.setSection()", current, this.data);
        this.waitReady.then(() => {
            var num = parseInt(current.substr(5));
            // console.log("parseInt(current.substr(5))", current.substr(5), num);
            let child = this.children[num];
            let host = this.hosts.toArray()[0];
            if (host.view.length == 1) {
                this.renderer.removeClass(this.current, 'animated');
                this.getOutPage(this.current);
            }
            if (host.view.length > 0) {
                window.setTimeout(() => {
                    if (host.view.length > 1) {
                        host.view.remove(0);
                    }
                }, 900);
            }

            let componentFactory = this.cfResolver.resolveComponentFactory(child.component);
            let componentRef = host.view.createComponent(componentFactory);
            (<BaseComponent>componentRef.instance).loadStructure(child);
        
            // tomamos el componente background-comp y le seteamos la clase float para que quede con position absolute
            this.current = this.elRef.nativeElement.querySelector(".embed-responsive background-comp:not(.float)");
            this.getInPage(this.current);
            this.renderer.addClass(this.current, 'float');
            
            var num = parseInt(current.split("-")[1]);
            
            this.labels.setLabel("album-page-title",this.data.pages[num].title);
            this.labels.setLabel("album-current-page","pag " + num);

            this.analytics.sendPageView(window.location.href + "#page-"+num);
        });
    }

    getOutPage(target) {
        var firstChild = this.current.children[0];
        if (this.section.sections[this.data.name].difference > 0) {
            this.renderer.addClass(firstChild, 'fadeOutLeft');
            this.renderer.addClass(firstChild, 'animated');
        } else if (this.section.sections[this.data.name].difference < 0) {
            this.renderer.addClass(firstChild, 'fadeOutRight');
            this.renderer.addClass(firstChild, 'animated');
        }
    }    

    getInPage(target) {
        var firstChild = this.current.children[0];
        if (this.section.sections[this.data.name].difference > 0) {
            this.renderer.addClass(firstChild, 'fadeInRight');
            this.renderer.addClass(firstChild, 'animated');
        } else if (this.section.sections[this.data.name].difference < 0) {
            this.renderer.addClass(firstChild, 'fadeInLeft');
            this.renderer.addClass(firstChild, 'animated');
        }
    }

    getPadding() {
        return 20;
    }

    timer:number = 0;
    onResize(skip = false) {
        // console.log("AlbumComponent.onResize() ******************************");
        var target = this.elRef.nativeElement.querySelector(".embed-responsive");
        var ratio = 16/9;
        var maxHeight = this.elRef.nativeElement.offsetHeight - 2 * this.getPadding();
        var maxWidth = maxHeight * ratio;
        // console.log(this.elRef.nativeElement.offsetHeight, maxWidth, this.elRef.nativeElement);
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
