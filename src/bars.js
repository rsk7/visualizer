/* audio visualizer bars that update using d3*/
var d3 = require("d3");
import {Timer as Timer} from './timer';

var d3update = function(selector, data) {
    let x = d3.scale.linear()
        .domain([d3.min(data), d3.max(data)])
        .range([0, 100]);
    let selection = d3.select(selector)
        .selectAll("div.bar")
        .data(data)
        .style("height", (d) => x(d) + "px");
    selection.enter()
        .append("div")
            .attr("class", "bar");
}

var barHeights = function barHeights(data, interval, barCount) {
    let barHeightData = new Array(barCount);
    for(let i = 0; i < barCount; i++) {
        barHeightData[i] = data[i * interval];
    }
    return barHeightData;
};

export class Bars {
    /* d3 selector query */
    constructor(selector, barCount, dataProvider) {
        this.selector = selector;
        this.dataProvider = dataProvider;
        this.barCount = barCount;
    }

    draw() {
        d3update(this.selector, barHeights([], 1, this.barCount));
    }

    setDataProvider(dataProvider) {
        this.dataProvider = dataProvider;
        this.drawTimer = this.drawTimer || new Timer(() => this.update());
        this.drawTimer.start();
    }

    setBarCount(count) {
        this.barCount = count;
    }

    update() {
        let data = this.dataProvider();
        let interval = Math.floor(data.length / this.barCount);
        let barHeightData = barHeights(data, interval, this.barCount);
        d3update(this.selector, barHeightData);
    }

    stop() {
        if (this.drawTimer) {
            this.drawTimer.stop();
        }
    }

}
