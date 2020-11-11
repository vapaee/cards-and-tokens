import { Component, OnInit, QueryList, ViewChildren, ComponentFactoryResolver, Input } from '@angular/core';
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
    @Input() data: any;
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
        this.data = structure.data;
        this.children = structure.children;
        this.loadedResolve();
        // console.log("loadStructure()", structure.comp, this.children.length);
        return this.waitReady.then(() => {
            console.assert(this.hosts.length >= this.children.length || this.data.reusehost,
                "ERROR: wrong structure children length. Expected ",
                this.hosts.length,
                "got ",
                this.children.length,
                this.children);
            var promises = [];
            // console.log("loadStructure() children", structure.comp, this.children.length);
            for (let i in this.children) {
                let child = this.children[i];
                let hostarray = this.hosts.toArray();
                // ---------------------------
                // para usar la capacidad de poner más de un hijo en el mismo host incluirlo en la data programáticamente así:
                // "data": Object.assign({reusehost:true}, obj.data),
                let host = hostarray[0];
                if (!this.data.reusehost) {
                    host = hostarray[i];
                }
                // ---------------------------
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(child.component);
                let componentRef = host.view.createComponent(componentFactory);
                let instance: BaseComponent= <BaseComponent>componentRef.instance;
                instance.setComponentService(this.service);
                promises.push(instance.loadStructure(child));
            }

            return Promise.all(promises);
        });
    }

}
