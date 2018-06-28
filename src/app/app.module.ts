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


import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { CommingSoonPage } from './comming-soon/comming-soon.page';
import { NotFoundPage } from './not-found/not-found.page';
import { LoadingPage } from './loading/loading.page';
import { DeployPage } from './deploy/deploy.page';
import { RootPage } from './root/root.page';
import { EditorPage } from './editor/editor.page';


import { ComponentHost } from './deploy/comp/comp';
// import { BaseComponent } from './deploy/comp/base/base.component';
import { RootComponent } from './deploy/comp/root/root.component';
import { RowThreeComponent } from './deploy/comp/row-three/row-three.component';
import { PlaceHolderComponent } from './deploy/comp/place-holder/place-holder.component';
import { BackgroundComponent } from './deploy/comp/background/background.component';
import { ScrolleableComponent } from './deploy/comp/scrolleable/scrolleable.component';





const routes: Routes = [
  { path: 'deploy',    data: { state: "deploy" }, component: DeployPage },
  { path: 'loading',   data: { state: "loading" }, component: LoadingPage },
  { path: '',          data: { state: "root" }, component: RootPage,
    children: [
        { path: 'home',      data: { state: "home" }, component: HomePage },
        { path: 'profile',   data: { state: "profile", logged: true }, component: ProfilePage },
        { path: 'albums',    data: { state: "albums", logged: true }, component: CommingSoonPage },
        { path: 'editor',    data: { state: "editor", logged: true }, component: EditorPage },
        { path: 'inventory', data: { state: "inventory", logged: true }, component: CommingSoonPage },
        { path: 'mastery',   data: { state: "mastery", logged: true }, component: CommingSoonPage },
        { path: 'market',    data: { state: "market", logged: true }, component: CommingSoonPage },
        { path: 'games',     data: { state: "games", logged: true }, component: CommingSoonPage },
        { path: '',
            redirectTo: '/home',
            pathMatch: 'full',
            data: { state:"redirect" }
        },
        { path: '**',        data: { state: "404" }, component: NotFoundPage }
    ]
  },
  { path: '**',        data: { state: "404" }, component: NotFoundPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ProfilePage,
    NotFoundPage,
    CommingSoonPage,
    LoadingPage,
    DeployPage,
    RootPage,
    EditorPage,
    ComponentHost,
    RootComponent,
    RowThreeComponent,
    PlaceHolderComponent,
    BackgroundComponent,
    ScrolleableComponent
  ],
  entryComponents: [
    RootComponent,
    RowThreeComponent,
    PlaceHolderComponent,
    BackgroundComponent,
    ScrolleableComponent
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
