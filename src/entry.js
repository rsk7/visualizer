require("./style.css");

var d3 = require("d3");
var $ = require("jquery");
window.h = require("h-audio");

import Noise from "./noise.js";
import EqBars from "./bars.js";
import Mic from "./microphone.js";
import oscDataProvider from "./oscillator";
import SoundCloudSource from "./soundcloud.js";
import hDataProvider from "./h-audio-data-provider";

var BAR_COUNT = 300;

var mic = new Mic();
var noise = new Noise();
var sc = new SoundCloudSource();
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
    $("#sc-track").toggle();
    eqBars.setDataProvider(() => sc.dataProvider().frequency());
}

function tiltToggle() {
    $("#eq-container").toggleClass("tilt");
};

$(function() {
    $("#noise-play").click(noiseToggle);
    $("#listen").click(micToggle);
    $("#tilt").click(tiltToggle);
    $("#h-audio").click(hAudioToggle);
    $("#time").click(hAudioTimeDomainToggle);
    $("#osc").click(oscToggle);
    $("#soundcloud").click(scToggle);

    eqBars.draw();

    sc.setup($("#audio-soundcloud")[0]);
    let trackUrl = "https://soundcloud.com/rsk7/sounds-from-monday-evening";
    $("#trackUrl").val(trackUrl);
    sc.track(trackUrl);
    $("#trackUrl").change(e => sc.track(e.target.value));
});











