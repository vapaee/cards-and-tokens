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
            // resolve(this.test_scroll);
            // resolve(this.test_video);
            resolve(this.test_md);
        });
    }

    public test_scroll = {
        comp:"root",
        children: [{
            comp:"row-three",
            data: {
                "header": { "min-height": "10vh" },
                "footer": { "min-height": "6vh" },
            },
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
    };

    public test_video = {
        comp:"root",
        children: [{
            comp:"row-three",
            data: {
                "header": { "min-height": "10vh" },
                "footer": { "min-height": "6vh" },
            },
            children: [
                {
                    comp: "background",
                    data: {
                        "color":"#2A247B",
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
                    comp: "video",
                    data: {
                        youtube: {
                            videoId: "Y0MuVQV0W0w",
                            autoplay: false
                        }
                    }
                },
                {
                    comp: "background",
                    data: { "color": "darkgreen" },
                    children: [ { comp: "place-holder", data:{text:"footer"} } ]
                }
            ]
        }]
    };

    public test_md = {
        comp:"root",
        children: [{
            comp:"row-three",
            data: {
                "header": { "min-height": "10vh" },
                "footer": { "min-height": "6vh" },
            },
            children: [
                {
                    comp: "background",
                    data: { "color":"#2A247B" }                    
                },
                {
                    comp: "markdown",
                    data: {
                        markdown: "# Markdown\n```typescript\n   const myProp: string = 'value';\n```\n"
                    }
                },
                {
                    comp: "background",
                    data: { "color": "darkblue" }
                }
            ]
        }]
    };    
}