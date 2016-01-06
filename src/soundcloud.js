import context from "./audio-context";
import DataProvider from "./data-provider";

var clientId = require("../sc/creds").Id;
var sc = require("soundcloud");
sc.initialize({ client_id: clientId });

function getAnalyser(audioPlayer) {
    audioPlayer.crossOrigin = "anonymous";
    let audioSrc = context.createMediaElementSource(audioPlayer);
    let gainNode = context.createGain();
    let analyser = context.createAnalyser();
    audioSrc.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(context.destination);
    // gainNode.gain.value = 0;
    return {gainNode, analyser};
}

export default class SoundCloudSource {
    setup(audioPlayer) {
        this.audioPlayer = audioPlayer;
    }

    track(url) {
        sc.resolve(url).then(result => {
            this.audioPlayer.setAttribute("src", result.stream_url + "?client_id=" + clientId);
            let nodes = getAnalyser(this.audioPlayer);
            this.gainNode = nodes.gainNode;
            this.dataProviderSource = new DataProvider(nodes.analyser);
        });
    }

    dataProvider() {
        return this.dataProviderSource || {
            frequency: () => [],
            time: () => []
        };
    }

    toggle() {
        /*
        if (this.gainNode) {
            this.gainNode.gain.value = this.gainNode.gain.value ? 0 : 1;
        }
        */

        /*
        if(this.audioPlayer.paused) {
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
        }
        */
    }
}


