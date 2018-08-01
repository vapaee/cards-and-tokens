import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { DraggableDirective } from './directives/drag-and-drop.directive';
import { DroppableDirective } from './directives/drag-and-drop.directive';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VapaeeUserService } from './services/vapaee-user.service';
import { UserdataService } from './services/userdata.service';
import { AppService } from './services/app.service';
import { CntService, CardDeploy } from './services/cnt.service';
import { BgBoxService } from './services/bg-box.service';
import { ComponentService } from './deploy/comp/component.service';
import { SteemService } from './services/steem.service';
import { ContainerService } from './services/container.service';
import { DragAndDropService, CardDragging } from './services/drag-and-drop.service';

import { HomePage } from './pages/home/home.page';
import { CardsPage } from './pages/cards/cards.page';
import { ProfilePage } from './pages/profile/profile.page';
import { CommingSoonPage } from './pages/comming-soon/comming-soon.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { LoadingPage } from './pages/loading/loading.page';
import { DeployCardPage } from './deploy/deploy-card.page';
import { DeployAlbumPage } from './deploy/deploy-album.page';
import { EditorPage } from './pages/editor/editor.page';
import { AlbumsPage } from './pages/albums/albums.page';
import { SteemConnectPage } from './pages/steem-connect/steem-connect.page';
import { InventoryPage } from './pages/inventory/inventory.page';


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
import { SlotComponent } from './deploy/comp/slot/slot.component';
import { InventoryComponent } from './deploy/comp/inventory/inventory.component';




const routes: Routes = [
  { path: 'embedded/card/:slug',  data: { state: "embedded-card", embedded: true }, component: DeployCardPage },
  { path: 'embedded/album/:slug', data: { state: "embedded-album", embedded: true }, component: DeployAlbumPage },
  { path: 'loading',              data: { state: "loading" }, component: LoadingPage },
  { path: 'steemconnect',         data: { state: "steemconnect" }, component: SteemConnectPage },
  { path: 'home',                 data: { state: "home" }, component: HomePage },
  { path: 'cards',                data: { state: "cards",  logged: false }, component: CardsPage },
  { path: 'profile',              data: { state: "profile", logged: false }, component: ProfilePage },
  { path: 'albums',               data: { state: "albums", logged: false }, component: AlbumsPage },
  { path: 'editor',               data: { state: "editor", logged: true }, component: CommingSoonPage /*EditorPage*/ },
  { path: 'inventory',            data: { state: "inventory", logged: true }, component: InventoryPage },
  { path: 'mastery',              data: { state: "mastery", logged: true }, component: CommingSoonPage },
  { path: 'market',               data: { state: "market", logged: true }, component: CommingSoonPage },
  { path: 'games',                data: { state: "games", logged: true }, component: CommingSoonPage },
  { path: 'deploy/card/:slug',    data: { state: "deploy-card",  logged: false }, component: CardsPage },
  { path: 'deploy/album/:slug',   data: { state: "deploy-album",  logged: false }, component: AlbumsPage },
  { path: '',
      redirectTo: '/home',
      pathMatch: 'full',
      data: { state:"redirect" }
  },
  { path: '**',                   data: { state: "404" }, component: NotFoundPage }
];

@NgModule({
  declarations: [
    AppComponent,
    DraggableDirective,
    DroppableDirective,
    HomePage,
    CardsPage,
    ProfilePage,
    NotFoundPage,
    CommingSoonPage,
    LoadingPage,
    DeployCardPage,
    DeployAlbumPage,
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
    CardDragging,
    AlbumsPage,
    AlbumComponent,
    SlotComponent,
    InventoryComponent,
    SteemConnectPage,
    InventoryPage
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
    CardDeploy,
    CardDragging,
    SlotComponent,
    InventoryComponent
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
    BgBoxService,
    AppService,
    ContainerService,
    ComponentService,
    SteemService,
    HttpClient,
    CookieService,
    DomService,
    DragAndDropService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
