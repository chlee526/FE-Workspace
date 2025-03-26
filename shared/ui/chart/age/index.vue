<template>
    <div class="ui_chart_wrap is-age">
        <div class="item" v-for="($item, $idx) in getChartData" :key="$idx">
            <div :id="id" class="gage" @mouseover="evt_mouseover" @mouseout="evt_mouseout">
                <comp-bubble-box class="is-age" pos="CT" :html-type="true" :custom-color="$item.color || $item.fill || colors[$idx]">
                    <button type="button" class="bar" :style="getBarStyle($item, $idx)" @click="evt_chartClick($item)"></button>
                    <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                        <span class="title">{{ $item.category }}</span>
                        <strong v-if="!onlyPercentage" class="dv">{{ Number($item.value).lengthLimitComma(1, 2) }}</strong>
                        <span v-if="!onlyPercentage" class="per">({{ $item.per }}%)</span>
                        <span v-if="onlyPercentage" class="only_per">{{ $item.per }}%</span>
                    </div>
                </comp-bubble-box>
            </div>
            <div class="category">{{ $item.category }}</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'comp-chart-age',
    data() {
        return {
            colors: ['#97999B', '#7F7F7F', '#636363', '#3D3D3D', '#000000'],
            chart: null,
            chartOpts: null,
            showInfo: false,
        };
    },
    props: {
        id: { type: String },
        chartData: { type: Object, default: null },
        onlyPercentage: { type: Boolean, default: false },
    },
    computed: {
        getChartData() {
            let result = JSON.parse(JSON.stringify(this.chartData.data));
            let totVal = 0;

            let maxVal = result.reduce(($prev, $cur) => {
                totVal += $cur.value;
                return $prev.value < $cur.value ? $cur : $prev;
            }).value;

            result.forEach($item => {
                $item.hgt = maxVal == 0 ? 0 : (($item.value / maxVal) * 100).toFixed(1);
                $item.per = maxVal == 0 ? 0 : totVal == 0 ? (($item.value / 100) * 100).toFixed(1) : (($item.value / totVal) * 100).toFixed(1);
            });

            return result;
        },

        getClickEvtChk() {
            return this.$listeners.click ? true : false;
        },
    },
    methods: {
        getBarStyle($item, $idx) {
            let style = {};
            style.height = $item.hgt + '%';
            style.background = $item.color || $item.fill || this.colors[$idx];
            style.cursor = this.getClickEvtChk ? 'pointer' : 'default';
            return style;
        },
        evt_chartClick($e) {
            this.$emit('click', $e);
        },

        evt_mouseover(e) {
            let elm = e.currentTarget.childNodes[0].childNodes[0];
            $(elm).trigger('mouseover');
        },

        evt_mouseout(e) {
            let elm = e.currentTarget.childNodes[0].childNodes[0];
            $(elm).trigger('mouseout');
        },
    },
};
</script>

<style></style>
