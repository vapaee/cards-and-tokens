import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VapaeeUserService } from './services/vapaee-user.service';
import { AppService } from './services/app.service';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'albums', component: CommingSoonComponent },
  { path: 'editor', component: CommingSoonComponent },
  { path: 'inventory', component: CommingSoonComponent },
  { path: 'mastery', component: CommingSoonComponent },
  { path: 'market', component: CommingSoonComponent },
  { path: 'games', component: CommingSoonComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    CommingSoonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    VapaeeUserService,
    AppService,
    HttpClient,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
