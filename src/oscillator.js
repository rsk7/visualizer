function createSource() {
    let context = new (window.AudioContext || window.webkitAudioContext)();
    let oscNode = context.createOscillator();
    let gainNode = context.createGain();
    let analyser = context.createAnalyser();
    oscNode.connect(gainNode);
    gainNode.connect(analyser);
    oscNode.start();
    return analyser;
}

let analyser = createSource();

export function frequenceDataProvider() {
    let frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    return frequencyData;
}

export function timeDataProvider() {
    analyser.fftSize = 1024;
    let timeData = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(timeData);
    return timeData;
}
