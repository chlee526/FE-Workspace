<template>
    <div v-if="popupList.length > 0 && getNoticePopupPageChk" id="notice_popup_container" class="notice_popup_container">
        <comp-notice-popup-item v-for="(item, idx) in popupList" :key="'notice_popup_item_' + idx" :popup-data="item"></comp-notice-popup-item>
    </div>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
import NoticePopupItem from './NoticePopupItem.vue';
export default {
    name: 'comp-notice-popup',
    components: {
        'comp-notice-popup-item': NoticePopupItem,
    },
    data() {
        return {
            popupList: [],
        };
    },
    computed: {
        getNoticePopupPageChk() {
            return this.$route.path.indexOf('err') < 0 && this.$route.path.indexOf('member') < 0 && this.$route.path.indexOf('notice') < 0 ? true : false;
        },
    },
    methods: {
        popupOpen(data) {
            data.forEach((item, idx) => {
                item.seq = idx;
            });
            this.popupList = data;
        },

        popupClose(seq) {
            let updatedData = JSON.parse(JSON.stringify(this.popupList));
            updatedData.forEach((item) => {
                if (item.seq == seq) item.hide = true;
            });
            this.popupList = updatedData;
        },
    },

    created() {
        EventBus.$on('NOTICE_POPUP_OPEN', this.popupOpen);
        EventBus.$on('NOTICE_POPUP_CLOSE', this.popupClose);
    },

    beforeDestroy() {
        EventBus.$off('NOTICE_POPUP_OPEN');
        EventBus.$off('NOTICE_POPUP_CLOSE');
    },
};
</script>

<style lang="scss" scoped></style>
