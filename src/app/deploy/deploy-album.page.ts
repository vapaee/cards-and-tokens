import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../services/container.service';


@Component({
    selector: 'deploy-album-page',
    templateUrl: './deploy-album.page.html',
    styleUrls: ['./deploy-album.page.scss']
})
export class DeployAlbumPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService, 
        public comp: ComponentService,
        private route: ActivatedRoute,
        private containers: ContainerService
    ) {
    }

    ngOnInit() {

        var slug = this.route.snapshot.paramMap.get('slug');
        this.cnt.fetchAlbum(slug).then(album => {
            this.comp.createAndDeployTree(album, this.main.view);
            
            this.cnt.getUserAlbumCollection(slug).then(collection => {
                this.containers.setContent(slug, collection.structure);
            });

            this.cnt.getUserInventory("cards-and-tokens").then(collection => {
                this.containers.setContent("cards-and-tokens", collection.structure);
            });
        });
    }

}
