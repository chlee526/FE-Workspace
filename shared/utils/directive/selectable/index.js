/**
 * selectable 리스트 선택 디렉티브
 * selectable.js 커스텀
 * https://github.com/Mobius1/Selectable/tree/master
 * ※ sortable과 함께 사용할 수 없음
 *
 * - binding value 필수 전달 항목
 * @param {Array} data select 대상 데이터 목록
 * @param {String} target select 대상이 될 아이템의 class 또는 tagName
 * @param {Boolean} selectable selectable 사용여부
 * @param {String} id directive 호출 고유 아이디
 * @param {Object} classes 커스텀 클래스
 * @param {String} dataIndexKey data에서 선택된 값을 찾아올 키값(default: null -> index)
 *
 * - 사용법
 * directive 적용 대상에 'listUpdate' 이벤트 적용 필수
 * -> component : return Array
 * -> element : return CustomEvent(detail)
 *
 * -   초기화 방법
 *  -   디렉티브 적용 대상에 ref 적용
 *  -   refs 대상의 $el에 접근해 ResetSelectedValue 호출
 *  -   예시 : this.$refs['virtual-list'].$el.ResetSelectedValue();
 */

import Vue from 'vue';
import Selectable from '@shared/library/selectable';
import merge from 'lodash/merge';

const VARIABLES = {};

Vue.directive('selectable', {
    inserted: function (el, binding, vnode) {
        const id = binding.value.id;

        // 고유 아이디별 변수 초기화
        initVariables(id);

        VARIABLES[id].element = el;
        VARIABLES[id].target = binding.value.target;
        VARIABLES[id].originDataList = binding.value.data;
        VARIABLES[id].dataIndexKey = binding.value?.dataIndexKey;
        VARIABLES[id].useSelectable.selectable = binding.value?.selectable;

        if (VARIABLES[id].useSelectable.value) {
            init(el, binding, vnode);
        }
    },
    update: function (el, binding, vnode) {
        const id = binding.value.id;

        VARIABLES[id].useSelectable.selectable = binding.value?.selectable;
        VARIABLES[id].element = el;
        VARIABLES[id].target = binding.value.target;
        VARIABLES[id].originDataList = binding.value.data;
        VARIABLES[id].dataIndexKey = binding.value?.dataIndexKey;

        if (VARIABLES[id].isChanged) {
            if (VARIABLES[id].useSelectable.value) {
                init(el, binding, vnode);
            } else {
                destroySelectable(el, id);
            }
        } else {
            if (VARIABLES[id].useSelectable.value) {
                setTimeout(() => {
                    updateSelectable(el, id);
                }, 10);
            }
        }
        VARIABLES[id].isChanged = false;
    },
    unbind: function (el, binding) {
        const id = binding.value.id;

        destroySelectable(el, id);
    },
});

/**
 * selectable init
 * @param {HTMLElement} el
 * @param {Object} binding
 * @param {*} vnode
 */
