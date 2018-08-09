import { Injectable, Component } from '@angular/core';
import { DomService } from './dom.service';
import { SlotComponent } from '../deploy/comp/slot/slot.component';
import { CntService } from './cnt.service';

@Injectable()
export class DragAndDropService {
    public waitReady: Promise<void> = null;
    dragging:any;
    fromComp: SlotComponent;
    toComp: SlotComponent;

    constructor(private dom: DomService, public cnt: CntService) {
        this.dragging = null;
    }

    init(){
        this.waitReady = new Promise((resolve, reject) => {
            this.dom.appendComponentToBody(CardDragging);
            resolve();
        });        
    }

    startDragging(event, slot: SlotComponent, div:HTMLDivElement) {
        console.log("------------ startDragging -------------");
        console.log(event, slot, div);
        console.log("-------------------------------------");
        this.fromComp = slot;
        
        var rect:ClientRect = div.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        var _dragging = <any>{};
        _dragging.copy = slot.copy;
        _dragging.target = div;
        _dragging.front = <any>{};
        _dragging.front.init = {
            x: event.clientX,
            y: event.clientY,
            rect: rect,
            offset: {
                y: rect.top - event.clientY,
                x: rect.left - event.clientX
            }
        }
        _dragging.front.style = {
            "z-index": "11",
            // "opacity": "0",
            "top": rect.top + "px",
            "left": rect.left + "px",
            "height": rect.height + "px",
            "width": rect.width + "px",
            "position": "fixed",
            "display": "block",
            "pointer-events": "none",
            "background-size": "contain",
            "background-image": "url("+_dragging.copy.edition.preview.images.fullsize+"), url("+_dragging.copy.edition.preview.images.thumbnail+")"
        }
        this.dragging = _dragging;
        console.log([this.dragging]);
        console.log("-------------------------------------");
    }

    drag(e) {
        if (this.dragging) {
            this.dragging.front.style.top = (e.clientY + this.dragging.front.init.offset.y + 0) + "px";
            this.dragging.front.style.left = (e.clientX + this.dragging.front.init.offset.x + 3) + "px";
        }
    }

    getDraggingObject() {
        return this.dragging;
    }

    dragLeave(to:SlotComponent) {
        // console.log("DragAndDropService.dragLeave()",[this.dragging]);
        if (!this.dragging) return;
        to.dragLeave();
        if (to == this.toComp) {
            this.toComp = null;
            console.log("DragAndDropService.dragLeave()",to.data);
        }
    }

    draggingOver(to:SlotComponent) {
        if (this.toComp == to) return;
        if (to.acceptsDrop(this.dragging.copy)) {
            this.toComp = to;
            console.log("DragAndDropService.draggingOver()", [to.data]);
        }
    }

    stopDragging(e) {
        this.toComp.dragLeave();
        this.dragging = null;
        this.cnt.swapSlots(this.fromComp.data.container, this.fromComp.data.index, this.toComp.data.container, this.toComp.data.index).then(() => {
            this.fromComp = null;
            this.toComp = null;
        });
        console.log("stopDragging()",[e]);
    }
}




@Component({
    selector: 'card-dragging',
    template: `
    <div *ngIf="dnd.dragging">
        <card-front [ngStyle]="dnd.dragging.front.style">
            
        </card-front>
    </div>`
})
export class CardDragging {
    constructor(public dnd:DragAndDropService) {

    }
}