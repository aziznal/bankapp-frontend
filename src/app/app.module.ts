import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot(),

    AppRoutingModule,
    SharedModule,
    PagesModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
