import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    public cards: any[];

    constructor(private http: HttpClient) {
        this.cards = [];
    }

    init(coso:Dependencia) {
        this.afterReady = new Promise((resolve, reject) => {
            resolve();
        });
    }

    fetchCard(id:string) {
        return new Promise((resolve, reject) => {
            // resolve(this.test_scroll);
            // resolve(this.test_video);
            // resolve(this.test_md);
            // resolve(this.test_menu);
            if (id.substr(0,4) == "test") {
                var file = "./assets/cards/" + id + ".json";
                this.getJSON(file).then(data => {
                    resolve(data);
                }).catch(er => {
                    console.error("ERROR: file not found: " + file);
                });
            } else if (id.substr(0,8) == "landing-") {
                var file = "./assets/cards/landing/" + id.substr(8) + ".json";
                this.getJSON(file).then(data => {
                    resolve(data);
                }).catch(er => {
                    console.error("ERROR: file not found: " + file);
                });
            } else {
                alert("No se encuentra el id: " + id);
            }
        });
    }

    getAllCards() {
        return this.http.get("http://api.cardsandtokens.com/card").toPromise().then(result => {
            this.cards = <any[]>(<any>result).card;
            return this.cards;
        });
    }

    public getJSON(file) {
        console.log("getJSON()", file);
        return this.http.get(file).toPromise();
    }

}