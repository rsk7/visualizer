// from:
// https://developer.tizen.org/community/tip-tech/advanced-web-audio-api-usage
var context = new (window.AudioContext || window.webkitAudioContext)();

var populateBufferSource = function(data) {
    for(let i = 0; i < data.length; i++) {
        data[i] = (Math.random() - 0.5) * 2; // noise
    }
};

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

export function toggleSource() {
    gainNode.gain.value = gainNode.gain.value ? 0 : 0.05;
}

export function dataProvider() {
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    return frequencyData;
}




