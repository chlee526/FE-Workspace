<template>
    <div>
        <template v-if="$store.getters.getCommonPage">
            <!-- <comp-excel v-if="getExcelList"></comp-excel> -->
            <comp-modal></comp-modal>
            <comp-notice-popup v-if="getNoticePopup"></comp-notice-popup>
        </template>
        <comp-dialog></comp-dialog>
        <comp-noty pos="RB"></comp-noty>

        <transition name="helperBtn">
            <CompHelperBtn v-if="getUserHelperMenu && getUseHelperBtn" />
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CompDialog from '@shared/ui/function/dialog';
import CompNoty from '@shared/ui/function/noty';
import CompModal from '@shared/ui/function/modal';
import CompExcel from '@shared/ui/function/excel';
import CompNoticePopup from '@shared/ui/function/notice_popup';
import CompHelperBtn from '@shared/ui/helper/helperBtn';

export default {
    name: 'comp-bottom',
    data() {
        return {};
    },
    components: {
        'comp-dialog': CompDialog,
        'comp-noty': CompNoty,
        'comp-modal': CompModal,
        // 'comp-excel': CompExcel,
        'comp-notice-popup': CompNoticePopup,
        CompHelperBtn,
    },
    computed: {
        ...mapGetters(['getUserHelperMenu']),

        // 엑셀 목록 사용 여부
        getExcelList() {
            return process.env.VUE_APP_EXCEL_LIST === 'true';
        },

        // 공지 팝업 사용 여부
        getNoticePopup() {
            return process.env.VUE_APP_NOTICE_POPUP === 'true';
        },

        getNoticePopupPageChk() {
            return this.$route.path.indexOf('err') < 0 && this.$route.path.indexOf('member') < 0 && this.$route.path.indexOf('notice') < 0 ? true : false;
        },

        getUseHelperBtn() {
            return !this.$route.path.includes('/view/helper');
        },
    },

    watch: {
        $route: {
            deep: true,
            handler() {
                if (this.getNoticePopupPageChk && this.getNoticePopup) this.$store.dispatch('NOTICE_POPUP');
            },
        },
    },
};
</script>

<style></style>
