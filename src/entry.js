require("./style.css");
var Noise = require("./noise.js").Noise;
var Mic = require("./microphone.js").Mic;
var EqBars = require("./bars.js").Bars;
var d3 = require("d3");

var h = require("h-audio");
window.h = h;

var BAR_COUNT = 60;

var mic = new Mic();
var noise = new Noise();
var eqBars = new EqBars(".eq", BAR_COUNT);

var micToggle = function micToggle() {
    eqBars.setDataProvider(() => mic.dataProvider());
    mic.toggle();
};

var noiseToggle = function noiseToggle() {
    eqBars.setDataProvider(() => noise.dataProvider());
    noise.toggle();
};

var tilted = false;
var tiltToggle = function tiltToggle() {
    var eqContainer = document.getElementById("eq-container");
    if (!tilted) {
        eqContainer.className = eqContainer.className.replace("tilt", "");
        eqContainer.className += " tilt";
        tilted = true;
    } else {
        tilted = false;
        eqContainer.className = eqContainer.className.replace("tilt", "");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    eqBars.draw();

    document.getElementById("noise-play")
        .addEventListener("click", noiseToggle);

    document.getElementById("listen")
        .addEventListener("click", micToggle);

    document.getElementById("tilt")
        .addEventListener("click", tiltToggle);
});











