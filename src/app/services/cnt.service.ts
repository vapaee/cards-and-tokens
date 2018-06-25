import { Injectable } from '@angular/core';

export interface Todo {
    title: string;
    description: string;
    done: boolean;
}

@Injectable()
export abstract class Dependencia {
    abstract getTodos(): Todo[];
}

@Injectable({
    providedIn: 'root'
})
export class CntService {
    public ready: boolean = false;
    public afterReady: Promise<void> = null;

    constructor() { }

    init(coso:Dependencia) {
        this.afterReady = new Promise((resolve, reject) => {
            resolve();
        });
    }

    getStructure() {
        return new Promise((resolve, reject) => {
            resolve({
                comp:1,
                data:{text:"1"},
                children: [
                    { comp: 2, data:{text:"1.1"}, },
                    {
                        comp:1,
                        data:{text:"1.2"},
                        children: [
                            { comp: 2, data:{text:"1.2.1"}, },
                            { comp: 2, data:{text:"1.2.2"}, }
                        ]
                    }
                ]
            });
        });
    }
}
