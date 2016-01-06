import {DataProvider} from "./data-provider";

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

export default new DataProvider(createSource()) ;


