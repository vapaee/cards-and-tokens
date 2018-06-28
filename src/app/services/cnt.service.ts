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
                            data: {
                                "image": {
                                    "url": "/assets/prueba.png",
                                    "position": "center", // "center" | "left" | "right" | "top" | "bottom"
                                    "repeat": "no-repeat", // "round" | "repeat" | "no-repeat",
                                    "size": "cover" // "contain" | "cover"
                                }
                            },
                            children: [ { comp: "place-holder", data:{text:"header"} } ]
                        },
                        {
                            comp: "scrolleable",
                            children: [ { comp: "place-holder", data: { text: "scrolleable", largetext: true, mediumtext: false }, } ]
                        },
                        {
                            comp: "background",
                            data: { "color": "darkgreen" },
                            children: [ { comp: "place-holder", data:{text:"footer"} } ]
                        }
                    ]
                }]
            });
        });
    }
}

/*
    "color": {
        ""
    },
    "image": {
        "url": "http://asdasdasd",
        "position": "center" | "left" | "right" | "top" | "bottom"
        "repeat": "round" | "repeat" | "no-repeat"
        "size": "contain" | "cover"
    },

*/