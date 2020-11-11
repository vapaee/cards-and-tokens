import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DomService } from './dom.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserdataService } from './userdata.service';

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
export class BgBoxService {
    public waitReady: Promise<void> = null;
    public waitData: Promise<void> = null;

    constructor(
        private http: HttpClient, 
        private data: DataService,
        public userdata: UserdataService
    ) {
        
    }

    getCopyById(id:number) {
        return new Promise<any>((resolve, reject) => {
            var copy = this.userdata.data.copy["id-"+id];
            resolve(copy);
        });
    }

    init() {
    }
}