/**
 * control-aside-width
 * main과 aside, resizer로 구성된 페이지 레이아웃 조정
 * - aside의 width를 px 단위로 조정한다.
 * - 최대값은 content 영역의 50%에 해당하는 px값
 * - 최소값은 inline-style로 지정된 min-width값 (미지정시 content 영역의 25%에 해당하는 px값)
 * - 초기 width값은 content 영역의 25%에 해당하는 px값
 * - min/max는 inline-style로 조정가능
 *
 *- binding value 전달 항목
 * @param {String} menu (필수) 각 메뉴별 aside 넓이 개인화 저장을 위해 메뉴명을 전달받아야함
 * @param {Boolean} isClosed aside 강제 open용도
 *
 */
import Vue from 'vue';
import { getItemLocalStorage, setItemLocalStorage } from '@shared/utils/localStorage';

import store from '@/store'; // Store

Vue.directive('control-aside-width', {
    inserted(el, binding, vnode) {
        // 메뉴 정보 저장
        state.menu = binding.value.menu;
        const { resizer, toggleBtn } = createElements();

        // 리사이저 요소 추가 및 초기 width 설정
        el.before(resizer);
        initializeWidths(el);
        getAsideWidth();

        // 렌더링 후 트랜지션 설정
        // width 속성에 대한 트랜지션을 기존 트랜지션에 추가
        const transitionProperty = getComputedStyle(el)['transition-property'];

        el.style.transitionProperty = 'none';

        // isClosed 바인딩 처리
        // isClosed 값이 전달된 경우 관련 상태 설정
        if (typeof binding.value?.isClosed === 'boolean') {
            const data = vnode.data.directives.getParseDatas({ name: 'control-aside-width' })[0];
            state.variable = /isClosed:\s(\w+)/.exec(data.expression)[1];
            state.vm = vnode.context;

            // 기본값 닫힘일 때
            if (binding.value.isClosed) {
                handleAsideToggle(null);
            }
        }

        // 닫힘 동작 이후 transition property 적용
        setTimeout(() => {
            el.style.transitionProperty = `${transitionProperty}, width`;
        }, 10);

        // 이벤트 리스너 설정
        resizer.addEventListener('mousedown', handleMouseDown);
        toggleBtn.addEventListener('click', handleAsideToggle);
        window.addEventListener('resize', handleHelperRepos);
        window.addEventListener('scroll', handleHelperRepos);
    },

    update(el, binding, vnode) {
        // Vue 인스턴스가 존재하는 경우에만 처리
        if (state.vm) {
            // 디렉티브 데이터 파싱
            const data = vnode.data.directives.getParseDatas({ name: 'control-aside-width' })[0];
            const oldval = data?.oldValue?.isClosed;
            const newval = data?.value?.isClosed;

            // isClosed 값이 변경된 경우에만 토글 처리
            if (oldval !== newval) {
                state.isClosed.value = newval;
                handleAsideToggle(null, 'update');
            }
        }
    },

    unbind(el) {
        // 이벤트 리스너 제거
        const resizer = document.querySelector('.resizer');
        resizer?.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('resize', handleHelperRepos);
        window.removeEventListener('scroll', handleHelperRepos);

        // 상태 초기화
        Object.assign(state, {
            vm: null,
            variable: null,
            isClosed: { ...state.isClosed, value: false },
        });

        // 리사이저 클래스 초기화
        resizer.className = 'resizer';

        // 스토어에 저장된 aside값 초기화
        store.commit('setting/SET_ASIDEWIDTH', 0);
        store.commit('setting/SET_HELPERPOS', 0);
    },
});

// 상수
const DEFAULT_CONTENT_RATIO = 0.25; // 25%
const MAX_CONTENT_RATIO = 0.5; // 50%
const THROTTLE_DELAY = 10; // 10ms

// 상태값
const state = {
    mouseX: 0,
    asideWidth: 0,
    menu: null,
    vm: null,
    variable: null,
    minWidth: null,
    maxWidth: null,
    isClosed: {
        value: false,
        listener: function (val) {
            if (state.vm && state.vm[state.variable] !== val) {
                state.vm[state.variable] = val;
            }
        },
    },
};

/**
 * 리사이저와 토글 버튼 요소를 생성하는 함수
 * @returns {{resizer: HTMLDivElement, toggleBtn: HTMLButtonElement}} 생성된 리사이저와 토글 버튼 요소
 */

const createElements = () => {
    const resizer = document.createElement('div');
    const toggleBtn = document.createElement('button');
    resizer.className = 'resizer';
    toggleBtn.innerHTML = '<span>열기/닫기</span>';
    resizer.prepend(toggleBtn);
    return { resizer, toggleBtn };
};

/**
 * 함수 실행을 제한하는 쓰로틀 함수
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 제한 시간(ms)
 * @returns {Function} 쓰로틀된 함수
 */
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * aside width를 계산하는 함수
 * @param {HTMLElement} content - 컨텐츠 요소
 * @param {HTMLElement} aside - aside 요소
 * @param {number} dx - 마우스 이동 거리
 * @returns {number} 계산된 aside width
 */
const calculateWidth = (content, aside, dx) => {
    const newWidthPx = state.asideWidth - dx;
    const maxWidth = state.maxWidth || content.getBoundingClientRect().width * MAX_CONTENT_RATIO;

    // 최소/최대 width 제한 확인
    if (newWidthPx <= state.minWidth) return state.minWidth;
    if (newWidthPx >= maxWidth) return maxWidth;
    return newWidthPx;
};

/**
 * aside의 초기 width 값을 설정하는 함수
 * @param {HTMLElement} aside - aside 요소
 */
