import { Injectable, Type } from '@angular/core';
import { AlbumI } from './album.component';
import { SlotI } from '../slot/slot.component';
import { CntService } from '../../../services/cnt.service';

interface SlotMap {
    [key: string]: Slot;
}

interface Slot {
    ctrl:SlotI,
    index?:number,
    page?:number,
    slot?:number
}
interface Page {
    slots:Slot[],
    index?:number
}
interface Album {
    ctrl:AlbumI,
    pages:Page[],
    slots:SlotMap,
}

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    // Que tal si lo llamamos AlbumNavService??????

    album: Album;
    current: number;
    constructor(private cnt: CntService) {
        this.album = null;
        this.current = -1;
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
            pages: _pages,
            slots: {}
        }
    }

    public registerSlot(ctrl: SlotI, index:number, slot: number) {
        console.log("AlbumService.registerSlot()", arguments);
        console.assert(this.album.pages.length > this.current && this.current >= 0, arguments.toString());
        console.assert(this.album.pages[this.current].slots.length > index && index >= 0, arguments.toString());
        this.album.slots["s"+slot] = {
            ctrl:ctrl,
            index:index,
            page:this.current,
            slot:slot
        };
        this.album.pages[this.current].slots[index] = this.album.slots["s"+slot];
    }

    public unregisterSlot(slot: SlotI, page:number, index:number) {
        console.assert(this.album.pages.length > page && page > 0, arguments.toString());
        console.assert(this.album.pages[page].slots.length > index && index > 0, arguments.toString());        
        console.assert(this.album.pages[page].slots[index].ctrl == slot, this.album.pages[page].slots[index].ctrl.toString(), slot.toString());
        this.album.pages[page].slots[index] = {ctrl:null}
    }

    public setCollection(structure:any) {
        console.log("AlbumService.setCollection()", structure);

        for (var _slot in structure) {
            this.cnt.getCopyById(structure[_slot]).then((copy => {
                console.log("copy",copy);
            }));
        }
    }

    public setCurrentPage(page:number) {
        this.current = page;
    }
}
