import { Directive, Output, EventEmitter, HostListener, OnInit, Component, ElementRef } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop.service';
import { CntService } from '../services/cnt.service';
import { AppService } from '../services/app.service';
import { SlotComponent } from '../deploy/comp/slot/slot.component';

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective implements OnInit {

    constructor(private dnd:DragAndDropService, private cnt:CntService, private app: AppService, private component: SlotComponent) {
        
    }

    @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

    public target: HTMLElement;
    
    @HostListener('dragstart', ['$event']) onDragStart(e) {
        console.log("DraggableDirective.onDragStart()", [e]);
        
        this.target = e.target;
        this.target.style.opacity = "0";
        e.dataTransfer.setDragImage(this.target,this.app.device.width,this.app.device.height);
        this.cnt.getCopyById(e.target.id.substr(5)).then(copy => {
            this.dnd.startDragging(e, this.component, e.target);
            
            // this.component.startDragging();
        });
    }
    
    @HostListener('drag', ['$event']) onDrag(e) {
        // console.log("DraggableDirective.onDrag()", [e]);
        this.dnd.drag(e);
    }
    @HostListener('dragend', ['$event']) onDragEnd(e) {
        console.log("DraggableDirective.onDragEnd()", [e]);
        this.target.style.opacity = "1";
        // this.component.drop();
        this.dnd.stopDragging(e);
    }
    /*
    @HostListener('mouseover', ['$event']) onMouseOver(e) {
        var self = this;
        var handler = function(e) {
            console.log("--- HANDLER ---", [e, this]);
            var crt: HTMLElement = <HTMLElement>(this.cloneNode(true));
            e.dataTransfer.setDragImage(crt, 300, 500);
            e.target.removeEventListener("dragstart", handler, false);
        }
        if (!e.target.drag_handled) {
            console.log("-- SET DRAGGABLE -- ", e.target);
            e.target.addEventListener("dragstart", handler, false);
            e.target.drag_handled = true;
        }
        
    }
    */
    ngOnInit(){
        console.log("DraggableDirective.initialized");
    }
}

@Directive({
    selector: '[droppable]'
})
export class DroppableDirective implements OnInit {

    constructor(private dnd:DragAndDropService, private component: SlotComponent) {
        // console.log("DROPPABLE:" , [this.component, this.target]);
    }

    @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

    public dragging: boolean;
    public loaded: boolean
    public imageLoaded: boolean;
    public imageSrc: string;
    public invalidFlag: boolean;

    @HostListener('dragover', ['$event']) onDragOver(e) {
        this.dnd.draggingOver(this.component);
        // this.component.draggingOver(this.dnd.getDraggingObject().copy);
        // console.log("DroppableDirective.onDragOver()", [e]);
    }
    @HostListener('dragenter', ['$event']) handleDragEnter(e) {
        // console.log("DroppableDirective.handleDragEnter()", [e]);
    }
    /*
    @HostListener('dragleave', ['$event']) handleDragLeave(e) {
        console.log("DroppableDirective.handleDragLeave()", [e]);
        this.dnd.dragLeave(this.component);
    }
    */
    @HostListener('mouseleave', ['$event']) handleMouseLeave(e) {
        console.log("DroppableDirective.handleMouseLeave()");
        this.dnd.dragLeave(this.component);
    }
    /*
    @HostListener('drop', ['$event']) handleDrop(e) {
        console.log("DroppableDirective.handleDrop()", [e]);
        e.preventDefault();
        this.component.drop(this.dnd.getDraggingObject().copy);
    }
    */

    ngOnInit(){
        // console.log("DroppableDirective.initialized");
    }

}