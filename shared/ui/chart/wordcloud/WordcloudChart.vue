<template>
    <div>
        <span ref="render_txt" class="render_txt">Rendering...</span>

        <div ref="chart" class="ui_chart_wrap is-wordCloud-v3" :class="[{ 'is-click': toggleType || $vnode.data.class['is-click'] }, { ui_nodata: chartData.data.length == 0 }, { 'is-legend': useLegend }]" :style="getStyle"></div>
        <transition-group tag="div" class="bubble_wrap">
            <div v-for="(item, idx) in bubbles" :key="item.target + '-' + idx" class="ui_bubble_box" :class="getChartTextColor(item.color || '#666666')" :data-bubble-for="id + '_' + item.code" data-pos="CT" v-bubble_init>
                <span class="arrow" :style="'border-color:' + item.color">-</span>
                <div class="wrap" :style="'background:' + item.color">
                    <div class="infos">
                        <!-- 순위 -->
                        <span v-if="useRank" class="attr">({{ item.rank }}/{{ getChartData.length }})</span>

                        <!-- 속성명 -->
                        <span v-if="item.attrName" class="attr">{{ item.attrName }}</span>

                        <!-- 키워드 -->
                        <span class="title">{{ item.word }}</span>

                        <!-- 라이프사이클 순위 -->
                        <strong v-if="id.indexOf('lifecycle') >= 0" class="dv" :style="item.weight === -21 ? 'color:#c4c4c4' : null">{{ getLifecycleWeight(item.weight) }}</strong>

                        <!-- 라이프사이클 사용 X 언급건수 -->
                        <strong v-else-if="id.indexOf('lifecycle') < 0" class="dv">{{ sort === 'T' ? String(item.weight).addComma() : String(parseInt(item.fluc)).addComma(0) }}건</strong>

                        <!-- 증감률 -->
                        <template v-if="item.new !== 'new'">
                            <template v-if="item.fluc != null">
                                <span v-if="sort === 'T'" class="ui_fluc is-box" v-html="item.fluc.numToFlucHtml('%', 1)"></span>
                                <span v-else class="ui_fluc is-box" v-html="item.weight.numToFlucHtml('%', 1)"></span>
                            </template>
                        </template>

                        <!-- 신규 -->
                        <span v-else class="ui_fluc is-box"><span class="is-new">New</span></span>
                    </div>
                </div>
            </div>
        </transition-group>
        <div v-if="useLegend && legendShow" class="color_set">
            <ul>
                <li v-for="(item, idx) in getLegend" :key="idx" class="item" v-html="item.html" :style="'background:' + item.color"></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { jsgradient } from '@shared/utils/prototype/util.colors';
import { TweenMax } from 'gsap';
import $ from 'jquery'; //jQWCloud 사용을 위해 필수

