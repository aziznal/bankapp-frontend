import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { BackButtonComponent } from './components/layout/back-button/back-button.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { AppSettingsService } from './services/app-settings.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    FooterComponent,
    NavbarComponent,
    BackButtonComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),

    AppRoutingModule,
    SharedModule,
    PagesModule,
  ],
  providers: [
    AuthService,
    CookieService,
    AppSettingsService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
