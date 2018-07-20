import { Injectable, Type } from '@angular/core';
import { AlbumI } from './album.component';

interface SectionMap {
    [key: string]: {
        ctrl:AlbumI
    };
}

@Injectable({
    providedIn: 'root'
})


















/*
Que tal si lo llamamos AlbumNavService??????
*/
export class AlbumService {
    album: {ctrl:AlbumI};
    constructor() {
        this.album = null;
    }

    public registerAlbum(album: AlbumI) {
        this.album = {
            ctrl: album
        }
    }

}
