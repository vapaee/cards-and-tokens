import { Component, ViewChild, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { CntService } from '../../services/cnt.service';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'albums-page',
    templateUrl: './albums.page.html',
    styleUrls: ['./albums.page.scss']
})
export class AlbumsPage implements OnInit {
    initResolve:(value?:void) => void;
    public waitInit: Promise<void> = null;
    public deploy: any = null;
    url: SafeResourceUrl;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService,
        private cnt: CntService,
        private route: ActivatedRoute,
        public sanitizer: DomSanitizer
    ) {
        this.cnt.getAllAlbums().then(e => {
            var slug = this.route.snapshot.paramMap.get('slug');
            if (slug) {
                this.cnt.getAlbumBySlug(slug).then(album => {
                    this.waitInit.then(() => {
                        var src = '/embedded/album/' + album.slug + "?ignore_foreign=true";
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(src);
                        console.log(this.url, src);
                        this.deploy = album;
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

    deployAlbum(album, e) {
        var img:HTMLImageElement = e.target;
        this.cnt.deployAlbum(album, img);
    }

    getAlbumUrl() {
        return this.url
    }
    
}
