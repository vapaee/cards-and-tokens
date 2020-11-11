import { Component, OnInit, ComponentFactoryResolver, Renderer2, ElementRef, HostBinding, HostListener } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';

@Component({
    selector: 'scrolleable-comp',
    templateUrl: './scrolleable.component.html',
    styleUrls: ['./scrolleable.component.scss']
})
export class ScrolleableComponent extends BaseComponent implements OnInit {
    // https://stackoverflow.com/questions/44122081/how-to-dynamically-change-css-in-host-in-angular-2

    @HostBinding('style.height') height = '1px';
    
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private elRef: ElementRef
    ) {
        super(vapaee, app, cnt, cfResolver);
    }

    public static config(): any {
        return {

        };
    }

    public ngOnInit() {
        this.onResize(null);
        this.initResolve();
    }

    @HostListener('window:resize', ['$event'])
    onResize(e) {
        this.height = "1px";
        window.setTimeout(() => {
            var parentStyle = window.getComputedStyle(this.elRef.nativeElement.parentNode, null);
            var padding = parseInt(parentStyle.getPropertyValue('padding-top')) + parseInt(parentStyle.getPropertyValue('padding-bottom'));
            this.height = (this.elRef.nativeElement.parentNode.offsetHeight - padding) + "px";
            console.log("-> ",
                this.elRef.nativeElement.parentNode.offsetHeight,
                parentStyle.getPropertyValue('padding-top'),
                parentStyle.getPropertyValue('padding-bottom'),
                " = ", this.height);    
        },0);
    }
}