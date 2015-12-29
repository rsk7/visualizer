require("./style.css");
var toggleSource = require("./sound_data.js").toggleSource;
var dataProvider = require("./sound_data.js").dataProvider;
var eqBars = require("./bars.js").Bars;
var d3 = require("d3");

var h = require("h-audio");
window.h = h;

var BAR_COUNT = 60;
var EqBars = new eqBars(".eq", dataProvider, BAR_COUNT);

document.addEventListener("DOMContentLoaded", () => {
    EqBars.toggle(); // start
    document.getElementById("noise-play")
        .addEventListener("click", toggleSource);
});











