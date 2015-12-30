// from:
// https://developer.tizen.org/community/tip-tech/advanced-web-audio-api-usage
var context = new (window.AudioContext || window.webkitAudioContext)();

var populateBufferSource = function populateBufferSource(data) {
    for(let i = 0; i < data.length; i++) {
        data[i] = (Math.random() - 0.5) * 2; // noise
    }
};

var createNoise = function createNoise() {
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
    bufferSource.connect(gainNode);
    var analyser = context.createAnalyser();
    gainNode.connect(analyser);
    analyser.connect(context.destination);
    return { gainNode, analyser};
}

export class Noise {
    constructor() {
        var webaudioNodes = createNoise();
        this.gainNode = webaudioNodes.gainNode;
        this.analyser = webaudioNodes.analyser;
    }

    toggle() {
        this.gainNode.gain.value = this.gainNode.gain.value ? 0 : 0.5;
    }

    dataProvider() {
        var frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(frequencyData);
        return frequencyData;
    }
}




