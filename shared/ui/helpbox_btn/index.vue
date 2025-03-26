<template>
    <div class="ui_helpbox_btn">
        <input ref="input" :id="id" type="checkbox" v-model="checked" />
        <label :for="id" class="icon" :title="'도움말 ' + (checked ? '닫기' : '열기')">&#xe006;</label>
    </div>
</template>

<script>
import $ from 'jquery';
import { TweenMax, Expo } from 'gsap';
import { mapGetters } from 'vuex';
import EventBus from '@shared/utils/eventBus';

export default {
    name: 'comp-helpbox-btn',
    data() {
        return {
            checked: this.$store.getters.getHelperEnable || this.active,
            helperDatas: {
                el: this.$el,
                val: this.checked,
            },
        };
    },
    props: {
        id: String,
        active: {},
    },
    computed: {
        ...mapGetters(['getHelperEnable']),
    },
    mounted: function () {
        this.$store.commit('setting/ADD_HELPERLIST', this.helperDatas);

        var idx = $(this.$el).parent().children().length - 1 - $(this.$el).parent().children().index(this.$el);
        var helpBox = $('.ui_help_box[data-for="' + this.id + '"]');
        helpBox.addClass('r_' + idx);
        helpBox.css('--arrowRight', this.$el.parentNode.getBoundingClientRect().right - this.$el.getBoundingClientRect().right + (this.$vnode.data.staticClass && this.$vnode.data.staticClass.indexOf('is-small') >= 0 ? 4 : 6) + 'px');

        EventBus.$on('SET_ALL_HELPER', this.evt_allHelper);

        this.$nextTick(() => {
            this.hndl_help_content(0);
        });
    },
    watch: {
        getHelperEnable: function (val) {
            this.checked = val;
        },
        checked: function ($val) {
            this.hndl_help_content();
            if (!$val) this.$store.commit('setting/SET_HELPERENABLE', false);
            this.helperDatas.val = $val;

            var allChk = this.$store.getters.getHelperList.filter(function ($item) {
                return $item.val;
            });
            if (allChk.length == this.$store.getters.getHelperList.length) {
                this.$store.commit('setting/SET_HELPERENABLE', true);
            }
        },
    },
    methods: {
        hndl_help_content($time = 0.5) {
            let tg = document.querySelector('.ui_help_box[data-for="' + this.id + '"]');
            let hgt = tg.querySelector('.wrap').getBoundingClientRect().height || 0;

            if (this.checked) {
                TweenMax.to(tg, $time, { height: hgt, ease: Expo.easeInOut });
            } else {
                TweenMax.to(tg, $time, { height: 0, ease: Expo.easeInOut });
            }
        },
        evt_allHelper: function ($val) {
            this.checked = $val;
        },
    },
};
</script>

<style></style>
