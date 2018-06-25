import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { DeployNode, ComponentHost} from "./comp/comp";
import { ComponentService } from "./comp/component.service";
import { BaseComponent } from './comp/base/base.component';


@Component({
    selector: 'app-deploy',
    templateUrl: './deploy.page.html',
    styleUrls: ['./deploy.page.css']
})
export class DeployPage implements OnInit {
    @ViewChild(ComponentHost) public main: ComponentHost;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService, 
        public comp: ComponentService, 
        private cfResolver: ComponentFactoryResolver
    ) {
    }

    ngOnInit() {
        this.cnt.getStructure().then(struct => {
            let structure: DeployNode = this.comp.createDeployTree(struct);
            console.log("Deploying:", structure);
            let compFactory = this.cfResolver.resolveComponentFactory(structure.component);
            let compRef = this.main.view.createComponent(compFactory);
            (<BaseComponent>compRef.instance).loadStructure(structure);
        });
    }

}
