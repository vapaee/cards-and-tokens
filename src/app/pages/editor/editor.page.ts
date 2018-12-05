import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';
import { CntService } from '../../services/cnt.service';
import { DataService } from '../../services/data.service';

interface CompSpec {
    comp:string,
    data?:any,
    children?:CompSpec[]
}


@Component({
    selector: 'editor-page',
    templateUrl: './editor.page.html',
    styleUrls: ['./editor.page.scss']
})
export class EditorPage implements OnInit {
    model:any;
    _deploy:CompSpec;
    cardset: string;
    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public steem: SteemService,
        public cnt: CntService,
        public data: DataService
    ) {
        
        this.cardset = "telos";
        var telos_model = {
            week:1,
            steemuser: "viterbo",
            album: "telos",
            color: "#5C5949",
            bgimage: "telos-bg.png",
            link: "https://steemit.com/cardsandtokens/@viterbo/telos-trading-cards-album"
        };
        var openmic_model = {
            album: "openmic"
        }

        var openmic = {
            "comp": "root",
            "children": [
                {
                    "comp": "grid",
                    "data": {
                        "rows": [
                            [ { "height": "10vh" } ],
                            { "grow": 0, "cols": [ 1 ] },
                            [ { "grow": 1 } ],
                            [ { "height": "3vh" } ]
                        ]
                    },
                    "children": [
                        {
                            "comp": "background",
                            "data": {
                                "color": "white",
                                "image": {
                                    "url": "/assets/cards/openmic/images/steemit.svg",
                                    "position": "left", "repeat": "no-repeat", "size": "contain"
                                }
                            }
                        },
                        {
                            "comp": "background",
                            "data": {
                                "color": "grey",
                                "padding-sm": true,
                                "container": true
                            },
                            "children": [
                                {
                                    "comp": "grid",
                                    "data": {
                                        "rows": [ [ { "grow": 1 }, { "grow": 0 } ] ]
                                    },
                                    "children": [
                                        {
                                            "comp": "label",
                                            "data": {
                                                "class": "text-xl-left white-text",
                                                "text": "Unseen (The Good Fight)"
                                            }
                                        },
                                        {
                                            "comp": "menu",
                                            "data": {
                                                "menu": [
                                                    {
                                                        "text": "Video",
                                                        "class": "btn btn-sm btn-outline-white",
                                                        "section": "main",
                                                        "value": "Video"
                                                    },
                                                    {
                                                        "text": "Lyrics",
                                                        "class": "btn btn-sm btn-outline-white",
                                                        "section": "main",
                                                        "value": "Lyrics"
                                                    },
                                                    {
                                                        "text": "Steemit post",
                                                        "class": "btn btn-sm btn-outline-white",
                                                        "link": "https://steemit.com/@viterbo"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "comp": "background",
                            "data": {
                                "color": "rgba(72, 72, 72, 0.0)",
                                "gradient": {
                                    "dir": "top",
                                    "points": [
                                        { "color": "rgba(0,0,0,0.6)", "percent": 0 },
                                        { "color": "rgba(0,0,0,0.0)", "percent": 30 },
                                        { "color": "rgba(0,0,0,0.0)", "percent": 70 },
                                        { "color": "rgba(0,0,0,0.6)", "percent": 100 }
                                    ]
                                },
                                "image": {
                                    "url": "/assets/backgrounds/maxresdefault.jpg",
                                    "repeat": "no-repeat",
                                    "size": "cover",
                                    "position": "center",
                                    "blend-mode": "multiply"
                                }
                            },
                            "children": [
                                {
                                    "comp": "section",
                                    "data": {
                                        "name": "main",
                                        "current": "Video",
                                        "sections": [
                                            "Video",
                                            "Lyrics"
                                        ]
                                    },
                                    "children": [
                                        {
                                            "comp": "video",
                                            "data": {
                                                "youtube": {
                                                    "videoId": "8vQb2JRloQ8",
                                                    "autoplay": false
                                                }
                                            }
                                        },
                                        {
                                            "comp": "background",
                                            "data": {
                                                "container": true,
                                                "padding": true
                                            },
                                            "children": [
                                                {
                                                    "comp": "background",
                                                    "data": {
                                                        "color": "rgba(0,0,0,0.3)",
                                                        "fgcolor": "white",
                                                        "padding": true,
                                                        "expand": true
                                                    },
                                                    "children": [
                                                        {
                                                            "comp": "scrolleable",
                                                            "children": [
                                                                {
                                                                    "comp": "markdown",
                                                                    "data": {
                                                                        "markdown": ""
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "comp": "background",
                            "data": {
                                "color": "#FFF"
                            }
                        }
                    ]
                }
            ]
        }

        var telos = {
            "comp": "root",
            "children": [
                {
                    "comp": "grid",
                    "data": {
                        "rows": [
                            [
                                {
                                    "height": "10vh"
                                }
                            ],
                            {
                                "grow": 0,
                                "cols": [
                                    1
                                ]
                            },
                            [
                                {
                                    "grow": 1
                                }
                            ],
                            [
                                {
                                    "height": "3vh"
                                }
                            ]
                        ]
                    },
                    "children": [
                        {
                            "comp": "background",
                            "data": {
                                "color": "white",
                                "gradient": {
                                    "dir": "left",
                                    "points": [
                                        {
                                            "color": "rgba(0,0,0,0.0)",
                                            "percent": 70
                                        },
                                        {
                                            "color": "rgba(0,0,0,0.6)",
                                            "percent": 100
                                        }
                                    ]
                                },
                                "image": {
                                    "url": "/assets/cards/telos/images/header.png",
                                    "position": "left",
                                    "repeat": "no-repeat",
                                    "size": "contain"
                                }
                            }
                        },
                        {
                            "comp": "background",
                            "data": {
                                "color": "#5C5949",
                                "gradient": {
                                    "dir": "left",
                                    "points": [
                                        {
                                            "color": "rgba(0,0,0,0.6)",
                                            "percent": 0
                                        },
                                        {
                                            "color": "rgba(0,0,0,0.0)",
                                            "percent": 30
                                        }
                                    ]
                                },
                                "padding-sm": true,
                                "container": true
                            },
                            "children": [
                                {
                                    "comp": "grid",
                                    "data": {
                                        "rows": [
                                            [
                                                {
                                                    "grow": 1
                                                },
                                                {
                                                    "grow": 0
                                                }
                                            ]
                                        ]
                                    },
                                    "children": [
                                        {
                                            "comp": "label",
                                            "data": {
                                                "class": "text-xl-left white-text",
                                                "text": "Introducing the Telos Blockchain"
                                            }
                                        },
                                        {
                                            "comp": "menu",
                                            "data": {
                                                "menu": [
                                                    {
                                                        "text": "Video",
                                                        "class": "btn btn-sm btn-outline-white",
                                                        "section": "main",
                                                        "value": "Video"
                                                    },
                                                    {
                                                        "text": "More info",
                                                        "class": "btn btn-sm btn-outline-white",
                                                        "section": "main",
                                                        "value": "Specs",
                                                        "hidden": false
                                                    },
                                                    {
                                                        "text": "White Paper",
                                                        "class": "btn btn-sm btn-outline-white",
                                                        "link": "http://colintalkscrypto.com/files/telos_white_paper_7_12.pdf"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "comp": "background",
                            "data": {
                                "color": "white",
                                "gradient": {
                                    "dir": "top",
                                    "points": [
                                        {
                                            "color": "rgba(0,0,0,0.3)",
                                            "percent": 0
                                        },
                                        {
                                            "color": "rgba(0,0,0,0.0)",
                                            "percent": 30
                                        },
                                        {
                                            "color": "rgba(0,0,0,0.0)",
                                            "percent": 70
                                        },
                                        {
                                            "color": "rgba(0,0,0,0.3)",
                                            "percent": 100
                                        }
                                    ]
                                },
                                "image": [
                                    {
                                        "url": "/assets/cards/telos/images/telos-big-iton-transparent.png",
                                        "position": "center",
                                        "repeat": "no-repeat",
                                        "size": "contain"
                                    },
                                    {
                                        "url": "/assets/backgrounds/telos-bg.png",
                                        "repeat": "no-repeat",
                                        "size": "cover",
                                        "position": "center",
                                        "blend-mode": "multiply"
                                    }
                                ]
                            },
                            "children": [
                                {
                                    "comp": "section",
                                    "data": {
                                        "name": "main",
                                        "current": "Video",
                                        "sections": [
                                            "Video",
                                            "Specs"
                                        ]
                                    },
                                    "children": [
                                        {
                                            "comp": "video",
                                            "data": {
                                                "youtube": {
                                                    "videoId": "fvsvzCL46eI",
                                                    "autoplay": false
                                                }
                                            }
                                        },
                                        {
                                            "comp": "background",
                                            "data": {
                                                "container": true,
                                                "padding": true
                                            },
                                            "children": [
                                                {
                                                    "comp": "background",
                                                    "data": {
                                                        "color": "rgba(0,0,0,0.3)",
                                                        "fgcolor": "white",
                                                        "padding": true,
                                                        "expand": true
                                                    },
                                                    "children": [
                                                        {
                                                            "comp": "scrolleable",
                                                            "children": [
                                                                {
                                                                    "comp": "markdown",
                                                                    "data": {
                                                                        "markdown": ""
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "comp": "background",
                            "data": {
                                "color": "#FFF",
                                "gradient": {
                                    "dir": "left",
                                    "points": [
                                        {
                                            "color": "rgba(0,0,0,0.6)",
                                            "percent": 0
                                        },
                                        {
                                            "color": "rgba(0,0,0,0.0)",
                                            "percent": 30
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
        
        switch (this.cardset) {
            case "telos": 
                this._deploy = telos;
                this.model = this.model = telos_model;
                break;
            default:
                this._deploy = openmic;
                this.model = openmic_model;
        }
        
    }

    public prueba() {
        // creo que ya no necesito esta funcion. Era para recuperar los colores y ya los tengo en data-aux
        
        this.data.getAll("data_aux", {}).then((r) => {
            var data_aux = r.data_aux;
            var autores = {};
            var autores_str = "";
            for (var d in data_aux) {
                
                var autor = data_aux[d].data.steemuser;
                autores[autor] = autores[autor] || 0;
                autores[autor]++;
            }

            for (var a in autores) {
                autores_str += "@" + a + ", ";
            }
            console.log([autores_str]);
        });        
    }

    ngOnInit() {
        this.prueba();
    }

    public getMarkDownLyrics() {
        var lyrics = this.model.lyrics.split("\n\n").join("<br>").split("\n").join("  \n").split("<br>").join(" \n\n");
        lyrics = "# Lyrics  \n\n" + lyrics;
        return lyrics;
    }

    public getBgImage() {
        if (this.model.bgimage.indexOf("/") != -1) {
            return this.model.bgimage;
        } else {
            return "/assets/backgrounds/" + this.model.bgimage;
        }
    }

    public daleSalvarDato(card, promise) {
        var data = card.edition.deploy.data || this.extractData(card) 
                
        var _package = {
            week: data.week,
            slug: data.slug,
            position: data.position,
            data: data
        };
        
        return promise.then(() => {
            console.log("this.data.create(data_aux)",data.slug,[_package]);
            return this.data.create("data_aux", _package);
        });
    }

    public arreglarDataAux() {
        // creo que ya no necesito esta funcion. Era para recuperar los colores y ya los tengo en data-aux
        var promise = new Promise((resolve) => {
            resolve();
        })
        this.data.getAll("data_aux", {}).then((r) => {
            var data_aux = r.data_aux;
            for (var d in data_aux) {
                console.log(data_aux[d].data.bgimage);
                if (data_aux[d].data.bgimage.indexOf("/") == -1) {
                    data_aux[d].data.bgimage = "/assets/backgrounds/" + data_aux[d].data.bgimage;
                    promise = this.updateDataAux({"id": data_aux[d].id, "data":data_aux[d].data}, promise);
                }
            }
        });        
    }

    public updateDataAux(update, promise) {
        return promise.then(() => {
            console.log("->", update);
            return this.data.update("data_aux", update);
        });
    }

    public setPermlinkToAllCards() {
        for (var i in this.cnt.cards) {
            var card = this.cnt.cards[i];
            card.steem = {
                author: card.edition.data.steemuser,
                permlink: card.edition.data.permlink
            }
            this.data.update("card", card).then((c) => {
                console.log("card updated: ", c.id, c.slug);
            })
        }
    }

    public crearCartasAPartirDeDataAux() {
        var promise = new Promise((resolve) => {
            resolve();
        })
        this.data.getAll("data_aux", {edition:true, details:true}).then((r) => {
            console.log("dale() ----------------->", r);
            /*
            r.data_aux.sort(function(a, b){
                if (a.week != b.week) return b.week - a.week;
                if (a.position != b.position) return a.position - b.position;
                return (a.slug > b.slug) ? 1 : -1;
            });
            */

            
           console.log(this.cnt.userdata.data);
            
            for (var i in r.data_aux) {
                var data_aux = r.data_aux[i];
                if (data_aux.data) {
                    if (!this.cnt.userdata.data.slug.collectible[data_aux.slug]) {
                        console.log("NEW CARD: ", data_aux.slug);
                        promise = this.daleCreateCard(data_aux.data, promise);
                    } else {
                        console.log("SKIP: ", data_aux.slug);
                    }
                } else {
                    console.error("ERROR: no tiene data", data_aux);
                }                
            }
            
        });       
    }

    daleCreateCard(data, promise) {
        return promise.then(() => {
            this.model = data;
            console.log(this.model.week, this.model.position, this.model.slug, [this.model]);
            return this.createCard();
        });
    }

    public extractData(card) {
        switch (this.cardset) {
            case "telos": return this.extractDataTelos;
            default: return this.extractDataOpenmic;
        }
    }

    public extractDataTelos(card) {
        var obj:any = card.edition.deploy.data || {};
        // background image
        obj.bgimage = card.edition.deploy.children[0].children[2].data.image.url;

        // el título
        obj.title = card.edition.deploy.children[0].children[1].children[0].children[0].data.text = "#" + this.model.position + " - " +this.model.title;

        // el video
        obj.youtube = card.edition.deploy.children[0].children[2].children[0].children[0].data.youtube.videoId = this.model.youtube;

        // el link
        obj.link = card.edition.deploy.children[0].children[1].children[0].children[1].data.menu[2].link = this.model.link;

        // lyrics
        obj.lyrics = card.edition.deploy.children[0].children[2].children[0].children[1].children[0].children[0].children[0].data.markdown;
        obj.has_lyrics = !!obj.lyrics;
        
        // deploy colors 
        obj.colors = card.edition.preview.colors;

        return obj;
    }

    public extractDataOpenmic(card) {
        var obj:any = card.edition.deploy.data || {};
        // background image
        obj.bgimage = card.edition.deploy.children[0].children[2].data.image.url;

        // el título
        obj.title = card.edition.deploy.children[0].children[1].children[0].children[0].data.text = this.model.title;

        // el video
        obj.youtube = card.edition.deploy.children[0].children[2].children[0].children[0].data.youtube.videoId = this.model.youtube;

        // el link
        obj.link = card.edition.deploy.children[0].children[1].children[0].children[1].data.menu[2].link = this.model.link;

        // lyrics
        obj.lyrics = card.edition.deploy.children[0].children[2].children[0].children[1].children[0].children[0].children[0].data.markdown;
        obj.has_lyrics = !!obj.lyrics;
        
        // deploy colors 
        obj.colors = card.edition.preview.colors;

        return obj;
    }
    
    get deploy(): CompSpec {
        switch (this.cardset) {
            case "telos": return this.deployTelos;
            default: return this.deployOpenmic;
        }        
    }

    get deployTelos(): CompSpec {
        
        // background image
        this._deploy.children[0].children[2].data.image.url = this.getBgImage();

        // el título
        this._deploy.children[0].children[1].children[0].children[0].data.text = this.model.title;

        // el video
        this._deploy.children[0].children[2].children[0].children[0].data.youtube.videoId = this.model.youtube;

        // el link
        this._deploy.children[0].children[1].children[0].children[1].data.menu[2].link = this.model.link;

        // si tienen lyrics
        if (this.model.has_lyrics) {
            var lyrics = this.model.lyrics;
            this._deploy.children[0].children[1].children[0].children[1].data.menu[1].hidden = false;
            this._deploy.children[0].children[2].children[0].children[1].children[0].children[0].children[0].data.markdown = lyrics;
        } else {
            this._deploy.children[0].children[1].children[0].children[1].data.menu[1].hidden = true;
        }

        return this._deploy;
    }

    get deployOpenmic(): CompSpec {
        
        // background image
        this._deploy.children[0].children[2].data.image.url = this.getBgImage();

        // el título
        this._deploy.children[0].children[1].children[0].children[0].data.text = this.model.title;

        // el video
        this._deploy.children[0].children[2].children[0].children[0].data.youtube.videoId = this.model.youtube;

        // el link
        this._deploy.children[0].children[1].children[0].children[1].data.menu[2].link = this.model.link;

        // si tienen lyrics
        if (this.model.has_lyrics) {
            var lyrics = this.getMarkDownLyrics();
            this._deploy.children[0].children[1].children[0].children[1].data.menu[1].hidden = false;
            this._deploy.children[0].children[2].children[0].children[1].children[0].children[0].children[0].data.markdown = lyrics;
        } else {
            this._deploy.children[0].children[1].children[0].children[1].data.menu[1].hidden = true;
        }

        return this._deploy;
    }

    get preview(): any {    
        return {
            "images": {
                "opengraph": "./assets/cards/"+this.cardset+"/images/opengraph/" + this.model.slug + ".png",
                "fullsize": "./assets/cards/"+this.cardset+"/images/fullsize/" + this.model.slug + ".png",
                "thumbnail": "./assets/cards/"+this.cardset+"/images/thumbnail/" + this.model.slug + ".png"
            },
            "colors": {
                "bg":  this.model.color
            }
        };
    }

    public saveCardDataAux() {
        var promise = new Promise((r) => {r();});
        var card = {
            edition: {
                deploy: {
                    data: {
                        week: this.model.week,
                        position: this.model.position,
                        slug: this.model.slug,
                        youtube: this.model.youtube,
                        steemuser: this.model.steemuser,
                        permlink: this.model.permlink,
                        title: this.model.title,
                        bgimage: this.getBgImage(),
                        link: this.model.link,
                        original: this.model.original,
                        color: this.model.color,
                        has_lyrics: this.model.has_lyrics,
                        lyrics: this.model.lyrics
                    }
                }
            }
        };
        return this.daleSalvarDato(card, promise).then((e) => {
            if (e.error) {
                alert("ERROR: " + e.error);
            } else {
                console.log(e);
                this.model = {}
            }
        });
    }

    public createCard() {
        /*/
        console.log("this.deploy", this.deploy);
        // console.log(JSON.stringify(this._deploy));
        // console.log([JSON.stringify(this._deploy)]);
        /*/
        return this.cnt.createCard(this.model, this.deploy, this.preview).then((e) => {
            if (e.error) {
                // alert("ERROR: " + e.error);
            } else {
                console.log();
                // alert("Carta ID: " + e.card.id);
                this.model = {}
            }
        });
        //*/
    }

}
