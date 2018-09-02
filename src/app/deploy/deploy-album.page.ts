import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'deploy-album-page',
    templateUrl: './deploy-album.page.html',
    styleUrls: ['./deploy-album.page.scss']
})
export class DeployAlbumPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;
    loading:boolean;
    stable:boolean;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService, 
        private route: ActivatedRoute,
        public comp: ComponentService
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.stable = false;

        var slug = this.route.snapshot.paramMap.get('slug');
        if (slug) {
            this.cnt.fetchAlbum(slug).then(album => {
                this.comp.createAndDeployTree(album, this.main.view);
                this.preloadAlbum(album)
            }, e => {
                console.log("this.cnt.fetchAlbum(slug) no hay data");
            });    
        }
    }

    preloadAlbum(album:any) {
        return this.comp.preload(album.preload).then(() => {
            this.loading = false;
            window.setTimeout(() => {
                this.stable = true;
            }, 1000);            
        });
    }

    getLoadingClass() {
        var classes:any = {"deploy-card":true};
        if (this.loading) {
            classes.fadeOut = true;
        } else {
            classes.fadeIn = true;
        }
        return classes;
    }    

}
