import { Type, Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[comp-host]'
})
export class ComponentHost {
    constructor(public view: ViewContainerRef) { }
}

// class DeployNode ---------------------------------------------
// contenedor de datos
export class DeployNode {
    constructor(public comp:string, public component: Type<any>, public data: any, public children: DeployNode[]) {}
}
