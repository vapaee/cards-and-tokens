import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { DeployNode } from '../comp';
import { SectionI } from '../section/section.component';
import { AlbumService } from './album.service';


export interface AlbumI {
    // API
    // 
}

@Component({
    selector: 'album-comp',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends BaseComponent implements OnInit, SectionI, AlbumI {

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private section: SectionService,
        private albums: AlbumService
    ) {
        super(vapaee, app, cnt, cfResolver);
    }

    public static config(): any {
        return {

        };
    }
    
    loadStructure(structure: DeployNode) {
        console.log("loadStructure()", structure);
        this.data = structure.data;
        this.children = [];
        console.assert(Array.isArray(this.data.pages), "ERROR: Section data.pages missing or is not an Array. Got ", typeof this.data.pages, this.data.pages);
        this.data.current = "page-0";
        this.data.name = "album";
        var pageslist = [];

        for (var i in this.data.pages) {
            pageslist.push("page-" + i);
            var page = this.data.pages[i];
            var child = this.service.createDeployTree({
                "comp":"background", "data": page.background
            });
            this.children.push(child);
        }

        this.albums.registerAlbum(this);
        this.section.registerSection(this.data.name, this.data.current, pageslist, this);
        this.loadedResolve();
        this.section.setSection(this.data.name, this.data.current);
    }

    // invocado por SectionService cuando alguien cambia la sección actual.
    public setSection(current: string) {
        this.waitReady.then(() => {
            var num = parseInt(current.substr(5));
            console.log("parseInt(current.substr(5))", current.substr(5), num);
            let child = this.children[num];
            let host = this.hosts.toArray()[0];
            console.error("Hay que generar una animación (movimiento horizontal + fadeout) 2s y luego recién sacar la página");
            while (host.view.length > 0) {
                host.view.remove(host.view.length-1);
            }
            
            let componentFactory = this.cfResolver.resolveComponentFactory(child.component);
            let componentRef = host.view.createComponent(componentFactory);
            (<BaseComponent>componentRef.instance).loadStructure(child);
        });
    }    
}
