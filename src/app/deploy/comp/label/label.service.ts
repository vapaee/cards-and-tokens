import { Injectable, Type } from '@angular/core';

interface SectionMap {
    [key: string]: string;
}

@Injectable({
    providedIn: 'root'
})
export class LabelService {
    public labels: SectionMap;
    // public difference: number; // cada vez que cambia la sección, difference indica la diferencia entre el índice anterior y el actual
    constructor() {
        this.labels = {};
    }

    public setLabel(name: string, current: string) {
        if (current == this.labels[name]) return;
        this.labels[name] = current;
    }

    public getLabel(name: string): string {
        return this.labels[name] || "";
    }
}
