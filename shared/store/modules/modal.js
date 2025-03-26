import EventBus from '@shared/utils/eventBus';

const actions = {
    MODAL_OPEN: function ({ commit }, [$name, $params, $props]) {
        // event.preventDefault();
        EventBus.$emit('MODAL_OPEN', $name, $params, $props);
    },
    /**
     * 팝업 닫기
     * @param {*} commit 상태 변경
     * @param {*} $name 팝업 이름
     * @param {*} $params 팝업 닫으면서 전달 할 매개 변수
     */
    MODAL_CLOSE: function ({ commit }, $name, $params) {
        // event.preventDefault();
        EventBus.$emit('MODAL_CLOSE', $name, $params);
    },
    MODAL_CLOSE_ALL: function ({ commit }) {
        // event.preventDefault();
        EventBus.$emit('MODAL_CLOSE_ALL');
    },
};

export default {
    actions,
};
