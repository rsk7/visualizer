var h = require("h-audio");

// gotta put this data export thing in one place
export function frequencyDataProvider() {
    var frequencyData = new Uint8Array(h.analyser.frequencyBinCount);
    h.analyser.getByteFrequencyData(frequencyData);
    return frequencyData;
}

export function timeDataProvider() {
    var timeData = new Float32Array(h.analyser.fftSize);
    h.analyser.getFloatTimeDomainData(timeData);
    return timeData;
}
