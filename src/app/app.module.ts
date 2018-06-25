import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VapaeeUserService } from './services/vapaee-user.service';
import { AppService } from './services/app.service';
import { CntService } from './services/cnt.service';
import { ComponentService } from './deploy/comp/component.service';


import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { DeployComponent } from './deploy/deploy.component';
import { MainComponent } from './main/main.component';
import { EditorComponent } from './editor/editor.component';
import { ComponentHost } from './deploy/comp/comp';
import { TestComponent } from './deploy/comp/test/test.component';
import { TestVideoComponent } from './deploy/comp/test-video/test-video.component';





const routes: Routes = [
  { path: 'deploy',    data: { state: "deploy" }, component: DeployComponent },
  { path: 'loading',   data: { state: "loading" }, component: LoadingComponent },
  { path: '',          data: { state: "main" }, component: MainComponent,
    children: [
        { path: 'home',      data: { state: "home" }, component: HomeComponent },
        { path: 'profile',   data: { state: "profile", logged: true }, component: ProfileComponent },
        { path: 'albums',    data: { state: "albums", logged: true }, component: CommingSoonComponent },
        { path: 'editor',    data: { state: "editor", logged: true }, component: EditorComponent },
        { path: 'inventory', data: { state: "inventory", logged: true }, component: CommingSoonComponent },
        { path: 'mastery',   data: { state: "mastery", logged: true }, component: CommingSoonComponent },
        { path: 'market',    data: { state: "market", logged: true }, component: CommingSoonComponent },
        { path: 'games',     data: { state: "games", logged: true }, component: CommingSoonComponent },
        { path: '',
            redirectTo: '/home',
            pathMatch: 'full',
            data: { state:"redirect" }
        },
        { path: '**',        data: { state: "404" }, component: PageNotFoundComponent }
    ]
  },
  { path: '**',        data: { state: "404" }, component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    CommingSoonComponent,
    LoadingComponent,
    DeployComponent,
    MainComponent,
    EditorComponent,
    ComponentHost,
    TestComponent,
    TestVideoComponent
  ],
  entryComponents: [
    TestComponent,
    TestVideoComponent
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
    CntService,
    AppService,
    ComponentService,
    HttpClient,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
