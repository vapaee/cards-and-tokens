import { Component, OnInit, QueryList, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../../../services/vapaee-user.service";
import { AppService } from "../../../services/app.service";
import { CntService } from "../../../services/cnt.service";
import { AbstractDeployComponent, DeployNode, ComponentHost } from "../comp";

@Component({
    selector: 'base-comp',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
    @ViewChildren(ComponentHost) hosts: QueryList<ComponentHost>;
    data:any = {};
    initResolve:(value?:void) => void;

    public afterReady: Promise<void> = null;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.afterReady = new Promise((resolve) => {
            this.initResolve = resolve;
        });
    }

    ngOnInit() {
        this.initResolve();
    }

    loadStructure(structure: DeployNode) {
        console.log("BaseComponent,loadStructure() ------------>", structure);
        this.data = structure.data;
        this.afterReady.then(() => {
            console.assert(this.hosts.length == structure.children.length, "ERROR: wrong structure children length. Expected ", this.hosts.length);
            for (let i in structure.children) {
                let child = structure.children[i];
                let host = this.hosts.toArray()[i];
                console.log("BaseComponent,loadStructure() child:", child);
                console.log("BaseComponent,loadStructure() host:", host);
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(child.component);
                let componentRef = host.view.createComponent(componentFactory);
                (<BaseComponent>componentRef.instance).loadStructure(child);
            }    
        });
    }

}
