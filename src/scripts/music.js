/**
 * (C) 2013 Jürgen Wothke
 *
 * This lib may be freely used in non-commercial projects as long as the its origin is clearly mentioned
 * to the end users.
 *
 * Credits: This code was complied using "emscripten" (https://github.com/kripken/emscripten/wiki).
 */

const SAMPLES_PER_BUFFER = 8192;	// allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
var audioCtx;
var gainNode;
var bufferSource;
var analyzerNode;

function initialAudioSetup() {
    if (typeof bufferSource != 'undefined') {
        bufferSource.stop(0);
    } else {
        setupAudioNodes();
    }
}

function setupAudioNodes() {
    if (typeof audioCtx == 'undefined') {
        try {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            audioCtx = new AudioContext();
        } catch(e) {
            alert('Web Audio API is not supported in this browser (get Chrome 18 or Firefox 26)');
        }
        analyzerNode = audioCtx.createAnalyser();

        var rsidNode = audioCtx.createScriptProcessor(SAMPLES_PER_BUFFER, 0, 1);
        rsidNode.onaudioprocess = tinyRSID_genSamples;

        gainNode = audioCtx.createGain();
        rsidNode.connect(gainNode);
        gainNode.connect(analyzerNode);
        analyzerNode.connect(audioCtx.destination);
        gainNode.gain.value= 255/255;
    }
}

function startMusicPlayback() {
    isPaused= 0;

    if (typeof bufferSource === 'undefined') {
        bufferSource = audioCtx.createBufferSource();
        if (!bufferSource.start) {
            bufferSource.start = bufferSource.noteOn;
            bufferSource.stop = bufferSource.noteOff;
        }
        bufferSource.start(0);
    }
}

function playSong() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/sid/Present.sid", true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function (oEvent) {
        isPaused= 1;
        tinyRSID_loadData(xhr.response);
        tinyRSID_playSong(actualSubsong);
        isPaused= 0;

        initialAudioSetup();
        startMusicPlayback();

    };

    xhr.send(null);
}