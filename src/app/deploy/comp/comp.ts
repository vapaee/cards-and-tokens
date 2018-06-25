import { Type, Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[comp-host]'
})
export class ComponentHost {
    constructor(public view: ViewContainerRef) { }
}

// Interface Comp ---------------------------------------------
// interface que deben implementar todos los componentes
export interface AbstractDeployComponent {
    data:any;
    loadStructure(structure: DeployNode)
}

// class DeployNode ---------------------------------------------
// contenedor de datos
export class DeployNode {
    constructor(public component: Type<any>, public data: any, public children: DeployNode[]) {}
}
