import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './body/main/main.component';
import { GalleryComponent } from './body/gallery/gallery.component';
import { AboutUsComponent } from './body/about-us/about-us.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { AuthorisationComponent } from './body/authorisation/authorisation.component';
import { LoginService } from './services/login.service';

import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
// import { UserRoleState } from './UserRoleState';
import { JwtModule } from '@auth0/angular-jwt';
import { CardPageComponent } from './card-page/card-page.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GalleryComponent,
    AboutUsComponent,
    NavComponent,
    FooterComponent,
    CardPageComponent,
    // AuthorisationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // NgxsModule.forRoot([UserRoleState]),
    // NgxsStoragePluginModule.forRoot(),

    // JwtModule.forRoot({})
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
