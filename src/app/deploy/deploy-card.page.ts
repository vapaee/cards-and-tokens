import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'deploy-card-page',
    templateUrl: './deploy-card.page.html',
    styleUrls: ['./deploy-card.page.scss']
})
export class DeployCardPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;
    loading: boolean;
    stable:boolean;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService, 
        public comp: ComponentService,
        private route: ActivatedRoute
    ) {
        this.loading = true;
        this.stable = false;
    }

    ngOnInit() {

        var slug = this.route.snapshot.paramMap.get('slug');
        // console.log("-- ETAPA 1 -- this.cnt.getCardBySlug()");
        this.cnt.getCardBySlug(slug).then(card => {
            // console.log("-- ETAPA 2 -- this.preloadCard()");
            this.preloadCard(card).then(() => {
                // console.log("-- ETAPA 3 -- this.comp.createAndDeployTree");
                this.comp.createAndDeployTree(card.edition, this.main.view);
            });
        });
    }

    preloadCard(card:any) {
        if (!card.edition) {
            console.log("--------- CARTA DE PRUEBA ----------"),
            card.edition = {deploy: card.deploy};
            this.loading = false;
            this.stable = true;
            return Promise.resolve();
        }
        return this.comp.preload(card.edition.preload).then(() => {
            this.loading = false;
            window.setTimeout(() => {
                this.stable = true;
            }, 1000);
        });
    }

    getLoadingClass() {
        var classes:any = {"deploy-container":true};
        if (this.loading) {
            classes.fadeOut = true;
        } else {
            classes.fadeIn = true;
        }
        return classes;
    }

}
