require("./style.css");

var d3 = require("d3");
window.h = require("h-audio");

import Noise from "./noise.js";
import Mic from "./microphone.js";
import oscDataProvider from "./oscillator";
import hDataProvider from "./h-audio-data-provider";
import EqBars from "./bars.js";

import SoundCloudSource from "./soundcloud.js";

var BAR_COUNT = 300;

var mic = new Mic();
var noise = new Noise();
var sc = new SoundCloudSource();
var eqBars = new EqBars(".eq", BAR_COUNT);

let el = (id) => document.getElementById(id);
let clickListen = (id, func) => el(id).addEventListener("click", func);

function micToggle() {
    mic.toggle();
    eqBars.setDataProvider(() => mic.dataProvider().frequency());
};

function noiseToggle() {
    eqBars.setDataProvider(() => noise.dataProvider().time());
    noise.toggle();
};

function hAudioToggle() {
    eqBars.setDataProvider(() => hDataProvider.frequency());
};

function hAudioTimeDomainToggle() {
    eqBars.setDataProvider(() => hDataProvider.time());
};

function oscToggle() {
    eqBars.setDataProvider(() => oscDataProvider.time());
}

function scToggle() {
    sc.toggle();

    // yup
    let audioEl = el("sc-track");
    audioEl.getAttribute("hidden") === "" ?
        audioEl.removeAttribute("hidden") : audioEl.setAttribute("hidden", "");

    eqBars.setDataProvider(() => sc.dataProvider().frequency());
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

    clickListen("noise-play", noiseToggle);
    clickListen("listen", micToggle);
    clickListen("tilt", tiltToggle);
    clickListen("h-audio", hAudioToggle);
    clickListen("time", hAudioTimeDomainToggle);
    clickListen("osc", oscToggle);
    clickListen("soundcloud", scToggle);

    eqBars.draw();

    sc.setup(el("audio-soundcloud"));
    let trackUrl = "https://soundcloud.com/rsk7/sounds-from-monday-evening";
    el("trackUrl").value = trackUrl;
    sc.track(trackUrl);
    el("trackUrl").addEventListener("change", e => sc.track(e.target.value));
});











