<template>
    <div class="ui_paginate">
        <div class="wrap">
            <comp-button class="is-icon-only is-small" title="이전 10개 페이지" :disabled="paging_sIdx == 1" @click.stop="evt_click(paging_sIdx - 1)"><span class="icon">&#xe003;</span></comp-button>
            <comp-button class="is-icon-only is-small prev" title="이전 페이지" :disabled="val == 1" @click.stop="evt_click(parseInt(val) - 1)"><span class="icon">&#xe001;</span></comp-button>
            <template>
                <a v-for="(item, idx) in pagingData" :key="idx" href="#" class="btn_page" onclick="return false;" v-bind:class="{ 'is-active': item.active }" @click="evt_click(item.idx)">{{ String(item.idx).addComma() }}</a>
            </template>
            <comp-button class="is-icon-only is-small next" title="다음 페이지" :disabled="val == totPCnt || val == getTotalLimitCnt" @click.stop="evt_click(parseInt(val) + 1)"><span class="icon">&#xe000;</span></comp-button>
            <comp-bubble-box :content="'데이터는 최대 1만 건까지 볼 수 있습니다.'" class="is-validation" :show-fixed="totalLen >= maxLimitCnt && paging_eIdx - 1 >= getTotalLimitCnt && useLimit" pos="R">
                <comp-button class="is-icon-only is-small" title="다음 10개 페이지" :disabled="paging_eIdx - 1 == totPCnt || paging_eIdx - 1 >= getTotalLimitCnt" @click.stop="evt_click(paging_eIdx)"><span class="icon">&#xe002;</span></comp-button>
            </comp-bubble-box>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comp-paginate',
    data() {
        return {
            chk: false,
        };
    },
    props: {
        id: {},
        value: {}, // v-model
        datas: {}, // 게시판 속성
        totalLen: {}, // 게시판 data 최대 값
        click: {}, // click 이벤트
        limitLen: {}, // 게시판 data 조회 가능 최대값
        useLimit: { type: Boolean, default: true }, // 최대 10000건 이상 조회 못하도록 막기
    },
    computed: {
        val: {
            get: function () {
                return this.value;
            },
            set: function ($val) {
                this.$emit('input', $val);
            },
        },
        paging_sIdx: function () {
            return parseInt((Math.ceil(parseInt(this.datas.page_num) / parseInt(this.datas.pagingColCnt)) - 1) * parseInt(this.datas.pagingColCnt) + 1);
        },
        paging_eIdx: function () {
            var result = parseInt(this.paging_sIdx + parseInt(this.datas.pagingColCnt) > parseInt(this.totPCnt) ? parseInt(this.totPCnt) + 1 : this.paging_sIdx + parseInt(this.datas.pagingColCnt));

            return result == 1 ? 2 : result;
        },
        pagingData: function () {
            var result = [];
            for (var Loop1 = this.paging_sIdx; Loop1 < this.paging_eIdx; ++Loop1) {
                var data = {};
                data.idx = Loop1;
                data.active = Loop1 == parseInt(this.datas.page_num) ? true : false;
                result.push(data);
            }
            return result;
        },
        totPCnt: function () {
            return Math.ceil(this.totalLen / this.datas.row_limit);
        },
        /**
         * 241128
         *
         * 기존 maxLimitCnt 값을 기준으로 제한 갯수 정해짐
         * => useLimit props 값에 맞춰 maxLimitCnt 사용 유무로 설정 변경
         */
        getTotalLimitCnt() {
            let cnt;

            if (this.useLimit) {
                cnt = Math.ceil(Math.min(this.totalLen, this.maxLimitCnt) / this.datas.row_limit);
            } else {
                cnt = Math.ceil(this.totalLen / this.datas.row_limit);
            }

            return cnt;
        },
        /**
         * 241128
         *
         * 최대 데이터 갯수
         * data 에서 computed로 변경
         */
        maxLimitCnt() {
            return this.limitLen ? this.limitLen : 10000;
        },
    },

    watch: {
        totalLen($val) {
            const _this = this;
            setTimeout(() => {
                if (_this.totPCnt < _this.val) _this.evt_click(_this.val - 1);
            }, 100);
        },
    },

    methods: {
        evt_click: function ($val) {
            if ($val < 1) return false;
            if ($val > this.totPCnt) return false;
            if ($val > this.getTotalLimitCnt) this.val = this.getTotalLimitCnt;
            this.val = $val;

            if (this.click) this.click();
        },
    },
};
</script>