const init = (el, binding, vnode) => {
    const id = binding.value.id;

    // selectable clear하는 function
    // selectable 적용한 컴포넌트에서 호출
    el.ResetSelectedValue = () => {
        VARIABLES[id].tmpSelected = [];
        VARIABLES[id].selected.selected = [];
        VARIABLES[id].selectable.clear();
    };

    // virtualList DOM 변경 감지
    if (el.querySelector('[role=group]')) {
        const target = el.querySelector('[role=group]');
        const config = { childList: true };
        VARIABLES[id].observer = new MutationObserver(() => updateSelectable(el, id));
        VARIABLES[id].observer.observe(target, config);
    }

    // selectable 셋팅
    VARIABLES[id].setting = {
        container: el,
        filter: VARIABLES[id].target,
        autoScroll: {
            increment: 15,
            threshold: 0,
        },
        lasso: {
            borderColor: 'rgba(0, 0, 0, 1)',
            backgroundColor: 'rgba(0, 63, 255, 0.1)',
        },
    };

    // 커스텀 클래스 적용
    VARIABLES[id].setting.classes = merge(VARIABLES[id].classes, binding.value.classes);

    // selectable 적용
    VARIABLES[id].selectable = new Selectable(VARIABLES[id].setting);

    // selectable 이벤트 시작
    VARIABLES[id].selectable.on('start', function (e, item) {
        VARIABLES[id].startIndex = item ? String(item?.node?.dataset.selectKey) : null;

        if (e.shiftKey || e.ctrlKey) {
            VARIABLES[id].isShiftKey = e.shiftKey;
            VARIABLES[id].isCtrlKey = e.ctrlKey;
        } else {
            VARIABLES[id].tmpSelected = [];
        }

        VARIABLES[id].selecting = [];
    });

    VARIABLES[id].selectable.on('drag', function (e, coords) {
        VARIABLES[id].dragging = true;

        const lasso = el.querySelector('.' + VARIABLES[id].setting.classes.lasso).getBoundingClientRect();

        el.querySelectorAll(VARIABLES[id].target).forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const index = item.getAttribute('data-select-key');
            const idx = VARIABLES[id].selecting.indexOf(index);

            // lasso와 아이템이 겹치면 선택/ 그 외 선택 해제
            if (lasso.right >= itemRect.left && lasso.left <= itemRect.right && lasso.bottom >= itemRect.top && lasso.top <= itemRect.bottom) {
                if (idx === -1) VARIABLES[id].selecting.push(index);
            } else {
                if (idx > -1) VARIABLES[id].selecting.splice(idx, 1);
            }
        });

        setSelectingClassName(id);
    });

    VARIABLES[id].selectable.on('selecting', function (e, item) {
        const index = String(item.node.dataset.selectKey);
        if (!VARIABLES[id].selecting.includes(index)) {
            VARIABLES[id].selecting.push(index);
        }
    });

    VARIABLES[id].selectable.on('deselecting', function (e, item) {
        const index = String(item.node.dataset.selectKey);
        if (VARIABLES[id].selecting.includes(index)) {
            VARIABLES[id].selecting = VARIABLES[id].selecting.filter((selected) => selected !== index);
        }
    });

    VARIABLES[id].selectable.on('end', function (e, selectedList, unselectedList) {
        const selectedIndex = VARIABLES[id].dragging ? VARIABLES[id].selecting : selectedList.map((item) => String(item.node.dataset.selectKey));
        const unselectedIndex = VARIABLES[id].dragging ? [] : unselectedList.map((item) => String(item.node.dataset.selectKey));

        // ctrl/ shift 단일이지 않을 때
        // ctrl/ shift + dragging 일 때
        if ((!VARIABLES[id].isShiftKey && !VARIABLES[id].isCtrlKey) || VARIABLES[id].dragging) {
            // ctrl + dragging = toggle
            if (VARIABLES[id].isCtrlKey && VARIABLES[id].dragging) {
                selectedIndex.forEach((index) => {
                    const idx = VARIABLES[id].selected.value.indexOf(index);
                    if (idx > -1) {
                        if (!unselectedIndex.includes(String(index))) unselectedIndex.push(index);
                    }
                });
            }

            selectedIndex.forEach((index) => {
                if (!VARIABLES[id].tmpSelected.includes(String(index))) {
                    VARIABLES[id].tmpSelected.push(String(index));
                }
            });
            unselectedIndex.forEach((index) => {
                const idx = VARIABLES[id].tmpSelected.indexOf(index);
                if (idx > -1) {
                    VARIABLES[id].tmpSelected.splice(idx, 1);
                }
            });
        } else {
            // deselect
            if (selectedIndex.length === 1 && VARIABLES[id].selected.value.length === 1 && selectedIndex[0] === VARIABLES[id].selected.value[0]) {
                VARIABLES[id].tmpSelected = [];
            } else {
                // ctrl과 함께 클릭시 toggle
                if (VARIABLES[id].isCtrlKey && !VARIABLES[id].dragging && VARIABLES[id].startIndex) {
                    const idx = VARIABLES[id].tmpSelected.indexOf(VARIABLES[id].startIndex);
                    if (idx > -1) {
                        VARIABLES[id].tmpSelected.splice(idx, 1);
                    } else {
                        VARIABLES[id].tmpSelected.push(VARIABLES[id].startIndex);
                    }
                }
            }
        }

        VARIABLES[id].selecting = [];

        VARIABLES[id].selected.selected = VARIABLES[id].tmpSelected;
        setSelectedClassName(id);

        VARIABLES[id].dragging = false;
        VARIABLES[id].isShiftKey = false;
        VARIABLES[id].isCtrlKey = false;
    });

    handleElementEvents(el, id);

    // selected 결과 emit 이벤트 붙이기
    VARIABLES[id].selected.registerListener(function () {
        if (vnode.componentInstance) vnode.componentInstance.$emit('selectedUpdate', VARIABLES[id].selected.value);
        else vnode.elm.dispatchEvent(new CustomEvent('selectedUpdate', { detail: VARIABLES[id].selected.value }));
    });
};

/**
 * directive 호출 컴포넌트 별 변수 초기화
 */
const initVariables = (id) => {
    VARIABLES[id] = {
        target: '', // select 대상이 될 아이템 class/tagName
        selectable: null,
        setting: {},
        classes: {
            lasso: 'ui-lasso',
            handle: 'ui-handle',
            focused: 'ui-focused',
            selected: 'ui-selected',
            container: 'ui-container',
            selecting: 'ui-selecting',
            selectable: 'ui-selectable',
            deselecting: 'ui-deselecting',
        },

        useSelectable: {
            value: false,
            set selectable(val) {
                VARIABLES[id].isChanged = this.value !== val;
                this.value = val;
            },
            get selectable() {
                return this.value;
            },
        },
        shiftClick: [],
        selecting: [],
        tmpSelected: [],
        originDataList: [],
        dataIndexKey: null,
        selected: {
            value: [],
            listener: function (val) {},
            set selected(val) {
                this.value = val;
                this.listener(val);
            },
            get selected() {
                return this.value;
            },
            registerListener: function (listener) {
                this.listener = listener;
            },
        },

        startIndex: 0,

        isChanged: null,
        dragging: false,
        isShiftKey: false,
        isCtrlKey: false,

        element: null,
        observer: null,
    };
};

