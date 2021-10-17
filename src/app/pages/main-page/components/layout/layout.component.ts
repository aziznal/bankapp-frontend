import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() {}

  toggleSidenav() {
    console.log(this.sidenav)
    this.sidenav.toggle();
    console.log("toggled sidenav!")
  }
}
