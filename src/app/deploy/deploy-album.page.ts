import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { AlbumService } from './comp/album/album.service';


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
        private album: AlbumService
    ) {
    }

    ngOnInit() {

        var slug = this.route.snapshot.paramMap.get('slug');
        this.cnt.fetchAlbum(slug).then(album => {
            this.comp.createAndDeployTree(album, this.main.view);
            
            this.cnt.getUserAlbumCollection(slug).then(collection => {
                console.log("--------------------------");
                console.log(collection.structure);
                this.album.setCollection(collection.structure);


                /*
                - primero no se bien de donde sacar el dato. Si de userdata o de cnt
                - tengo que resolver una estructura que me diga en que slot hay una carta y cual
                - tengo que usar el servicio AlbumService para que cargue la estructura con carta
                */
            })
        });
    }

}
