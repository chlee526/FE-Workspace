/**
 * sortable 리스트 정렬 디렉티브
 * - binding value 필수 전달 항목
 * @param {Array} data 정렬 대상 데이터 목록
 * @param {String} wrapClass 아이템들의 wrapper 클래스
 * @param {Boolean} itemClass 드래그 아이템 class
 * @param {Boolean} targetClass 드래그 아이템 타겟 class
 *
 * - 사용법
 * directive 적용 대상에 'listUpdate' 이벤트 적용 필수
 * -> component : return Object {data: 리스트, dragIdx: 드래그 아이템의 인덱스, tgIdx: 이동할 위치의 아이템 인덱스}
 * -> element : return CustomEvent(detail)
 *
 * ※ 아이템들의 간격 조정을 위한 스타일링시, 드래그 이벤트가 걸려있는 요소에 스타일 적용
 */

import Vue from 'vue';
import './style.scss';
import { throttle } from 'lodash';

const state = {
    listData: [],
    targetClass: '',
    scrollInterval: null,
    dragState: {
        dragItem: null,
        dragItemIndex: -1,
        dragItemGrpName: '',
        dragItemIsHeader: false,
        isOverDragItem: false, // dragOver 상태 추적을 위한 플래그 추가
    },
};

Vue.directive('sortable', {
    inserted: (el, binding, vnode) => initDirective(el, binding, vnode),
    update: (el, binding, vnode) => updateDirective(el, binding, vnode),
    unbind: (el, binding, vnode) => cleanupDirective(el, binding, vnode),
});

// Directive 초기화
const initDirective = (el, binding, vnode) => {
    initSortSet(binding, vnode);
    state.listData = structuredClone(binding.value.data);
    state.targetClass = binding.value.targetClass;

    Vue.nextTick(() => {
        applyDragEvent(vnode);
    });

    observeDOMChange(el, vnode);
};

// Directive 업데이트
function updateDirective(el, binding, vnode) {
    initSortSet(binding, vnode);
    state.listData = structuredClone(binding.value.data);
    state.targetClass = binding.value.targetClass;

    Vue.nextTick(() => {
        applyDragEvent(vnode);
    });

    observeDOMChange(el, vnode);
}

// Directive 정리
function cleanupDirective(el, binding, vnode) {
    state.targetClass = '';
    state.listData = [];
    state.dragState = {
        dragItem: null,
        dragItemIndex: -1,
        dragItemGrpName: '',
        dragItemIsHeader: false,
    };

    if (vnode.sortSet?.sortObserver) {
        vnode.sortSet.sortObserver.disconnect();
        vnode.sortSet.sortObserver = null;
    }
    removeDragEvent(vnode);
}

// DOM 변경 감지 설정
const observeDOMChange = (el, vnode) => {
    const wrap = el.querySelector(`.${vnode.sortSet.wrapClass}`);
    if (wrap) {
        if (vnode.sortSet.sortObserver) {
            vnode.sortSet.sortObserver.disconnect();
        }
        vnode.sortSet.sortObserver = new MutationObserver(() => applyDragEvent(vnode));
        vnode.sortSet.sortObserver.observe(wrap, {
            childList: true, // 자식 요소 변경 감지
            attributes: true, // 속성 변경 감지
        });
    }
};

// SortSet 초기화
function initSortSet(binding, vnode) {
    vnode.sortSet = {
        wrapClass: binding.value.wrapClass,
        itemClass: binding.value.itemClass,
        sortObserver: vnode.sortSet?.sortObserver || null,
        curDropLineElm: null, // 현재 드롭라인이 있는 엘리먼트
        curDropLinePos: null, // 'before' 또는 'after'
    };
}

/**
 * 스크롤 처리 함수
 * @param {Object} e 이벤트 객체
 * @param {HTMLElement} container 스크롤 컨테이너
 */
