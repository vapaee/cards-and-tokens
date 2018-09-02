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
    // slots: any[];

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
                this.cnt.getAlbumCompleteBySlug(slug).then(album => {
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
        // console.log("AlbumsPage.deployAlbum()", [album]);
        var src = '/embedded/album/' + album.slug + "?ignore_foreign=true";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        
        this.deploy = album;

        if (this.main) {
            this.comp.createAndDeployTree(album, this.main.view);
        }
        
    }

    getAlbumUrl() {
        return this.url
    }
    
}
