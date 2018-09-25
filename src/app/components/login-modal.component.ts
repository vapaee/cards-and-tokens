import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CntService } from '../services/cnt.service';
import { SteemService } from '../services/steem.service';
import { VapaeeUserService } from '../services/vapaee-user.service';

@Component({
    selector: 'login-modal',
    styles: [
        ".vapaee-logo-container { background-color: #bed1c2; background-image: -moz-linear-gradient(top, #47584a 0%, #252c27 100%); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #47584a), color-stop(100%, #252c27)); background-image: -webkit-linear-gradient(top, #47584a 0%, #252c27 100%); background-image: -o-linear-gradient(top, #47584a 0%, #252c27 100%); background-image: -ms-linear-gradient(top, #47584a 0%, #252c27 100%); background-image: linear-gradient(to bottom, #47584a 0%, #252c27 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#47584a, endColorstr=#252c27, GradientType=0); }",
        ".steemconnect-logo-container { background: linear-gradient(135deg,#1a5099,#92d7fa); background-repeat: no-repeat; }",
        ".google-logo-container { background: linear-gradient(135deg,#C80000,#990000); background-repeat: no-repeat; }",
        ""
    ],
    template: `
        <div mdbModal #_modal="mdb-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myloginModalLabel" aria-hidden="true" [config]="{backdrop: true, ignoreBackdropClick: false}">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header"
                    [ngClass]="{'steemconnect-logo-container': config.header == 'steemconnect',
                            'google-logo-container': config.header == 'google',
                            'vapaee-logo-container': config.header == 'vapaee'}">
                    <div class="text-center animated fadeIn" style="width: 100%">
                        <br>
                        <img *ngIf="config.header == 'steemconnect'"
                                src="/assets/steemconnect-logo-white.svg" style="width: 250px">
                        <img *ngIf="config.header == 'vapaee'"
                                src="/assets/vapaee-logo.png" style="width: 250px">
                        <img *ngIf="config.header == 'google'"
                                src="/assets/google-logo-white.png" style="width: 250px">
                        <br>
                        <br>
                    </div>
                </div>
                <div class="modal-body">
                    <div id="icon-panel" class="text-center panel panel-default animated fadeIn">
                        <a *ngIf="config.header == 'steemconnect'" [href]="steem.url"><h4>Login with your steem account</h4></a>
                        <a *ngIf="config.header == 'google'" (click)="vapaee.login('google')"><h4>Login with your google account</h4></a>
                        <div *ngIf="config.header == 'vapaee'">
                            <h4>Login with any social account</h4>
                            <br>
                            <a class="margin-left" href="http://accounts.vapaee.com/index.php?route=extension/module/hybrid&amp;provider=Google&amp;redirect=aHR0cDovL2NhcmRzYW5kdG9rZW5zLmNvbS8=">
                                <img src="http://accounts.vapaee.com/image/themezee_social_icons/google.png" alt="Google" title="Google">
                            </a>
                            <a class="margin-left" href="http://accounts.vapaee.com/index.php?route=extension/module/hybrid&amp;provider=GitHub&amp;redirect=aHR0cDovL2NhcmRzYW5kdG9rZW5zLmNvbS8=">
                                <img src="http://accounts.vapaee.com/image/themezee_social_icons/github.png" alt="GitHub" title="GitHub">
                            </a>
                            <a class="margin-left" href="http://accounts.vapaee.com/index.php?route=extension/module/hybrid&amp;provider=Twitter&amp;redirect=aHR0cDovL2NhcmRzYW5kdG9rZW5zLmNvbS8=">
                                <img src="http://accounts.vapaee.com/image/themezee_social_icons/twitter.png" alt="Twitter" title="Twitter">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class LoginModalComponent {
    // @Input() config: any;
    config: any;
    @ViewChild('_modal') private loginModal;

    constructor(
        public steem: SteemService,
        public vapaee: VapaeeUserService
    ) {
        // console.log("LoginModalComponent()");
        this.config = {"header":""};
    }

    show(config:any){
        console.log("LoginModalComponent.show(config:any)", config);
        this.config = config;
        this.loginModal.show();
    }

    hide() {
        this.loginModal.hide();
    }
}

