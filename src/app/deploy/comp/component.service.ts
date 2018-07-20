import { Type, Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { PlaceHolderComponent } from './place-holder/place-holder.component'
import { DeployNode } from './comp';
import { BaseComponent, ComponentServiceI } from './base/base.component';
import { RootComponent } from './root/root.component';
import { RowThreeComponent } from './row-three/row-three.component';
import { BackgroundComponent } from './background/background.component';
import { ScrolleableComponent } from './scrolleable/scrolleable.component';
import { VideoComponent } from './video/video.component';
import { MarkDownComponent } from './markdown/markdown.component';
import { MenuComponent } from './menu/menu.component';
import { SectionComponent } from './section/section.component';
import { FloatComponent } from './float/float.component';
import { AlbumComponent } from './album/album.component';
import { SlotComponent } from './slot/slot.component';



interface ComponentMap {
    [key: string]: Type<BaseComponent>;
}

@Injectable({
    providedIn: 'root'
})
export class ComponentService implements ComponentServiceI {
    components: ComponentMap;

    constructor(private cfResolver: ComponentFactoryResolver) {
        this.components = {
            "root": RootComponent,
            "place-holder": PlaceHolderComponent,
            "row-three": RowThreeComponent,
            "background": BackgroundComponent,
            "scrolleable": ScrolleableComponent,
            "video": VideoComponent,
            "markdown": MarkDownComponent,
            "menu": MenuComponent,
            "section": SectionComponent,
            "float": FloatComponent,
            "album": AlbumComponent,
            "slot": SlotComponent
        };
    }

    createAndDeployTree(object:{deploy:any}, view:ViewContainerRef) {
        console.log("createAndDeployTree()", [object]);
        console.assert(typeof object.deploy != "undefined", "ERROR: missing object.deploy", [object]);
        let structure: DeployNode = this.createDeployTree(object.deploy);
        let compFactory = this.cfResolver.resolveComponentFactory(structure.component);
        let compRef = view.createComponent(compFactory);
        let instance: BaseComponent = (<BaseComponent>compRef.instance);
        instance.setComponentService(this);
        instance.loadStructure(structure);
    }

    public createDeployTree(struct:{comp:string,children?:any[],data?:any}):DeployNode {
        console.log("createDeployTree()", [struct]);
        console.assert(typeof struct.comp != "undefined", "ERROR: missing structure.comp", [struct]);
        console.assert(typeof this.components[struct.comp] != "undefined", "ERROR: struct.comp? component not found", [struct], "did you forgot to include in this.components?", this.components);
        let type: Type<BaseComponent> = this.components[struct.comp];
        let depth:any[] = struct.children || [];
        let data = struct.data || {};

        let children: DeployNode[] = [];
        for (let i in depth) {
            let child: DeployNode = this.createDeployTree(depth[i]);
            children.push(child);
        }
        return new DeployNode(type, data, children);
    }

    public static getConfig(): any {
        return {

        }
    }
}