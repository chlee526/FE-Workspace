<template>
    <div class="ui_treemap" :class="[{ ui_nodata: !chartData || chartData.data.length == 0 }, { 'is-click': getClickEvtChk || toggleType != 'none' }]" :style="'overflow:' + (resizing ? 'hidden' : 'visible')">
        <div :id="id" ref="treemap" class="treemap_wrap" :style="getStyle"></div>
        <transition-group tag="div" class="treemap_bubble_wrap">
            <div v-for="($item, $idx) in popupDatas" v-bind:key="$item.target + '-' + $idx" class="ui_bubble_box" :class="getChartTextColor($item.color)" :data-bubble-for="id + '_' + $item.code" data-pos="CT" v-bubble_init>
                <span class="arrow" :style="'border-color:' + $item.color">-</span>
                <div class="wrap" :style="'background:' + $item.color">
                    <div class="infos">
                        <span class="title">{{ $item.name }}</span>
                        <strong class="dv">{{ Number($item.value).lengthLimitComma(1, 3) }}</strong>
                        <template v-if="$item.new || $item.fluc != null">
                            <span v-if="!$item.new" class="ui_fluc is-box" :title="$item.fluc.numToFluc('%')" v-html="$item.fluc.numToFlucHtml('%', 1)"></span>
                            <span v-else class="ui_fluc is-box" title="New"><span class="is-new">New</span></span>
                        </template>
                        <span class="per" v-if="percentage">({{ (($item.value / totalVal) * 100).toFixed(1) }}%)</span>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
import { jsgradient } from '@shared/utils/prototype/util.colors';
import $ from 'jquery';

