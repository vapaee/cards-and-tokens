import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DomService } from './dom.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserdataService } from './userdata.service';
import { BgBoxService } from './bg-box.service';
import { AppService } from './app.service';

export interface Todo {
    title: string;
    description: string;
    done: boolean;
}

export interface Device {big?:boolean, small?:boolean, tiny?:boolean, portrait?:boolean, wide?:boolean, height?:number, width?: number}
interface AnyMap {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class CntService {
    public ready: boolean = false;
    public waitReady: Promise<void> = null;
    public waitData: Promise<void> = null;
    public cards: any[];
    public card: AnyMap;
    public albums: any[];
    public album: AnyMap;
    public specs: any[];
    public spec: AnyMap;
    public deploy: any;
    public device: Device;
    public user = {inventory:<any>{}};

    constructor(
        private http: HttpClient, 
        private data: DataService, 
        private dom: DomService, 
        public userdata: UserdataService,
        public sanitizer: DomSanitizer,
        public box: BgBoxService,
        public app: AppService

    ) {
        this.cards = [];
        this.card = {};
        this.albums = [];
        this.album = {};
        this.specs = [];
        this.spec = {};
        this.ready = false;
        this.getAllSpecs();
    }

    print(){
        console.log(this.userdata.data);
    }

    init(dev:Device) {
        this.device = dev;
        if (!this.ready) {
            this.waitReady = new Promise((resolve, reject) => {
                this.dom.appendComponentToBody(CardDeploy);
                this.ready = true;
                resolve();
            });
            this.waitData = new Promise((resolve, reject) => {
                this.userdata.afterReady.then(() => {
                    this.proccessData();
                    resolve();
                }, reject);
            });
        }
        return this.waitReady;
    }

    // ------------------------------------------------------------------------------------------
    // las siguientes funciones sirven para traer datos del usuario -----------------------------
    proccessData() {
        console.log('-------- userdata ----------');
        console.log(this.userdata.data);
        console.log('----------------------------');

        // Containers
        this.userdata.data.container = <any>{};
        for (let i in this.userdata.data.collection) {
            let col = this.userdata.data.collection[i];
            let album = this.userdata.data.album["id-"+col.album.id];
            col.album = album;
            this.userdata.data.container["id-"+col.id] = col;
        }
        for (let i in this.userdata.data.inventory) {
            let inv = this.userdata.data.inventory[i];
            this.userdata.data.container["id-"+inv.id] = inv;
        }
        for (let i in this.userdata.data.container) {
            let inv = this.userdata.data.container[i];
            inv.slots = <any[]>[];
        }

        // Items
        this.userdata.data.item = <any>{};
        for (let i in this.userdata.data.copy) {
            let col = this.userdata.data.copy[i];
            this.userdata.data.item["id-"+col.id] = col;
        }

        // Collectibles
        this.userdata.data.collectible = <any>{};
        for (var i in this.userdata.data.card) {
            var card = this.userdata.data.card[i];
            this.userdata.data.collectible["id-"+card.id] = card;
        }

        // Cards & editions
        for (let i in this.userdata.data.edition) {
            let edition = this.userdata.data.edition[i];
            let collectible = this.userdata.data.collectible["id-"+edition.collectible.id];
            if (collectible.edition.id == edition.id) {
                collectible.edition = edition;
            }
            collectible.editions = collectible.editions || {};
            collectible.editions["id-"+edition.id] = edition;
        }

        // put Inventory service in global variable user.inventory
        for (let i in this.userdata.data.inventory) {
            let inventory = this.userdata.data.inventory[i];
            let app = this.userdata.data.app["id-"+inventory.app.id];
            inventory.app = app;
            this.user.inventory = inventory;
        }

        for (var i in this.userdata.data.copy) {
            let copy = this.userdata.data.copy[i];
            let collectible = this.userdata.data.collectible["id-"+copy.collectible.id];
            let edition = this.userdata.data.edition["id-"+copy.edition.id];
            copy.collectible = collectible;
            copy.edition = edition;
            copy.thumbnail = copy.edition.preview.images.thumbnail;
        }

       
        for (var i in this.userdata.data.slot) {
            let slot = this.userdata.data.slot[i];
            let container = this.userdata.data.container["id-"+slot.container.id];
            let item = this.userdata.data.item["id-"+slot.item.id];
            slot.container = container;
            slot.item = item;
            slot.container.slots[slot.index] = slot;
            console.assert(slot.container.slots.length > slot.index, slot.container.slots);
        }

        //----- slug
        this.userdata.data.slug = <any>{};
        this.userdata.data.slug.container = <any>{};
        for (let i in this.userdata.data.collection) {
            let coll = this.userdata.data.collection[i];
            this.userdata.data.slug.container[coll.album.slug] = coll;
        }
        for (let i in this.userdata.data.inventory) {
            let inv = this.userdata.data.inventory[i];
            this.userdata.data.slug.container[inv.app.slug] = inv;
        }

        this.userdata.data.slug.collectible = <any>{};
        for (let i in this.userdata.data.collectible) {
            let coll = this.userdata.data.collectible[i];
            this.userdata.data.slug.collectible[coll.slug] = coll;
        }

        this.userdata.data.slug.publisher = <any>{};
        for (let i in this.userdata.data.publisher) {
            let pub = this.userdata.data.publisher[i];
            this.userdata.data.slug.publisher[pub.slug] = pub;
        }

         
    }