const initializeWidths = (aside) => {
    // minWidth 설정
    state.minWidth = parseInt(aside.style.minWidth || getComputedStyle(aside).minWidth);
    const computedMaxWidth = getComputedStyle(aside).maxWidth;

    // maxWidth 설정
    state.maxWidth = computedMaxWidth && computedMaxWidth !== 'none' ? parseInt(computedMaxWidth) : null;
    state.asideWidth = parseInt(aside.style.width || getComputedStyle(aside).width);
};

/**
 * 마우스 다운 이벤트 핸들러
 * @param {MouseEvent} e
 */
const handleMouseDown = (e) => {
    const aside = document.querySelector('aside');
    initializeWidths(aside);

    // width가 !important이거나 min/max가 동일한 경우 리사이징 불가
    if (aside.style.getPropertyPriority('width') === 'important' || (state.minWidth && state.maxWidth && state.minWidth === state.maxWidth)) {
        return;
    }

    window.getSelection()?.removeAllRanges();
    state.mouseX = e.clientX;
    state.asideWidth = aside.getBoundingClientRect().width;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
};

/**
 * 마우스 이동 이벤트 핸들러 (쓰로틀 적용)
 * @param {MouseEvent} e
 */
const handleMouseMove = throttle((e) => {
    const content = document.querySelector('#content');
    const aside = content.querySelector('aside');
    const resizer = content.querySelector('.resizer');

    resizer.classList.add('active');
    const dx = e.clientX - state.mouseX;

    // 리사이징 중 스타일 적용
    const styles = {
        cursor: 'col-resize',
        userSelect: 'none',
        pointerEvents: 'none',
    };

    Object.assign(content.style, { cursor: styles.cursor });
    Object.assign(content.querySelector('main').style, {
        userSelect: styles.userSelect,
        pointerEvents: styles.pointerEvents,
    });
    Object.assign(aside.style, {
        userSelect: styles.userSelect,
        pointerEvents: styles.pointerEvents,
        transitionDuration: 'unset',
        width: `${calculateWidth(content, aside, dx)}px`,
    });

    saveAsideWidth(calculateWidth(content, aside, dx));
}, THROTTLE_DELAY);

/**
 * 마우스 업 이벤트 핸들러
 */
const handleMouseUp = () => {
    const content = document.querySelector('#content');
    const resizer = content.querySelector('.resizer');
    const aside = content.querySelector('aside');

    // 스타일 초기화
    resizer.classList.remove('active');
    [content, content.querySelector('main'), aside].forEach((element) => {
        element.style.removeProperty('cursor');
        element.style.removeProperty('user-select');
        element.style.removeProperty('pointer-events');
    });
    aside.style.removeProperty('transition-duration');

    // 이벤트 리스너 제거
    ['mousemove', 'mouseup', 'mouseleave'].forEach((event) => {
        document.removeEventListener(event, event === 'mousemove' ? handleMouseMove : handleMouseUp);
    });
};

/**
 * 저장된 aside width를 가져와 적용하는 함수
 */
const getAsideWidth = () => {
    if (!state.menu) return;

    const content = document.querySelector('#content');
    const aside = document.querySelector('aside');
    const personal = getItemLocalStorage('personalization') || {};

    // 기본 width 계산 및 적용
    const defaultWidth = Math.round(content.getBoundingClientRect().width * DEFAULT_CONTENT_RATIO);
    const width = personal[state.menu]?.aside?.default?.width || state.minWidth > defaultWidth ? state.minWidth : defaultWidth;

    // aside width 적용
    aside.style.width = `${width}px`;
    document.querySelector(':root').style.setProperty('--asideWidth', `${width}px`);
    store.commit('setting/SET_ASIDEWIDTH', width);
    handleHelperRepos();
};

/**
 * aside width를 저장하는 함수
 * @param {number} newWidth - 저장할 새로운 width
 */
const saveAsideWidth = (newWidth) => {
    if (!state.menu) return;

    const personalization = getItemLocalStorage('personalization') || {};
    const saveData = {
        aside: {
            default: { width: newWidth },
        },
    };

    document.querySelector(':root').style.setProperty('--asideWidth', `${newWidth}px`);
    personalization[state.menu] = { ...personalization[state.menu], ...saveData };
    setItemLocalStorage('personalization', personalization);
    store.commit('setting/SET_ASIDEWIDTH', newWidth);
    handleHelperRepos();
};

/**
 * aside 토글 이벤트 핸들러
 * @param {Event} evt - 이벤트 객체
 * @param {boolean} isUpdate - 업데이트 여부
 */
const handleAsideToggle = (evt, isUpdate) => {
    if (!isUpdate) {
        state.isClosed.value = !state.isClosed.value;
        state.isClosed.listener(state.isClosed.value);
    }

    const aside = document.querySelector('aside');
    const resizer = document.querySelector('.resizer');

    // 토글 상태에 따른 클래스 추가/제거
    if (state.isClosed.value) {
        aside.classList.add('is-closed');
        resizer.classList.add('is-fold');
    } else {
        aside.classList.remove('is-closed');
        resizer.classList.remove('is-fold');
    }

    // Aside size update
    const content = document.querySelector('#content');
    const timerInterval = setInterval(() => {
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const width = Math.ceil(document.documentElement.scrollWidth - aside.getBoundingClientRect().x - scrollLeft);
        store.commit('setting/SET_ASIDEWIDTH', width);
        handleHelperRepos();
    });
    setTimeout(() => {
        clearInterval(timerInterval);
    }, 500);
};

const handleHelperRepos = () => {
    const aside = document.querySelector('aside');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const posRight = store.getters.getAsideWidth + (window.innerWidth - aside.getBoundingClientRect().right - scrollbarWidth) + 2;
    store.commit('setting/SET_HELPERPOS', posRight);
};
