import { Directive, Output, EventEmitter, HostListener, OnInit, Component, ElementRef } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop.service';
import { CntService } from '../services/cnt.service';
import { AppService } from '../services/app.service';
import { SlotComponent } from '../deploy/comp/slot/slot.component';

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective implements OnInit {
    mouseX: number;
    mouseY: number;

    constructor(private dnd:DragAndDropService, private cnt:CntService, private app: AppService, private component: SlotComponent) {
        if (app.isFirefox) {
            window.document.body.addEventListener("dragover", (event) => {
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
            });
        }
    }

    @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

    public target: HTMLElement;
    
    @HostListener('dragstart', ['$event']) onDragStart(e) {
        // console.log("DraggableDirective.onDragStart()", [e]);
        this.target = e.target;
        this.target.style.opacity = "0.2";
        e.dataTransfer.setDragImage(this.target,this.app.device.width*2,this.app.device.height*2);
        var isDraggable = this.component.isDraggable();
        // console.log("this.component.isDraggable()", isDraggable);
        if (isDraggable) {
            this.cnt.getCopyById(e.target.id.substr(5)).then(copy => {
                this.dnd.startDragging(e, this.component, e.target);
            });
        } else {
            this.target.style.opacity = "1";
            console.log(e);
        }
    }
    
    @HostListener('drag', ['$event']) onDrag(e) {
        // console.log("DraggableDirective.onDrag()", [e]);
        if (this.app.isFirefox) {
            var _e = Object.assign({}, e, {clientY: this.mouseY, clientX: this.mouseX});
            this.dnd.drag(_e);
        } else {
            this.dnd.drag(e);
        }
    }
    @HostListener('dragend', ['$event']) onDragEnd(e) {
        console.log("dragend", [e]);
        if (this.target) {
            this.target.style.opacity = "1";
            this.dnd.stopDragging(e);    
        }
    }

    ngOnInit(){
        // console.log("DraggableDirective.initialized");
    }
}

@Directive({
    selector: '[droppable]'
})
export class DroppableDirective implements OnInit {

    constructor(private dnd:DragAndDropService, private app: AppService, private component: SlotComponent) {
        // console.log("DROPPABLE:" , [this.component, this.target]);
    }

    @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

    public dragging: boolean;
    public loaded: boolean
    public imageLoaded: boolean;
    public imageSrc: string;
    public invalidFlag: boolean;
    @HostListener('drop', ['$event']) onProp(e) {
        console.log("drop", [e]);
    }
    @HostListener('dragover', ['$event']) onDragOver(e) {
        // console.log("DroppableDirective.onDragOver()", [this.component]);
        this.dnd.draggingOver(this.component);
        // this.component.draggingOver(this.dnd.getDraggingObject().copy);
        // console.log("DroppableDirective.onDragOver()", [e]);
    }
    @HostListener('dragenter', ['$event']) handleDragEnter(e) {
        // console.log("DroppableDirective.handleDragEnter()", [e]);
    }
    
    @HostListener('dragleave', ['$event']) handleDragLeave(e) {
        console.log("dragleave", [e]);

        // En algunos casos el 'dragleave' no es real.
        // Sigue estando sobre el objeto pero se ejecuta el 'dragleave' justo antes de 'dragend'

        // Como detectalo en Chrome
        if (this.app.isChrome && e.clientX == 0 && e.clientY == 0) {
            return;
        }

        // Como detectalo en Firefox
        if (this.app.isFirefox && e.buttons == 0) {
            return;
        }
        // var rect:ClientRect = this.component.placeholder.nativeElement.getBoundingClientRect();
        // console.log("DroppableDirective.handleDragLeave() POSTA !", e.clientX, e.clientY, [e.target]);
        this.dnd.dragLeave(this.component);
    }
    
    ngOnInit(){
        // console.log("DroppableDirective.initialized");
    }

}