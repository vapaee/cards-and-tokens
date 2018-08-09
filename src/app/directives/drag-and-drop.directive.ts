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
        });
    }
    
    @HostListener('drag', ['$event']) onDrag(e) {
        this.dnd.drag(e);
    }
    @HostListener('dragend', ['$event']) onDragEnd(e) {
        console.log("DraggableDirective.onDragEnd()", [e]);
        this.target.style.opacity = "1";
        this.dnd.stopDragging(e);
    }

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
    
    @HostListener('dragleave', ['$event']) handleDragLeave(e) {
        if (e.clientX == 0 && e.clientY == 0) {
            // En este caso el leave no es real. Sigue estando sobre el objeto pero por alguna razón ejecuta el 'dragleave' event
            return;
        }
        // var rect:ClientRect = this.component.placeholder.nativeElement.getBoundingClientRect();
        console.log("DroppableDirective.handleDragLeave()", e.clientX, e.clientY, [e.target]);
        this.dnd.dragLeave(this.component);
    }
    
    ngOnInit(){
        // console.log("DroppableDirective.initialized");
    }

}