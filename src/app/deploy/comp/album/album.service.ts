import { Injectable, Type } from '@angular/core';
import { AlbumI } from './album.component';
import { SlotI } from '../slot/slot.component';
import { CntService } from '../../../services/cnt.service';
import { PopoverModule } from 'angular-bootstrap-md';

interface SlotMap {
    [key: string]: Slot;
}

interface Slot {
    ctrl:SlotI,
    index?:number,
    page?:number,
    slot?:number,
    copy?:any
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
        let _slot = 1;
        let _pages:Page[] = [];
        let _slots:SlotMap = {};
        for (let i=0; i<pages.length; i++) {
            let _page:Page = {
                slots: [],
                index: i
            };
            let _capacity:number = pages[i];
            for (var j=0; j<_capacity; j++, _slot++) {

                _slots["s"+_slot] = {
                    ctrl:null,
                    index:j,
                    page:i,
                    slot:_slot,
                    copy: null
                };
                _page.slots.push(_slots["s"+_slot]);
            }
            _pages.push(_page);
        }

        this.album = {
            ctrl: album,
            pages: _pages,
            slots: _slots
        }
    }

    public registerSlot(ctrl: SlotI, index:number, slot: number) {
        console.log("AlbumService.registerSlot()", arguments);
        console.assert(this.album.pages.length > this.current && this.current >= 0, arguments.toString());
        console.assert(this.album.pages[this.current].slots.length > index && index >= 0, arguments.toString());
        let _slotid = "s"+slot;
        this.album.slots[_slotid].ctrl = ctrl;
        this.album.pages[this.current].slots[index] = this.album.slots["s"+slot];
        if (this.album.slots[_slotid].copy) {
            ctrl.loadCopy(this.album.slots[_slotid].copy);
        }

    }

    public unregisterSlot(slot: SlotI, page:number, index:number) {
        console.assert(this.album.pages.length > page && page > 0, arguments.toString());
        console.assert(this.album.pages[page].slots.length > index && index > 0, arguments.toString());        
        console.assert(this.album.pages[page].slots[index].ctrl == slot, this.album.pages[page].slots[index].ctrl.toString(), slot.toString());
        this.album.pages[page].slots[index].ctrl = null;
    }

    public setCollection(structure:any) {
        console.log("AlbumService.setCollection()", structure, this.album);
        var list = [];
        for (var _slot in structure) {
            var promise = this.loadSlotCopy(_slot, structure[_slot]);
            list.push(promise);
        }
        
        Promise.all(list).then(() => {
            for (var i in this.album.slots) {
                console.log("-", i, this.album.slots[i]);
                if (this.album.slots[i].copy && this.album.slots[i].ctrl) {
                    this.album.slots[i].ctrl.loadCopy(this.album.slots[i].copy);
                }
            }    
        });
    }

    private loadSlotCopy(_slot, _id) {
        // console.log("AlbumService.loadSlotCopy()", _slot, _id)
        this.cnt.getCopyById(_id).then((copy => {
            // console.log("copy", copy);
            this.album.slots[_slot].copy = copy;
        }));
    }

    public setCurrentPage(page:number) {
        this.current = page;
    }
}
