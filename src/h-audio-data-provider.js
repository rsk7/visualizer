var h = require("h-audio");

// gotta put this data export thing in one place
export function frequencyDataProvider() {
    let frequencyData = new Uint8Array(h.analyser.frequencyBinCount);
    h.analyser.getByteFrequencyData(frequencyData);
    return frequencyData;
}

export function timeDataProvider() {
    h.analyser.fftSize = 1024;
    let timeData = new Float32Array(h.analyser.fftSize);
    h.analyser.getFloatTimeDomainData(timeData);
    return timeData;
}
