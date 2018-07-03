import { Type, Injectable } from '@angular/core';
import { PlaceHolderComponent } from './place-holder/place-holder.component'
import { DeployNode } from './comp';
import { BaseComponent } from './base/base.component';
import { RootComponent } from './root/root.component';
import { RowThreeComponent } from './row-three/row-three.component';
import { BackgroundComponent } from './background/background.component';
import { ScrolleableComponent } from './scrolleable/scrolleable.component';
import { VideoComponent } from './video/video.component';
import { MarkDownComponent } from './markdown/markdown.component';
import { MenuComponent } from './menu/menu.component';
import { SectionComponent } from './section/section.component';
import { FloatComponent } from './float/float.component';



interface ComponentMap {
    [key: string]: Type<BaseComponent>;
}

@Injectable({
    providedIn: 'root'
})
export class ComponentService {
    components: ComponentMap;

    constructor() {
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
            "float": FloatComponent
        };
    }

    createDeployTree(card:any){
        console.log("createDeployTree()", [card]);
        console.assert(typeof card.deploy != "undefined", "ERROR: missing card.deploy", [card]);
        return this.deployTree(card.deploy);
    }

    private deployTree(struct:any) {
        console.log("deployTree()", [struct]);
        console.assert(typeof struct.comp != "undefined", "ERROR: missing structure.comp", [struct]);
        console.assert(typeof this.components[struct.comp] != "undefined", "ERROR: struct.comp? component not found", [struct]);
        let type: Type<BaseComponent> = this.components[struct.comp];
        let depth:any[] = struct.children || [];
        let data = struct.data || {};

        let children: DeployNode[] = [];
        for (let i in depth) {
            let child: DeployNode = this.deployTree(depth[i]);
            children.push(child);
        }
        return new DeployNode(type, data, children);
    }

    public static getConfig(): any {
        return {

        }
    }
}