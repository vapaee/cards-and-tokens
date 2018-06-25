import { Component, OnInit } from '@angular/core';
import { AbstractDeployComponent, DeployNode, ComponentHost } from "../comp";

@Component({
    selector: 'test-video',
    templateUrl: './test-video.component.html',
    styleUrls: ['./test-video.component.css']
})
export class TestVideoComponent implements OnInit, AbstractDeployComponent {
    data:any = {};
    constructor() { }

    ngOnInit() {
    }

    loadStructure(structure: DeployNode) {
        console.log("TestVideoComponent,loadStructure() ------------>", structure);
        this.data = structure.data;
    }

}
