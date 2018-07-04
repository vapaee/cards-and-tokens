import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DomService } from './dom.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

export interface Todo {
    title: string;
    description: string;
    done: boolean;
}

export interface Device {big?:boolean, small?:boolean, tiny?:boolean, portrait?:boolean, wide?:boolean, height?:number, width?: number}

@Injectable({
    providedIn: 'root'
})
export class CntService {
    public ready: boolean = false;
    public waitReady: Promise<void> = null;
    public cards: any[];
    public deploy: any;
    public device: Device;

    constructor(private http: HttpClient, private data: DataService, private dom: DomService, public sanitizer: DomSanitizer) {
        this.cards = [];
        this.ready = false;
    }

    init(dev:Device) {
        this.device = dev;
        if (!this.ready) {
            this.waitReady = new Promise((resolve, reject) => {
                this.dom.appendComponentToBody(CardDeploy);
                this.ready = true;
                resolve();
            });    
        }
        return this.waitReady;
    }

    fetchCard(slug:string) {
        return new Promise<any>((resolve, reject) => {
            // resolve(this.test_scroll);
            // resolve(this.test_vslugeo);
            // resolve(this.test_md);
            // resolve(this.test_menu);
            if (slug.substr(0,4) == "test") {
                var file = "./assets/cards/" + slug + ".json";
                this.getJSON(file).then(data => {
                    resolve(data);
                }).catch(er => {
                    console.error("ERROR: file not found: " + file);
                });
            } else {
                this.data.select("card", {
                    slug:slug
                }, {
                    details:true
                }).then(data => {
                    console.assert(Array.isArray(data.card), <string>data.card);
                    var list: any[] = <any[]>data.card;
                    if (list.length == 1) {
                        resolve(list[0]);
                    } else {
                        reject();
                    }
                }).catch(er => {
                    console.error("ERROR: ", er);
                });
            }
        });
    }

    getAllCards() {
        this.data.getAll("card").then(result => {
            this.cards = <any[]>(<any>result).card;
            return this.cards;
        });
    }

    public getJSON(file) {
        console.log("getJSON()", file);
        return this.http.get(file).toPromise();
    }

