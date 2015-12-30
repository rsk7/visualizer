navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var context = new (window.AudioContext || window.webkitAudioContext)();

var processInput = function processInput(stream) {
    var micIn = context.createMediaStreamSource(stream);
    var gainNode = context.createGain();
    gainNode.gain.value = 1;
    micIn.connect(gainNode);
    var analyser = context.createAnalyser();
    gainNode.connect(analyser);
    // not connecting to destination
    return analyser;
};

var msg = "getUserMedia failed. chrome requires this page to be on https. try forcing https:// on the url.";

export class Mic {
    listen() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                    { audio: true },
                    (stream) => this.setup(stream),
                    (error) => alert(msg));
        }
    }

    setup(stream) {
        this.stream = stream;
        this.analyser = processInput(this.stream);
    }

    dataProvider() {
        if (!this.analyser) return new Uint8Array();
        var frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(frequencyData);
        return frequencyData;
    }

    stop() {
        if (this.stream) {
            // this.stream.stop();
            this.stream.getAudioTracks()[0].stop();
            // clear
            this.stream = null;
        }
    }

    toggle() {
        if (this.stream) {
            this.stop();
        } else {
            this.listen();
        }
    }
}


