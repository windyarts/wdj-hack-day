function resizeImage(image) {
    var h = image.height;
    var w = image.width;
    if (w < h) {
        image.width = h;
        image.removeAttribute('height');
    }
}

(function() {

self.parent.postMessage('ok', MemConfig.host);

window.login = function(data) {

};
if (document.cookie.indexOf('wdj_auth') == -1) {
    window.location = 'http://account.wandoujia.com/v1/user/?do=login&callback=' + encodeURIComponent(window.location);
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.wandoujia.com/photosync/image/list?timestamp=' + Date.now() + '&length=30&forward=false');
xhr.onload = function() {
    xhr.onload = null;
    var data = JSON.parse(xhr.responseText);
    // self.parent.postMessage(data[0].smallUrl, 'http://0.wdhackday.duapp.com');
    var gallery = document.createElement('div');
    gallery.className = 'gallery';
    document.body.appendChild(gallery);
    var html = [];
    data.forEach(function(d) {
        html.push('<li><div class="image-tool"><span class="add">+</span></div><img data-url="' + d.largeUrl + '" height="150" src="' + d.smallUrl + '"></li>&nbsp;');
    });
    if (!html.length) {
        html.push('<p class="intro" style="padding:20px;">您的账户目前没有图片.</p>');
    }
    gallery.innerHTML = html.join('');
    // gallery.getElementsByTagName('img').forEach(function(el) {
    //     el.onload = function() {
    //         el.onload = null;
    //         resizeImage(el);
    //     };
    // });
    $(gallery).on('click', '.add', function() {
        var img = $(this).parent().next()[0];
        self.parent.postMessage(img.dataset.url, MemConfig.host);
    });
};
xhr.send(null);

/*
<li><div class="image-tool"><span class="add">+</span></div><img orig="http://farm9.static.flickr.com/8023/7615445928_c9f944d9ea_z.jpg" src="http://farm9.static.flickr.com/8023/7615445928_c9f944d9ea_q.jpg"></li>
*/


// self.parent.postMessage('http://baidu.com', 'http://0.wdhackday.duapp.com');
})();