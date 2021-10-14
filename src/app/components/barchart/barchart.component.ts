import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent {
  @Input('data') data!: any[];

  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('svgElement') svgElement!: ElementRef<SVGElement>;

  constructor() {}
}