/**
 * directive update/ virtual-list update시 동작
 * selectable에 추가된 아이템 add 및 click 이벤트 적용
 * select 상태 className으로 적용
 * @param {HTMLElement} el
 * @param {String} id
 */
const updateSelectable = (el, id) => {
    if (VARIABLES[id].useSelectable.value) {
        handleElementEvents(el, id);
        setSelectingClassName(id);
        setSelectedClassName(id);
        VARIABLES[id].selectable.add(el.querySelectorAll(VARIABLES[id].target));
    }
};

/**
 * selectable 초기화/destroy
 * observer 해제
 * @param {HTMLElement} el
 * @param {String} id
 */
const destroySelectable = (el, id) => {
    if (VARIABLES[id].selectable) {
        VARIABLES[id].selectable.clear();
        VARIABLES[id].selectable.detachEvents();
        VARIABLES[id].selectable.destroy();
        VARIABLES[id].selectable = null;

        if (el.querySelector('[role=group]')) {
            VARIABLES[id].observer.disconnect();
            VARIABLES[id].observer = null;
        }

        initVariables(id);
    }
};

/**
 * selecting인 대상에 클래스 적용
 */
const setSelectingClassName = (id) => {
    if (!VARIABLES[id].element) return;

    VARIABLES[id].element.querySelectorAll(VARIABLES[id].target).forEach((item) => {
        const idx = item.getAttribute('data-select-key');
        if (VARIABLES[id].selecting.includes(idx)) {
            item.classList.add('ui-selecting');
        } else {
            item.classList.remove('ui-selecting');
        }
    });
};
/**
 * selected인 대상에 클래스 적용
 */
const setSelectedClassName = (id) => {
    if (!VARIABLES[id].element) return;

    VARIABLES[id].element.querySelectorAll(VARIABLES[id].target).forEach((item) => {
        const idx = item.getAttribute('data-select-key');
        if (VARIABLES[id].selected.value.includes(idx)) {
            item.classList.add('ui-selected');
            if (item.classList.contains('ui-selecting')) item.classList.remove('ui-selecting');
        } else {
            item.classList.remove('ui-selected');
        }
    });
};

/**
 * target 클릭시 동작
 * shift 기능을 파일탐색기와 동일하게 동작하기 위한 커스텀
 * @param {*} evt
 * @param {*} item
 */
const checkShiftIndex = (evt, item, id) => {
    const key = VARIABLES[id].dataIndexKey;
    const index = VARIABLES[id].originDataList.findIndex((data, idx) => {
        return item.getAttribute('data-select-key') === String(key ? data[key] : idx);
    });

    if (evt.shiftKey && !VARIABLES[id].shiftClick.includes(index)) {
        //shiftClick의 길이는 최대 2
        if (VARIABLES[id].shiftClick.length === 2) {
            VARIABLES[id].shiftClick.pop();
        }
        VARIABLES[id].shiftClick.push(index);
    } else {
        VARIABLES[id].shiftClick = [index];
    }

    if (evt.shiftKey) {
        let range = [];
        if (VARIABLES[id].shiftClick.length === 2) {
            range = [...VARIABLES[id].shiftClick].sort((a, b) => a - b);
        } else if (VARIABLES[id].shiftClick.length === 1) {
            // 이전 클릭 없이 shift+click했을때 0번째 요소부터 클릭위치까지 선택
            range = [0, VARIABLES[id].shiftClick[0]];
        }

        // shift 첫번째 클릭부터 마지막 클릭까지만 selected
        VARIABLES[id].tmpSelected = [];
        for (let i = Number(range[0]); i <= Number(range[1]); i++) {
            const data = VARIABLES[id].originDataList[i];
            VARIABLES[id].tmpSelected.push(String([key ? data[key] : i]));
        }
        VARIABLES[id].selected.selected = VARIABLES[id].tmpSelected;
        // selected 스타일 적용
        setSelectedClassName(id);
    }
};

const handleElementEvents = (el, id) => {
    // target 클릭 이벤트
    el.querySelectorAll(VARIABLES[id].target).forEach((item) => {
        if (!item.classList.contains('selectable-click-event')) {
            item.addEventListener(
                'click',
                (evt) => {
                    if (!VARIABLES[id].element) return;
                    if (evt.ctrlKey || evt.shiftKey) evt.stopPropagation();
                    checkShiftIndex(evt, item, id);
                },
                true,
            );
            item.classList.add('selectable-click-event');
        }
    });

    // container 스크롤 이벤트
    if (!el.classList.contains('selectable-scroll-event')) {
        el.addEventListener('scroll', () => {
            setSelectingClassName(id);
            setSelectedClassName(id);
        });
        el.classList.add('selectable-scroll-event');
    }
};