    timers:any[] = [0,0,0,0,0,0,0,0];
    deployCard(slug, img:HTMLImageElement) {
        /*
        en esta función ya se podría conseguir una instancia del objeto DOM de la carta clickeada. Usando primitivas de construcción de tags podríamos crear un objeto auxiliar para clonar la carta y moverla por la pantalla. También crear un iframe oculto con la url deploy de la carta en cuestión
        Taría bueno traer todo lo ya hecho para la landing page
        */
       
        this.waitReady.then(() => {
            this.fetchCard(slug).then(card => {
                this.deploy = card;
                this.deploy.style = {
                    /*
                    "top": (this.device.height*0.45) + "px",
                    "left": (this.device.width*0.45) + "px",
                    "bottom": (this.device.height*0.45) + "px",
                    "right": (this.device.width*0.45) + "px",
                    "position": "fixed",
                    "display": "block",
                    "opacity": "0",
                    "background-color": "#131313",
                    "transition-duration": "1s",
                    "transition-property": "all",
                    "transition-timing-function": "ease-in-out"
                    */
                };
                
                this.deploy.closebtn = {};
                this.deploy.closebtn.style = {
                    "z-index": "9",
                    "top": "2px",
                    "right": "0px",
                    "position": "fixed",
                    "display": "block",
                    "opacity": "0",
                    "transition-duration": "1s",
                    "transition-property": "opacity",
                    "transition-timing-function": "ease-in-out"
                }

                this.deploy.front = {};
                this.deploy.front.style = {
                    "z-index": "11",
                    "top": img.offsetTop + "px",
                    "left": img.offsetLeft + "px",
                    "height": img.offsetHeight + "px",
                    "width": img.offsetWidth + "px",
                    "position": "fixed",
                    "display": "block",
                    "background-size": "contain",
                    "background-image": "url("+card.images.fullsize+"), url("+card.images.thumbnail+")",
                    "transition-duration": "1s",
                    "transition-property": "top left height width",
                    "transition-timing-function": "ease-in-out"
                };

                this.deploy.body = {};
                this.deploy.body.style = {
                    "z-index": "8",
                    "top": (this.device.height*0.45) + "px",
                    "left": (this.device.width*0.45) + "px",
                    "bottom": (this.device.height*0.45) + "px",
                    "right": (this.device.width*0.45) + "px",
                    "position": "fixed",
                    "display": "block",
                    "opacity": "0",
                    "background-color": "#131313",
                    "transition-duration": "1s",
                    "transition-property": "top left height width opacity",
                    "transition-timing-function": "ease-in-out"
                };
                this.deploy.frame = {
                    src: null
                };
                this.deploy.frame.style = {
                    "z-index": "10",
                    "top": "30px",
                    "left": "30px",
                    "bottom": "30px",
                    "right": "30px",
                    "width": "auto",
                    "position": "absolute",
                    "opacity":0,
                    "transition-duration": "1s",
                    "transition-property": "opacity",
                    "transition-timing-function": "ease-in-out"                    
                }


                this.timers[0] = setTimeout(() => {
                    // 370 520
                    var W = 370;
                    var H = 520;
                    this.deploy.front.style.top = (this.device.height-H)*0.5 + "px";
                    this.deploy.front.style.left = (this.device.width-W)*0.5 + "px";
                    this.deploy.front.style.height = H + "px";
                    this.deploy.front.style.width = W + "px";
                }, 10);
    
                this.timers[1] = setTimeout(() => {
                    // ponemos visible detrás de la carta #helper el card visionarios bien chiquito.
                    this.deploy.body.style.opacity = 1;
                    this.deploy.body.style.display = "block";
                }, 1000);
                this.timers[2] = setTimeout(() => {
                    this.deploy.body.style.left = "0px";
                    this.deploy.body.style.right = "0px";
                }, 1020);
                
                this.timers[3] = setTimeout(() => {
                    this.deploy.body.style.top = "0px";
                    this.deploy.body.style.bottom = "0px";
                    
                    var W = 370*0.5;
                    var H = 520*0.5;
    
                    this.deploy.front.style.top = (this.device.height-H-10) + "px";
                    this.deploy.front.style.left = (this.device.width-W-10) + "px";
                    this.deploy.front.style.height = H + "px";
                    this.deploy.front.style.width = W + "px";
                }, 2000);
    
                this.timers[4] = setTimeout(() => {
                    var src = window.location.origin + "/deploy/" + slug;
                    var safeUrl:SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
                    this.deploy.frame.src = safeUrl;
                    // console.log("---->", this.deploy.frame.src);
                    this.deploy.frame.style.opacity = 1;
                    this.deploy.closebtn.style.opacity = 1;
                    // createStatsHeader(carta.attr("id"));
                }, 3000);
                
                this.deploy.prevhref = window.location.href;
                window.history.pushState({}, "", window.location.origin + "/deploycard/" + slug);

            });

        });
    }

    closeCard() {
        window.history.pushState({}, "", this.deploy.prevhref);
        this.deploy = null;
    }

}


@Component({
    selector: 'card-deploy',
    template: `
    <div *ngIf="cnt.deploy" [ngStyle]="cnt.deploy.style">
        <div class="body" [ngStyle]="cnt.deploy.body.style">
            <div class="contenedor embed-responsive" [ngStyle]="cnt.deploy.frame.style">
                <iframe [src]="cnt.deploy.frame.src" class="embed-responsive-item"></iframe>
            </div>
        </div>
        <div class="close-cross cursor-pointer" (click)="close()" [ngStyle]="cnt.deploy.closebtn.style">
            <img src="/assets/btn-close.png" />
        </div>
        <card-front [ngStyle]="cnt.deploy.front.style">
            
        </card-front>
    </div>`
  })
export class CardDeploy {
    constructor(public cnt:CntService) {

    }

    close() {
        this.cnt.closeCard();
    }
}