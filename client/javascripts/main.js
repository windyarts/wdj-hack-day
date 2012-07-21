$(function() {

var frameMap = {
    frameFlickr: 'http://0.wdhackday.duapp.com/flickr.php',
    framePhotosync: 'http://www.wandoujia.com/blank.html'
};

var imageCart = $('#step1 > .tools');
var photoEditor = $('#step2 .photoeditor');
var tabs = $('#imageNav');
var frames = $('#imageFrame');

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
    var src = 'http://0.wdhackday.duapp.com?url=' + encodeURIComponent(source.src);
    if (true || !thumbs.find('li img[src=' + src + ']').size()) {
        thumbs.append('<li style="opacity: 0;"><div class="image-tool"><span class="delete">×</span></div><img height="75" src="' + src + '"></li>');
        imageCart.find('.meta .count').text(thumbs.find('li').size());
        setTimeout(function() {
            thumbs.find('li').last().css('opacity', 1);
        }, 0);
    }
};
var removeFromCart = function(source) {
    var li = source.closest('li');
    var index = imageCart.find('.thumbs li').index(li[0]);
    imageCart.find('.meta .count').text(imageCart.find('.thumbs').find('li').size() - 1);
    li.css('opacity', 0).on('webkitTransitionEnd', function() {
        li.remove();
    });
    photoEditor.find('li').eq(index).remove();
};


var f1t2 = function() {
    if (!photoEditor.find('li').size()) {
        var html = imageCart.find('.thumbs li img').map(function(index, el) {
            return '<li><div class="wrap"><div class="image-tool"><span class="up">上</span><span class="down">下</span><span class="delete">×</span></div>' + 
                    '<img src="' + this.src + '" height="150">' + 
                    '</div><textarea cols="30" rows="4"></textarea></li>';
        }).get();
        photoEditor.html(html.join(''));
    }
    // temp
    $('#step2 .previewContainer').html('<button type="button">test</button>').
        find('button').
        on('click', function(e) {
            var html = [];
            html.push('<div id="generate_page">');
            photoEditor.find('li img').each(function(index, el) {
                var data = Mem.ImageLoader.getImageDataURL(el);
                html.push('<div>' + $(el).parent().next('textarea').val() + '</div><img src="' + data + '"/>');
            });
            html.push('</div>');
            $('#step2 .previewContainer').html(html.join(''));
        });
};
var f2t1 = function() {
    var html = photoEditor.find('li img').map(function(index, el) {
        return '<li><div class="image-tool"><span class="delete">×</span></div><img height="75" src="' + el.src + '"></li>';
    }).get();
    imageCart.find('.thumbs').html(html.join(''));
    imageCart.find('.meta .count').text(html.length);
};
var f2t3 = function() {
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
        $('#' + tabId).html('<iframe src="' + frameMap[tabId] + '" width="100%" height="100%"></iframe>');
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
    console.log(e.data);
    addToCart({src: e.data});
}, false);
});