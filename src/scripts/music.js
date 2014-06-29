/*global $, jQuery, document, window, playSong, font, AudioContext, alert, tinyRSID_genSamples, isPaused:true, actualSubsong, XMLHttpRequest, tinyRSID_loadData, tinyRSID_playSong*/
/*jshint -W020 */
/**
 * (C) 2013 Jürgen Wothke
 *
 * This lib may be freely used in non-commercial projects as long as the its origin is clearly mentioned
 * to the end users.
 *
 * Credits: This code was complied using "emscripten" (https://github.com/kripken/emscripten/wiki).
 */

var samplesPerBuffer = 8192; // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
var audioCtx;
var gainNode;
var bufferSource;
var analyzerNode;

var setupAudioNodes = function () {
    'use strict';
    if (audioCtx === undefined) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        } catch (e) {
            alert('Web Audio API is not supported in this browser (get Chrome 18 or Firefox 26)');
        }
        analyzerNode = audioCtx.createAnalyser();

        var rsidNode = audioCtx.createScriptProcessor(samplesPerBuffer, 0, 1);
        rsidNode.onaudioprocess = tinyRSID_genSamples;

        gainNode = audioCtx.createGain();
        rsidNode.connect(gainNode);
        gainNode.connect(analyzerNode);
        analyzerNode.connect(audioCtx.destination);
        gainNode.gain.value = 255 / 255;
    }
};

var initialAudioSetup = function () {
    'use strict';
    if (bufferSource !== undefined) {
        bufferSource.stop(0);
    } else {
        setupAudioNodes();
    }
};

var startMusicPlayback = function () {
    'use strict';
    isPaused = 0;

    if (bufferSource === undefined) {
        bufferSource = audioCtx.createBufferSource();
        if (!bufferSource.start) {
            bufferSource.start = bufferSource.noteOn;
            bufferSource.stop = bufferSource.noteOff;
        }
        bufferSource.start(0);
    }
};

var playMusic = function () {
    'use strict';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/sid/Present.sid", true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
        isPaused = 1;
        tinyRSID_loadData(xhr.response);
        tinyRSID_playSong(actualSubsong);
        isPaused = 0;

        initialAudioSetup();
        startMusicPlayback();

    };

    xhr.send(null);
};