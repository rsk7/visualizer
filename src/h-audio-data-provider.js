var h = require("h-audio");

// gotta put this data export thing in one place
export function dataProvider() {
    var frequencyData = new Uint8Array(h.analyser.frequencyBinCount);
    h.analyser.getByteFrequencyData(frequencyData);
    return frequencyData;
};
