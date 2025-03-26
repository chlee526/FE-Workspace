<template>
    <div id="notification" :class="'is-pos-' + pos">
        <transition-group :name="pos.indexOf('T') > 0 ? 'fade_posy_notification_top' : 'fade_posy_notification_bottom'" tag="div" class="wrap" v-on:before-leave="beforeLeave">
            <section class="item" :class="'is-' + $item.type" v-for="$item in stack" :key="$item.id" :data-id="$item.id">
                <div>
                    <span v-html="$item.txt"></span>
                    <template v-if="$item.btns">
                        <button v-for="($item2, $idx) in $item.btns" @key="'btn_' + $idx" @click="evt_btnClick($item2, $item.id)" :key="$idx">{{ $item2.name }}</button>
                    </template>
                </div>
            </section>
        </transition-group>
    </div>
</template>

<script>
import $ from 'jquery';
import EventBus from '@shared/utils/eventBus';

export default {
    name: 'comp-noty',
    data() {
        return {
            stack: [],
            visibleTime: 5000,
            txt: '',
        };
    },
    props: {
        pos: { default: 'RT' },
    },
    created: function () {
        EventBus.$on('notification', this.send);
        EventBus.$on('notification_long', this.send_long);
        EventBus.$on('notification.destroy', this.remove);
        EventBus.$on('notification.destroy.all', this.removeAll);
    },
    watch: {
        stack: function () {},
    },
    methods: {
        beforeLeave: function ($el) {
            if (this.pos.indexOf('T') > 0) {
                $($el).css({
                    opacity: 0,
                    'margin-top': -$($el).outerHeight(),
                    'z-index': 1,
                });
            }
        },
        send: function ($txt, $type, $btns, $long, $id) {
            var _this = this;
            var stackData = {};
            stackData.id = $id ? $id : 'noty_' + new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
            stackData.txt = $txt;
            stackData.type = $type;
            stackData.btns = $btns;

            // $id가 있을때 중복 체크
            var overlapChk = false;
            if ($id) {
                this.stack.forEach(function ($item) {
                    if ($item.id == $id) overlapChk = true;
                });
            }

            if (!overlapChk) this.stack.push(stackData);

            if (!$btns && !$long) {
                setTimeout(function () {
                    _this.remove(stackData.id);
                }, this.visibleTime);
            }
        },
        send_long($txt, $type, $id) {
            this.send($txt, $type, null, true, $id);
        },
        openMBox: function () {},
        stackChk: function () {},
        remove: function ($id) {
            var removeIdx = null;
            this.stack.filter(function ($item, $idx) {
                if ($item.id == $id) removeIdx = $idx;
            });
            if (removeIdx != null) this.stack.splice(removeIdx, 1);
        },
        removeAll: function () {
            this.stack = [];
        },
        evt_btnClick: function ($item, $id) {
            if ($item.click) $item.click($item.name, () => this.remove($id));
            const closeText = ['확인', '종료', '닫기', 'cancel', '취소'];
            if (!$item.click && closeText.some((text) => $item.name.toLowerCase().includes(text))) this.remove($id);
        },
        destroy: function () {},
    },
};
</script>

<style></style>
