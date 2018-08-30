import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";
import { SteemService } from '../../services/steem.service';
import { CntService } from '../../services/cnt.service';

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
    constructor(
        public vapaee: VapaeeUserService, 
        public app: AppService, 
        public steem: SteemService,
        public cnt: CntService
    ) {
        this.model = {
        };

        this._deploy = {
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
    }

    ngOnInit() {
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

    get deploy(): CompSpec {
        
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
            this._deploy.children[0].children[2].children[0].children[1].children[0].children[0].children[0].data.markdown = lyrics;
        } else {
            this._deploy.children[0].children[1].children[0].children[1].data.menu[1].hidden = true;
        }

        return this._deploy;
    }

    get preview(): any {
        var r,g,b;
        r = Math.floor( 100 * Math.random()) + 100;
        g = Math.floor( 100 * Math.random()) + 100;
        b = Math.floor( 100 * Math.random()) + 100;        
        return {
            "images": {
                "opengraph": "./assets/cards/openmic/images/opengraph/" + this.model.slug + ".png",
                "fullsize": "./assets/cards/openmic/images/fullsize/" + this.model.slug + ".png",
                "thumbnail": "./assets/cards/openmic/images/thumbnail/" + this.model.slug + ".png"
            },
            "colors": {
                "bg": "rgb("+r+","+g+","+b+")"
            }
        };
    }

    public createCard() {
        console.log("this.deploy", this.deploy);
        
        this.cnt.createCard(this.model, this.deploy, this.preview).then((e) => {
            if (e.error) {
                alert("ERROR: " + e.error);
            } else {
                alert("Carta OK !!");
                this.model = {}
            }
        });
        
    }

}
