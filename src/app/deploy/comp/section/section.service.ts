import { Injectable, Type } from '@angular/core';
import { SectionI } from './section.component';

interface SectionMap {
    [key: string]: {
        ctrl:SectionI,
        current:string
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

    public registerSection(name: string, current: string, section: SectionI) {
        this.sections[name] = {
            ctrl: section,
            current: current
        }
    }

    public setSection(name: string, current: string) {
        this.sections[name].current = current;
        this.sections[name].ctrl.setSection(current);
    }

    public getSection(name: string) {
        return this.sections[name];
    }
}
