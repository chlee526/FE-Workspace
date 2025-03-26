<template>
    <div class="dcp_time_picker" :class="{ box_mode: boxMode }">
        <div class="input_wrap">
            <div class="wrap" ref="input">
                <div :id="id" class="date_result" :class="{ 'is-active': active }" readonly :disabled="disabled" @click="evt_click">{{ render_time.time24to12() }}</div>
            </div>
        </div>
        <transition name="fade_posy">
            <div class="time_box" v-if="active || boxMode" ref="time_setting" :style="'top: ' + pos_top + 'px; left: ' + pos_left + 'px;'" :disabled="disabled" v-init v-click-outside="evt_docClick" v-behavior-scroll-resize="evt_resizeScroll">
                <template v-for="($item, $idx) in timeCtrlUseds">
                    <div class="item" v-if="$item" v-bind:key="$idx">
                        <div class="no_use" v-if="!$item.use">
                            <div class="wrap">
                                <span class="res" v-if="$item.name == 'hour'">{{ String($item.time).time24to12('HH') }}</span>
                                <span class="res" v-else>{{ $item.time.numAddZero() }}</span>
                            </div>
                        </div>
                        <div class="time_bx" v-else>
                            <div class="wrap">
                                <span class="res" v-if="$item.type == 'hour'">{{ String($item.time).time24to12('HH') }}</span>
                                <span class="res" v-else>{{ $item.time.numAddZero() }}</span>
                                <div class="btn">
                                    <div class="up">
                                        <input type="radio" :name="id" :id="id + $item.type + '_up'" />
                                        <label :for="id + $item.type + '_up'" @mousedown="evt_mouseDn($item.type, 'up')" @mouseup="evt_mouseUp" @mouseleave="evt_mouseOut"><span class="icon-caret-up"></span></label>
                                    </div>
                                    <div class="dn">
                                        <input type="radio" :name="id" :id="id + $item.type + '_dn'" />
                                        <label :for="id + $item.type + '_dn'" @mousedown="evt_mouseDn($item.type, 'dn')" @mouseup="evt_mouseUp" @mouseleave="evt_mouseOut"><span class="icon-caret-down"></span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="item">
                    <div class="ampm_box">
                        <div class="bx">
                            <input type="radio" :name="id + 'ampm'" :id="id + 'ampm1'" value="AM" v-model="ampmChk" @change="evt_ampmChange" />
                            <label :for="id + 'ampm1'">AM</label>
                        </div>
                        <div class="bx">
                            <input type="radio" :name="id + 'ampm'" :id="id + 'ampm2'" value="PM" v-model="ampmChk" @change="evt_ampmChange" />
                            <label :for="id + 'ampm2'">PM</label>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="js">
import $ from 'jquery';

export default {
    name: 'CompTimepicker',
    data: function () {
        return {
            active: this.boxMode,
            pos_top: 0,
            pos_left: 0,
            ampmChk: parseInt(this.value.split(':')[0]) >= 12 ? 'PM' : 'AM',
            timeCtrlUseds: [
                { type: 'hour', use: true, time: parseInt(this.value.split(':')[0]), limit: 24 },
                { type: 'min', use: this.minutesSet, time: parseInt(this.value.split(':')[1]), limit: 60 },
                { type: 'sec', use: this.secondsSet, time: parseInt(this.value.split(':')[2]), limit: 60 },
            ],
        };
    },
    props: {
        value: { type: String },
        id: { type: String },
        minutesSet: { type: Boolean, default: false },
        secondsSet: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        boxMode: { type: Boolean, default: false },
    },
    computed: {
        render_time: function () {
            return this.timeCtrlUseds[0].time.numAddZero() + ':' + this.timeCtrlUseds[1].time.numAddZero() + ':' + this.timeCtrlUseds[2].time.numAddZero();
        },
    },
    created: function () {
        // this.active = this.boxMode;
    },
    mounted: function () {
    },
    watch: {
        value: function ($val) {
            this.timeCtrlUseds[0].time = parseInt(this.value.split(':')[0]);
            this.timeCtrlUseds[1].time = parseInt(this.value.split(':')[1]);
            this.timeCtrlUseds[2].time = parseInt(this.value.split(':')[2]);
        },
        render_time: function ($val) {
            this.$emit('input', $val);
            if (this.timeCtrlUseds[0].time >= 12) {
                this.ampmChk = 'PM';
            } else {
                this.ampmChk = 'AM';
            }
        },
    },
    methods: {
        time_up: function ($type) {
            var data;
            if ($type == 'hour') data = this.timeCtrlUseds[0];
            else if ($type == 'min') data = this.timeCtrlUseds[1];
            else data = this.timeCtrlUseds[2];

            data.time++;

            if (data.time >= data.limit) {
                data.time = 0;
                return;
            }
        },
        time_dn: function ($type) {
            var data;
            if ($type == 'hour') data = this.timeCtrlUseds[0];
            else if ($type == 'min') data = this.timeCtrlUseds[1];
            else data = this.timeCtrlUseds[2];

            data.time--;

            if (data.time < 0) {
                data.time = data.limit - 1;
                return;
            }
        },
        evt_mouseDn: function ($type, $dir) {
            var callFunc = $dir == 'up' ? this.time_up : this.time_dn;
            var intervalTime = $type == 'hour' ? 100 : 50;

            var _this = this;
            callFunc($type);
            _this.set = setTimeout(function () {
                _this.inter = setInterval(function () {
                    callFunc($type);
                }, intervalTime);
            }, 500);
        },
        evt_mouseUp: function ($e) {
            clearTimeout(this.set);
            clearInterval(this.inter);
        },
        evt_mouseOut: function ($e) {
            clearTimeout(this.set);
            clearInterval(this.inter);
        },
        evt_ampmChange: function () {
            if (this.ampmChk == 'PM') {
                if (this.timeCtrlUseds[0].time < 12) {
                    this.timeCtrlUseds[0].time += 12;
                }
            } else {
                if (this.timeCtrlUseds[0].time >= 12) {
                    this.timeCtrlUseds[0].time -= 12;
                }
            }
        },
        evt_resizeScroll(){
            if (!this.boxMode) this.active = false;
        },
        evt_click(){
            if(this.disabled) return;
            this.active = !this.active
        },
        evt_docClick(e) {
            if (this.$el !== e.target || !this.$el.contains(e.target)) {
                this.active = false;
            }
        },
        set_rePos: function () {
            if (this.active) {
                if (!this.boxMode) {
                    this.pos_top = $(this.$refs.input).offset().top - $(document).scrollTop() + $(this.$refs.input).outerHeight();
                    this.pos_left = $(this.$refs.input).offset().left - $(document).scrollLeft();

                    if (this.pos_top + $(this.$refs.time_setting).outerHeight() > $(window).height()) this.pos_top -= $(this.$refs.time_setting).outerHeight() + $(this.$refs.input).outerHeight() + 2;
                    if (this.pos_left + $(this.$refs.time_setting).outerWidth() > $(window).width()) this.pos_left -= $(this.$refs.time_setting).outerWidth() - $(this.$refs.input).outerWidth();

                    if (this.pos_top < 0) this.pos_top = $(this.$refs.input).offset().top - $(document).scrollTop() + $(this.$refs.input).outerHeight();
                }
            }
        },
    },
    directives: {
        init: {
            inserted: function (el, binding, vnode) {
                vnode.context.set_rePos();
            },
        },
    },
};
</script>
