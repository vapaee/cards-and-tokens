import { Injectable, Type } from '@angular/core';
import { SectionI } from './section.component';

interface SectionMap {
    [key: string]: {
        ctrl:SectionI,
        current:string,
        sections:string[],
        difference: number
    };
}

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    public sections: SectionMap;
    // public difference: number; // cada vez que cambia la sección, difference indica la diferencia entre el índice anterior y el actual
    constructor() {
        this.sections = {};
    }

    public registerSection(name: string, list: string[], section: SectionI) {
        this.sections[name] = {
            ctrl: section,
            current: "",
            sections: list,
            difference: 0
        }
    }

    public setSection(name: string, current: string) {
        if (current == this.sections[name].current) return;
        var index = 0;
        if (this.sections[name].current) {
            index = this.sections[name].sections.indexOf(this.sections[name].current);
        }
        var next = this.sections[name].sections.indexOf(current);
        this.sections[name].difference = next - index;
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public nextSection(name: string) {
        var index = this.sections[name].sections.indexOf(this.sections[name].current);
        if (index<this.sections[name].sections.length-1) {
            index++;
            this.sections[name].difference = 1;
        } else {
            return;
        }
        var current = this.sections[name].sections[index];
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public prevSection(name: string) {
        // console.log("prevSection");
        var index = this.sections[name].sections.indexOf(this.sections[name].current);
        if (index>0) {
            index--;
            this.sections[name].difference = -1;
        } else {
            return;
        }
        var current = this.sections[name].sections[index];
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public getSection(name: string) {
        return this.sections[name];
    }
}
