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
                comp:"root",
                children: [{
                    comp:"row-three",
                    children: [
                        {
                            comp: "background",
                            data: {"background-color": "blue"},
                            children: [ { comp: "place-holder", data:{text:"header"} } ]
                        },
                        { comp: "place-holder", data:{text:"main"}, },
                        { comp: "place-holder", data:{text:"footer"}, }
                    ]
                }]
            });
        });
    }
}
