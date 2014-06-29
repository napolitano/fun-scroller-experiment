/*global $, jQuery, document, window, webkitRequestAnimationFrame, mozRequestAnimationFrame, setInterval*/

(function () {
    'use strict';

    var eachNthFrame = 1, frame = 0, onEachFrame;

    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function (job) {
            var callback = function () {
                if (frame === eachNthFrame) {
                    frame = 0;
                    job();

                }

                frame += 1;
                webkitRequestAnimationFrame(callback);
            };

            callback();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (job) {
            var callback = function () {
                if (frame === eachNthFrame) {
                    frame = 0;
                    job();
                }

                frame += 1;
                mozRequestAnimationFrame(callback);
            };

            callback();
        };
    } else {
        onEachFrame = function (job) {
            if (frame === eachNthFrame) {
                frame = 0;
                setInterval(job, 1000 / 12);
            }

            frame += 1;
        };
    }
    window.onEachFrame = onEachFrame;
}());