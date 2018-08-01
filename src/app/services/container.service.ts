import { Injectable } from '@angular/core';
import { CntService } from './cnt.service';
import { SlotI, Container, ContainerCtrl, Page, SlotMap } from './datatypes.service';

interface SwapInfo {
    ctrl: SlotI,
    index:number,
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
        console.log("AlbumService.registerContainer()", arguments);
        let _slot = 0;
        let _pages:Page[] = [];
        let _slots:SlotMap = {};
        for (let i=0; i<pages.length; i++) {
            let _page:Page = {
                slots: [],
                index: i
            };
            let _capacity:number = pages[i];
            for (var j=0; j<_capacity; j++, _slot++) {

                _slots["slot-"+_slot] = {
                    ctrl:null,
                    index:j,
                    page:i,
                    slot:_slot,
                    copy: null
                };
                _page.slots.push(_slots["slot-"+_slot]);
            }
            _pages.push(_page);
        }

        this.containers[name] = {
            ctrl: container,
            // pages: _pages,
            slots: _slots,
            current: -1
        }
    }

    public registerSlot(container: string, ctrl: SlotI, index:number) {
        console.log("AlbumService.registerSlot()", arguments);
        //console.assert(this.containers[container].pages.length > this.containers[container].current && this.containers[container].current >= 0, Array.prototype.map.call(arguments, e => e));
        //console.assert(this.containers[container].pages[this.containers[container].current].slots.length > index && index >= 0, Array.prototype.map.call(arguments, e => e));
        let _slotid = "slot-"+index;
        this.containers[container].slots[_slotid].ctrl = ctrl;
        if (this.containers[container].slots[_slotid].copy) {
            ctrl.loadCopy(this.containers[container].slots[_slotid].copy);
        }
    }

    public setContent(container:string, container_id:number, slots:any[]) {
        console.log("ContainerService.setContent()", container, slots, this.containers);
        console.assert(!!this.containers[container], Array.prototype.map.call(arguments, e => e));
        this.containers[container].id = container_id;
        var list = [];
        for (var slot in slots) {
            var promise = this.loadSlotCopy(container, slots[slot]);
            list.push(promise);
        }
        
        Promise.all(list).then(() => {
            console.log("ContainerService.setContent()", container, "Promise.all...");
            for (var i in this.containers[container].slots) {
                console.log("ContainerService.setContent()", container, "-", i, this.containers[container].slots[i]);
                if (this.containers[container].slots[i].copy && this.containers[container].slots[i].ctrl) {
                    this.containers[container].slots[i].ctrl.loadCopy(this.containers[container].slots[i].copy);
                }
            }    
        });
    }

    public print() {
        console.log(this.containers);
    }

    private loadSlotCopy(container, slot) {
        console.log("ContainerService.loadSlotCopy()", [container, slot]);
        
        return this.cnt.getCopyById(slot.item.id).then((copy => {
            return this.containers[container].slots["slot-"+slot.index].copy = copy;
        }));
    }

    public setCurrentPage(container:string, page:number) {
        this.containers[container].current = page;
    }

    // dragging -----------------
    public setSwapFrom(container: string, ctrl: SlotI, index:number, copy:any) {
        this.slotFrom = {
            ctrl: ctrl,
            index:index,
            container:container,
            copy:copy
        }
    }

    public setSwapTo(container: string, ctrl: SlotI, index:number, copy:any) {
        this.slotTo = {
            ctrl: ctrl,
            index:index,
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
        var from = this.containers[this.slotFrom.container].id;
        var to = this.containers[this.slotTo.container].id;
        this.cnt.swapSlots(from, this.slotFrom.index, to, this.slotTo.index).then(() => {
            var copy_from = this.containers[this.slotFrom.container].slots["slot-"+this.slotFrom.index].copy;
            var copy_to = this.containers[this.slotTo.container].slots["slot-"+this.slotTo.index].copy;
            this.containers[this.slotFrom.container].slots["slot-"+this.slotFrom.index].copy = copy_to;
            this.containers[this.slotTo.container].slots["slot-"+this.slotTo.index].copy = copy_from;
            this.slotFrom = null;
            this.slotTo = null;
        });
    }


}
