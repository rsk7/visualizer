export default class DataProvider {
    constructor(analyser) {
        this.analyser = analyser;
    }

    time() {
        this.analyser.fftSize = 1024;
        let timeData = new Float32Array(this.analyser.fftSize);
        this.analyser.getFloatTimeDomainData(timeData);
        return timeData;
    }

    frequency() {
        let frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(frequencyData);
        return frequencyData;
    }
}