    getCopyById(id:number) {
        console.log("CntService.getCopyById()",id);
        return this.box.getCopyById(id).then(copy => {
            var collectible = this.userdata.data.collectible["id-"+copy.collectible.id];
            var edition = this.userdata.data.edition["id-"+copy.edition.id];
            return Object.assign({}, copy, {
                collectible: collectible,
                edition: edition
            });
        });
    }

    private swapLocaly(from:number, fromi:number, to:number, toi:number) {
        var slot_to = this.userdata.data.container["id-"+to].slots[toi];
        var slot_from = this.userdata.data.container["id-"+from].slots[fromi];
        delete this.userdata.data.container["id-"+to].slots[toi];
        delete this.userdata.data.container["id-"+from].slots[fromi];

        if (slot_from) {
            slot_from.container = this.userdata.data.container["id-"+to];
            slot_from.index = toi;
            slot_from.container.slots[slot_from.index] = slot_from;
        }

        if (slot_to) {
            slot_to.container = this.userdata.data.container["id-"+from];
            slot_to.index = fromi;
            slot_to.container.slots[slot_to.index] = slot_to;
        }
    }

    swapSlots(from_slug:string, fromi:number, to_slug:string, toi: number) {
        var from = this.userdata.data.slug.container[from_slug].id;
        var to = this.userdata.data.slug.container[to_slug].id;
        console.log("CntService.swapSlots() from (" + from_slug + "," + fromi + ") to (" + to_slug + "," + toi + ")");
        this.app.setLoading(true);

        this.swapLocaly(from, fromi, to, toi);

        return this.http.post<any>("//api.cardsandtokens.com/swap/slots?access_token="+this.userdata.access_token,{
            from:from, fromi:fromi, to:to, toi:toi
        }).toPromise().then((r) => {
            this.app.setLoading(false);
            if (r.error) {
                console.error(r);
                this.swapLocaly(to, toi, from, fromi);
            }
        }).catch((e) => {
            this.app.setLoading(false);
            this.swapLocaly(to, toi, from, fromi);
        });
    }

    claimDailyPrize() {
        return new Promise<any>((resolve, reject) => {
            console.log("CntService.getDailyPrize()");
            var url = "http://api.cardsandtokens.com/dailyprize/claim?access_token="+this.userdata.access_token;
            this.http.get<any>(url).toPromise().then((r) => {
                if (r.error) {
                    alert(r.error);
                    reject(r.error);
                    return;
                }
                
                this.userdata.data.slot["id-"+r.slot.id] = r.slot;
                this.userdata.data.copy["id-"+r.copy.id] = r.copy;
                this.userdata.data.card["id-"+r.card.id] = r.card;
                this.userdata.data.edition["id-"+r.edition.id] = r.edition;
                this.proccessData();
    
                this.getUserInventory("cards-and-tokens").then(inventory => {
                    resolve(inventory);
                });
                
            }, reject);
        });
    }

