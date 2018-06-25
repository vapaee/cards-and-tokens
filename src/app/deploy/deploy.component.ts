import { Component, OnInit, ViewChild } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";
import { CntService } from "../services/cnt.service";
import { AbstractDeployComponent, DeployNode} from "./comp/comp";
import { ComponentService } from "./comp/component.service";


@Component({
    selector: 'app-deploy',
    templateUrl: './deploy.component.html',
    styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit {
    @ViewChild('main') public main: AbstractDeployComponent;

    constructor(public vapaee: VapaeeUserService, public app: AppService, public cnt: CntService, public comp: ComponentService) {
        
    }

    ngOnInit() {
        // this.cnt.afterReady.then(() => {})
        
        this.cnt.getStructure().then(struct => {
            console.log("struct", struct);
            let structure: DeployNode = this.comp.createDeployTree(struct);
            console.log("structure", structure);
            this.main.loadStructure(structure);
        });
        
    }

}
