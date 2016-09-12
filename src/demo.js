'use strict';

// Populate test content
var contents = document.querySelectorAll('.content');
[].slice.call(contents).forEach(function(content) {
    content.innerHTML = '<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto suscipit, placeat quos voluptas sint tenetur, iure esse atque neque nobis incidunt dolorum obcaecati adipisci cum sequi dolore optio nostrum  <a href="#">dolorem!</a></div>';
});

// jQuery
function jQueryToggle(event) {
    var $toggle = $(event.target),
        $content = $toggle.parent('.component').find('.content');
    $content.slideToggle(200);
}

// Custom other library
if (window.FastClick) FastClick.attach(document.body);