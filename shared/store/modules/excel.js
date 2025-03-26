import EventBus from '@shared/utils/eventBus';

const actions = {
    EXCEL_LIST: function ({ commit }, $result) {
        EventBus.$emit('EXCEL_LIST', $result);
    },
};

export default {
    actions,
};
