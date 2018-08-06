import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../../services/vapaee-user.service";
import { AppService } from "../../services/app.service";

@Component({
  selector: 'root-page',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.css']
})
export class RootPage implements OnInit {

  constructor(public vapaee: VapaeeUserService, public app: AppService) {
  }
  
  ngOnInit() {
  }

}