    getDailyPrizeCountdown() {
        return new Promise<any>((resolve, reject) => {
            this.userdata.afterReady.then(() => {
                this.userdata.data.dayliprice = {};
                console.log("CntService.getDailyPrize()");
                var url = "http://api.cardsandtokens.com/dailyprize/countdown?access_token="+this.userdata.access_token;
                this.http.get<any>(url).toPromise().then((r) => {
                    if (r.sec == 0) {
                        this.userdata.data.dayliprice.claimable = true;
                    } else {
                        this.userdata.data.dayliprice.remaining = r.sec;
                    }
                    resolve(r.sec);
                }, reject);
            });    
        });
    }
    //http://api.cardsandtokens.com/dailyprize?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJ2YXBhZWUiLCJ1c2VyIjoidml0ZXJibyIsInNjb3BlIjpbImxvZ2luIiwib2ZmbGluZSIsInZvdGUiLCJjb21tZW50IiwiZGVsZXRlX2NvbW1lbnQiLCJjb21tZW50X29wdGlvbnMiXSwiaWF0IjoxNTMzMjczODMyLCJleHAiOjE1MzM4Nzg2MzJ9.7oVE9obJJNb_g2WrWqn_xDOAfP7zRx7PNTPdR64juQg


    // ------------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------------
    // Las siguientes funciones sirven para traer datos para deployar cartas y álbumes (sin datos del usuario)
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
                    edition:true,
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

    fetchAlbum(slug:string) {
        return new Promise<any>((resolve, reject) => {
            this.data.select("album", {
                slug:slug
            }, {
                details:true
            }).then(data => {
                console.assert(Array.isArray(data.album), <string>data.album);
                var list: any[] = <any[]>data.album;
                if (list.length == 1) {
                    resolve(list[0]);
                } else {
                    reject();
                }
            }).catch(er => {
                console.error("ERROR: ", er);
            });
        });
    }
    
    getUserAlbumCollection(slug) {
        return this.userdata.afterReady.then(() => {
            if (this.userdata.logged) {
                for (let i in this.userdata.data.album) {
                    let album = this.userdata.data.album[i];
                    if (album.slug == slug) {
                        for (let i in this.userdata.data.collection) {
                            let coll = this.userdata.data.collection[i];
                            if (coll.album.id == album.id) {
                                coll.album = album;
                                return coll;
                            }
                        }
                        break;
                    }
                }
            }
            return {};
        });
    }
    
    getUserInventory(slug) {
        return this.userdata.afterReady.then(() => {
            if (this.userdata.logged) {
                for (let i in this.userdata.data.inventory) {
                    let inventory = this.userdata.data.inventory[i];
                    if (inventory.app.slug == slug) {
                        return inventory;
                    }
                }
            }
            return {};
        });
    }

    getAllInstances(table, name, params?) {
        return this.data.getAll(table, params).then(result => {
            let names = name + "s";
            this[names] = <any[]>result[table];
            for (var i=0; i<this[names].length; i++) {
                var obj = this[names][i];
                this[name][obj.id] = obj;
            }
            return this[names];
        });
    }    

    getAllCards() {
        return this.getAllInstances("card", "card", {"edition":true});
    }

    getAllSpecs() {
        return this.getAllInstances("container_spec", "spec");
    }

    getAllAlbums() {
        return this.getAllInstances("album", "album");
    }

    getCardBySlug(slug) {
        if (this.card[slug]) {
            console.log("getCardBySlug cacheado ", this.card[slug]);
            return Promise.resolve(this.card[slug]);
        } else {
            return this.fetchCard(slug).then(card => {
                console.log("getCardBySlug select ", card);
                this.card[slug] = card;
                var search = this.cards.map(e => e.slug != slug);
                if (search.length == 0) {
                    this.cards.push(card);
                }
                return card;
            });    
        }
    }

    getAlbumBySlug(slug) {
        if (this.album[slug]) {
            console.log("getAlbumBySlug cacheado ", this.album[slug]);
            return Promise.resolve(this.album[slug]);
        } else {
            return this.fetchAlbum(slug).then(album => {
                console.log("getAlbumBySlug select ", album);
                this.album[slug] = album;
                var search = this.albums.map(e => e.slug != slug);
                if (search.length == 0) {
                    this.albums.push(album);
                }
                return album;
            });    
        }
    }

