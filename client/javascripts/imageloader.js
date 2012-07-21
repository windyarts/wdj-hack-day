(function() {

window.Mem = window.Mem || {};

var ImageLoader = window.Mem.ImageLoader = {};

ImageLoader.createImage = function(src, onload) {
    var img = new Image();
    img.onload = function() {
        img.onload = null;
        onload(img);
    };
    img.src = src;
    return img;
};

ImageLoader.trashImage = function(img) {
    if (image.parentNode) {
        image.parentNode.removeChild(image);
    }
};

ImageLoader.getImageDataURL = function(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL(encodingDetect(img.src));

    return dataURL;
};

ImageLoader.readImage = function(src, onload) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        xhr.onload = null;
        if (onload) {
            onload(xhr, xhr.response);
        }
    };
    xhr.send(null);
};

var encodingDetect = function(src) {
    if (src.indexOf('.png') != -1) {
        return 'image/png';
    }
    else {
        return 'image/jpeg';
    }
};

})();