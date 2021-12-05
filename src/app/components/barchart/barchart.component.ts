import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import * as d3 from 'd3';
import * as moment from 'moment';

/**
 * a customized component that makes a simple animated horizontal barchart
 *
 * @export
 * @class BarchartComponent
 */
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent implements AfterViewInit {
  /**
   * The data fed into the barchart.
   *
   * @type {any[]}
   * @memberof BarchartComponent
   */
  @Input('data') data!: any[];

  /**
   * The x-axis label of the data
   *
   * @type {string}
   * @memberof BarchartComponent
   */
  @Input('x') x!: string;

  /**
   * The y-axis label of the data
   *
   * @type {string}
   * @memberof BarchartComponent
   */
  @Input('y') y!: string;

  /**
   * The unit displayed for the y-axis when a tooltip is hovered on etc.
   *
   * @type {string}
   * @memberof BarchartComponent
   */
  @Input('yUnit') yUnit: string = 'TL';

  /**
   * The width of the barchart (in pixels)
   *
   * @type {number}
   * @memberof BarchartComponent
   */
  @Input('width') width!: number;

  /**
   * The height of the barchart (in pixels)
   *
   * @type {number}
   * @memberof BarchartComponent
   */
  @Input('height') height!: number;

  /**
   * The HTML element that encapsualtes the entire barchart
   *
   * @type {ElementRef<HTMLDivElement>}
   * @memberof BarchartComponent
   */
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  /**
   * Creates the barchart if data has been passed into it as input
   *
   * @memberof BarchartComponent
   */
  ngAfterViewInit(): void {
    if (this.data) {
      this.makeChart();
    }
  }

  /**
   * Creates the tooltip which is displayed when a bar is hovered on
   *
   * @return {*}  {d3.Selection<any, any, any, any>}
   * @memberof BarchartComponent
   */
  createTooltipElement(): d3.Selection<any, any, any, any> {
    let tooltip = d3
      .select(this.chartContainer.nativeElement)
      .append('span')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden')
      .style('background-color', '#2F2F2F')
      .style('border-radius', '10px')
      .style('padding', '10px')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .style('position', 'fixed')
      .style('z-index', 10);

    return tooltip;
  }

  /**
   * Sets listeners to show, move, and hide tooltip depending on mouse events
   *
   * @param {d3.Selection<any, any, any, unknown>} svg
   * @memberof BarchartComponent
   */
  setupTooltipEvents(svg: d3.Selection<any, any, any, unknown>) {
    let self = this;
    let tooltip = this.createTooltipElement();

    /// For the three functions below, `bar` is the bar in the chart which is
    /// currently being hovered on by the mouse.
    function showTooltip(bar: any, event: MouseEvent, d: any) {
      // Keep Tooltip next to mouse cursor
      tooltip
        .style('visibility', 'visible')
        .text(
          `${d[self.y]} ${self.yUnit} - ${moment(d[self.x]).format(
            'YYYY-MM-DD @HH:MM'
          )}`
        )
        .style('color', 'white');
    }

    function moveTooltip(bar: any, event: MouseEvent, d: any) {
      tooltip
        .style('top', `${event.clientY - 35}px`)
        .style('left', `${event.clientX + 20}px`);
    }

    function hideTooltip(bar: any, event: MouseEvent, d: any) {
      tooltip.style('visibility', 'hidden');
    }

    // Assigning the above-defined functions to each bar of the barchart
    svg
      .selectAll('rect')
      .on('mouseover', function (event, d) {
        showTooltip(this, event, d);
      })
      .on('mouseout', function (event, d) {
        hideTooltip(this, event, d);
      })
      .on('mousemove', function (event, d) {
        moveTooltip(this, event, d);
      });
  }

  /**
   * Creates / inits all components of the barchart.
   *
   * @memberof BarchartComponent
   */
  makeChart() {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 100, left: 50 };
    (this.width = this.width - margin.left - margin.right),
      (this.height = this.height - margin.top - margin.bottom);

    // append the svg object to the body of the page
    let svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    const Axis = d3
      .scaleBand()
      .range([0, this.width])
      .domain(this.data.map((d) => d[this.x].toString().substring(0, 15)))
      .padding(0.2);

    svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(Axis))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    const yAxis = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => Math.abs(d[this.y]))! * 1.1])
      .range([this.height, 0]);

    svg.append('g').call(d3.axisLeft(yAxis));

    // Bars
    svg
      .selectAll('mybar')
      .data(this.data)
      .join('rect')
      .attr('x', (d: any) => Axis(d[this.x].toString().substring(0, 15)) || '')
      .attr('width', Axis.bandwidth())
      .attr('fill', (d) => (d.amount > 0 ? '#673ab7' : '#fbc02d'))
      .attr(this.x, (d) => d[this.x])
      .attr(this.y, (d) => Math.abs(d[this.y]))
      // no bar at the beginning thus:
      .attr('height', (d) => this.height - yAxis(0)) // always equal to 0
      .attr('y', (d) => yAxis(0));

    // Animation
    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', (d: any) => yAxis(Math.abs(d[this.y])))
      .attr('height', (d: any) => this.height - yAxis(Math.abs(d[this.y])))
      .delay((d, i) => {
        return i * 100;
      });

    this.setupTooltipEvents(svg);
  }
}
