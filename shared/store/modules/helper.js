import EventBus from '@shared/utils/eventBus';

const actions = {
    HELPER_OPEN: function ({ commit }, $seq) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(() => {
            EventBus.$emit('HELPER_OPEN', $seq);
        });
    },
};

export default {
    actions,
};
