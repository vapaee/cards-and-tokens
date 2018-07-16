import { Component, OnInit, QueryList, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { VapaeeUserService } from "../../../services/vapaee-user.service";
import { AppService } from "../../../services/app.service";
import { CntService } from "../../../services/cnt.service";
import { DeployNode, ComponentHost } from "../comp";

/*
@Component({
    selector: 'base-comp',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
*/

export interface ComponentServiceI {
    createDeployTree(struct:{comp:string,children?:any[],data?:any}):DeployNode;
}

export class BaseComponent implements OnInit {
    @ViewChildren(ComponentHost) public hosts: QueryList<ComponentHost>;
    data:any = {};
    service:ComponentServiceI;
    children:any = [];
    initResolve:(value?:void) => void;
    loadedResolve:(value?:void) => void;

    public waitInit: Promise<void> = null;
    public waitLoaded: Promise<void> = null;
    public waitReady: Promise<void> = null;
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.waitInit = new Promise((resolve) => {
            this.initResolve = resolve;
        });
        this.waitLoaded = new Promise((resolve) => {
            this.loadedResolve = resolve;
        });
        this.waitReady = this.waitLoaded.then(() => this.waitInit);
    }

    ngOnInit() {
        this.initResolve();
    }

    setComponentService(_service:ComponentServiceI) {
        this.service = _service;
    }

    loadStructure(structure: DeployNode) {
        console.log("loadStructure()", structure);
        this.data = structure.data;
        this.children = structure.children;
        this.loadedResolve();
        this.waitReady.then(() => {
            console.assert(this.hosts.length >= structure.children.length, "ERROR: wrong structure children length. Expected ", this.hosts.length, "got ", structure.children.length);
            for (let i in structure.children) {
                let child = structure.children[i];
                let host = this.hosts.toArray()[i];
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(child.component);
                let componentRef = host.view.createComponent(componentFactory);
                let instance: BaseComponent= <BaseComponent>componentRef.instance;
                instance.setComponentService(this.service);
                instance.loadStructure(child);
            }    
        });
    }

}
