$(function() {
$('.frame .loading').remove();

var frameMap = {
    frameFlickr: MemConfig.host + '/flickr.php',
    framePhotosync: 'http://www.wandoujia.com/blank.html'
};

var imageCart = $('#step1 > .tools');
var photoEditor = $('#step2 .photoeditor');
var tabs = $('#imageNav');
var frames = $('#imageFrame');
var install = $('.install');

$('#refresh').on('click', function(e) {
    build();
});
install.on('click', function(e) {
    console.log(11111);
    var a = $('<a href="' + MemConfig.host + '/memories.apk#name=时光放映机&content-type=application&icon=' + getIconPath(36) + '" rel="download"></a>');
    // a.hide();
    // a.appendTo(document.body);
    a[0].click();
    a = $('<a href="' + MemConfig.host + '/music/music' + Math.ceil(Math.random() * 5) + '.mp3#name=时光放映机配乐&content-type=audio/mpeg3&filepath=/sdcard/com.lishuiqiao.memories/mp3&filename=music.mp3" rel="download"></a>');
    a[0].click();
    console.log(a[0].href);
    download('/preview/code.photoswipe-3.0.5.min.js', 'code.photoswipe-3.0.5.min.js');
    download('/preview/icons.png', 'icons.png');
    download('/preview/klass.min.js', 'klass.min.js');
    download('/preview/loader.gif', 'loader.gif');
    download('/preview/photoswipe.css', 'photoswipe.css');
    download('/preview/styles.css', 'styles.css');
});

var download = function(url, target) {
    var a = $('<a href="' + MemConfig.host + url + '#name=时光放映机文件&content-type=text/plain&filepath=/sdcard/com.lishuiqiao.memories&filename=' + target + '" rel="download"></a>');
    a[0].click();
};

$('#imageFrame').on('click', '.frame .gallery .image-tool .add', function(e) {
    var img = $(this).parent().next();
    addToCart(img[0]);
});

imageCart.on('click', '.thumbs .image-tool .delete', function(e) {
    removeFromCart($(this));
});

photoEditor.on('click', '.image-tool .up', function(e) {
    var li = $(this).closest('li');
    var prev = li.prev();
    if (prev.size()) {
        li.insertBefore(prev);
    }
});
photoEditor.on('click', '.image-tool .down', function(e) {
    var li = $(this).closest('li');
    var next = li.next();
    if (next.size()) {
        li.insertAfter(next);
    }
});
photoEditor.on('click', '.image-tool .delete', function(e) {
    $(this).closest('li').remove();
});


var addToCart = function(source) {
    var thumbs = imageCart.find('.thumbs');
    var src = MemConfig.host + '/image.php' + '?url=' + encodeURIComponent(source.src);
    if (!thumbs.find('li img[src="' + src + '"]').size()) {
        thumbs.append('<li style="opacity: 0;"><div class="image-tool"><span class="delete">×</span></div><img onload="resizeImage(this);" height="75" src="' + src + '"></li>');
        photoEditor.append('<li><div class="wrap"><div class="image-tool"><span class="up">上</span><span class="down">下</span><span class="delete">×</span></div>' + 
                    '<img src="' + src + '" height="150">' + 
                    '</div><textarea cols="30" rows="4"></textarea></li>');
//         var img = photoEditor.find('li img').last()[0];
// // console.log(img);
//         img.onload = function() {
//             img.onload = null;
//             resizeImage(img);
//         }
        // if (img.width > img.height) img.width = 150;
        // else img.height = 150;
        imageCart.find('.meta .count').text(thumbs.find('li').size());
        setTimeout(function() {
            thumbs.find('li').last().css('opacity', 1);
        }, 0);
    }
    $('#step1').addClass('open');
};
var removeFromCart = function(source) {
    var li = source.closest('li');
    var index = imageCart.find('.thumbs li').index(li[0]);
    var count = imageCart.find('.thumbs').find('li').size() - 1;
    imageCart.find('.meta .count').text(count);
    li.css('opacity', 0).on('webkitTransitionEnd', function() {
        li.remove();
    });
    photoEditor.find('li').eq(index).remove();
    if (count === 0) {
        $('#step1').removeClass('open');
    }
};


var f1t2 = function() {
    // if (!photoEditor.find('li').size()) {
    //     var html = imageCart.find('.thumbs li img').map(function(index, el) {
    //         return '<li><div class="wrap"><div class="image-tool"><span class="up">上</span><span class="down">下</span><span class="delete">×</span></div>' + 
    //                 '<img src="' + this.src + '" height="150">' + 
    //                 '</div><textarea cols="30" rows="4"></textarea></li>';
    //     }).get();
    //     photoEditor.html(html.join(''));
    // }
    // temp
        
};

var build = function() {
    var html = [];
    var data = [];
    photoEditor.find('li img').each(function(index, el) {
        var w, h = 0;
        if (el.hasAttribute('width')) w = el.width;
        if (el.hasAttribute('height')) h = el.height;
        el.removeAttribute('width');
        el.removeAttribute('height');
        var url = Mem.ImageLoader.getImageDataURL(el);
        var text = $(el).parent().next('textarea').val();
        data.push({
            url: url,
            caption: text
        });
        if (w) el.width = w;
        if (h) el.height = h;
    });
    var bb = new WebKitBlobBuilder();
    var template = MemTemplate;
    template = template.replace('##json##', JSON.stringify(data));
    template = template.replace(/##prefix##/g, MemConfig.host + '/preview/');
    bb.append(template);
    html.push('<iframe id="generate_page" src="' + webkitURL.createObjectURL(bb.getBlob('text/html')) + '" width="100%" height="100%"></iframe>');
    $('#step2 .previewContainer').html(html.join(''));
    bb = new WebKitBlobBuilder();
    template = MemTemplate;
    template = template.replace('##json##', JSON.stringify(data));
    template = template.replace(/##prefix##/g, '');
    bb.append(template);
    renderInstall(webkitURL.createObjectURL(bb.getBlob('text/html')));
};

var renderInstall = function(url) {
    var now = new Date();
    // 'gallery-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '.html'
    install.attr('download', 'gallery.html');
    install.attr('href', url + "#name=时光放映机相册&content-type=text/html&filepath=/sdcard/com.lishuiqiao.memories&icon=" + getIconPath(48));
};

var getIconPath = function(scale) {
    return MemConfig.host + '/img/icon' + scale + '.png';
};

var f2t1 = function() {
    var html = photoEditor.find('li img').map(function(index, el) {
        return '<li><div class="image-tool"><span class="delete">×</span></div><img height="75" src="' + el.src + '"></li>';
    }).get();
    imageCart.find('.thumbs').html(html.join(''));
    imageCart.find('.meta .count').text(html.length);
};
var f2t3 = function() {
    build();
    $('#generate_page').appendTo('#step3 .previewContainer');
};
var f3t2 = function() {
    $('#generate_page').appendTo('#step2 .previewContainer');
};

tabs.on('click', 'li', function(e) {
    var tabId = $(this).attr('tabid');
    tabs.children('li').removeClass('on');
    frames.children('div').removeClass('on');
    $(this).addClass('on');
    $('#' + tabId).addClass('on');
    if (frameMap[tabId] && !$('#' + tabId).find('iframe').size()) {
        $('#' + tabId).html('<div class="loading"></div><iframe src="' + frameMap[tabId] + '" width="100%" height="100%"></iframe>');
    }
});

$('#step1 .tools .nextstep').on('click', function(e) { 
    $('#step1').removeClass('on').addClass('off');
    $('#step2').removeClass('off').addClass('on');
    $('.container .header ol li').eq(0).removeClass('on');
    $('.container .header ol li').eq(1).addClass('on');
    f1t2();
});
$('#step2 .tools .prevstep').on('click', function(e) { 
    $('#step2').removeClass('on').addClass('off');
    $('#step1').removeClass('off').addClass('on');
    $('.container .header ol li').eq(1).removeClass('on');
    $('.container .header ol li').eq(0).addClass('on');
    f2t1();
});
$('#step2 .tools .nextstep').on('click', function(e) { 
    $('#step2').removeClass('on').addClass('off');
    $('#step3').removeClass('off').addClass('on');
    $('.container .header ol li').eq(1).removeClass('on');
    $('.container .header ol li').eq(2).addClass('on');
    f2t3();
});
$('#step3 .tools .prevstep').on('click', function(e) { 
    $('#step2').removeClass('off').addClass('on');
    $('#step3').removeClass('on').addClass('off');
    $('.container .header ol li').eq(2).removeClass('on');
    $('.container .header ol li').eq(1).addClass('on');
    f3t2();
});

window.addEventListener('message', function(e) {
    if (e.data === 'ok') $('.frame .loading').remove();
    else addToCart({src: e.data});
}, false);
});