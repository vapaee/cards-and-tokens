import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SectionService } from '../section/section.service';
import { AlbumService } from '../album/album.service';

@Component({
    selector: 'slot-comp',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss']
})
export class SlotComponent extends BaseComponent implements OnInit {
    
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private section: SectionService,
        private album: AlbumService
    ) {
        super(vapaee, app, cnt, cfResolver);

        this.init();
    }

    public init() {
        this.waitReady.then(() => {
            
        });
    }

    public static config(): any {
        return {

        };
    }

    public onMenuEntry(entry:any) {
        
        // this.album.HacerAlgo(data)

        // si está en modo "view" simplemente despliega la carta que esté en ese slot
        // si está en modo "fill" y tiene una carta, la regresa al inventario? startDragging?
        
    }

}


/*
  - hay que pensar si conviene registrar cada una de las cartas (al crearse la página, acordate que se crean y destruyen a demanda)
  - 

*/