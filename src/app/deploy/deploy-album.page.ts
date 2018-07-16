import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { DeployNode, ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { BaseComponent } from './comp/base/base.component';
import { ActivatedRoute } from '@angular/router';


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
        private cfResolver: ComponentFactoryResolver,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        var slug = this.route.snapshot.paramMap.get('slug');

        this.cnt.fetchAlbum(slug).then(album => {
            this.comp.createAndDeployTree(album, this.main.view);
        });
    }

}
