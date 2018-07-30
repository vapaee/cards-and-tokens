import { Injectable } from '@angular/core';
import { CntService } from './cnt.service';
import { SlotI, Container, ContainerCtrl, Page, SlotMap } from './datatypes.service';

interface SwapInfo {
    ctrl: SlotI,
    index:number,
    slot:number,
    container:string,
    copy:any
}

@Injectable({
    providedIn: 'root'
})
export class ContainerService {
    slotFrom: SwapInfo;
    slotTo: SwapInfo;
    containers: {[key:string] : Container};
    constructor(private cnt: CntService) {
        this.containers = {};
    }

    public registerContainer(name: string, container: ContainerCtrl, pages:number[]) {
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

        this.containers[name] = {
            ctrl: container,
            pages: _pages,
            slots: _slots,
            current: -1
        }
    }

    public registerSlot(container: string, ctrl: SlotI, index:number, slot: number) {
        console.log("AlbumService.registerSlot()", arguments);
        console.assert(this.containers[container].pages.length > this.containers[container].current && this.containers[container].current >= 0, Array.prototype.map.call(arguments, e => e));
        console.assert(this.containers[container].pages[this.containers[container].current].slots.length > index && index >= 0, Array.prototype.map.call(arguments, e => e));
        let _slotid = "s"+slot;
        this.containers[container].slots[_slotid].ctrl = ctrl;
        this.containers[container].pages[this.containers[container].current].slots[index] = this.containers[container].slots["s"+slot];
        if (this.containers[container].slots[_slotid].copy) {
            ctrl.loadCopy(this.containers[container].slots[_slotid].copy);
        }
    }

    public unregisterSlot(container: string, slot: SlotI, page:number, index:number) {
        console.assert(this.containers[container].pages.length > page && page > 0, Array.prototype.map.call(arguments, e => e));
        console.assert(this.containers[container].pages[page].slots.length > index && index > 0, Array.prototype.map.call(arguments, e => e));        
        console.assert(this.containers[container].pages[page].slots[index].ctrl == slot, this.containers[container].pages[page].slots[index].ctrl.toString(), slot.toString());
        this.containers[container].pages[page].slots[index].ctrl = null;
    }

    public setContent(container:string, structure:any) {
        console.log("ContainerService.setContent()", container, structure, this.containers);
        console.assert(!!this.containers[container], Array.prototype.map.call(arguments, e => e));
        var list = [];
        for (var slot in structure) {
            var promise = this.loadSlotCopy(container, slot, structure[slot]);
            list.push(promise);
        }
        
        Promise.all(list).then(() => {
            for (var i in this.containers[container].slots) {
                console.log("-", i, this.containers[container].slots[i]);
                if (this.containers[container].slots[i].copy && this.containers[container].slots[i].ctrl) {
                    this.containers[container].slots[i].ctrl.loadCopy(this.containers[container].slots[i].copy);
                }
            }    
        });
    }

    private loadSlotCopy(container, slot, id) {
        // console.log("AlbumService.loadSlotCopy()", slot, id)
        this.cnt.getCopyById(id).then((copy => {
            // console.log("copy", copy);
            this.containers[container].slots[slot].copy = copy;
        }));
    }

    public setCurrentPage(container:string, page:number) {
        this.containers[container].current = page;
        console.assert(this.containers[container].pages.length > this.containers[container].current && this.containers[container].current >= 0, Array.prototype.map.call(arguments, e => e));
    }

    // dragging -----------------
    public setSwapFrom(container: string, ctrl: SlotI, index:number, slot: number, copy:any) {
        this.slotFrom = {
            ctrl: ctrl,
            index:index,
            slot:slot,
            container:container,
            copy:copy
        }
    }

    public setSwapTo(container: string, ctrl: SlotI, index:number, slot: number, copy:any) {
        this.slotTo = {
            ctrl: ctrl,
            index:index,
            slot:slot,
            container:container,
            copy:copy
        }
    }

    public makeSwap() {
        console.assert(!!this.slotFrom);
        console.assert(!!this.slotFrom.ctrl);
        console.assert(!!this.slotFrom.copy);
        console.assert(!!this.slotTo);
        console.assert(!!this.slotTo.ctrl);
        
        this.slotTo.ctrl.loadCopy(this.slotFrom.copy);
        this.slotFrom.ctrl.loadCopy(this.slotTo.copy);
        this.slotFrom = null;
        this.slotTo = null;

        console.log("ContainerService.makeSwap() DEBE PLASMAR EL CAMBIO EN LA BASE");
        // console.log("this.slotFrom:", [this.slotFrom], "this.slotTo:", [this.slotTo]);
    }


}
