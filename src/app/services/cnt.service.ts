import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';
import { DomService } from './dom.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserdataService } from './userdata.service';
import { BgBoxService } from './bg-box.service';
import { AppService } from './app.service';
import { VapaeeUserService } from './vapaee-user.service';
import { LabelService } from '../deploy/comp/label/label.service';
import { AnalyticsService } from './analytics.service';



declare var FB:any;
declare var when_FB:any;

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
    public when_FB: Promise<any>;    

    constructor(
        private http: HttpClient, 
        private data: DataService, 
        private dom: DomService, 
        public userdata: UserdataService,
        public sanitizer: DomSanitizer,
        public box: BgBoxService,
        public app: AppService,
        public vapaee: VapaeeUserService,
        private labels: LabelService,
        public analytics: AnalyticsService

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
            this.waitReady = new Promise((resolve) => {
                this.dom.appendComponentToBody(CardDeploy);
                this.ready = true;
                resolve();
            });
            this.waitData = new Promise((resolve) => {
                this.userdata.waitData.then(() => {
                    this.proccessData();
                    resolve();
                });
            });
            this.waitData.then(() => {}, e => {
                console.log("CntService.waitDara rejected");
            });

            this.when_FB = new Promise((resolve, reject)=>{          
                when_FB.then(resolve, reject);
            });

            this.when_FB.then(() => {
                // this.updateFB();
            }, () => {}); 
        }
        return this.waitReady;
    }

    updateFB() {
        console.log("CNT.updateFB()");
        this.when_FB.then((FB) => {
            console.assert(FB);
            console.assert(FB.XFBML);
            console.assert(FB.XFBML.parse);
            console.log("CNT.updateFB() PARSE !!!!!!!!!!!!!");
            FB.XFBML.parse();
        });        
    }

    // ------------------------------------------------------------------------------------------
    // las siguientes funciones sirven para traer datos del usuario -----------------------------
    proccessData() {

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

        // overwrite global data --------------
        // this.cards = [];
        // this.card = {};
        // this.albums = [];
        // this.album = {};
        //
        this.userdata_to_global("card");
        this.userdata_to_global("album");
        this.getAllCards().then(() => {
            console.log('CARDS: ', this.cards);
            for (let i in this.cards) {
                var card = this.cards[i];
                if (!card.edition.data) continue;
                if (card.edition.data.steemuser == this.vapaee.steemuser) {
                    if (!card.steem.author || !card.steem.permlink) {
                        this.userdata.data.pending = this.userdata.data.pending || [];
                        this.userdata.data.pending.push({
                            "task": "steempost",
                            "card": card
                        });    
                    }
                }
            }
            // we search for an unclamed card
            // console.log('-------- PENDING ----------');
            // console.log(this.userdata.data.pending);
            // console.log('---------------------------');
            if (this.userdata.data.pending) {
                this.app.navigate("/pendings");
            }
    
        });
        // we search for an unclamed card
        console.log('-------- data proccessed ----------');
        console.log(this.userdata.data);
        console.log('-----------------------------------');
    }

    private userdata_to_global(table) {
        var tables = table + "s";
        for (let i in this.userdata.data[table]) {
            let entry = this.userdata.data[table][i];
            let before = this[table][entry.slug];
            if (before) {
                var index = this[tables].indexOf(before);
                this[table][entry.slug] = entry;
                if (index>=0) {
                    this[tables][index] = entry;
                } else {
                    console.error("ERROR?: ",[table,index,entry,before,this[tables]]);
                    this[tables].push(entry);    
                }
            } else {
                this[table][entry.slug] = entry;
                this[tables].push(entry);
            }
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

    private determineAction(from:number, fromi:number, to:number, toi:number) {
        var action = "unknown("+from+","+fromi+","+to+","+toi+")";
        var slot_to = this.userdata.data.container["id-"+to].slots[toi];
        var slot_from = this.userdata.data.container["id-"+from].slots[fromi];        
        if (from != to) {
            if (slot_to) {
                action = "replace";
            } else {
                if (this.userdata.data.collection["id-"+to]) {
                    action = "putin";
                } else {
                    action = "putout";
                }                
            }
        } else {
            if (slot_to) {
                action = "swap";
            } else {
                action = "move";
            }
        }
        // console.log("-- slot_from", slot_from, "slot_to", slot_to, "action", action, [this.userdata.data.album["id-"+to]]);
        return action;
        
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

    swapSlots(from_slug:string, fromi:number, to_slug:string, toi: number, action:string = "unset") {
        var from = this.userdata.data.slug.container[from_slug].id;
        var to = this.userdata.data.slug.container[to_slug].id;
        action = this.determineAction(from, fromi, to, toi);
        // console.log("CntService.swapSlots() from (" + from_slug + "," + fromi + ") to (" + to_slug + "," + toi + ") ---> ", action);
        this.app.setLoading(true);
        this.swapLocaly(from, fromi, to, toi);
        this.analytics.emitEvent("cards", action, "init");
        
        return this.http.post<any>("//api.cardsandtokens.com/swap/slots?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider,{
            from:from, fromi:fromi, to:to, toi:toi
        }).toPromise().then((r) => {
            if (r.error) {
                console.error(r);
                this.swapLocaly(to, toi, from, fromi);
                this.app.setLoading(false);
                this.analytics.emitEvent("cards", action, "fail");
            } else {
                if (from != to) {
                    // alert("HAY QUE RECALCULAR");
                    var coll_id = 0;
                    if (this.userdata.data.collection["id-"+from]) {
                        coll_id = from;
                    } else if (this.userdata.data.collection["id-"+to]) {
                        coll_id = to;
                    } else {
                        console.error("ERROR? swap sin involucrar un collection? ", [from, to, this.userdata.data.collection]);
                    }
                    if (coll_id > 0) {
                        // alert("coll_id: " + coll_id);
                        this.getCollectionStats(coll_id).then(coll => {
                            this.app.setLoading(false);
                        });
                    }
                } else {
                    this.app.setLoading(false);
                }
                this.analytics.emitEvent("cards", action, "success");
            }
        }).catch((e) => {
            this.app.setLoading(false);
            this.swapLocaly(to, toi, from, fromi);
            this.analytics.emitEvent("cards", action, "fail");
        });
    }

    private claimDailyPrizePart2(r:any, targetimg: Element) {
        return new Promise<any>((resolve, reject) => {
            this.app.setLoading(false);
            console.assert(this.deploy);
            console.assert(this.deploy.front);
            console.assert(this.deploy.front.style);
            
            this.deploy.front.style["transition-duration"] = "0.5s";
            this.deploy.front.style["transform"] = "scaleX(0)";
            window.setTimeout(() => {
                this.deploy.front.style["background-image"] = "url("+r.edition.preview.images.fullsize+"), url("+r.edition.preview.images.thumbnail+")";
                this.deploy.front.style["transform"] = "scaleX(1)";
                window.setTimeout(() => {
                    this.deploy.front.style["transition-duration"] = "1s";
                    this.deployFromCenterToSlot(r.edition.preview.images, <HTMLElement>targetimg).then(() => {
                        console.assert(!!this.userdata);
                        console.assert(this.userdata.data);
                        console.assert(this.userdata.data.slot);
                        console.assert(this.userdata.data.copy);
                        console.assert(this.userdata.data.card);
                        console.assert(this.userdata.data.edition);
                        this.userdata.data.slot["id-"+r.slot.id] = r.slot;
                        this.userdata.data.copy["id-"+r.copy.id] = r.copy;
                        this.userdata.data.card["id-"+r.card.id] = r.card;
                        this.userdata.data.edition["id-"+r.edition.id] = r.edition;
                        this.proccessData();
            
                        this.getUserInventory("cards-and-tokens").then(inventory => {
                            resolve(inventory);
                            this.deploy = null;
                        }, (e) => {
                            console.error("ERROR: hobe un error con el getUserInventory. ");
                            reject(e);
                            this.deploy = null;
                        });
                    });
                }, 1500);    
            }, 500);
            
            
        });
    }

    claimDailyPrize(img:HTMLElement) {
        return new Promise<any>((resolve, reject) => {
            this.deployToCenter({"fullsize":"/assets/card-back.png"}, img).then(() => {
                this.app.setLoading(true);
                var url = "http://api.cardsandtokens.com/dailyprize/claim?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider;
                this.http.get<any>(url).toPromise().then((r) => {
                    if (r.error) {
                        this.deploy = null;
                        this.app.setLoading(false);
                        this.analytics.emitEvent("copy", "dailyprize", "fail");
                        alert(r.error);
                        reject(r.error);
                        return;
                    }
                    this.analytics.emitEvent("copy", "dailyprize", "success");
                    var index = r.slot.index;
                    var container = "cards-and-tokens";
                    var query = ".slot-container[index='"+index+"'][container='"+container+"'] img.slot-pixel-image";
                    console.log("----------------------------------------------");
                    console.log("query", query);
                    var targetimg = window.document.body.querySelector(query);
                    console.log("img", targetimg);
                    this.claimDailyPrizePart2(r, targetimg).then(resolve, reject);
                }, reject);
            });
            // console.log("CntService.getDailyPrize()");


            /*
            var url = "http://api.cardsandtokens.com/dailyprize/claim?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider;;
            this.http.get<any>(url).toPromise().then((r) => {
                if (r.error) {
                    alert(r.error);
                    reject(r.error);
                    this.analytics.emitEvent("copy", "dailyprize", "fail");
                    return;
                }
                this.analytics.emitEvent("copy", "dailyprize", "success");
                
                this.userdata.data.slot["id-"+r.slot.id] = r.slot;
                this.userdata.data.copy["id-"+r.copy.id] = r.copy;
                this.userdata.data.card["id-"+r.card.id] = r.card;
                this.userdata.data.edition["id-"+r.edition.id] = r.edition;
                this.proccessData();
    
                this.getUserInventory("cards-and-tokens").then(inventory => {
                    resolve(inventory);
                }, reject);
                
            }, reject);
            */
        });
    }

    getDailyPrizeCountdown() {
        return new Promise<any>((resolve, reject) => {
            this.userdata.waitData.then(() => {
                this.userdata.data.dayliprice = {};
                console.log("CntService.getDailyPrize()");
                var url = "http://api.cardsandtokens.com/dailyprize/countdown?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider;;
                this.http.get<any>(url).toPromise().then((r) => {
                    if (r.sec == 0) {
                        this.userdata.data.dayliprice.claimable = true;
                    } else {
                        this.userdata.data.dayliprice.remaining = r.sec-1;
                    }
                    resolve(r.sec);
                });
            });
        });
    }

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

    updateCollectibleVotes(slug:string, votes:number) {
        return new Promise<any>((resolve) => {
            console.log("CntService.updateCollectibleVotes("+slug+","+votes+")");
            var url = "http://api.cardsandtokens.com/update/collectible/votes";
            this.http.post<any>(url, {
                slug:slug, votes:votes
            }).toPromise().then((r) => {
                var card = r.card;
                var index = this.cards.indexOf(this.card[card.slug]);
                if (index >= 0) {
                    this.cards[index] = card;
                } else {
                    this.cards.push(card);
                }
                this.card[card.slug] = card;
                if (this.userdata.logged) {
                    this.userdata.data.card["id-"+card.id] = card;
                    this.proccessData();
                    var collectible = this.card[slug];
                    for (var i in this.userdata.data.slot) {
                        var slot = this.userdata.data.slot[i];
                        if (slot.data.collectible == collectible.id) {
                            if (this.userdata.logged && this.userdata.data.collection["id-"+slot.container.id]) {
                                this.getCollectionStats(slot.container.id);
                            }
                        }
                    }
                }
                resolve(r);
            });
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
    
    
    getUserInventory(slug) {
        return new Promise<any>((resolve) => {
            this.vapaee.afterReady.then(() => {
                if (this.userdata.logged) {
                    for (let i in this.userdata.data.inventory) {
                        let inventory = this.userdata.data.inventory[i];
                        if (inventory.app.slug == slug) {
                            return resolve (inventory);
                        }
                    }
                }
                return resolve({});
            }, e => {});
        });        
    }

    getAllInstances(table, name, params?) {
        return this.data.getAll(table, params).then(result => {
            let names = name + "s";
            this[names] = <any[]>result[table];
            for (var i=0; i<this[names].length; i++) {
                var obj = this[names][i];
                this[name][obj.slug] = obj;
            }
            return this[names];
        });
    }    

    allCards: Promise<any>;
    getAllCards() {
        if (this.allCards) return this.allCards;
        this.allCards = new Promise((resolve) => {
            this.getAllInstances("card", "card", {"edition":true}).then((r) => {
                this.cards.sort(function(a, b) {
                    if (a.edition.data.week != b.edition.data.week) return b.edition.data.week - a.edition.data.week;
                    if (a.edition.data.position != b.edition.data.position) return a.edition.data.position - b.edition.data.position;
                    return (a.slug > b.slug) ? 1 : -1;
                });
                resolve(this.cards);
            });
        });
        return this.allCards;
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

    getAlbumCollectionBySlug(slug) {
        return new Promise<any>(resolve => {
            this.waitData.then(() => {
                for (var i in this.userdata.data.collection) {
                    var coll = this.userdata.data.collection[i];
                    var album = this.userdata.data.album["id-"+coll.album.id];
                    if (album.slug == slug) {
                        return resolve(coll);
                    }
                }
            })
        });
    };

    updateCollectionSteemPoints(coll_id) {
        return new Promise<any>(resolve => {
            this.waitData.then(() => {
                var coll = this.userdata.data.collection["id-"+coll_id];
                // console.error("HAY QUE PEGARLE A LA BASE DE DATOS PARA QUE ACTUALICE LOS PUNTOS Y POSICION DE LA COLLECTION coll_id");
                return this.http.post<any>("//api.cardsandtokens.com/update_collection?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider,{
                    collection:coll_id
                }).toPromise().then((r) => {
                    if (r.error) {
                        console.error(r);
                    } else {
                        var new_coll = r.collection;
                        console.log("RESULTADO DE UPDATE COLLECTION POINTS: ", [r.collection]);
                        this.userdata.data.collection["id-"+new_coll.id] = new_coll;
                        this.proccessData();
                        // Se está asumiendo que el album que se está visualizando es el asociado a new_coll y no tiene porque ser así
                        console.log("Esto hay que sacarlo de acá");
                        this.labels.setLabel("album-ranking","Ranking: " + new_coll.position);
                        this.labels.setLabel("album-points","Points: " + new_coll.points);                        
                        resolve(r.collection);
                    }
                }).catch((e) => {
                });
            })
        });
    }

    private calculateCollectionPoints(coll_id) {
        var votes = 0;
        var counted = {};
        if (this.userdata.logged) {
            for (var i in this.userdata.data.slot) {
                var slot = this.userdata.data.slot[i];
                if (slot.container.id == coll_id) {
                    var collectible_id = slot.data.collectible;
                    var collectible = this.userdata.data.collectible["id-"+collectible_id];
                    if (counted[collectible.slug]) {
                        continue;
                    }
                    counted[collectible.slug] = true;
                    votes += collectible.steem_votes;
                    // console.log("steem_votes: ", votes, "(+"+collectible.steem_votes+")", [slot]);
                }
            }    
        }
        return votes;
    }

    getCollectionStats(coll_id) {
        return new Promise<any>(resolve => {
            this.waitData.then(() => {
                var coll = this.userdata.data.collection["id-"+coll_id];
                var real_points = this.calculateCollectionPoints(coll_id);
                if (coll.points != real_points) {
                    this.updateCollectionSteemPoints(coll_id).then(new_coll => {
                        resolve(new_coll);
                    })
                } else {
                    resolve(coll);
                }
            })
        });
    }

    getAlbumCompleteBySlug(slug) {
        if (this.album[slug] && this.album[slug].deploy) {
            // console.log("getAlbumBySlug cacheado ", this.album[slug]);
            return Promise.resolve(this.album[slug]);
        } else {
            return this.fetchAlbum(slug).then(album => {
                // console.log("getAlbumBySlug select ", album);
                var before = this.album[slug];
                var index = this.albums.indexOf(before);
                this.album[slug] = album;
                if (index >= 0) {
                    this.albums[index] = album;
                } else {
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

    private getCornerCardSize() {
        var W = 370*0.5;
        var H = 520*0.5;

        if (this.device.height*0.34 < H) {
            var K = (this.device.height*0.34)/H;
            H = H * K;
            W = W * K;
        }
        if (this.device.width*0.34 < W) {
            var K = (this.device.width*0.34)/W;
            H = H * K;
            W = W * K;
        }

        return {
            w: W, h: H
        }
    }

    private getCenterCardSize() {
        var W = 370;
        var H = 520;

        if (this.device.height*0.5 < H) {
            var K = (this.device.height*0.5)/H;
            H = H * K;
            W = W * K;
        }
        if (this.device.width*0.5 < W) {
            var K = (this.device.width*0.5)/W;
            H = H * K;
            W = W * K;
        }
        
        return {
            w: W, h: H
        }
    }
    
    deployCard(card, img:HTMLElement) {
        console.log("------------ deployCard -------------");
        console.log("card: ", card, img);
        console.log("-------------------------------------");
        var rect:ClientRect = img.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        this.analytics.emitEvent("cards", "deploy", "init");
        
        this.waitReady.then(() => {
            var _deploy:any = {};
            _deploy.href = window.location.origin + "/deploy/card/" + card.slug;
            _deploy.style = {};
            _deploy.show = {};
            _deploy.card = card;
            _deploy.preload = card.edition.preload;

            var src = window.location.origin + "/embedded/card/" + card.slug;
            var safeUrl:SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);            
            _deploy.frame = {
                src: null
            };
            var margin = "5px";
            if (this.device.width > 576) margin = "20px";
            if (this.device.width > 768) margin = "30px";
            if (this.device.width > 992) margin = "30px";
            if (this.device.width > 1200) margin = "30px";


            _deploy.frame.style = {
                "z-index": "10",
                "top": "30px",
                "left": margin,
                "bottom": margin,
                "right": margin,
                "width": "auto",
                "position": "absolute",
                "opacity":0,
                "transition-duration": "1s",
                "transition-property": "opacity",
                "transition-timing-function": "ease-in-out",
                "box-shadow": "1px 1px 10px 2px rgba(0,0,0,0.5)"
            }            
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
            
            setTimeout(() => {
                var size = this.getCenterCardSize();
                var W = size.w;
                var H = size.h;
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
                
                var cardsize = this.getCornerCardSize();

                var W = cardsize.w;
                var H = cardsize.h;


                _deploy.front.style.top = (this.device.height-H-10) + "px";
                _deploy.front.style.left = (this.device.width-W-10) + "px";
                _deploy.front.style.height = H + "px";
                _deploy.front.style.width = W + "px";

                this.updateFB();
            }, 2000);

            setTimeout(() => {

                _deploy.frame.src = safeUrl;
                // console.log("---->", _deploy.frame.src);
                _deploy.frame.style.opacity = 1;
                _deploy.closebtn.style.opacity = 1;
                // createStatsHeader(carta.attr("id"));
                _deploy.show.fblikes = false;
                _deploy.show.steemvotes = true;

                _deploy.front.style.top = "";
                _deploy.front.style.left = "";
                _deploy.front.style.bottom = "10px";
                _deploy.front.style.right = "10px";

            }, 3000);


            _deploy.steem = card.steem;
            _deploy.steem.votes = card.steem_votes;
            _deploy.prevhref = window.location.href;
            window.history.pushState({}, "", _deploy.href);
            this.deploy = _deploy;
        });

    }

    deployToCenter(data, img:HTMLElement) {
        return new Promise((resolve) => {
            console.log("------------ deployToCenter -------------");
            console.log(data, img);
            console.log("-------------------------------------");
            var rect:ClientRect = img.getBoundingClientRect();
            
            this.waitReady.then(() => {
                var _deploy:any = {};
                _deploy.style = {};
                _deploy.show = {};
    
                var margin = "5px";
                if (this.device.width > 576) margin = "20px";
                if (this.device.width > 768) margin = "30px";
                if (this.device.width > 992) margin = "30px";
                if (this.device.width > 1200) margin = "30px";
               
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
                    "background-image": "url("+data.fullsize+"), url("+data.thumbnail+")",
                    "transition-duration": "1s",
                    "transition-property": "top, left, height, width, transform",
                    "transition-timing-function": "ease-in-out"
                };
                
                setTimeout(() => {
                    var size = this.getCenterCardSize();
                    var W = size.w;
                    var H = size.h;
                    _deploy.front.style.top = (this.device.height-H)*0.5 + "px";
                    _deploy.front.style.left = (this.device.width-W)*0.5 + "px";
                    _deploy.front.style.height = H + "px";
                    _deploy.front.style.width = W + "px";
                }, 50);
    
                this.deploy = _deploy;
                window.setTimeout(resolve, 1100);
            });    
        });
    }
    
    deployFromCenterToSlot(data, img:HTMLElement) {
        return new Promise((resolve) => {
            console.log("------------ deployFromCenterToSlot -------------");
            console.log(data, img, this.deploy);
            console.log("-------------------------------------");
            var rect:ClientRect = img.getBoundingClientRect();
            this.waitReady.then(() => {
                console.assert(this.deploy, "ERROR: deployFromCenterToSlot was called but there's currently nothing deployed")
                if (this.deploy) {
                    this.deploy.front.style["top"] = rect.top + "px";
                    this.deploy.front.style["left"] = rect.left + "px";
                    this.deploy.front.style["height"] = rect.height + "px";
                    this.deploy.front.style["width"] = rect.width + "px";
                    this.deploy.front.style["background-image"] = "url("+data.fullsize+"), url("+data.thumbnail+")";
                    this.deploy.front.style["transition-duration"] = "1s";
                    window.setTimeout(() => {
                        resolve();
                    }, 1000);
                } else {
                    resolve();
                }
                
            });
        });
    }

    deployAlbum(card, img:HTMLElement) {
        alert("WHAT?????");
    }

    closeCard() {
        console.log("this.deploy.prevhref", this.deploy.prevhref);
        if (this.deploy.prevhref != this.deploy.href) {
            window.history.pushState({}, "", this.deploy.prevhref);
        } else {
            this.app.onCardClose();
        }

        this.deploy = null;
    }
    // ------------------------------------------------------------------------------------------

    createCard(model:any, deploy:any, preview:any) {
        return new Promise<any>((resolve) => {
            console.log("CntService.createCard()");
            var url = "http://api.cardsandtokens.com/crear_carta?access_token="+this.vapaee.access_token+"&provider="+this.vapaee.provider;
            this.http.post<any>(url, {
                model:model, deploy:deploy, preview: preview
            }).toPromise().then((r) => {
                console.log("CARTA CREADA", r);
                resolve(r);
            });
        });
    }

}

@Component({
    selector: 'card-deploy',
    styles: [".stats_container {position: fixed; top: 3px; left: 30px; z-index: 9;}"],
    template: `
    <div *ngIf="cnt.deploy">
        <div *ngIf="cnt.deploy.body" class="body" [ngStyle]="cnt.deploy.body.style">
            <div class="stats_container animated fadeIn">
                <steem-upvote-button [hidden]="!cnt.deploy.show.steemvotes" [steemdata]="cnt.deploy.steem" [card]="cnt.deploy.card"></steem-upvote-button>
                <div [hidden]="!cnt.deploy.show.fblikes" class="fb-like"
                    [data-href]="cnt.deploy.href"
                    data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>
            </div>
            <div *ngIf="cnt.deploy.frame" class="contenedor embed-responsive" [ngStyle]="cnt.deploy.frame.style">
                <iframe *ngIf="cnt.deploy.frame.src" [src]="cnt.deploy.frame.src" class="embed-responsive-item"></iframe>
            </div>
        </div>
        <div *ngIf="cnt.deploy.closebtn" class="close-cross cursor-pointer" (click)="close()" [ngStyle]="cnt.deploy.closebtn.style">
            <img src="/assets/btn-close.png" />
        </div>
        <card-front [ngStyle]="cnt.deploy.front.style">
            
        </card-front>
        <!--div *ngIf="cnt.deploy.preload" style="position: absolute; top:-3000px;left:-3000px; pointer-events:none; opacity: 0">
            <img *ngFor="let src of cnt.deploy.preload" [src]="src">
        </div-->
    </div>`
})
export class CardDeploy {
    constructor(public cnt:CntService) {

    }

    close() {
        this.cnt.closeCard();
    }
}