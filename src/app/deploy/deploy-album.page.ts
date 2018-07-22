import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from '../services/userdata.service';


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
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        var slug = this.route.snapshot.paramMap.get('slug');
        console.log("*********************************************");
        console.log("slug:",slug);
        console.log("*********************************************");

        this.cnt.fetchAlbum(slug).then(album => {
            this.comp.createAndDeployTree(album, this.main.view);
            
            this.cnt.getUserAlbumCollection(slug).then(collection => {
                console.log("this.cnt.getUserAlbumCollection() AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", collection);
                /*
                - primero no se bien de donde sacar el dato. Si de userdata o de cnt
                - tengo que resolver una estructura que me diga en que slot hay una carta y cual
                - tengo que usar el servicio AlbumService para que cargue la estructura con cartas
                
                */

            })
        });
    }

}
