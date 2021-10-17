import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent {
  @Input('data') data!: any[];
  @Input('x') x!: string;
  @Input('y') y!: string;

  @Input('width') width!: number;
  @Input('height') height!: number;

  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit() {
    if (this.data) {
      this.makeChart();
    }
  }

  createTooltipElement(): d3.Selection<any, any, any, any> {
    let tooltip = d3
      .select(this.chartContainer.nativeElement)
      .append('span')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden')
      .style('color', 'black')
      .style('background-color', '#F0F0F0')
      .style('border-radius', '10px')
      .style('padding', '10px')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .style('position', 'fixed')
      .style('z-index', 10);

    return tooltip;
  }

  showTooltipOnHover(svg: d3.Selection<any, any, any, unknown>) {
    let that = this;
    let tooltip = this.createTooltipElement();

    function showTooltip(bar: any, event: MouseEvent, d: any) {
      // Keep Tooltip next to mouse cursor
      tooltip
        .style('visibility', 'visible')
        .text(`${d[that.y]}`)
        .style('color', 'black');

      d3.select(bar).style('stroke-width', '1').style('stroke-color', 'black');
    }

    function moveTooltip(bar: any, event: MouseEvent, d: any) {
      tooltip
        .style('top', `${event.clientY - 20}px`)
        .style('left', `${event.clientX + 20}px`);
    }

    function hideTooltip(bar: any, event: MouseEvent, d: any) {
      tooltip.style('visibility', 'hidden');
      d3.select(bar).style('stroke-width', '0.5');
    }

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
      .domain([0, d3.max(this.data, (d) => d[this.y]) * 1.1])
      .range([this.height, 0]);

    svg.append('g').call(d3.axisLeft(yAxis));

    // Bars
    svg
      .selectAll('mybar')
      .data(this.data)
      .join('rect')
      .attr('x', (d: any) => Axis(d[this.x].toString().substring(0, 15)) || '')
      .attr('width', Axis.bandwidth())
      .attr('fill', '#3F51B5')
      .attr(this.x, (d) => d[this.x])
      .attr(this.y, (d) => d[this.y])
      // no bar at the beginning thus:
      .attr('height', (d) => this.height - yAxis(0)) // always equal to 0
      .attr('y', (d) => yAxis(0));

    // Animation
    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', (d: any) => yAxis(d[this.y]))
      .attr('height', (d: any) => this.height - yAxis(d[this.y]))
      .delay((d, i) => {
        return i * 100;
      });

    this.showTooltipOnHover(svg);
  }
}
