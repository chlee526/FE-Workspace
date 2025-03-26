<template>
    <div class="ui_word_cloud_container">
        <div v-if="useViewType && viewType" class="view_type">
            <comp-button v-if="exceptWord" class="is-small" style="margin-right: 10px" @click="exceptClick">
                <span>{{ exceptWord.name }} 제외</span>
            </comp-button>
            <comp-radio-grp :id="id + '_viewtype'" class="rk_view_type is-icon is-small" :opts="viewTypeOpts" :name="id + '_viewtype'" v-model="selViewType" :box="true"></comp-radio-grp>
        </div>
        <comp-chart-wordcloud-brd v-if="selViewType" v-show="selViewType == '2'" :rk-data="getData.data" v-model="checked" :style="getHgt" :visible="selViewType == '2'" :toggle-type="toggleType" :use-attr="useAttrFixed ? useAttrFixed : useAttr" :use-fluc="useFlucFixed ? useFlucFixed : useFluc" :label-name="labelName" @click="evt_itemClick" :el-hgt.sync="elHgt" :fix-active-color="fixActiveColor"></comp-chart-wordcloud-brd>
        <comp-chart-wordcloud-chart v-show="selViewType != '2'" :is-show="selViewType != '2'" :id="id + '_cloud'" :class="{ 'is-click': getClickEvtChk }" :opts="opts" :chart-data="getData" v-model="checked" :toggle-type="toggleType" :sort="sort" :style="getHgt" :legend="legend" :legendShow="legendShow" :rotation="rotation" @click="evt_itemClick" :el-wid.sync="elWid" :el-hgt.sync="elHgt" :fix-active-color="fixActiveColor" :use-rank="useRank"></comp-chart-wordcloud-chart>
    </div>