export default {
    name: 'comp-chart-wordcloud-chart',
    data: function () {
        return {
            rendering: false,
            chartOpts: null,
            useOpts: null,
            chart: null,
            series: null,
            minValue: 0,
            maxValue: 0,
            hgt: 0,
            expandedActive: false,
            bubbles: [],
            resizing: false,
            resizeTimer: null,
            useLegend: this.legend,
            fontSize: this.opts && this.opts.maxFont ? this.opts.maxFont : 80,
            rebuildCnt: 0,
        };
    },
    props: {
        legendShow: { type: Boolean, default: true },
        isShow: { type: Boolean, defalut: false },
        id: { type: String },
        toggleType: { type: String, default: null },
        chartData: { type: Object, default: null },
        opts: {
            type: Object,
            default() {
                return {};
            },
        },
        legend: {},
        expandData: { type: Object },
        value: { type: Array, default: null },
        rotation: { type: Boolean, default: false },
        elWid: { type: Number, default: 0 },
        elHgt: { type: Number, default: 0 },
        sort: { type: String },
        fixActiveColor: { type: String, default: null },
        weightLimit: { type: Number, default: 20 }, // lifecycle일때 순위갯수 제한
        useRank: { type: Boolean, default: false }, // 순위 사용 여부 - 형식: (1/30)
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
         * width 100%, 높이값 getHgt 적용
         */
        getStyle() {
            return 'width:100%;' + this.getHgt;
        },
        /**
         * chart 높이 설정
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
                hgt = this.$vnode.data.style.split(':')[1].split('px')[0];
            }
            // 기본 높이 설정
            else {
                return 'height: 404px';
            }

            // 범례 사용시, 높이에서 24px빼기
            return 'height:' + (this.useLegend ? hgt - 24 : hgt) + 'px';
        },

        /**
         * 차트 데이터를 가공하여 반환
         * - 'id'에 'lifecycle' 문자열이 포함된 경우, 'weight' 값을 음수로 변경
         * - 'sort' 속성이 'H'로 설정된 경우, 'fluc'와 'weight' 값을 서로 교환
         * @return {Array} 가공된 차트 데이터 배열
         */
        getChartData() {
            const chartData = structuredClone(this.chartData);
            const result = chartData?.data.map((item) => {
                // 'id'에 'lifecycle' 문자열이 포함된 경우, 'weight' 값을 음수로 변경
                if (this.id.indexOf('lifecycle') >= 0) {
                    item.weight = -item.weight;
                }
                // 'sort' 속성이 'H'로 설정된 경우, 'fluc'와 'weight' 값을 서로 교환
                if (this.sort == 'H') {
                    const tmp = item.fluc;
                    item.fluc = item.weight;
                    item.weight = tmp;
                }
                return item;
            });
            return result;
        },

        /**
         * 범례 데이터를 생성하여 반환
         * - 'useLegend' 속성 값에 따라 범례 데이터 생성:
         *   - 'share'인 경우, 점유율 범례 데이터 생성
         *   - 'rank'인 경우, 순위 범례 데이터 생성
         *   - 배열인 경우, 사용자 정의 순위 범례 데이터 생성
         * @return {Array} 생성된 범례 데이터 배열
         */
        getLegend() {
            let result = [];
            // 점유율 범례
            if (this.useLegend == 'share') {
                const colors = ['#EC5151', '#F58B39', '#F6B61F', '#ABC834', '#69B229', '#28AA53', '#1E9BC9', '#3972D5', '#9C69DF', '#AAAAAA'];
                colors.forEach((color, idx) => {
                    const item = {
                        html: '~' + (idx + 1) * 10 + '%',
                        color: color,
                    };
                    result.push(item);
                });
            }
            // 순위 범례
            if (this.useLegend == 'rank') {
                const colors = [
                    { rank: '3', color: '#EC5151' },
                    { rank: '6', color: '#ABC834' },
                    { rank: '10', color: '#1F9BC9' },
                    { rank: '', color: '#AAAAAA' },
                ];
                colors.forEach((color) => {
                    const item = {
                        html: color.rank.length ? '~' + color.rank + '위' : '~',
                        color: color.color,
                    };
                    result.push(item);
                });
            }
            // 순위 범례 - 사용자
            if (Array.isArray(this.useLegend)) {
                this.useLegend.forEach(($item) => {
                    const item = {
                        html: '~' + ($item.rank != '' ? $item.rank + '위' : ''),
                        color: $item.color,
                    };
                    result.push(item);
                });
            }
            return result;
        },
    },
    watch: {
        opts: {
            handler(val) {
                this.buildChart();
            },
            deep: true,
        },
        fixActiveColor(val) {
            this.hndl_active();
        },
        legend(val) {
            this.useLegend = val;
        },
        isShow(val) {
            if (val && !this.chart) {
                this.buildChart();
            }
        },
        checked(val) {
            this.hndl_active();
        },
        chartData: {
            deep: true,
            handler() {
                this.fontSize = this.opts?.maxFont ? this.opts.maxFont : 80;
                this.buildChart();
            },
        },
        elHgt(val, oldVal) {
            if (oldVal != 0 && val == 0) this.$emit('update:elHgt', oldVal);

            // 'resizing' 속성을 true 설정하여 리사이징 중임을 표시
            this.resizing = true;

            // 이전 리사이징 타이머 취소, 새로운 리사이징 타이머 설정
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                // 'chartOpts', 'opts' 병합-> 'useOpts'에 할당
                if (this.chartOpts) this.useOpts = Object.assign(this.chartOpts, this.opts);

                // 'resizing' 속성 false 설정, 리사이징 완료 표시
                this.resizing = false;

                // 차트 다시 빌드
                this.buildChart();
            }, 0);
        },
        elWid(val, oldVal) {
            if (oldVal != 0 && val == 0) this.$emit('update:elWid', oldVal);

            // 'resizing' 속성을 true 설정하여 리사이징 중임을 표시
            this.resizing = true;

            // 이전 리사이징 타이머 취소, 새로운 리사이징 타이머 설정
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                // 'chartOpts', 'opts' 병합-> 'useOpts'에 할당
                if (this.chartOpts) this.useOpts = Object.assign(this.chartOpts, this.opts);

                // 'resizing' 속성 false 설정, 리사이징 완료 표시
                this.resizing = false;

                // 차트 다시 빌드
                this.buildChart();
            }, 0);
        },
    },
    methods: {
        /**
         * 차트 빌드
         */
        buildChart() {
            if (!this.elWid) return;

            // 글꼴 크기('fontSize') 설정
            this.fontSize = this.opts?.maxFont ? this.opts.maxFont : 80;

            // 이전 리사이징 타이머 취소
            clearTimeout(this.resizeTimer);

            // 차트 데이터가 있을 때 차트 빌드
            if (this.chartData.data.length > 0) {
                // 이미 차트가 존재하는 경우, 차트 및 관련 요소 초기화
                if (this.chart) {
                    this.$refs.chart.innerHTML = '';
                    this.chartOpts = null;
                    this.chart = null;
                }

                // 'isShow' false일 때 차트 빌드 종료
                if (!this.isShow) return;

                // 렌더링 중임 표시
                this.rendering = false;

                // 투명도 설정
                TweenMax.to(this.$refs.render_txt, 0, { autoAlpha: 1 });
                TweenMax.to(this.$refs.chart, 0, { opacity: 0 });

                // chart null -> 'chart'
                this.chart = 'chart';

                // 'chartOpts' 속성 설정
                this.chartOpts = {
                    id: this.id,
                    words: this.getChartData,
                    minFont: 13,
                    maxFont: 50,
                    word_common_classes: 'word_item',
                    word_click: this.evt_chartClick,
                    word_mouseOver: this.hndl_bubbleBox_on,
                    word_mouseOut: this.hndl_bubbleBox_off,
                    verticalEnabled: this.rotation,
                    afterCloudRender: this.buildComplete,
                    space: this.opts.space || null,
                };
                // 'chartOpts', 'opts' 병합-> 'useOpts'에 할당
                const useOpts = Object.assign(this.chartOpts, this.opts);
                useOpts.maxFont = this.fontSize;

                // jQuery를 사용하여 클라우드 차트 생성 및 초기화
                $(this.$refs.chart).jQWCloud(useOpts);

                // 활성화 상태 설정
                this.hndl_active();
            }
        },

        /**
         * 차트 빌드 완료시 호출 함수
         * 필요한 경우 차트를 다시 빌드하여 화면에 적합한 크기로 조절
         */
        buildComplete() {
            let rebuildChk = false;
            setTimeout(() => {
                if (this.$refs.chart) {
                    // '.word_item > .bg' 요소 선택
                    this.$refs.chart.querySelectorAll('.word_item > .bg').forEach((item) => {
                        // 아래 조건에 부합하면 차트 다시 build하기 위한 변수 설정
                        if (parseInt(this.$el.getBoundingClientRect().left) > parseInt(item.getBoundingClientRect().left) || parseInt(this.$el.getBoundingClientRect().right) < parseInt(item.getBoundingClientRect().right) || this.$refs.chart.querySelectorAll('.word_item').length != this.getChartData.length) {
                            rebuildChk = true;
                            return false;
                        }
                    });

                    // 'rebuildChk'가 true이고 'fontSize'가 20보다 크며 'rebuildCnt'가 30보다 작은 경우
                    if (rebuildChk && this.fontSize > 20 && this.rebuildCnt < 30) {
                        // 'rebuildCnt' 증가
                        this.rebuildCnt++;

                        // 'fontSize' 20 이상으로 설정
                        this.fontSize = Math.max(this.fontSize - 10, 20);

                        // 차트 다시 build
                        this.buildChart();
                    } else {
                        // 차트 다시 build하지 않으면 투명도 조절하여 렌더링 완료 표시
                        TweenMax.to(this.$refs.render_txt, 0.1, { autoAlpha: 0 });
                        TweenMax.to(this.$refs.chart, 0.1, { opacity: 1 });
                        this.rendering = true;
                    }
                }
            }, 1);
        },

        /**
         * 선택된 단어에 활성화 스타일 적용
         */
        hndl_active() {
            let tmp = [];
            if (this.checked) tmp = this.checked.arrObjAttrToStr('code').strToArr();

            this.$el.querySelectorAll('.word_item').forEach((item) => {
                // 선택된 단어인 경우 해당 요소에 'is-active'클래스 추가
                if (tmp.includes(item.getAttribute('data-code'))) {
                    item.classList.add('is-active');

                    // 'fixActiveColor' 값이 설정되어 있는 경우 해당 컬러로 사용자 정의 활성화 스타일 적용
                    if (this.fixActiveColor != '' && this.fixActiveColor != null) {
                        item.classList.add('is-custom-active');
                        item.style.setProperty('--brdColor', this.fixActiveColor);
                        item.style.setProperty('--color', this.fixActiveColor + 'cc');
                    } else {
                        item.classList.remove('is-custom-active');
                    }
                } else {
                    // 선택된 항목 외에 활성화 클래스 제거
                    item.classList.remove('is-active');
                    item.classList.remove('is-custom-active');
                }
            });
        },

        /**
         * 주어진 색상 값($val)을 기반으로 텍스트 색상 결정
         * - 주어진 색상이 어두운 색상인 경우 흰색 텍스트 반환
         * - 주어진 색상이 밝은 색상인 경우 검은색 텍스트 반환
         * @param {String} $val - 색상 값 (예: '#FF0000' 또는 'rgb(255, 0, 0)')
         * @return {String} - 텍스트 색상 클래스 ('is-black' 또는 빈 문자열)
         */
        getChartTextColor($val) {
            return jsgradient.getReversal($val) ? '' : 'is-black';
        },

        /**
         * toggleType에 따라 차트 클릭 이벤트 처리
         * - 'one': 한개 항목 선택(토글 x)
         * - 'multi': 다중 선택 토글
         * - 'oneToggle': 힌 개 항목 토글
         * - 다른 경우: 사용자 정의 'click' 이벤트 발생
         * @param {Object} evt - 클릭 이벤트 객체
         */
        evt_chartClick(evt) {
            if (this.toggleType === 'one') {
                // 'one': 한개 항목 선택(토글 x)
                this.checked = [evt];
            } else if (this.toggleType === 'multi') {
                // 'multi': 다중 선택 토글
                if (this.checked) {
                    const itemIdx = this.checked.findIndex((item) => item.code === evt.code);
                    if (itemIdx === -1) {
                        this.checked.push(evt);
                    } else {
                        this.checked.splice(itemIdx, 1);
                    }
                } else {
                    this.checked = [evt];
                }
            } else if (this.toggleType === 'oneToggle') {
                // 'oneToggle': 힌 개 항목 토글
                if (this.checked) {
                    const itemIdx = this.checked.findIndex((item) => item.code === evt.code);
                    if (itemIdx === -1) {
                        this.checked = [evt];
                    } else {
                        this.checked.splice(itemIdx, 1);
                    }
                } else {
                    this.checked = [evt];
                }
            } else {
                // 사용자 정의 'click' 이벤트 발생
                this.$emit('click', evt);
            }
        },

        /**
         * 'rendering'이 true일 때만 'bubbles' 배열에 값 추가
         * @param {any} val - 추가할 값
         */
        hndl_bubbleBox_on(e, val) {
            if (this.rendering) this.bubbles.push(val);
        },

        /**
         * 'bubbles' 배열 초기화
         */
        hndl_bubbleBox_off() {
            this.bubbles = [];
        },

        /**
         * 라이프사이클 가중치 처리 함수
         * - 주어진 가중치가 'limit'을 초과하면 '한계값+위'로 return
         * - 그렇지 않으면 가중치를 '위' 형식으로 반환합니다.
         * @param {number} weight - 가중치 값
         * @return {string} - 가중치를 문자열로 반환 ('한계값+위' 또는 '위')
         */
        getLifecycleWeight(weight) {
            const limit = -this.weightLimit - 1;
            if (weight === limit) {
                return `${this.weightLimit}위+`;
            } else {
                return String(weight).replace('-', '') + '위';
            }
        },

        /**
         * 아이템과 연결된 버블 박스 위치 계산
         * - 결과값은 top 및 left 속성을 가진 객체로 표현
         * @param {Element} item - 아이템 엘리먼트
         * @return {Object} - 위치 정보를 담은 객체 ({ top, left })
         */
        getPos(item) {
            // 버튼, 버블 박스 element
            const btn = item;
            const bubbleBox = this.$el.querySelector('*[data-bubble-for="' + btn.getAttribute('data-bubble-id') + '"]');

            // 객체 초기화
            let result = {};

            // 버튼 위쪽에 여백을 추가한 위치 계산
            const space = parseInt(btn.offsetHeight * 0.5) + 8;

            // result에 위치 정보 설정
            result.top = btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2 - bubbleBox.getBoundingClientRect().height - space + 'px';
            result.left = btn.getBoundingClientRect().left + btn.getBoundingClientRect().width / 2 - bubbleBox.getBoundingClientRect().width / 2 + 'px';

            return result;
        },
    },
    directives: {
        bubble_init: {
            /**
             * 버튼과 버블 박스의 위치를 계산하여 요소의 스타일 설정
             * @param {*} el
             * @param {*} binding
             * @param {*} vnode
             */
            inserted: function (el, binding, vnode) {
                // 연결된 버튼 ID
                const id = el.getAttribute('data-bubble-for');

                // 버튼 element
                const btn = vnode.context.$el.querySelector('*[data-bubble-id="' + id + '"]');

                // 버튼과 연결된 버블 박스 위치 계산
                const pos = vnode.context.getPos(btn);

                // 요소의 스타일에 위치 정보 설정
                el.style.top = pos.top;
                el.style.left = pos.left;
            },
        },
    },
    beforeDestroy() {
        // this.chart 없을 때 종료.
        if (!this.chart) return;

        // 차트를 해제하고 this.chart를 null로 설정
        this.chart = null;
    },
};
</script>
