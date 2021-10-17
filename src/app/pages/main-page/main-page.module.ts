import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageContentComponent } from './components/main-page-content/main-page-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  imports: [MaterialModule, SharedModule],
  declarations: [LayoutComponent, NavbarComponent, FooterComponent, MainPageContentComponent, SidenavComponent],
  exports: [],
})
export class MainPageModule {}
