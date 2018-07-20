import { Component, OnInit, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { VapaeeUserService } from '../../../services/vapaee-user.service';
import { AppService } from '../../../services/app.service';
import { CntService } from '../../../services/cnt.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'video-comp',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent extends BaseComponent implements OnInit {
    player:any;
    url: SafeResourceUrl;
    
    constructor(
        public vapaee: VapaeeUserService,
        public app: AppService, 
        public cnt: CntService,
        private cfResolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private elRef: ElementRef,
        public sanitizer: DomSanitizer
    ) {
        super(vapaee, app, cnt, cfResolver);
        this.init();
        /*
        // Si quiero interactuar con el video tengo que hacer esto
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var that = this;
        (<any>window).onYouTubeIframeAPIReady = function() {
            that.init();
        }
        */
    }

    public init() {
        this.waitReady.then(() => {
            console.log("VIDEO AFTER READY");
            if (this.data.youtube) {
                console.assert(this.data.youtube.videoId, "ERROR: youtube params missing videoId", this.data.youtube);
                this.updateSrc();
                this.onResize();
            }
        });        
    }

    public static config(): any {
        return {

        };
    }

    onResize() {
        var target = this.elRef.nativeElement.querySelector(".embed-responsive");
        var ratio = 16/9;
        var maxHeight = this.elRef.nativeElement.offsetHeight - 2 * this.getPadding();
        var maxWidth = maxHeight * ratio;
        this.renderer.setStyle(target, 'max-width', maxWidth + "px");
    }

    getPadding() {
        return 50;
    }

    get getStyle(): any {
        return {
            "padding": this.data.padding || this.getPadding() + "px"
        }
    }

    updateSrc() {
        var src = "";
        if (this.data.youtube) {
            console.assert(this.data.youtube.videoId, "ERROR: youtube params missing videoId", this.data.youtube);
            src = "https://www.youtube.com/embed/" +
                this.data.youtube.videoId +
                "?autoplay=" + (this.data.youtube.autoplay || false) +
                "&amp;enablejsapi=1&amp;origin="+ window.location.origin +
                "&amp;widgetid=1";
        }
        // console.log("-------->", src, [src]);
        //return "https://www.youtube-nocookie.com/embed/4O9RSsvmYEI";
        //return "https://www.youtube.com/embed/Y0MuVQV0W0w?autoplay=false&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A4200&amp;widgetid=1";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        console.log(this.url, src);
        return this.url;
    }

}