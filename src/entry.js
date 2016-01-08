require("./style.css");

let d3 = require("d3");
let $ = require("jquery");
window.h = require("h-audio");

import Noise from "./noise.js";
import EqBars from "./bars.js";
import Mic from "./microphone.js";
import oscDataProvider from "./oscillator";
import SoundCloudSource from "./soundcloud.js";
import hDataProvider from "./h-audio-data-provider";

let BAR_COUNT = 300;

let mic = new Mic();
let noise = new Noise();
let sc = new SoundCloudSource();
let eqBars = new EqBars(".eq", BAR_COUNT);

// default to noise
let dataProvider = noise.dataProvider();
let domain = "frequency";
eqBars.setDataProvider(() => dataProvider[domain]());


// default to frequency domain
function toggleDomain() {
    domain = domain === "frequency" ? "time" : "frequency";
    eqBars.setDataProvider(() => dataProvider[domain]());
}

function micToggle() {
    mic.toggle();
    dataProvider = mic.dataProvider();
};

function noiseToggle() {
    noise.toggle();
    dataProvider = noise.dataProvider();
};

function hAudioToggle() {
    dataProvider = hDataProvider;
};

function oscToggle() {
    dataProvider = oscDataProvider;
}

function scToggle() {
    sc.toggle();
    $("#sc-track").toggle();
    dataProvider = sc.dataProvider();
}

function tiltToggle() {
    $("#eq-container").toggleClass("tilt");
};

$(function() {
    $("#noise-play").click(noiseToggle);
    $("#listen").click(micToggle);
    $("#tilt").click(tiltToggle);
    $("#h-audio").click(hAudioToggle);
    $("#time").click(toggleDomain);
    $("#osc").click(oscToggle);
    $("#soundcloud").click(scToggle);

    eqBars.draw();

    sc.setup($("#audio-soundcloud")[0]);
    let trackUrl = "https://soundcloud.com/rsk7/sounds-from-monday-evening";
    $("#trackUrl").val(trackUrl);
    sc.track(trackUrl);
    $("#trackUrl").change(e => sc.track(e.target.value));
});











