import {DataProvider} from "./data-provider";

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var processInput = function processInput(stream) {
    let context = new (window.AudioContext || window.webkitAudioContext)();
    let micIn = context.createMediaStreamSource(stream);
    let gainNode = context.createGain();
    gainNode.gain.value = 1;
    micIn.connect(gainNode);
    let analyser = context.createAnalyser();
    gainNode.connect(analyser);
    // not connecting to destination
    return analyser;
};

var msg = "getUserMedia failed. chrome requires this page to be on https. try forcing https:// on the url.";

export default class Mic {
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
        let analyser = processInput(this.stream);
        this.dataProviderSource = new DataProvider(analyser);
    }

    dataProvider() {
        return this.dataProviderSource || {
            frequency: () => [],
            time: () => []
        };
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


