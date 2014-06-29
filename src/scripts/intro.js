/*global $, jQuery, document, window, playMusic, font*/

/**
 * A 8-Bit-Like intro in terrible JavaScript and CSS
 *
 * (C) 2014 Axel Napolitano
 *
 * @type {number}
 */

var virtualPixelSpacing = 1;
var virtualPixelHorizontalCount = 128;
var virtualPixelVerticalCount = 8;
var virtualPixelWidth;
var virtualPixelHeight;


// Generate virtual pixels
var virtualPixelTemplate;
var virtualRowStartTemplate;
var virtualRowEndTemplate;
var renderedScrollerTemplate = '';

var currentStep = 0;
var currentChar = 0;
var currentSubStep = 0;

var lastChar = [
    '11111110',
    '10000110',
    '10001010',
    '10010010',
    '10100010',
    '11000010',
    '10000010',
    '11111110'
];

var virtualDisplay = [
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
];

var text = "Time for some silly stuff :-P... A retro style bling-bling intro made entirely in CSS, HTML and JavaScript. Even the sound you " +
    "may hear if you are a chrome or firefox 26+ user, is played by a javascript library emulating the good old SID chip... This page " +
    "is the result of too much time on a rainy saturday and the silly decision to play around with HTML5, Keyframe animations and " +
    "jurassic gimmicks like big scrollers, color bars, rotations and javascript based fonts... The soundtrack of this intor is *Present* " +
    "from Cubehead and can be downloaded with the HVSID collection. Some images were found here and there and they are only for " +
    "demonstration purposes... Enjoy this silly piece of cake +++ ";


var getCharFromText = function (char) {
    'use strict';
    lastChar = font[text.substr(char, 1).toLowerCase()];
};

var createStarfield = function (count) {
    'use strict';

    var i, templateStart = '<span class="star', templateEnd = '"></span>';

    for (i = 0; i < count; i += 1) {
        $('[data-widget="starfield"]').append(templateStart + (Math.floor(Math.random() * 4))
            + '" style="top:' + (Math.floor(Math.random() * $(window).height()))
            + 'px; animation-delay: ' + (Math.floor(Math.random() * 24))
            + 's; -webkit-animation-delay: ' + (Math.floor(Math.random() * 24)) + 's' + templateEnd);

    }
};

var getPixelColumnFromLastChar = function (pixelColumn) {
    'use strict';
    var row, result = [];

    for (row = 0; row < 8; row += 1) {
        result[row] = lastChar[row].substr(pixelColumn, 1);
    }

    return result;
};


var scrollVirtualDisplay = function () {
    'use strict';
    var row;

    for (row = 0; row < 8; row += 1) {
        virtualDisplay[row] = virtualDisplay[row].substr(1, virtualDisplay[row].length - 1);
    }
};

var addPixelColumnAtEndOfVirtualDisplay = function (column) {
    'use strict';
    var row, pixelColumn = getPixelColumnFromLastChar(column);

    for (row = 0; row < 8; row += 1) {
        virtualDisplay[row] = virtualDisplay[row] + pixelColumn[row];
    }
};

var mapVirtualDisplayToHtml = function () {
    'use strict';
    var i, pixel, row = 0, horizontalPixel = 0, pxl = $('.virtPixel');

    for (i = 0; i < pxl.length; i += 1) {

        pixel = virtualDisplay[row].substr(horizontalPixel, 1);

        if (pixel === '1') {
            $(pxl[i]).addClass('active');
        } else {
            $(pxl[i]).removeClass('active');
        }

        horizontalPixel += 1;

        if (horizontalPixel >= virtualDisplay[0].length) {
            horizontalPixel = 0;
            row += 1;
        }

        if (row >= 8) {
            row = 0;
        }
    }

};

var doScroll = function () {
    'use strict';

    if (currentSubStep >= (virtualPixelWidth + 2)) {

        if (currentStep === 0) {
            getCharFromText(currentChar);
            currentChar += 1;

            if (currentChar >= text.length) {
                currentChar = 0;
            }
        }

        scrollVirtualDisplay();
        addPixelColumnAtEndOfVirtualDisplay(currentStep);
        mapVirtualDisplayToHtml();

        currentStep += 1;
        currentSubStep = 0;

        if (currentStep > 7) {
            currentStep = 0;
        }
    }

    $('[data-widget="prollscroll"]').css('transform', 'translateX(-' + currentSubStep + 'px)');
    $('[data-widget="prollscroll"]').css('-webkit-transform', 'translateX(-' + currentSubStep + 'px)');

    currentSubStep += 3;
};

$(document).ready(function () {
    'use strict';
    var row = 0, col = 0;

    virtualPixelWidth = ($(window).width() - ((virtualPixelHorizontalCount * virtualPixelSpacing) * 2)) / virtualPixelHorizontalCount;
    virtualPixelHeight = ($('[data-widget="prollscroll"]').height() - ((virtualPixelVerticalCount * virtualPixelSpacing) * 2)) / virtualPixelVerticalCount;
    virtualPixelTemplate = '<span class="virtPixel inactive" style="width: ' + virtualPixelWidth + 'px; height: ' + virtualPixelHeight + 'px;"></span>';
    virtualRowStartTemplate = '<span class="virtPixelRow">';
    virtualRowEndTemplate = '</span>';

    renderedScrollerTemplate = '';

    for (row = 0; row < virtualPixelVerticalCount; row += 1) {
        renderedScrollerTemplate += virtualRowStartTemplate;
        for (col = 0; col < virtualPixelHorizontalCount; col += 1) {
            renderedScrollerTemplate += virtualPixelTemplate;
        }
        renderedScrollerTemplate += virtualRowEndTemplate;
    }

    $('[data-widget="prollscroll"]').append(renderedScrollerTemplate);

    playMusic();
    createStarfield(100);

    window.onEachFrame(doScroll);

    $('#loading').fadeOut(1000, function () {
        $('#page').fadeIn(1000);
    });
});