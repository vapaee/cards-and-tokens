import { Type, Injectable } from '@angular/core';
import { TestComponent } from './test/test.component';
import { TestVideoComponent } from './test-video/test-video.component';
import { AbstractDeployComponent, DeployNode } from './comp';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  components: Type<AbstractDeployComponent>[];

  constructor() {
      this.components = [
          TestComponent,
          TestVideoComponent
      ];
  }

  createDeployTree(struct:any) {
      console.assert(typeof struct.comp != "undefined", "ERROR: missing structure.comp", [struct]);
      console.assert(!isNaN(parseInt(struct.comp)), "ERROR: struct.comp not an integer", [struct]);
      let type: Type<AbstractDeployComponent> = this.components[parseInt(struct.comp)];
      let depth:any[] = struct.children || [];
      let data = struct.data || {};

      let children: DeployNode[] = [];
      for (let i in depth) {
          let child: DeployNode = this.createDeployTree(depth[i]);
          children.push(child);
      }
      return new DeployNode(type, data, children);
  }
}