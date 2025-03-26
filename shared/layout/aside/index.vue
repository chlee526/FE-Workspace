<template>
    <div id="side_follow" :class="[{ 'has-located': hasLocated }, { 'is-lnb': getUseageLNB }, { 'is-expanded': isExpand }]" @mouseenter="isExpand = true" @mouseleave="isExpand = false">
        <!-- 도웅말 -->
        <comp-side-follow-helper v-if="getHelperlUsage"></comp-side-follow-helper>
        <!-- 네비게이터 -->
        <comp-side-follow-navigator :expand="isExpand"></comp-side-follow-navigator>
        <!-- TOP 버튼 -->
        <comp-side-follow-top-btn></comp-side-follow-top-btn>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TweenMax } from 'gsap';
import CompHelperMngr from './HelperMngr.vue';
import Navigator from './Navigator.vue';
import TopMover from './TopMover.vue';
import EventBus from '@shared/utils/eventBus';

export default {
    name: 'comp-aside',
    data() {
        return {
            hasLocated: process.env.VUE_APP_USEAGE_LOCATOR === 'true' ? true : false,
            isExpand: false,
            useScroll: false,
        };
    },
    components: {
        'comp-side-follow-helper': CompHelperMngr,
        'comp-side-follow-navigator': Navigator,
        'comp-side-follow-top-btn': TopMover,
    },
    computed: {
        ...mapGetters(['getHelperlUsage', 'getUseageLNB']),
        getHelper() {
            return process.env.VUE_APP_HELPER;
        },
    },
    created() {
        EventBus.$on('moveAside', this.moveAside);
    },
    methods: {
        moveAside(outerHeight) {
            let mgnTop = 0;

            //outerHeight = top_search의  inner_wrap 위치 값(top) + searchs or results 의 heigth값
            if (outerHeight != 0) {
                mgnTop = outerHeight;
            } else {
                if (!this.getUseageLNB) mgnTop = 157 - (document.querySelector('#locator') ? 0 : 31);
                // else mgnTop = 100;
            }
            TweenMax.to(this.$el, 0.5, { top: mgnTop, ease: 'Expo.easeInOut' });
        },
    },
};
</script>
