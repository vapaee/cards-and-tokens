import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ComponentService } from '../../deploy/comp/component.service';
import { ComponentHost } from '../../deploy/comp/comp';

@Component({
    selector: 'albums-page',
    templateUrl: './albums.page.html',
    styleUrls: ['./albums.page.scss']
})
export class AlbumsPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;
    initResolve:(value?:void) => void;
    public waitInit: Promise<void> = null;
    public deploy: any = null;
    url: SafeResourceUrl;
    slots: any[];

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService,
        private cnt: CntService,
        private route: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public comp: ComponentService
    ) {
        this.cnt.getAllAlbums().then(e => {
            var slug = this.route.snapshot.paramMap.get('slug');
            if (slug) {
                this.cnt.getAlbumBySlug(slug).then(album => {
                    this.waitInit.then(() => {
                        this.deployAlbum(album);
                    });
                });    
            }
        });

        this.waitInit = new Promise((resolve) => {
            this.initResolve = resolve;
        });        
    }

    ngOnInit() {
        this.initResolve();


    }

    deployAlbum(album) {
        console.log("AlbumsPage.deployAlbum()", [album]);
        var src = '/embedded/album/' + album.slug + "?ignore_foreign=true";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        
        this.deploy = album;

        this.comp.createAndDeployTree(album, this.main.view).then(() => {
            /*
            this.cnt.getUserAlbumCollection(album.slug).then(collection => {
                this.containers.setContent(album.slug, collection.container_id, collection.slots);
            });
            
            this.cnt.getUserInventory("cards-and-tokens").then(inventory => {
                this.containers.setContent("cards-and-tokens", inventory.container_id, inventory.slots);
            });
            */
        });
        this.slots = [];
        var inventory_name = "cards-and-tokens";
        this.cnt.getUserInventory(inventory_name).then(inventory => {
            // acá puedo consultar la capacidad total (por si en algún momento tiene más de 8)
            // console.log(this.cnt.userdata.data.slug.container[inventory_name].capacity);    
            for (var i=0;i<Math.min(10, this.cnt.userdata.data.slug.container[inventory_name].capacity); i++) {
                this.slots.push({
                    "index": i, "container": inventory_name
                });
            }            
        }, e => {
            console.log("this.cnt.getUserInventory() no hay data");
        });        
    }

    getAlbumUrl() {
        return this.url
    }
    
}
