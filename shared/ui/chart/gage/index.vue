<template>
    <div class="ui_senti_gage">
        <ul v-if="getChartData?.length">
            <li v-for="(item, idx) in getChartData" :key="id + '_gage_' + idx" :style="getGageStyle(item)">
                <comp-bubble-box pos="CT" :subject="getBubbleSubject(item)" :custom-color="item.color">
                    <a href="#" ref="item" class="gage_item" @click.prevent="evt_click(item)">
                        <span v-if="item.per" v-gage_update="item.per">{{ item.per }}%</span>
                    </a>
                </comp-bubble-box>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'comp-chart-gage',
    props: {
        id: { type: String },
        chartData: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    computed: {
        /**
         *  차트 데이터에 각 항목 백분율 추가
         * @return {Array}  백분율(per)가 추가된 chartData Array
         */
        getChartData() {
            // chartData 사본 생성
            const result = [...this.chartData];

            // 배열 내 각 항목 value 총 합계
            const totCnt = result.reduce((cnt, item) => {
                item.value = item.value ? item.value : 0;
                return cnt + item.value;
            }, 0);

            // 백분율 값 누적하며 계산
            let perSum = 0;
            result.forEach((item, idx) => {
                item.per = item.value == 0 ? 0 : ((item.value / totCnt) * 100).toFixed(1);
                if (idx < result.length - 1) perSum += Number(item.per);
            });

            // 데이터가 존재하고 총 합계가 양수일 때,
            // 마지막 항목의 per 값을 100에서 perSum을 뺀 값으로 설정
            if (totCnt > 0) result[result.length - 1].per = (100 - Number(perSum)).toFixed(1);

            return result;
        },
    },
    methods: {
        /**
         * 레이아웃 관리
         * 부모 element 보다 param element가 클 때 display none
         *  @param {HTMLElement} el 크기를 측정할 대상 엘리먼트
         */
        hndl_per(el) {
            // setTimeout(() => {
            //     const parent = this.$el.parentElement.parentElement.parentElement;
            //     el.style.display = 'block';
            //     if (el.getBoundingClientRect().width > parent.getBoundingClientRect().width - 6 || el.getBoundingClientRect().height > parent.getBoundingClientRect().height) el.style.display = 'none';
            //     else el.style.display = 'block';
            // }, 10);
        },

        /**
         * gage_item 클릭 시
         * 해당 항목 전체 데이터(code, color, name, per, value 등...) emit
         *  @param {Object} item 클릭 항목 데이터
         */
        evt_click(item) {
            this.$emit('click', item);
        },

        /**
         * gage 항목의 per와 color로 스타일 적용(width, bgColor)
         *  @param {Object} item per, color가 포함된 object
         */
        getGageStyle(item) {
            return `width: ${item.per}%; background: ${item.color}`;
        },

        /**
         * gage 항목별 bubble(tooltip)내용
         *  @param {Object} item name, value, per가 포함된 object
         *  @return {String} comp-bubble-box subject에 들어갈 내용
         */
        getBubbleSubject(item) {
            return `${item.name} <strong style=padding-left:10px;font-size:16px> ${String(item.value).addComma()} </strong>(${item.per}%)`;
        },
    },
    directives: {
        /**
         * inserted : DOM 요소에 삽입/화면에 렌더링될 때 실행
         * 부모 element 보다 현재 element가 클 때 opacity 0
         * @param el 바인딩된 DOM 요소
         * @param binding 바인딩 정보
         * @param vnode 가상 DOM 노드
         */
        gage_update: {
            inserted(el, binding, vnode) {
                setTimeout(() => {
                    // 부모 element
                    const parent = el.parentElement.parentElement.parentElement;
                    el.style.opacity = 1;
                    // 부모 element 보다 현재 element가 클 때 opacity 0
                    if (el.getBoundingClientRect().width > parent.getBoundingClientRect().width - 6 || el.getBoundingClientRect().height > parent.getBoundingClientRect().height) el.style.opacity = 0;
                    else el.style.opacity = 1;
                }, 400);
            },
            // componentUpdated(el, binding, vnode) {
            //     console.log('update');
            //     setTimeout(() => {
            //         const parent = el.parentElement.parentElement.parentElement;
            //         el.style.display = 'block';
            //         if (el.getBoundingClientRect().width > parent.getBoundingClientRect().width - 6 || el.getBoundingClientRect().height > parent.getBoundingClientRect().height) el.style.display = 'none';
            //         else el.style.display = 'block';
            //     }, 10);
            // },
        },
    },
};
</script>
