import { Injectable, Type } from '@angular/core';
import { SectionI } from './section.component';

interface SectionMap {
    [key: string]: {
        ctrl:SectionI,
        current:string,
        sections:string[]
    };
}

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    sections: SectionMap;
    constructor() {
        this.sections = {};
    }

    public registerSection(name: string, current: string, list: string[], section: SectionI) {
        this.sections[name] = {
            ctrl: section,
            current: current,
            sections: list
        }
    }

    public setSection(name: string, current: string) {
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public nextSection(name: string) {
        var index = this.sections[name].sections.indexOf(this.sections[name].current)
        if (index<this.sections[name].sections.length-1) { index++; }
        var current = this.sections[name].sections[index];
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public prevSection(name: string) {
        var index = this.sections[name].sections.indexOf(this.sections[name].current)
        if (index>0) { index--; }
        var current = this.sections[name].sections[index];
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public getSection(name: string) {
        return this.sections[name];
    }
}
