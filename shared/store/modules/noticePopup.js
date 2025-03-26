import EventBus from '@shared/utils/eventBus';
import { API_popupList } from '@shared/api/popup';

const actions = {
    NOTICE_POPUP: function ({ commit }) {
        return new Promise(function (resolve, reject) {
            API_popupList()
                .then((res) => {
                    EventBus.$emit('NOTICE_POPUP_OPEN', res.data.list);
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },
    NOTICE_POPUP_OPEN: function ({ commit }, datas) {
        EventBus.$emit('NOTICE_POPUP_OPEN', datas);
    },
    NOTICE_POPUP_CLOSE: function ({ commit }, seq) {
        EventBus.$emit('NOTICE_POPUP_CLOSE', seq);
    },
};

export default {
    actions,
};
