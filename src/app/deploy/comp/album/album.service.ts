import { Injectable, Type } from '@angular/core';
import { AlbumI } from './album.component';
import { SlotI } from '../slot/slot.component';

interface SectionMap {
    [key: string]: {
        ctrl:AlbumI
    };
}

interface Slot {
    ctrl:SlotI,
    index?:number,
    page?:number
}
interface Page {
    slots:Slot[],
    index?:number
}
interface Album {
    ctrl:AlbumI,
    pages:Page[]
}

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    // Que tal si lo llamamos AlbumNavService??????

    album: Album;
    constructor() {
        this.album = null;
    }

    public registerAlbum(album: AlbumI, pages:number[]) {
        let _pages:Page[] = [];
        for (let i=0; i<pages.length; i++) {
            let _page:Page = {
                slots: [],
                index: i
            };
            let _slots:number = pages[i];
            for (var j=0; j<_slots; j++) {
                _page.slots.push({
                    ctrl:null
                });
            }
            _pages.push(_page);
        }
        this.album = {
            ctrl: album,
            pages: _pages
        }
    }

    public registerSlot(slot: SlotI, index:number, page:number) {
        console.assert(this.album.pages.length > page && page > 0, arguments.toString());
        console.assert(this.album.pages[page].slots.length > index && index > 0, arguments.toString());
        this.album.pages[page].slots[index].ctrl = slot;
        this.album.pages[page].slots[index].index = index;
        this.album.pages[page].slots[index].page = page;
    }

    public unregisterSlot(album: SlotI, index:number, page:number) {
        console.assert(this.album.pages.length > page && page > 0, arguments.toString());
        console.assert(this.album.pages[page].slots.length > index && index > 0, arguments.toString());        
        this.album.pages[page].slots[index] = {ctrl:null}
    }


}