export default {
    name: 'comp-chart-treemap',
    data() {
        return {
            colors: [],
            totalVal: 0,
            bubbleItems: [],
            popupDatas: [],
            resizing: false,
            resizeTimer: null,
            elWid: 0,
            elHgt: 0,
            resizeObserver: null,
        };
    },
    props: {
        id: { type: String },
        toggleType: { type: String, default: null },
        chartData: { type: Object, default: null },
        opts: { type: Object, default: null },
        value: { type: String, default: '' },
        percentage: { type: Boolean, default: true },
    },
    computed: {
        getStyle() {
            let style = 'width:' + this.elWid + 'height:' + this.elHgt;
            if (this.$vnode.data.staticStyle) {
                style = this.$vnode.data.staticStyle;
            } else if (this.$vnode.data.style) {
                style = this.$vnode.data.style;
            } else {
                return 'width: auto; height: 420px';
            }

            return style;
        },
        checked: {
            get: function () {
                return this.value;
            },
            set: function ($val) {
                this.$emit('input', $val);
            },
        },
        getChartData: function () {
            const _this = this;
            let result = [];

            this.chartData.data.forEach(function ($item, $idx, $arr) {
                _this.totalVal += $item.value;
                if ($item.value == 0) $arr.splice($idx, 1);
            });
            this.chartData.data.filter(function ($item, idx) {
                let obj = {};
                if ($item.code) obj.code = $item.code;
                obj.label = "<span class='infos'><span class='title'>" + $item.name + "</span><strong class='dv'>" + $item.value.lengthLimitComma(1, 3) + '</strong>' + (_this.percentage ? "<span class='per'>(" + (($item.value / _this.totalVal) * 100).toFixed(1) + '%)</span>' : '') + '</span>';
                obj.name = $item.name;
                obj.value = $item.value;
                if ($item.fluc != undefined) obj.fluc = $item.fluc;
                if ($item.new != undefined) obj.new = $item.new;
                if ($item.fill) obj.fill = $item.fill;
                // if (idx === 2) obj.fill = '#ff0000';
                obj.data = $item.data;

                result.push(obj);
            });

            return result;
        },
        getClickEvtChk() {
            return this.$listeners.click ? true : false;
        },
    },
    created: function () {
        if (this.opts && this.opts.colors) this.colors = jsgradient.generateGradient(this.opts.colors[0], this.opts.colors[1], 12);
        else this.colors = jsgradient.generateGradient('#333333', '#c4c4c4', 12);
        $(window).resize(this.evt_resize);
    },
    mounted: function () {
        // this.build_treemap();

        // Resize Observer
        this.resizeObserver = new ResizeObserver(this.evt_resize);
        this.resizeObserver.observe(this.$el);
    },
    watch: {
        checked: function ($val) {
            let tmp = $val.split(',');
            $(this.$el)
                .find('.treemap-node')
                .each(function () {
                    if (tmp.indexOf($(this).attr('data-code')) >= 0) $(this).addClass('is-active');
                    else $(this).removeClass('is-active');
                });
        },
        elHgt(val) {
            this.resizing = true;
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.resizing = false;
                this.build_treemap();
            }, 100);
        },
        elWid(val) {
            this.resizing = true;
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.resizing = false;
                this.build_treemap();
            }, 100);
        },
        chartData: {
            deep: true,
            handler: function ($val) {
                this.build_treemap();
            },
        },
        opts($val) {
            if ($val && $val.colors) {
                this.colors = jsgradient.generateGradient($val.colors[0], $val.colors[1], 12);
                this.build_treemap();
            } else {
                this.colors = jsgradient.generateGradient('#333333', '#c4c4c4', 12);
                this.build_treemap();
            }

            $(window).resize(this.evt_resize);
        },
    },
    methods: {
        build_treemap: function () {
            const _this = this;
            this.totalVal = 0;
            let tg = $(this.$refs.treemap);

            if (!this.chartData || this.chartData.data.length == 0) return;

            tg.treemap(this.getChartData, {
                smallestFontSize: 12,
                startingFontSize: 12,
                nodeClass: function ($node, $box, $itemLen) {
                    let result = '';

                    if ($box.width() < 40 || $box.height() < 30) result = 'full hide ';
                    else if ($box.width() < 70 || $box.height() < 90) result = 'hide ';
                    $box.css('background', _this.colors[$box.index()]);
                    if ($node.fill) $box.css('background', $node.fill);
                    else $node.fill = _this.colors[$box.index()];
                    $box.attr('data-bubble-id', _this.id + '_' + $node.code);
                    if ($node.data.active) $box.addClass('is-active');
                    if ($node.code) $box.attr('data-code', $node.code);

                    return result;
                },
                ready: function () {},
                mouseenter: _this.hndl_bubbleBox_on,
                mouseleave: _this.hndl_bubbleBox_off,
                // mousemove: evt_treemap_mouseMove,
                click: function ($node, $e) {
                    if (_this.toggleType == 'one') {
                        _this.checked = $node.code;
                    } else if (_this.toggleType == 'oneToggle') {
                        if (_this.checked) {
                            if (_this.checked == $node.code) {
                                _this.checked = '';
                            } else {
                                _this.checked = $node.code;
                            }
                        } else {
                            _this.checked = $node.code;
                        }
                    } else if (_this.toggleType == 'multi') {
                        let tmp = _this.checked.split(',');
                        if (tmp.indexOf($node.code) >= 0) {
                            let tmpStr = '';
                            tmp.splice(tmp.indexOf($node.code), 1);
                            tmp.filter(function ($item, $idx) {
                                if ($idx > 0) tmpStr += ',';
                                tmpStr += $item;
                            });
                            _this.checked = tmpStr;
                        } else {
                            if (_this.checked == '') _this.checked = $node.code;
                            else _this.checked += ',' + $node.code;
                        }
                    }

                    _this.$emit('click', $node, $e);
                },
                itemMargin: 1,
            });
        },
        getChartTextColor: function ($val) {
            return jsgradient.getReversal($val) ? '' : 'is-black';
        },
        hndl_bubbleBox_on: function ($node, $e) {
            let item = {};
            item.code = $node.code;
            item.name = $node.name;
            item.value = $node.value;
            item.color = $node.fill;

            if ($node.fluc != undefined) item.fluc = $node.fluc;
            if ($node.new != undefined) item.new = $node.new;

            this.popupDatas.push(item);
        },
        hndl_bubbleBox_off: function ($node, $e) {
            this.popupDatas = [];
        },
        getPos: function ($btn) {
            let btn = $($btn);
            let bubbleBox = $(this.$el).find('*[data-bubble-for="' + btn.attr('data-bubble-id') + '"]');
            let result = {};
            let space = 12;
            result.top = btn.position().top + btn.outerHeight() / 2 - bubbleBox.outerHeight() - space;
            result.left = btn.position().left + btn.outerWidth() / 2 - bubbleBox.outerWidth() / 2;
            return result;
        },
        evt_resize: function () {
            this.elWid = $(this.$el).outerWidth();
            this.elHgt = this.$el.clientHeight;
        },
    },
    directives: {
        bubble_init: {
            inserted: function (el, binding, vnode) {
                let id = $(el).attr('data-bubble-for');
                let btn = $(vnode.context.$el).find('*[data-bubble-id="' + id + '"]');
                let pos = vnode.context.getPos(btn);
                $(el).css(pos);
            },
        },
    },
};
</script>

<style></style>
