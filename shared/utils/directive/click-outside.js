/**
 * click-outside
 * 아웃사이드 클릭 시, 이벤트 전달 디렉티브
 * 순서대로 stack에 쌓아뒀다가 아웃클릭시 다시 순차적으로 종료 시켜줌
 * on(디렉티브사용중인)되는 엘리먼트가 on(디렉티브사용중인)되어있는 엘리먼트의 자식일 경우 중첩되어 오픈, 그렇지 않을 경우 기존 on(디렉티브사용중인)된 엘리먼트 전체 종료
 */
import Vue from 'vue';
import { find, findIndex } from 'lodash';

const activeComponentsStack = [];

Vue.directive('click-outside', {
    inserted: function (el, binding, vnode) {
        if (binding.value) {
            // inserted 훅이 잇으면 훅 실행, 없으면 생성후 update 강제 실행
            if (vnode.data && vnode.data.hook && vnode.data.hook.inserted) {
                vnode.data.hook.inserted(vnode);
            } else {
                // if (binding.modifiers.stop) vnode.context.$forceUpdate();
                if (!binding.modifiers.show) vnode.context.$forceUpdate();
            }
        }
    },
    bind: function (el, binding, vnode) {
        if (binding.value) {
            let downElement = null;
            // Down/Up의 대상을 구분하기 위해 down시 대상을 등록
            el.evt_mousedown = function (event) {
                downElement = event.target;
            };
            // 실제 out Click 되었을때
            el.evt_clickOutSide = function (event) {
                const isClickedOutside = !(el === event.target || el.contains(event.target));
                if (isClickedOutside) {
                    const lastItem = activeComponentsStack[activeComponentsStack.length - 1]?.vnode;
                    if (lastItem && lastItem.context._uid === vnode.context._uid) {
                        if (downElement == event.target && event.target != undefined) {
                            binding.value(event);
                            // publicEvent == '' ? (publicEvent = event) : (publicEvent = '');
                        }
                    }
                }
            };
        }
    },
    componentUpdated: function (el, binding, vnode) {
        /**
         * 2023-11-02
         * unbind가 시간이 설정된 transition(애니메이션)으로 작동할 경우, unbind 이후에 update가 발생함
         * el(대상)에 unbinding이라는 설정값을 주어, unbind이후에는 update가 일어나지 않도록 수정함
         */

        const evt = window.event;
        // outclick 제거 이전에 update-push가 먼저 실행 돼, settimeout으로 딜레이
        setTimeout(() => {
            // 핸들러가 연결되어 있고, el(대상)이 Unbind 중이지 않아야 사용가능
            if (binding.value) {
                // 스택에 등록되지 않은 경우에만, 사용
                if (!find(activeComponentsStack, (item) => item.vnode && item.vnode.context && item.vnode.context._uid == vnode.context._uid) && !el.unbinding) {
                    if (activeComponentsStack.length) {
                        const lastItem = activeComponentsStack[activeComponentsStack.length - 1];
                        if (!lastItem.vnode.context.$el.contains(el)) {
                            // 클릭된 요소가 최상위 팝오버의 자식인지 확인
                            const isChildPopover = activeComponentsStack[0]?.vnode.context.$el.contains(el);

                            if (isChildPopover) {
                                /**
                                 * 2025-01-16
                                 * 최상위 팝오버 내부의 팝오버를 클릭한 경우,
                                 * 직전 팝오버만 닫히도록 수정
                                 */
                                if (evt) lastItem.binding.value(evt);
                            } else {
                                /**
                                 * 2025-01-16
                                 * 완전히 다른 외부의 팝오버를 클릭한 경우,
                                 * 기존처럼 스택에 있는 모든 팝오버를 닫음
                                 */
                                activeComponentsStack.forEach((item) => {
                                    if (evt) item.binding.value(evt);
                                });
                            }
                        }
                    }
                    activeComponentsStack.push({ el: el, binding: binding, vnode: vnode });

                    document.body.addEventListener('mousedown', el.evt_mousedown);
                    document.body.addEventListener('click', el.evt_clickOutSide);
                } else {
                    if (binding.modifiers.show) {
                        document.body.removeEventListener('mousedown', el.evt_mousedown);
                        document.body.removeEventListener('click', el.evt_clickOutSide);
                        activeComponentsStack.splice(
                            findIndex(activeComponentsStack, (obj) => obj.vnode && obj.vnode.context && obj.vnode.context._uid == vnode.context._uid),
                            1,
                        );
                    }
                }
            }
        }, 0);
    },
    unbind: function (el, binding, vnode) {
        if (binding.value) {
            // 대상이 Unbind가 시작 되어, 제거될거란 걸 엘리먼트에 체크
            el.unbinding = true;
            // 이벤트 제거
            document.body.removeEventListener('mousedown', el.evt_mousedown);
            document.body.removeEventListener('click', el.evt_clickOutSide);
            // Stack에서 제거
            activeComponentsStack.splice(
                findIndex(activeComponentsStack, (obj) => obj.vnode && obj.vnode.context && obj.vnode.context._uid == vnode.context._uid),
                1,
            );
        }
    },
});
