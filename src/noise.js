import DataProvider from "./data-provider";

function populateBufferSource(data) {
    for(let i = 0; i < data.length; i++) {
        data[i] = (Math.random() - 0.5) * 2; // noise
    }
};

function createNoise() {
    // from:
    // https://developer.tizen.org/community/tip-tech/advanced-web-audio-api-usage
    let context = new (window.AudioContext || window.webkitAudioContext)();
    let bufferSource = context.createBufferSource();
    let buffer = context.createBuffer(2, 44100, 44100);
    let leftChannelData = buffer.getChannelData(0);
    let rightChannelData = buffer.getChannelData(1);
    populateBufferSource(leftChannelData);
    populateBufferSource(rightChannelData);
    bufferSource.loop = true;
    bufferSource.buffer = buffer;
    bufferSource.start();
    let gainNode = context.createGain();
    gainNode.gain.value = 0;
    bufferSource.connect(gainNode);
    let analyser = context.createAnalyser();
    gainNode.connect(analyser);
    analyser.connect(context.destination);
    return { gainNode, analyser};
}

export default class Noise {
    constructor() {
        var webaudioNodes = createNoise();
        this.gainNode = webaudioNodes.gainNode;
        let analyser = webaudioNodes.analyser;
        this.dataProviderSource = new DataProvider(analyser);
    }

    toggle() {
        this.gainNode.gain.value = this.gainNode.gain.value ? 0 : 0.5;
    }

    dataProvider() {
        return this.dataProviderSource;
    }
}