const handleScroll = (e, container) => {
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const threshold = Math.min(containerRect.height * 0.1, 20); // 스크롤 감지 영역
    const mouseY = e.clientY;
    const baseSpeed = 5;
    const maxSpeed = 15; // 최대 속도
    const interval = 10;
    clearInterval(state.scrollInterval);
    // 스크롤 속도 계산 (거리에 비례하여 증가)
    const calculateScrollSpeed = (distance, isOutside) => {
        if (isOutside) return maxSpeed; // 컨테이너 밖에서는 최대 속도 유지

        return Math.min(baseSpeed + (distance / threshold) * (maxSpeed - baseSpeed), maxSpeed);
    };

    const scrollPositions = [
        {
            condition: mouseY < containerRect.top, // 컨테이너 영역 위로 마우스가 있을 때
            handler: () => {
                state.scrollInterval = setInterval(() => {
                    container.scrollTop -= maxSpeed;
                }, interval);
            },
        },
        {
            condition: mouseY < containerRect.top + threshold, // 컨테이너 상단 10% 영역에 있을 때
            handler: () => {
                const distance = containerRect.top + threshold - mouseY;
                const scrollSpeed = calculateScrollSpeed(distance, false);
                state.scrollInterval = setInterval(() => {
                    container.scrollTop -= scrollSpeed;
                }, interval);
            },
        },
        {
            condition: mouseY > containerRect.bottom, // 컨테이너 영역 아래로 마우스가 있을 때
            handler: () => {
                state.scrollInterval = setInterval(() => {
                    container.scrollTop += maxSpeed;
                }, interval);
            },
        },
        {
            condition: mouseY > containerRect.bottom - threshold, // 컨테이너 하단 10% 영역에 있을 때
            handler: () => {
                const distance = mouseY - (containerRect.bottom - threshold);
                const scrollSpeed = calculateScrollSpeed(distance, false);
                state.scrollInterval = setInterval(() => {
                    container.scrollTop += scrollSpeed;
                }, interval);
            },
        },
    ];

    const position = scrollPositions.find((pos) => pos.condition);
    if (position) {
        position.handler();
    }
};

// 드래그 이벤트 설정
function applyDragEvent(vnode) {
    if (!vnode.sortSet.itemClass) {
        vnode.elm.childNodes[0].childNodes.forEach((elm) => {
            if (elm.children?.[0]) elm.children[0].setAttribute('draggable', '');
        });
        return;
    }

    const items = Array.from(vnode.elm.querySelectorAll(`.${vnode.sortSet.itemClass}`));
    items.some((item) => {
        if (state.targetClass?.length > 0) {
            item.addEventListener('mousedown', (e) => {
                item.setAttribute('draggable', e.target.classList.contains(state.targetClass) || '');
            });
        }

        if (!item.dataset.setEvent) {
            const handlers = {
                drag: (e) => onDrag(e, vnode),
                drop: (e) => onItemDropped(e, vnode),
                dragend: (e) => onDragEnd(e, vnode),
                dragenter: (e) => e.preventDefault(),
                dragleave: (e) => e.preventDefault(),
            };

            Object.entries(handlers).forEach(([event, handler]) => {
                item.addEventListener(event, handler);
            });

            item.setAttribute('draggable', true);
            item.setAttribute('data-set-event', true);
        }

        item.addEventListener('dragstart', (e) => onDragStart(e, vnode));
        item.addEventListener('dragover', (e) => onDragOver(e, vnode));
    });
}

// 드래그 이벤트 제거
function removeDragEvent(vnode) {
    const elements = vnode.elm.querySelectorAll(`.${vnode.sortSet.itemClass}`);
    elements.forEach((item) => {
        item.removeAttribute('draggable');
        item.removeAttribute('data-set-event');

        const events = ['drag', 'dragstart', 'dragover', 'drop', 'dragend', 'dragenter', 'dragleave'];
        events.forEach((event) => {
            item.removeEventListener(event, () => {});
        });
    });
}

/**
 * 현재 드래그 엘리먼트 dragItem 클래스 관리 함수
 * @param {HTMLElement} element 드래그 아이템으로 설정할 엘리먼트
 */
const setDragItem = (element) => {
    const { dragItem } = state.dragState;

    // 이전 드래그 아이템 클래스 제거
    if (dragItem) {
        dragItem.classList.remove('is-drag-item');
    }

    // 새 드래그 아이템 설정
    if (element) {
        element.classList.add('is-drag-item');
    }
};

/**
 * 드롭라인 제거 함수
 * @param {Object} vnode
 * @param {String} target 제거 타겟
 */
const removeDropLine = (vnode, target) => {
    if (target === 'all') {
        const beforeLines = vnode.elm.querySelectorAll('.is-dragging-before');
        const afterLines = vnode.elm.querySelectorAll('.is-dragging-after');

        // 모든 before,after 라인 제거
        beforeLines.forEach((line) => line.classList.remove('is-dragging-before'));
        afterLines.forEach((line) => line.classList.remove('is-dragging-after'));

        // sortSet 초기화
        vnode.sortSet.curDropLineElm = null;
        vnode.sortSet.curDropLinePos = null;
        return;
    }

    const { curDropLineElm, curDropLinePos } = vnode.sortSet;
    if (!curDropLineElm) return;

    if (target === curDropLinePos) {
        curDropLineElm.classList.remove(`is-dragging-${curDropLinePos}`);
        vnode.sortSet.curDropLineElm = null;
        vnode.sortSet.curDropLinePos = null;
    }
};

