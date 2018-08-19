import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";

@Component({
  selector: 'privacy-policy-page',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss']
})
export class PrivacyPolicyPage implements OnInit {

  constructor(public vapaee: VapaeeUserService, public app: AppService) {
  }
  
  ngOnInit() {
  }

}