    public getJSON(file) {
        console.log("getJSON()", file);
        return this.http.get(file).toPromise();
    }
    
    deployCard(card, img:HTMLImageElement) {
        console.log("------------ deployCard -------------");
        console.log("card: ", card, img);
        console.log("-------------------------------------");
        var rect:ClientRect = img.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        
        this.waitReady.then(() => {
            var _deploy:any = {};
            _deploy.style = {};
            _deploy.preload = card.edition.preload;
            _deploy.closebtn = {};
            _deploy.closebtn.style = {
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

            _deploy.front = {};
            _deploy.front.style = {
                "z-index": "11",
                "top": rect.top + "px",
                "left": rect.left + "px",
                "height": rect.height + "px",
                "width": rect.width + "px",
                "position": "fixed",
                "display": "block",
                "background-size": "contain",
                "background-image": "url("+card.edition.preview.images.fullsize+"), url("+card.edition.preview.images.thumbnail+")",
                "transition-duration": "1s",
                "transition-property": "top left height width",
                "transition-timing-function": "ease-in-out"
            };

            _deploy.body = {};
            _deploy.body.style = {
                "z-index": "8",
                "top": (this.device.height*0.45) + "px",
                "left": (this.device.width*0.45) + "px",
                "bottom": (this.device.height*0.45) + "px",
                "right": (this.device.width*0.45) + "px",
                "position": "fixed",
                "display": "block",
                "opacity": "0",
                "background-color": card.edition.preview.colors.bg,
                "transition-duration": "1s",
                "transition-property": "top left height width opacity",
                "transition-timing-function": "ease-in-out"
            };
            _deploy.frame = {
                src: null
            };
            _deploy.frame.style = {
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
            
            setTimeout(() => {
                var W = 370;
                var H = 520;
                _deploy.front.style.top = (this.device.height-H)*0.5 + "px";
                _deploy.front.style.left = (this.device.width-W)*0.5 + "px";
                _deploy.front.style.height = H + "px";
                _deploy.front.style.width = W + "px";
            }, 50);
            
            setTimeout(() => {
                _deploy.body.style.opacity = 1;
                _deploy.body.style.display = "block";
            }, 1000);
            setTimeout(() => {
                _deploy.body.style.left = "0px";
                _deploy.body.style.right = "0px";
            }, 1020);
            
            setTimeout(() => {
                _deploy.body.style.top = "0px";
                _deploy.body.style.bottom = "0px";
                
                var W = 370*0.5;
                var H = 520*0.5;

                _deploy.front.style.top = (this.device.height-H-10) + "px";
                _deploy.front.style.left = (this.device.width-W-10) + "px";
                _deploy.front.style.height = H + "px";
                _deploy.front.style.width = W + "px";
            }, 2000);

            setTimeout(() => {
                var src = window.location.origin + "/embedded/card/" + card.slug;
                var safeUrl:SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
                _deploy.frame.src = safeUrl;
                // console.log("---->", _deploy.frame.src);
                _deploy.frame.style.opacity = 1;
                _deploy.closebtn.style.opacity = 1;
                // createStatsHeader(carta.attr("id"));
            }, 3000);
            
            _deploy.prevhref = window.location.href;
            window.history.pushState({}, "", window.location.origin + "/deploy/card/" + card.slug);
            this.deploy = _deploy;
        });

    }

    deployAlbum(card, img:HTMLImageElement) {
        alert("WHAT?????");
    }

    closeCard() {
        window.history.pushState({}, "", this.deploy.prevhref);
        this.deploy = null;
    }
    // ------------------------------------------------------------------------------------------

}

@Component({
    selector: 'card-deploy',
    template: `
    <div *ngIf="cnt.deploy">
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
        <div style="position: absolute; top:-3000px;left:-3000px; pointer-events:none; opacity: 0">
            <img *ngFor="let src of cnt.deploy.preload" [src]="src">
        </div>
    </div>`
})
export class CardDeploy {
    constructor(public cnt:CntService) {

    }

    close() {
        this.cnt.closeCard();
    }
}