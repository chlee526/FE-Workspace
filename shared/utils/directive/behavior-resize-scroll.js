/**
 * behavior-scroll-resize
 * 스크롤 or 리사이즈 발생
 */
import Vue from 'vue';

Vue.directive('behavior-scroll-resize', {
    inserted: function (el, binding, vnode) {
        const handleScrollResize = (event) => {
            if (binding.value) binding.value(event);
        };

        el.__scrollResizeCallback__ = handleScrollResize;
        addScrollResizeListeners(el, handleScrollResize);
    },
    unbind: function (el) {
        removeScrollResizeListeners(el, el.__scrollResizeCallback__);
    },
});

function isScrollable(el) {
    const style = window.getComputedStyle(el);
    return style.overflow === 'scroll' || style.overflow === 'auto' || el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}

function addScrollResizeListeners(element, callback) {
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
        if (isScrollable(parent)) {
            parent.addEventListener('scroll', callback);
        }
        parent = parent.parentElement;
    }
    window.addEventListener('scroll', callback);
    window.addEventListener('resize', callback);
}

function removeScrollResizeListeners(element, callback) {
    let parent = element.parentElement;
    while (parent) {
        parent.removeEventListener('scroll', callback);
        parent = parent.parentElement;
    }
    window.addEventListener('scroll', callback);
    window.removeEventListener('resize', callback);
}
