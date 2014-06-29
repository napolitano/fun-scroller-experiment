(function () {
    var eachNthFrame = 1;
    var frame = 0;
    var onEachFrame;

    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                if (frame == eachNthFrame) {
                    frame = 0;
                    cb();

                }

                frame++;
                webkitRequestAnimationFrame(_cb);
            }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                if (frame == eachNthFrame) {
                    frame = 0;
                    cb();
                }

                frame++;
                mozRequestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            if (frame == eachNthFrame) {
                frame = 0;
                setInterval(cb, 1000 / 12);
            }

            frame++;
        }
    }

    window.onEachFrame = onEachFrame;
})();