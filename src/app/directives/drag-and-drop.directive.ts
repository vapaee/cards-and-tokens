import { Directive, Output, EventEmitter, HostListener, OnInit, Component } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop.service';
import { CntService } from '../services/cnt.service';
import { AppService } from '../services/app.service';

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective implements OnInit {

    constructor(private dnd:DragAndDropService, private cnt:CntService, private app: AppService) {
        
    }

    @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

    public target: HTMLElement;
    


    /*
    @HostListener('mousedown', ['$event']) onMouseDown(e) {
        this.mousedown = true;
        console.log("DOWN", [e]);
    }
    @HostListener('mouseup', ['$event']) onMouseUp(e) {
        this.mousedown = false;
        console.log("UP", [e]);
        this.dnd.stopDragging(e);
    }
    @HostListener('mousemove', ['$event']) onMouseMove(e) {
        console.log("mousemove", this.mousedown, !!this.dnd.dragging, [e]);
        if (this.mousedown) {
            this.mousedown = false;
            this.cnt.getCopyCollectible(e.target.id.substr(5)).then(collectible => {
                this.dnd.startDragging(e, collectible, e.target);
            });            
        }
    }
    @HostListener('click', ['$event']) onClick(e) {
        console.log("click", [e]);
    }
*/



    
    @HostListener('dragstart', ['$event']) onDragStart(e) {
        console.log("DraggableDirective.onDragStart()", [e]);
        this.target = e.target;
        this.target.style.opacity = "0";
        e.dataTransfer.setDragImage(this.target,this.app.device.width,this.app.device.height);
        /*
        var copy:HTMLElement = e.target.cloneNode(true);
        copy.style.display = "none";
        copy.style.backgroundColor = "red";
        document.body.appendChild(copy);
        e.dataTransfer.setDragImage(copy,0,0);
        */
        /*
        var img = document.createElement("img");
        img.src = "http://kryogenix.org/images/hackergotchi-simpler.png";
        e.dataTransfer.setDragImage(img, 0, 0);
        */

        this.cnt.getCopyCollectible(e.target.id.substr(5)).then(collectible => {
            this.dnd.startDragging(e, collectible, e.target);
        });
    }
    
    @HostListener('drag', ['$event']) onDrag(e) {
        console.log("DraggableDirective.onDrag()", [e]);
        this.dnd.drag(e);
    }
    @HostListener('dragend', ['$event']) onDragEnd(e) {
        console.log("DraggableDirective.onDragEnd()", [e]);
        this.target.style.opacity = "1";
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

    @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

    public dragging: boolean;
    public loaded: boolean
    public imageLoaded: boolean;
    public imageSrc: string;
    public invalidFlag: boolean;

    @HostListener('dragover', ['$event']) onDragOver(e) {
        console.log("DroppableDirective.onDragOver()", [e]);
    }
    @HostListener('dragenter', ['$event']) handleDragEnter(e) {
        console.log("DroppableDirective.handleDragEnter()", [e]);
    }
    @HostListener('dragleave', ['$event']) handleDragLeave(e) {
        console.log("DroppableDirective.handleDragLeave()", [e]);
    }
    @HostListener('drop', ['$event']) handleDrop(e) {
        console.log("DroppableDirective.handleDrop()", [e]);
        e.preventDefault();
    }

    ngOnInit(){
        console.log("DroppableDirective.initialized");
    }

}