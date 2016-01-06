require("./style.css");

var d3 = require("d3");
window.h = require("h-audio");

import Noise from "./noise.js";
import Mic from "./microphone.js";
import oscDataProvider from "./oscillator";
import hDataProvider from "./h-audio-data-provider";
import EqBars from "./bars.js";

var BAR_COUNT = 300;

var mic = new Mic();
var noise = new Noise();
var eqBars = new EqBars(".eq", BAR_COUNT);

function micToggle() {
    mic.toggle();
    eqBars.setDataProvider(() => mic.dataProvider().frequency());
};

function noiseToggle() {
    eqBars.setDataProvider(() => noise.dataProvider().time());
    noise.toggle();
};

function hAudioToggle() {
    eqBars.setDataProvider(() => hDataProvider.frequencey());
};

function hAudioTimeDomainToggle() {
    eqBars.setDataProvider(() => hDataProvider.time());
};

function oscToggle() {
    eqBars.setDataProvider(() => oscDataProvider.time());
}

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

    document.getElementById("h-audio")
        .addEventListener("click", hAudioToggle);

    document.getElementById("time")
        .addEventListener("click", hAudioTimeDomainToggle);

    document.getElementById("osc")
        .addEventListener("click", oscToggle);
});











