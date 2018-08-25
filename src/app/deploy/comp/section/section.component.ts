import { Component, OnInit, ComponentFactoryResolver, ViewChildren, QueryList } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from './section.service';
import { DeployNode, ComponentHost } from '../comp';

export interface SectionI {
    setSection(section:string);
}

@Component({
    selector: 'section-comp',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent extends BaseComponent implements OnInit, SectionI {
    // @ViewChildren(ComponentHost) public hosts: QueryList<ComponentHost>;

    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private section: SectionService
    ) {
        super(vapaee, app, cnt, cfResolver);
        this.init();
    }

    public init() {
    }

    public static config(): any {
        return {

        };
    }

    loadStructure(structure: DeployNode) {
        // console.log("loadStructure()", structure);
        this.data = structure.data;
        this.children = structure.children;
        console.assert(Array.isArray(this.data.sections), "ERROR: Section data.sections missing or is not an Array. Got ", typeof this.data.sections, this.data.sections);
        this.data.current = this.data.current || this.data.sections[0];
        this.section.registerSection(this.data.name, this.data.sections, this);
        this.loadedResolve();
        this.section.setSection(this.data.name, this.data.current);
        return Promise.resolve(<any[]>[]);
    }

    public setSection(current: string) {
        this.waitReady.then(() => {
            console.assert(Array.isArray(this.data.sections), "ERROR: Section data.sections missing or is not an Array. Got ", typeof this.data.sections, this.data.sections);
            let i = this.data.sections.indexOf(current);
            let child = this.children[i];
            let host = this.hosts.toArray()[0];
            while (host.view.length > 0) {
                host.view.remove(host.view.length-1);
            }
            let componentFactory = this.cfResolver.resolveComponentFactory(child.component);
            let componentRef = host.view.createComponent(componentFactory);
            (<BaseComponent>componentRef.instance).loadStructure(child);
        });
    }

}
