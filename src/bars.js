/* audio visualizer bars that update using d3*/
var d3 = require("d3");
import {Timer as Timer} from './timer';

var d3update = function(selector, data) {
    let x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 100]);
    let selection = d3.select(selector)
        .selectAll("div")
        .data(data)
        .style("height", (d) => x(d) + "px");
    selection.enter()
        .append("div");
}

export class Bars {
    /* d3 selector query */
    constructor(selector, dataProvider, barCount) {
        this.selector = selector;
        this.dataProvider = dataProvider;
        this.barCount = barCount;
    }

    barHeights(data, interval) {
        let barHeightData = new Array(this.barCount);
        for(let i = 0; i < this.barCount; i++) {
            barHeightData[i] = data[i * interval];
        }
        return barHeightData;
    }

    update() {
        let data = this.dataProvider();
        let interval = Math.floor(data.length / this.barCount);
        let barHeights = this.barHeights(data, interval);
        d3update(this.selector, barHeights);
    }

    toggle() {
        this.drawTimer = this.drawTimer || new Timer(() => this.update());
        this.drawTimer.toggle();
    }

}
