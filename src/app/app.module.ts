import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VapaeeUserService } from './services/vapaee-user.service';
import { UserdataService } from './services/userdata.service';
import { AppService } from './services/app.service';
import { CntService, CardDeploy } from './services/cnt.service';
import { ComponentService } from './deploy/comp/component.service';


import { HomePage } from './home/home.page';
import { CardsPage } from './cards/cards.page';
import { ProfilePage } from './profile/profile.page';
import { CommingSoonPage } from './comming-soon/comming-soon.page';
import { NotFoundPage } from './not-found/not-found.page';
import { LoadingPage } from './loading/loading.page';
import { DeployCardPage } from './deploy/deploy-card.page';
import { DeployAlbumPage } from './deploy/deploy-album.page';
import { RootPage } from './root/root.page';
import { EditorPage } from './editor/editor.page';
import { AlbumsPage } from './albums/albums.page';


import { ComponentHost } from './deploy/comp/comp';
// import { BaseComponent } from './deploy/comp/base/base.component';
import { RootComponent } from './deploy/comp/root/root.component';
import { RowThreeComponent } from './deploy/comp/row-three/row-three.component';
import { PlaceHolderComponent } from './deploy/comp/place-holder/place-holder.component';
import { BackgroundComponent } from './deploy/comp/background/background.component';
import { ScrolleableComponent } from './deploy/comp/scrolleable/scrolleable.component';
import { VideoComponent } from './deploy/comp/video/video.component';
import { MarkDownComponent } from './deploy/comp/markdown/markdown.component';
import { SectionComponent } from './deploy/comp/section/section.component';
import { MenuComponent } from './deploy/comp/menu/menu.component';
import { FloatComponent } from './deploy/comp/float/float.component';
import { DomService } from './services/dom.service';
import { AlbumComponent } from './deploy/comp/album/album.component';






const routes: Routes = [
  { path: 'embedded/card/:slug',    data: { state: "embedded-card" }, component: DeployCardPage },
  { path: 'embedded/album/:slug',    data: { state: "embedded-album" }, component: DeployAlbumPage },
  { path: 'loading',   data: { state: "loading" }, component: LoadingPage },
  { path: '',          data: { state: "root" }, component: RootPage,
    children: [
        { path: 'home',      data: { state: "home" }, component: HomePage },
        { path: 'cards',     data: { state: "cards",  logged: false }, component: CardsPage },
        { path: 'profile',   data: { state: "profile", logged: true }, component: ProfilePage },
        { path: 'albums',    data: { state: "albums", logged: false }, component: AlbumsPage },
        { path: 'editor',    data: { state: "editor", logged: true }, component: EditorPage },
        { path: 'inventory', data: { state: "inventory", logged: true }, component: CommingSoonPage },
        { path: 'mastery',   data: { state: "mastery", logged: true }, component: CommingSoonPage },
        { path: 'market',    data: { state: "market", logged: true }, component: CommingSoonPage },
        { path: 'games',     data: { state: "games", logged: true }, component: CommingSoonPage },
        { path: 'deploy/card/:slug',
            data: { state: "deploy-card",  logged: false }, component: CardsPage },
        { path: 'deploy/album/:slug',
            data: { state: "deploy-album",  logged: false }, component: AlbumsPage },
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
    CardsPage,
    ProfilePage,
    NotFoundPage,
    CommingSoonPage,
    LoadingPage,
    DeployCardPage,
    DeployAlbumPage,
    RootPage,
    EditorPage,
    ComponentHost,
    RootComponent,
    RowThreeComponent,
    PlaceHolderComponent,
    BackgroundComponent,
    ScrolleableComponent,
    VideoComponent,
    MarkDownComponent,
    SectionComponent,
    MenuComponent,
    FloatComponent,
    CardDeploy,
    AlbumsPage,
    AlbumComponent
  ],
  entryComponents: [
    RootComponent,
    RowThreeComponent,
    PlaceHolderComponent,
    BackgroundComponent,
    ScrolleableComponent,
    VideoComponent,
    MarkDownComponent,
    SectionComponent,
    MenuComponent,
    FloatComponent,
    AlbumComponent,
    CardDeploy
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    MDBBootstrapModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    VapaeeUserService,
    UserdataService,
    CntService,
    AppService,
    ComponentService,
    HttpClient,
    CookieService,
    DomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
