import EventBus from '@shared/utils/eventBus';

const actions = {
    DIALOG: function ({ commit }, [text, title, btnType, focusBtn]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function (resolve, reject) {
            EventBus.$emit(
                'msgMngr',
                text || '',
                title || '',
                '',
                btnType || 0,
                function (result) {
                    if (result === 0 || result === 2) resolve(result);
                    else reject(result);
                },
                focusBtn,
            );
        });
    },
    DIALOG_ERR: function ({ commit }, [$text, $title, $btnType, $focusBtn]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit(
                'msgMngr',
                $text || '',
                $title || '',
                'error',
                $btnType || 0,
                function ($result) {
                    if ($result == 0 || $result == 2) $resolve($result);
                    else $reject($result);
                },
                $focusBtn,
            );
        });
    },
    DIALOG_WRN: function ({ commit }, [$text, $title, $btnType, $focusBtn]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit(
                'msgMngr',
                $text || '',
                $title || '',
                'warning',
                $btnType || 0,
                function ($result) {
                    if ($result == 0 || $result == 2) $resolve($result);
                    else $reject($result);
                },
                $focusBtn,
            );
        });
    },
    DIALOG_INFO: function ({ commit }, [$text, $title, $btnType, $focusBtn]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit(
                'msgMngr',
                $text || '',
                $title || '',
                'info',
                $btnType || 0,
                function ($result) {
                    if ($result == 0 || $result == 2) $resolve($result);
                    else $reject($result);
                },
                $focusBtn,
            );
        });
    },
    DIALOG_QST: function ({ commit }, [$text, $title, $btnType, $focusBtn]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit(
                'msgMngr',
                $text || '',
                $title || '',
                'question',
                $btnType || 0,
                function ($result) {
                    if ($result == 0 || $result == 2) $resolve($result);
                    else $reject($result);
                },
                $focusBtn,
            );
        });
    },
    DIALOG_COM: function ({ commit }, [$text, $title, $btnType, $focusBtn]) {
        const evt = window.event || null;
        if (evt) evt.preventDefault();

        return new Promise(function ($resolve, $reject) {
            EventBus.$emit(
                'msgMngr',
                $text || '',
                $title || '',
                'complete',
                $btnType || 0,
                function ($result) {
                    if ($result == 0 || $result == 2) $resolve($result);
                    else $reject($result);
                },
                $focusBtn,
            );
        });
    },
};

export default {
    actions,
};