/**
 * 드롭라인 추가 함수
 * @param {Object} vnode
 * @param {HTMLElement} element 라인 추가할 엘리먼트
 * @param {String} position 라인 추가할 위치
 */
const addDropLine = (vnode, element, position) => {
    const { curDropLineElm, curDropLinePos } = vnode.sortSet;

    // 같은 엘리먼트, 같은 위치면 무시
    if (curDropLineElm === element && curDropLinePos === position) return;

    // 기존 드롭라인 제거
    if (curDropLineElm) curDropLineElm.classList.remove(`is-dragging-${curDropLinePos}`);

    // 새 드롭라인 추가
    element?.classList.add(`is-dragging-${position}`);
    vnode.sortSet.curDropLineElm = element;
    vnode.sortSet.curDropLinePos = position;
};

/**
 * 리스트 데이터 업데이트 함수 - 에밋 이벤트로 업데이트 된 리스트 데이터와 dragIdx, tgIdx 전달
 * @param {String} dragIdx 드래그 아이템 인덱스
 * @param {String} tgIdx 타겟 아이템 인덱스
 * @param {Array} dragGroup 드래그 아이템이 그룹 헤더일 경우 드래그 아이템 그룹 전달
 */
const handleListChange = (dragIdx, tgIdx, dragGroup, vnode) => {
    let list = structuredClone(state.listData);
    if (!list.length) return;

    const { dragItemIsHeader } = state.dragState;

    if (dragItemIsHeader) {
        // 드래그 아이템이 그룹 헤더 일 경우 children 아이템들까지 같이 이동
        const movedItems = dragGroup.map((item) => list[item.dataset.index]);
        list.splice(dragIdx, dragGroup.length);
        list.splice(tgIdx, 0, ...movedItems);
    } else {
        const movedItem = list[dragIdx];
        list.splice(dragIdx, 1);
        list.splice(tgIdx, 0, movedItem);
    }

    const updated = { detail: { data: list, dragIdx, tgIdx } };
    if (vnode.componentInstance) {
        vnode.componentInstance.$emit('listUpdate', updated);
    } else {
        vnode.elm.dispatchEvent(new CustomEvent('listUpdate', updated));
    }
};

/**
 * dragstart 이벤트 함수 - 드래그 아이템을 드래그 하려고 시작할 때 실행
 * @param {Object} e 이벤트 객체
 */
const onDragStart = (e, vnode) => {
    e.stopPropagation();
    state.listData = structuredClone(vnode.data.directives[0].value.data);
    const curTarget = e.currentTarget;

    // dragState 업데이트
    state.dragState = {
        dragItem: curTarget,
        dragItemIndex: curTarget.dataset.index,
        dragItemGrpName: curTarget.dataset.dragGroup,
        dragItemIsHeader: curTarget.dataset.grpHead === 'true',
    };

    vnode.sortSet.grpHeaders = Array.from(vnode.elm.querySelectorAll('[data-grp-head="true"]'));
    vnode.sortSet.scrollNode = curTarget.parentNode.parentNode;
    vnode.sortSet.dragIdxInHeaders = vnode.sortSet.grpHeaders.indexOf(curTarget);
    setDragItem(curTarget); // 드래그 아이템 설정
};

/**
 * drag 이벤트 함수 - 드래그 아이템을 드래그하면서 마우스를 움직일 때 실행
 * @param {Object} e 이벤트 객체
 */
const onDrag = throttle(function (e, vnode) {
    let tgPosLeft = e.currentTarget?.getBoundingClientRect().left;
    let tgPosRight = e.currentTarget?.getBoundingClientRect().right;

    if (e.clientX < tgPosLeft || e.clientX > tgPosRight) {
        removeDropLine(vnode, 'all');
        state.dragState.isOverDragItem = false; // 드래그 요소 밖으로 나감
    }

    // 드래그 중일 때 자동 스크롤 처리
    const container = vnode.sortSet.scrollNode;
    handleScroll(e, container);
}, 10);

/**
 * dragover 이벤트 함수 - 마우스가 드래그 가능한 객체의 영역 위에 있을때 실행
 * @param {Object} e 이벤트 객체
 */
