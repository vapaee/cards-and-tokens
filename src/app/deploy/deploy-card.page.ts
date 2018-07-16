import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { DeployNode, ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { BaseComponent } from './comp/base/base.component';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'deploy-card-page',
    templateUrl: './deploy-card.page.html',
    styleUrls: ['./deploy-card.page.scss']
})
export class DeployCardPage implements OnInit {
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

        this.cnt.getCardBySlug(slug).then(card => {
            this.comp.createAndDeployTree(card, this.main.view);
            /*
            console.log("Deploying:", structure);
            let compFactory = this.cfResolver.resolveComponentFactory(structure.component);
            let compRef = this.main.view.createComponent(compFactory);
            (<BaseComponent>compRef.instance).loadStructure(structure);
            */
        });
    }

}