</template>
<script>
import WordcloudBrd from './WordcloudBrd.vue';
import WordcloudChart from './WordcloudChart.vue';
export default {
    name: 'comp-chart-wordcloud',
    components: {
        'comp-chart-wordcloud-brd': WordcloudBrd,
        'comp-chart-wordcloud-chart': WordcloudChart,
    },
    data: function () {
        return {
            selViewType: parseInt(this.viewType) || 1, // View Type(1: 워드클라우드, 2: 게시판)
            viewTypeOpts: [
                { code: '1', type: 'Cloud', name: '&#xe033;' },
                { code: '2', type: '게시판', name: '&#xe025;' },
            ],
            legendColors: ['#EC5151', '#F58B39', '#F6B61F', '#ABC834', '#69B229', '#28AA53', '#1E9BC9', '#3972D5', '#9C69DF', '#AAAAAA'],
            legendColor_rank: [
                { rank: '3', color: '#EC5151' },
                { rank: '6', color: '#ABC834' },
                { rank: '10', color: '#1F9BC9' },
                { rank: '', color: '#AAAAAA' },
            ],
            elHgt: 0,
            elWid: 0,
            useAttr: false,
            useFluc: false,
            resizeObserver: null,
        };
    },
    props: {
        legendShow: { type: Boolean },
        id: { type: String },
        toggleType: { type: String, default: null },
        viewType: { type: String, default: '1' },
        useViewType: { type: Boolean, default: true },
        chartData: { type: Object, default: null },
        opts: { type: Object, default: null },
        exceptWord: { type: Object, default: null },
        legend: {},
        value: { type: Array, default: null },
        rotation: { type: Boolean, default: true },
        sort: { type: String, default: 'T' },
        labelName: { type: String, default: '연관어' },
        useAttrFixed: { type: Boolean, defalut: false },
        useFlucFixed: { type: Boolean, defalut: false },
        useRank: { type: Boolean, default: false }, // 순위 사용 여부 - 형식: (1/30)
        fixActiveColor: { type: String, default: null },
    },
    computed: {
        /**
         * v-model 연결
         */
        checked: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        /**
         * 'is-click' class Bind를 위한 메소드
         * @return {Boolean}
         */
        getClickEvtChk() {
            return this.$listeners.click ? true : false;
        },

        /**
         * brd, chart 높이 설정
         * @return {String} height style
         */
        getHgt() {
            let hgt = this.elHgt;

            // 정적 스타일(staticStyle)이 있는 경우
            if (this.$vnode.data.staticStyle) {
                hgt = this.$vnode.data.staticStyle.height.split('px')[0];
            }
            // 동적 스타일(style)이 있는 경우
            else if (this.$vnode.data.style) {
                hgt = this.$vnode.data.style.split('height')[1].split(':')[1].split('px')[0];
            }
            // 기본 높이 설정
            else {
                return 'height: 404px';
            }

            // ViewType 사용시 높이에서 ViewType 영역 뺀 값 반환
            return 'height:' + (this.useViewType ? hgt - 36 : hgt) + 'px';
        },

        /**
         * 차트 데이터 가공
         * @return {Object} chartData
         */
        getData() {
            const result = structuredClone(this.chartData);
            const rangeCnt = Math.ceil(this.chartData.data.length / this.legendColors.length);
            let legendCnt = 0;

            if (this.chartData.data.length) {
                result.data = this.chartData.data.map((data, idx) => {
                    const item = {
                        rank: parseInt(idx) + 1,
                        code: data.code,
                        word: data.name || data.keyword,
                        name: data.name || data.keyword,
                        weight: data.attr_type_code && data.attr_type_code.indexOf('out') >= 0 ? Number(data.compare_rank) : Number(data.cnt_d) || Number(data.value) || Number(data.cur_rank),
                        weight_p: Number(data.cnt_p),
                        new: data.new,
                        attr_type_code: data.attr_type_code || '',
                    };

                    // 변동률이 있으면 변동률(fluc) 설정 및 useFluc 활성화
                    if ((data.factor_per && !isNaN(Number(data.factor_per))) || data.factor_per == 0) {
                        item.fluc = Number(data.factor_per);
                        this.useFluc = true;
                    } else {
                        this.useFluc = false;
                    }

                    // senti 데이터가 있는 경우 senti 데이터 설정
                    if (data.senti_1) item.senti_1 = Number(data.senti_1);
                    if (data.senti_2) item.senti_2 = Number(data.senti_2);
                    if (data.senti_3) item.senti_3 = Number(data.senti_3);

                    if (this.legend) {
                        // 점유율 기준으로 색상 설정
                        if (this.legend == 'share') {
                            item.color = this.legendColors[legendCnt];
                            if (idx != 0 && idx % rangeCnt == 0) legendCnt++;
                        }
                        // 순위 기준으로 색상 설정
                        if (this.legend == 'rank') {
                            item.color = this.legendColor_rank[legendCnt].color;
                            if (idx + 1 == this.legendColor_rank[legendCnt].rank) legendCnt++;
                        }
                        // 사용자 정의 순위 기준으로 색상 설정
                        if (Array.isArray(this.legend) && this.legend[legendCnt] != undefined) {
                            item.color = this.legend[legendCnt].color;
                            if (idx + 1 == this.legend[legendCnt].rank) legendCnt++;
                        }
                    }

                    // 데이터에 색상 정보가 있는 경우 사용
                    if (data.color || data.fill) item.color = data.color || data.fill;
                    if (!item.color) item.color = '#666666';

                    // 속성 정보가 있는 경우 사용
                    if (data.attrName) {
                        this.useAttr = true;
                        item.attrCode = data.attr_type_code;
                        item.attr_type_code = data.attr_type_code;
                        item.attrName = data.attrName;
                    } else {
                        this.useAttr = false;
                    }
                    return item;
                });
            }
            return result;
        },
    },
    mounted() {
        // Resize Observer
        this.resizeObserver = new ResizeObserver(this.evt_resize);
        this.resizeObserver.observe(this.$el);
    },
    watch: {
        value(val) {
            this.checked = val;
        },
        viewType(val) {
            this.selViewType = val;
        },
        chartData: {
            deep: true,
            handler() {
                // 데이터가 존재하고 toggleType이 활성화되어 있으며 checked 배열이 비어있는 경우
                if (this.getData.data.length && this.toggleType && !this.checked) {
                    // 첫 번째 데이터 항목을 checked 배열에 추가
                    this.checked = [this.getData.data[0]];
                }
            },
        },
    },
    methods: {
        /**
         * 클릭된 항목 정보를 부모 컴포넌트로 전달
         * @param {Object} val 클릭된 항목
         */
        evt_itemClick(val) {
            if (this.chartData.code) {
                // analParams 객체 생성 및 설정
                let analParams = {
                    code: this.chartData.code,
                    name: this.chartData.name,
                    color: this.chartData.color,
                    data: this.chartData.data,
                    attr_type_code: this.chartData.attr_type_code,
                };

                // seq 속성이 있는 경우 추가
                if (this.chartData.seq) analParams.seq = this.chartData.seq;

                // 클릭된 항목 정보에 analParams 추가
                val.anals = analParams;
            }
            // 클릭 이벤트를 부모 컴포넌트로 전달
            this.$emit('click', val);
        },
        /**
         * 요소의 높이, 너비 업데이트
         */
        evt_resize() {
            // 요소의 클라이언트 높이를 elHgt에 할당
            this.elHgt = this.$el.clientHeight;

            // 요소의 오프셋 너비를 elWid에 할당
            this.elWid = this.$el.offsetWidth;
        },
        /**
         * 예외 단어 처리
         */
        exceptClick() {
            // 부모 컴포넌트로 exceptClick 이벤트 발생, exceptWord 전달
            this.$emit('exceptClick', this.exceptWord);
        },
    },
    destroyed() {
        // Resize Observer 해제
        this.resizeObserver.unobserve(this.$el);
        this.resizeObserver = null;
    },
};
</script>
