require("./style.css");
var content = require("./content.js");
var d3 = require("d3");
var h = require("h-audio");

var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 100]);

var body = d3.select("body");
var div = body.append("div")
    .attr("class", "chart")
    .selectAll("div")
        .data(data)
    .enter().append("div")
        .style("height", (d) => x(d) + "px")
        .text((d) => d);

window.h = h;

// from:
// https://developer.tizen.org/community/tip-tech/advanced-web-audio-api-usage
var context = new (window.AudioContext || window.webkitAudioContext)();


var populateBufferSource = function(data) {
    for(let i = 0; i < data.length; i++) {
        // data[i] = (Math.random() - 0.5) * 2; // noise
        // In following lines I've presented various functions generating sound data (tones).
        // data[i] = Math.sin(1  * 180 * (i / data.length)); // One waveform oscillation
        // data[i] = Math.sin(2  * 180 * (i / data.length)); // Two waveform oscillations
        // data[i] = Math.sin(4  * 180 * (i / data.length)); // Four waveform oscillations
        // data[i] = Math.sin(8  * 180 * (i / data.length)); // Eight waveform oscillations
        data[i] = Math.sin(16 * 180 * (i / data.length)); // Sixteen waveform oscillations
    }
};

var oscillator = context.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = 440;
oscillator.detune.value = Math.pow(2, 1/12) * 10;
oscillator.start();

var bufferSource = context.createBufferSource();
var buffer = context.createBuffer(2, 44100, 44100);
var leftChannelData = buffer.getChannelData(0);
var rightChannelData = buffer.getChannelData(1);
populateBufferSource(leftChannelData);
populateBufferSource(rightChannelData);
bufferSource.loop = true;
bufferSource.buffer = buffer;
bufferSource.start();

var gainNode = context.createGain();
gainNode.gain.value = 0;

// source connect
// oscillator.connect(gainNode);
bufferSource.connect(gainNode);

var analyser = context.createAnalyser();
gainNode.connect(analyser);
analyser.connect(context.destination);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("click")
        .addEventListener("click", () => {
            gainNode.gain.value = gainNode.gain.value ? 0 : 1;
        });
});










