import EventBus from '@shared/utils/eventBus';

const actions = {
    NOTY_CLOSE_ALL: function ({ commit }) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification.destroy.all');
        });
    },
    NOTY_CLOSE: function ({ commit }, $id) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification.destroy', $id);
        });
    },
    NOTY_INFO: function ({ commit }, $text) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification', $text, 'info');
        });
    },
    NOTY_ERR: function ({ commit }, $text) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();
        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification', $text, 'error');
        });
    },
    NOTY_COM: function ({ commit }, $text) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification', $text, 'complete');
        });
    },
    NOTY_INFO_LONG: function ({ commit }, [$text, $id]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification_long', $text, 'info', $id);
        });
    },
    NOTY_ERR_LONG: function ({ commit }, [$text, $id]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification_long', $text, 'error', $id);
        });
    },
    NOTY_COM_LONG: function ({ commit }, [$text, $id]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification_long', $text, 'complete', $id);
        });
    },
    NOTY_INFO_CONFIRM: function ({ commit }, [$text, $btns]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification', $text, 'info', $btns, function ($result) {
                console.log($result);
            });
        });
    },
    NOTY_ERR_CONFIRM: function ({ commit }, [$text, $btns]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification', $text, 'error', $btns, function ($result) {
                console.log($result);
            });
        });
    },
    NOTY_COM_CONFIRM: function ({ commit }, [$text, $btns]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit('notification', $text, 'complete', $btns, function ($result) {
                console.log($result);
            });
        });
    },
};

export default {
    actions,
};
