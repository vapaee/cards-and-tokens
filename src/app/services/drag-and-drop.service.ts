import { Injectable, Component } from '@angular/core';
import { DomService } from './dom.service';

@Injectable()
export class DragAndDropService {
    public waitReady: Promise<void> = null;
    dragging:any;
    constructor(private dom: DomService) {
        this.dragging = null;
    }

    init(){
        this.waitReady = new Promise((resolve, reject) => {
            this.dom.appendComponentToBody(CardDragging);
            resolve();
        });        
    }

    startDragging(event, collectible, div:HTMLDivElement) {
        console.log("------------ startDragging -------------");
        console.log(event, collectible, div);
        console.log("-------------------------------------");
        var rect:ClientRect = div.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        var _dragging = <any>{};

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
            "background-image": "url("+collectible.edition.preview.images.fullsize+"), url("+collectible.edition.preview.images.thumbnail+")"
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
        // console.log("drag()",[e]);
    }

    stopDragging(e) {
        this.dragging = null;
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