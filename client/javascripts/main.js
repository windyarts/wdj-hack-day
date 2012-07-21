(function() {

window.addEventListener('message', function(e) {
    var message = e.data;
    message = 'http://t3.gstatic.com/images?q=tbn:ANd9GcQykyHEjO8BklY3C4P3GIbV1Qa-Y91YT4Th703nW2Tr2Jw6egM4SdhArKQ';
    var img = createImage(message);
    var data = getBase64Image(img);
    console.log(data);
    getImageData(message);
}, false);

var trigger = document.querySelector('#trigger');
trigger.addEventListener('click', function(e) {
    e.preventDefault();
    // var iframe = getIframe();
    // iframe.src = "http://images.google.com/search?num=10&hl=en&newwindow=1&site=&tbm=isch&source=hp&biw=779&bih=1000&q=abcdef&oq=abcdef&gs_l=img.3...1831.3214.0.4013.6.6.0.0.0.0.0.0..0.0...0.0...1ac.t5V0Pv3ikJk";

    // var img = Mem.ImageLoader.createImage('http://0.wdhackday.duapp.com/?url=' + encodeURIComponent('http://t3.gstatic.com/images?q=tbn:ANd9GcQykyHEjO8BklY3C4P3GIbV1Qa-Y91YT4Th703nW2Tr2Jw6egM4SdhArKQ'));
    // img.onload =function() {
    //     var data = Mem.ImageLoader.getImageDataURL(img);
    //     console.log(data);
    // };

    Mem.ImageLoader.readImage(
        'http://0.wdhackday.duapp.com/?url=' + encodeURIComponent('http://t3.gstatic.com/images?q=tbn:ANd9GcQykyHEjO8BklY3C4P3GIbV1Qa-Y91YT4Th703nW2Tr2Jw6egM4SdhArKQ'),
        function(xhr, data) {
           console.log(data);
        }
    );
}, false);

var getIframe = (function() {
    var iframe = null;
    return function() {
        if (iframe === null) {
            iframe = document.createElement('iframe');
            var viewportWidth = document.documentElement.offsetWidth;
            var viewportHeight = document.documentElement.offsetHeight;
            iframe.width = viewportWidth;
            iframe.height = 1000;
            document.body.appendChild(iframe);
        }
        return iframe;
    };
})();

var createImage = function(src) {
    var img = new Image();
    img.src = src;
    // trigger.parentNode.insertBefore(img, trigger);
    return img;
};

var getImageData = function(src) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        console.log(xhr.response);
    };
    xhr.send();
};

function getBase64Image(img) {
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
    var dataURL = canvas.toDataURL("image/jpeg");
    console.log(canvas);

    trigger.parentNode.insertBefore(canvas, trigger);

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

})();