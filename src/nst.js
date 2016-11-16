/*!
 * native slide toggle 1.1.2
 * https://github.com/kunukn/native-slide-toggle/
 *
 * Copyright Kunuk Nykjaer
 * Released under the MIT license
 */

'use strict';

window.nst = (function() {
    var log = console.log.bind(console),
        error = console.error.bind(console);

    var fixSafariBugCss = 'nst-fix-safari-bug',
        componentCss = 'nst-component',
        manualInitCss = 'nst-manual-init',
        contentCss = 'nst-content',
        toggleSelector = '.nst-toggle',
        collapsingCss = 'nst-is-collapsing',
        collapsedCss = 'nst-is-collapsed',
        expandingCss = 'nst-is-expanding',
        expandedCss = 'nst-is-expanded',
        eventNameTransitionEnd = 'transitionend';

    function $$(expr, context) {
        return [].slice.call((context || document).querySelectorAll(expr), 0);
    }

    function rAF(callback) {
        window.requestAnimationFrame(callback);
    }

    function nextFrame(callback) {
        window.requestAnimationFrame(function() {
            window.requestAnimationFrame(callback);
        });
    }

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

            nextFrame(function() {
                content.classList.remove(fixSafariBugCss);
                content.style.maxHeight = '0px';
            });
        }

        function expand(component, content) {
            nextFrame(function() {

                component.classList.add(expandingCss);

                function transitionEnd(event) {
                    if (event.propertyName === 'max-height') {

                        if (component.classList.contains(expandingCss)) {
                            component.classList.remove(expandingCss);
                            component.classList.add(expandedCss);

                            content.classList.add(fixSafariBugCss);

                            content.style.maxHeight = '';                            
                            nextFrame(function() {
                                content.classList.remove(fixSafariBugCss);
                            });
                        }

                        content.removeEventListener(eventNameTransitionEnd, transitionEnd, false);
                    }
                }

                content.classList.add(fixSafariBugCss);

                content.style.maxHeight = 'none';

                var BCR = content.getBoundingClientRect();

                content.style.maxHeight = '0px';

                content.addEventListener(eventNameTransitionEnd, transitionEnd, false);

                rAF(function() {
                    content.classList.remove(fixSafariBugCss);
                    content.style.maxHeight = BCR.height + 'px';
                });


            });

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

        component.classList.remove(expandingCss);
        component.classList.remove(collapsingCss);

        if (component.classList.contains(collapsedCss)) {
            component.classList.remove(collapsedCss);
            expand(component, content);
        } else {
            component.classList.remove(expandedCss);
            collapse(component, content);
        }
    }

    function destroy(component) {
        if (component) {
            var toggles = $$(toggleSelector, component);
            if (toggles && toggles.length) {
                toggles.forEach(function(toggleElement) {
                    toggleElement.removeEventListener('click', toggle);
                });
            }
        }
        return this;
    }

    function destroyAll() {
        var allToggles = $$(toggleSelector);
        if (allToggles && allToggles.length) {
            allToggles.forEach(function(toggleElement) {
                toggleElement.removeEventListener('click', toggle);
            });
        }
        return this;
    }

    function init(component) {
        if (component) {
            if (component.classList.contains(collapsedCss)) {
                // if init with collapsed state, then set required maxHeight
                component.querySelector('.' + contentCss).style.maxHeight = '0px';
            }

            var toggles = $$(toggleSelector, component);
            toggles.forEach(function(toggleElement) {
                toggleElement.addEventListener('click', toggle);
            });
        }
        return this;
    }

    function initAll(config) {

        var isAutoInit = config && config.autoInit,
            component, allToggles = $$(toggleSelector);

        if (config && config.log) {
            log(config.log);
        }

        allToggles.forEach(function(toggleElement) {

            component = getSlideToggleComponent(toggleElement);

            if (!component) {
                error('nst component not found: ' + component);
                return this;
            }

            var isManualInit = component.classList.contains(manualInitCss),
                skip = isAutoInit && isManualInit;

            if (!skip) {
                if (component.classList.contains(collapsedCss)) {
                    // if init with collapsed state, then set required maxHeight
                    component.querySelector('.' + contentCss).style.maxHeight = '0px';
                }

                toggleElement.addEventListener('click', toggle);
            }
        });

        return this;
    }

    initAll({ autoInit: true });

    return {
        init: init,
        initAll: initAll,
        destroy: destroy,
        destroyAll: destroyAll
    };
})();