const onDragOver = (e, vnode) => {
    e.preventDefault();
    e.stopPropagation();
    const curTarget = e.currentTarget;
    const sortSet = vnode.sortSet;
    const dragGroups = vnode.elm.querySelectorAll('[data-drag-group]');
    const targetIdx = curTarget.dataset.index;
    const targetGroupName = curTarget.dataset.dragGroup;
    const targetGroup = Array.from(dragGroups).filter((item) => item.dataset.dragGroup === targetGroupName);
    const targetGroupHeader = sortSet.grpHeaders?.find((item) => item.dataset.dragGroup === targetGroupName);
    const { dragItem, dragItemIndex, dragItemGrpName, dragItemIsHeader } = state.dragState;

    state.dragState.isOverDragItem = true; // 드래그 요소 위에 있음

    // 그룹이 다르면 드롭라인 제거 후 즉시 리턴
    if (!dragItemIsHeader && dragItemGrpName !== targetGroupName) {
        removeDropLine(vnode, 'all');
        return;
    }

    // 드래그 아이템이 같은 그룹의 헤더면 드롭라인 제거 후 즉시 리턴
    if (dragItemIsHeader && dragItemGrpName === targetGroupName) {
        removeDropLine(vnode, 'all');
        return;
    }

    // 자기 자신이면 드롭라인 제거 후 즉시 리턴
    if (curTarget === dragItem) {
        removeDropLine(vnode, 'all');
        return;
    }

    // 타겟 그룹 전체 높이를 기준으로 direction 설정
    if (dragItemIsHeader && targetGroup.length >= 1) {
        const groupHeight = targetGroup[targetGroup.length - 1].getBoundingClientRect().top - targetGroupHeader.getBoundingClientRect().top + targetGroup[targetGroup.length - 1].clientHeight;

        sortSet.direction = e.clientY - targetGroupHeader.getBoundingClientRect().top >= groupHeight / 2 ? 'down' : 'up';
    } else {
        // 현재 타겟 아이템 높이를 기준으로 direction 설정
        sortSet.direction = e.clientY - curTarget.getBoundingClientRect().top >= curTarget.clientHeight / 2 ? 'down' : 'up';
    }

    if (dragItemIsHeader) {
        if (sortSet.direction === 'down') {
            // 현재 타겟 아이템 그룹이 드래그 아이템 그룹의 앞 뒤 그룹이면 드롭라인 제거 후 return
            if (sortSet.dragIdxInHeaders - sortSet.grpHeaders.indexOf(targetGroupHeader) === 1) {
                removeDropLine(vnode, 'all');
                return;
            }

            if (targetGroupName) {
                // 타겟 아이템 그룹의 아이템이 2개 이상일 경우 타겟 아이템 그룹의 마지막 아이템 밑으로 드롭롭라인 표시
                if (targetGroup.length > 1) {
                    addDropLine(vnode, targetGroup[targetGroup.length - 1], 'after');
                } else {
                    // 현재 타겟 아이템 밑으로 드롭라인 표시
                    addDropLine(vnode, curTarget, 'after');
                }
            }
        } else if (sortSet.direction === 'up') {
            if (sortSet.grpHeaders.indexOf(targetGroupHeader) - sortSet.dragIdxInHeaders === 1) {
                removeDropLine(vnode, 'all');
                return;
            }

            if (targetGroupName) {
                addDropLine(vnode, targetGroup[0], 'before');
            }
        }
    } else {
        if (dragItemGrpName !== targetGroupName) {
            removeDropLine(vnode, 'all');
            return;
        }

        if (sortSet.direction === 'down') {
            if (parseInt(dragItemIndex) - parseInt(targetIdx) === 1) {
                removeDropLine(vnode, 'all');
                return;
            }
            addDropLine(vnode, curTarget, 'after');
        } else if (sortSet.direction === 'up') {
            if (parseInt(targetIdx) - parseInt(dragItemIndex) === 1) {
                removeDropLine(vnode, 'all');
                return;
            }
            addDropLine(vnode, curTarget, 'before');
        }
    }
};

/**
 * drop 이벤트 함수 - 드래그가 끝나서 드래그하던 아이템을 드래그 가능한 객체 위치에 놓을 때 실행 -> handleListChange 함수 호출
 * @param {Object} e 이벤트 객체
 */
