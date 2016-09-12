;'use strict';

window.nst = function(_) {
    var log = console.log.bind(console),
     error = console.error.bind(console);

    var fixSafariBugCss = 'nst-fix-safari-bug',
        componentCss = 'nst-component',
        contentCss = 'nst-content',
        collapsingCss = 'is-collapsing',
        collapsedCss = 'is-collapsed',
        expandingCss = 'is-expanding',
        expandedCss = 'is-expanded',
        activeCss = 'is-active',
        eventNameTransitionEnd = 'transitionend';

    function getSlideToggleComponent(element) {
        var root = element;
        while (root) {
            root = root.parentElement;
            if (root && root.classList.contains(componentCss)) {
                return root;
            }
        }
        return undefined;
    }

    function toggle(event) {

        function collapse(component, content) {

            component.classList.add(collapsingCss);

            function transitionEnd(event) {
                if (event.propertyName === 'max-height') {
                    if (component.classList.contains(collapsingCss)) {
                        component.classList.remove(collapsingCss);
                        component.classList.add(collapsedCss);
                    }

                    content.removeEventListener(eventNameTransitionEnd, transitionEnd, false);
                }
            }

            content.classList.add(fixSafariBugCss);

            content.style.maxHeight = 'none';
            var BCR = content.getBoundingClientRect(),
                height = BCR.height;

            if (height === 0) {
                content.classList.remove(fixSafariBugCss);
                return;
            }

            content.style.maxHeight = height + 'px';

            content.addEventListener(eventNameTransitionEnd, transitionEnd, false);

            content.offsetHeight; // reflow to apply transition animation

            content.classList.remove(fixSafariBugCss);

            content.style.maxHeight = '0px';
        }

        function expand(component, content) {

            content.offsetHeight; // reflow to apply transition animation, the content had display:none which made content transform micro-animation not working

            component.classList.add(expandingCss);

            function transitionEnd(event) {
                if (event.propertyName === 'max-height') {

                    if (component.classList.contains(expandingCss)) {
                        component.classList.remove(expandingCss);
                        component.classList.add(expandedCss);

                        content.classList.add(fixSafariBugCss);

                        content.style.maxHeight = '';
                        setTimeout(function() {
                            content.classList.remove(fixSafariBugCss);
                        }, 0);
                    }

                    content.removeEventListener(eventNameTransitionEnd, transitionEnd, false);
                }
            }

            content.classList.add(fixSafariBugCss);

            content.style.maxHeight = 'none';

            var BCR = content.getBoundingClientRect();

            content.style.maxHeight = '0px';

            content.addEventListener(eventNameTransitionEnd, transitionEnd, false);

            content.offsetHeight; // reflow to apply transition animation

            content.classList.remove(fixSafariBugCss);

            content.style.maxHeight = BCR.height + 'px';
        }

        var toggle = event.target,
            component = getSlideToggleComponent(toggle);

        if (!component) {
            error('nst: the markup is wrong, nst-component css class is missing');
            return;
        }

        if (component.classList.contains(collapsingCss) || component.classList.contains(expandingCss)) {

            log('nst: skipped action because still animating');
            return;
        }

        var content = component.querySelector('.' + contentCss);

        if (!content) {
            error('nst: the markup is wrong, nst-content css class is missing');
            return;
        }

        component.classList.remove(collapsedCss);
        component.classList.remove(expandingCss);
        component.classList.remove(collapsingCss);
        component.classList.remove(expandedCss);

        component.classList.toggle(activeCss);

        if (component.classList.contains(activeCss)) {
            collapse(component, content);
        } else {
            expand(component, content);
        }
    }

    return {
        toggle: toggle
    };
}();
