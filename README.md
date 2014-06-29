# HTML5, CSS3, JavaScript Intro with Sid Playback

Beside the fun the only purpose for developing this small intro was to see
what is possible without using webgl and/or canvas and to create a very
old school text scroller with giant letters.

## Credits

Music: "Present" by Gábor Mucsányi (Cubehead) <Not included> [Link](http://www.hvsc.c64.org/#copyright)
SID Player: TinyJSid by Juergen Wothke [Link](http://www.wothke.ch/experimental/TinyJsSid.html)
Planet Sibyllion: Joe Kurz [Link](http://www.joesartworlds.de/extra/tex-scifi/scifitex.htm)
Starfield: Smattila [Link](http://smattila.deviantart.com/art/Starfield-stock-154786926)
Color-Bar-Gradient: Pixel Ambracht [Link](http://pixelambacht.nl/2013/css3-c64/)

## Copyright

Please note that SID-Music files are still under copyright law. It is not appropriate or legal to
use or publish them without written permission of the copyright holders. According to the written
copyright notice on http://www.hvsc.c64.org/#copyright it is ok to use them for *privat enjoyment*
which was and is the intention of this experiment beside it's learning effects for myself.

If you want to listen to a sid tune, feel free to visit the pages of the High Voltage SID Collection
and browser through their archives. The final tune can be put into the folder /assets/sid and must be
referred in /scripts/music.js manually. This may change, but for now this is the way.

Please be also aware that the TinyJSid Library from Juergen Wothke is not free for commercial use and
currently still experimental. Please contact him via his homepage if you have further questions about
usage.

# Building from source

You need the following software installed and ready for use on your computer:

1. NodejS
2. Ruby
3. Bower
4. Compass

You should have understand the basics and you must be able to use the command line.

Assumed you have fulfilled these requirements, you must first update the node modules and the bower
components from your command line. To do so use npm update and bower update. Please be aware that
these steps may take some time depending on your connection and computer speed.

After updating node modules and bower components simply type "gulp build" via your command line. If
the build does not fail, you will find the result in the dist folder.

Please note, that sid files won't be copied during building - you have to manually copy them to the
dist folder.

# Technical Details

## Scroller

The scroller is maily implemented as a bunch of javascript methods. Rough and ugly so far, because it's
about the concept and not about best coding practices so far.

Basically a virtual display with 128x8 Pixels will be generated using a simple array. The values in this
array can be either 0 for a transparent pixel or 1 for opaque pixel. This array will be shiftet to the left
so that the most left value will be deleted and all other come one position closer to the left edge.

For a character buffer which holds the representation of exactly one char, each pixel column will be copied
to the most right position (at the end of the virtual display). So that you get a very simple virtual
scrolltext. You may output it to the console for debugging purposes or just for fun.

To make things smooth, this virtual display will be mapped to a bunch of generated span-tags on the HTML
side. For each opaque pixel, the css-class "active" will be set and for each transparent pixel the css
class "inactive". The width and height of these html tags will be calculated dynamically.

### Mapping virtual display to html tags

Assumed the html tags have a width of 14px they will be smoothly shiftet to the left until they are shiftet
a full width - one pixel a frame. This happens by using "translateX()" with negative values on the container.
After they are shiftet a full width, they will be reset to Zero-Position and the mapping of the virtual
display occurs. After the virtual display was mapped, the process starts over. Pretty simple.

## Font

The font is a big javascript array. Each letter was designed using a sub-array holding 8 strings with a length
of 8 characters. The numbers 0 and 1 can be used for transparent and opaque pixels. You can design your font
very close the way it was done 20 years ago on the C64 where you may have edited your font directly within
memory using a utility like chipmon.

## Color Bars

The color bars were animated entirely using CSS3 keyframe animations and gradients. The Z-Index will be
switched to ensure that they switch from fore- to background as intended.

## Starfield

The starfield is also animated completely with CSS3 keyframe animations. During initialization a javascript
methods creates 100 random stars with random animation start delay. 4 different sizes and speeds exist.

## The Planet

The passing planet is again a CSS3 keyframe animation.

## The rotating logo

The logo also uses CSS3 keyframe animations

# Music

You need a web audio api enabled browser to be able to listen to music. Due to copyright restrictions no SID
files was yet included in the project. You probably might want to try it out. Please refer to the High Voltage
SID Collection [Link](http://www.hvsc.c64.org/#copyright) for further information and access.

Please ensure that you specify the filename of your sid in /scripts/music.js. If you decide to go without music,
you should comment "playSong()" in scripts/intro.js

# Licenses

TinyJSid Library: Apache License Version 2.0
jQuery: MIT License
Planet Sibyllion Image: Free to use
Starfield: Creative Commons Attribution-Noncommercial 3.0 License
Color-Bar-Gradient: Free to use

All other files can be used for private and education use. Only non-commercial use is allowed.