const onItemDropped = (e, vnode) => {
    e.preventDefault();
    const curTarget = e.currentTarget;
    const { dragItemIndex, dragItemGrpName, dragItemIsHeader } = state.dragState;
    const grpHeaders = vnode.sortSet.grpHeaders;
    const dragGroups = Array.from(vnode.elm.querySelectorAll('[data-drag-group]'));
    const dragItemGroup = dragGroups.filter((item) => item.dataset.dragGroup === dragItemGrpName);
    const targetGroupName = curTarget.dataset.dragGroup;
    const targetGroup = dragGroups.filter((item) => item.dataset.dragGroup === targetGroupName);
    const targetIdx = curTarget.dataset.index;
    const targetIdxInHeaders = grpHeaders?.indexOf(targetGroup.find((item) => item.dataset.grpHead === 'true'));

    if (dragItemIndex === targetIdx) return;

    // 드래그 아이템이 그룹 헤더 일 경우
    if (dragItemIsHeader) {
        if (!curTarget.dataset.grpHead || curTarget.dataset.grpHead === 'false') {
            if (vnode.elm.querySelector('.is-dragging-before')) {
                if (parseInt(grpHeaders[targetIdxInHeaders].dataset.index) > parseInt(dragItemIndex)) {
                    handleListChange(dragItemIndex, grpHeaders[targetIdxInHeaders - 1].dataset.index, dragItemGroup, vnode);
                } else {
                    handleListChange(dragItemIndex, grpHeaders[targetIdxInHeaders].dataset.index, dragItemGroup, vnode);
                }
            } else if (vnode.elm.querySelector('.is-dragging-after')) {
                if (parseInt(dragItemIndex) > parseInt(grpHeaders[targetIdxInHeaders].dataset.index)) {
                    handleListChange(dragItemIndex, grpHeaders[targetIdxInHeaders + 1].dataset.index, dragItemGroup, vnode);
                } else {
                    handleListChange(dragItemIndex, grpHeaders[targetIdxInHeaders].dataset.index, dragItemGroup, vnode);
                }
            }
        } else {
            if (parseInt(dragItemIndex) > parseInt(targetIdx) && curTarget.classList.contains('is-dragging-after')) {
                handleListChange(dragItemIndex, grpHeaders[targetIdxInHeaders + 1].dataset.index, dragItemGroup, vnode);
            } else if (parseInt(dragItemIndex) < parseInt(targetIdx) && curTarget.classList.contains('is-dragging-before')) {
                handleListChange(dragItemIndex, grpHeaders[Math.max(parseInt(targetIdxInHeaders) - 1, 0)].dataset.index, dragItemGroup, vnode);
            } else {
                handleListChange(dragItemIndex, targetIdx, dragItemGroup, vnode);
            }
        }
    } else {
        // 드래그 그룹 속성이 있는 아이템일 경우 그룹명이 다른 아이템끼리 이동 X , children 아이템이 그룹 헤더 아이템 인덱스로 이동 X
        if (dragItemGrpName !== targetGroupName || curTarget.dataset.grpHead === 'true') return;

        if (parseInt(dragItemIndex) > parseInt(targetIdx) && curTarget.classList.contains('is-dragging-after')) {
            handleListChange(dragItemIndex, String(Math.min(parseInt(targetIdx) + 1, state.listData.length)), dragItemGroup, vnode);
        } else if (parseInt(dragItemIndex) < parseInt(targetIdx) && curTarget.classList.contains('is-dragging-before')) {
            handleListChange(dragItemIndex, String(Math.max(parseInt(targetIdx) - 1, 0)), dragItemGroup, vnode);
        } else {
            handleListChange(dragItemIndex, targetIdx, dragItemGroup, vnode);
        }
    }

    Vue.nextTick(() => {
        setDragItem(null);
    });
};

/**
 * dragend 이벤트 함수 - 드래그 중 버튼을 뗄 때 실행
 * @param {Object} e 이벤트 객체
 */
const onDragEnd = (e, vnode) => {
    e.preventDefault();
    const sortSet = vnode.sortSet;
    sortSet.grpHeaders = null;
    sortSet.dragIdxInHeaders = null;

    // 드래그 요소 밖에서 끝난 경우에만 스크롤 멈춤 처리
    if (!state.dragState.isOverDragItem && state.scrollInterval) {
        clearInterval(state.scrollInterval);
        state.scrollInterval = null;

        // 스크롤 컨테이너의 스크롤 동작도 강제로 멈춤
        if (state.dragState.dragItem) {
            const scrollContainer = sortSet.scrollNode;
            if (scrollContainer) {
                scrollContainer.style.overflow = 'hidden';
                // 약간의 지연 후 다시 스크롤 가능하도록 설정
                setTimeout(() => {
                    scrollContainer.style.overflow = 'auto';
                }, 0);
            }
        }
    }

    // 상태 초기화
    state.dragState.isOverDragItem = false;
    removeDropLine(vnode, 'all');
    setDragItem(null);
};
