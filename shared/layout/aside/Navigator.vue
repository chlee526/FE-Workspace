<template>
    <div class="navigator" v-if="trackList.length > 0">
        <ul id="trackList" ref="trackList">
            <li v-for="(item, idx) in trackList" :key="idx" :class="{ 'is-child': item.childDepth }">
                <a :id="item.id" :class="[curIdx == idx && 'is_active']" :data-idx="idx" @click="clickActiveTab">{{ item.childDepth ? '- ' : '' }}{{ item.data }}</a>
            </li>
        </ul>
        <div ref="activeBar" class="active_bar"></div>
        <transition name="fade_posx">
            <div v-if="!getExpanded" class="quick_arrow">Quick<br />Menu</div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import $ from 'jquery';
export default {
    name: 'comp-side-follow-navigator',
    data() {
        return {
            trackList: [],
            curIdx: null,
            disableUpdate: false,
            scrollGap: 150,
        };
    },
    props: {
        expand: {},
    },
    computed: {
        ...mapGetters(['getUseageLNB']),
        getExpanded() {
            return this.getUseageLNB ? this.expand : true;
        },
        getHasLocated() {
            return false;
        },
    },
    watch: {
        curIdx($val) {
            if (!this.trackList.length || !$val) return;
            const tg = this.$refs.trackList.children[$val].children[0];
            this.$refs.activeBar.style.top = tg.offsetTop + 'px';
            this.$refs.activeBar.style.height = tg.getBoundingClientRect().height + 'px';
        },
    },
    mounted() {
        // Location Area사용시 scrollGap 값 변화
        this.scrollGap = document.querySelector('#locator') ? 155 : 130;
        if (this.getUseageLNB) this.scrollGap = 88;

        this.trackList = this.getTrackTab();
        setTimeout(() => {
            this.curIdx = '0';
        }, 10);
        if (this.trackList.length) {
            window.addEventListener('scroll', this.detectPos);
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.detectPos);
    },

    methods: {
        getTrackTab() {
            let track = document.querySelectorAll('[data-track]');

            if (!track.length) return [];

            track.forEach((item, idx) => {
                // 자식 track인지 체크
                item.childDepth = $(item).parents('*[data-track]').length || 0;
                item.data = item.getAttribute('data-track');
            });

            return track;
        },
        clickActiveTab(e) {
            const _this = this;
            this.curIdx = e.target.getAttribute('data-idx');

            this.disableUpdate = true;
            setTimeout(() => {
                _this.disableUpdate = false;
            }, 500);

            // content scroll
            let tgPos = $(this.trackList[this.curIdx]).offset().top - this.scrollGap;

            $('html, body').animate({ scrollTop: tgPos }, 300);
        },
        detectPos() {
            if (this.disableUpdate) return;
            const wrapper = !this.getUseageLNB ? document.getElementById('wrap') : document.getElementById('container');

            this.trackList.forEach((item, idx) => {
                const top = item.getBoundingClientRect().top - this.scrollGap;
                const bottom = top + item.getBoundingClientRect().height;
                if (window.scrollY == 0) this.curIdx = '0';
                else if (top <= 100 || bottom < 100) this.curIdx = String(idx);
                else if (window.scrollY + window.innerHeight >= wrapper.clientHeight) this.curIdx = String(this.trackList.length - 1);
            });
        },
    },
};
</script>

<style></style>
