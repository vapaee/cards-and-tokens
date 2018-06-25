import { Component, OnInit, QueryList, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../../../services/vapaee-user.service";
import { AppService } from "../../../services/app.service";
import { CntService } from "../../../services/cnt.service";
import { AbstractDeployComponent, DeployNode, ComponentHost } from "../comp";

@Component({
    selector: 'test-comp',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AbstractDeployComponent {
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
        console.log("TestComponent,loadStructure() ------------>", structure);
        this.data = structure.data;
        this.afterReady.then(() => {
            console.assert(this.hosts.length == structure.children.length, "ERROR: wrong structure children length. Expected ", this.hosts.length);
            for (let i in structure.children) {
                let child = structure.children[i];
                let host = this.hosts.toArray()[i];
                console.log("TestComponent,loadStructure() child:", child);
                console.log("TestComponent,loadStructure() host:", host);
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(child.component);
                let componentRef = host.view.createComponent(componentFactory);
                (<AbstractDeployComponent>componentRef.instance).loadStructure(child);
            }    
        });
    }

}
