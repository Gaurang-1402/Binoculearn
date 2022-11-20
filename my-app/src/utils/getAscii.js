"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toGrayScale = function (r, g, b) { return 0.21 * r + 0.72 * g + 0.07 * b; };
var convertToGrayScales = function (context, width, height) {
    var imageData = context.getImageData(0, 0, width, height);
    var grayScales = [];
    for (var i = 0; i < imageData.data.length; i += 4) {
        var r = imageData.data[i];
        var g = imageData.data[i + 1];
        var b = imageData.data[i + 2];
        var grayScale = toGrayScale(r, g, b);
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;
        grayScales.push(grayScale);
    }
    context.putImageData(imageData, 0, 0);
    return grayScales;
};
var grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
var reversedGrayRamp = ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
var rampLength = grayRamp.length;
// the grayScale value is an integer ranging from 0 (black) to 255 (white)
var getCharacterForGrayScale = function (grayScale) {
    return reversedGrayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];
};
var getAsciiFromGrayscales = function (grayScales, width) {
    var ascii = grayScales.reduce(function (asciiImage, grayScale, index) {
        var nextChars = getCharacterForGrayScale(grayScale);
        if ((index + 1) % width === 0) {
            nextChars += '\n';
        }
        return asciiImage + nextChars;
    }, '');
    return ascii;
};
var getAscii = function (canvas) {
    var height = canvas.height, width = canvas.width;
    var ctx = canvas.getContext('2d');
    // ctx.scale(9, 3);
    var grayScales = convertToGrayScales(ctx, width, height);
    var ascii = getAsciiFromGrayscales(grayScales, canvas.width);
    return ascii;
};
exports.default = getAscii;
