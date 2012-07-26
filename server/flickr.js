(function() {
self.parent.postMessage('ok', MemConfig.host);
$('.gallery').on('click', '.image-tool .add', function() {
    var img = $(this).parent().next('img');
    var src = img.attr('orig');
    // console.log(Mem.ImageLoader.getImageDataURL(img[0]));
    self.parent.postMessage(src, MemConfig.host);
});

})()