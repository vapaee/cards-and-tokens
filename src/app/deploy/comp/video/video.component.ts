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
                this.onResize({});
            }
        });        
    }

    public static config(): any {
        return {

        };
    }

    onResize(e) {
        var target = this.elRef.nativeElement.querySelector(".embed-responsive");
        this.renderer.setStyle(target, 'max-width', "10px");
        this.renderer.setStyle(target, 'opacity', "0");

        setTimeout(_ => {
            var ratio = 16/9;
            var maxHeight = this.elRef.nativeElement.offsetHeight - 2 * this.getPadding();
            var maxWidth = maxHeight * ratio;
            if (this.app.device.width <= 380) {
                var old = maxWidth;
                maxWidth = this.app.device.width - 2 * this.getPadding();
                var marginLeft = (2*this.app.device.width-(375+maxWidth)) + "px";
                // console.log("AAAAAAAAAAAA", this.app.device.width-41, maxWidth-375, 2*this.app.device.width-(375+maxWidth), maxWidth+41);
                this.renderer.setStyle(target, 'margin-left', marginLeft);
            }
            
            this.renderer.setStyle(target, 'max-width', maxWidth + "px");
            this.renderer.setStyle(target, 'opacity', "1");
            
        }, 400);
    }

    getPadding() {
        if (this.app.device.width < 576) return 5;
        if (this.app.device.width < 768) return 20;
        if (this.app.device.width < 992) return 40;
        if (this.app.device.width < 1200) return 50;
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
