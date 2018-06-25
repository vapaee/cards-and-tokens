import { Component, OnInit } from '@angular/core';
import { VapaeeUserService } from "../services/vapaee-user.service";
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.css']
})
export class NotFoundPage implements OnInit {

  constructor(public vapaee: VapaeeUserService, public app: AppService) {
  }

  ngOnInit() {
  }

}
