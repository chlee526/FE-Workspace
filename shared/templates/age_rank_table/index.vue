<template>
    <div class="age_rank_wrap ui-loader-container" :id="id">
        <div v-if="!keywordList.length" class="ui_nodata" style="height: 800px"></div>

        <div v-else class="rank_wrap">
            <div class="rank_box ui_brd is-data-v2">
                <div class="wrap">
                    <table>
                        <thead :style="{ height: rankThHeight }">
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="idx in Number(rankRange)" :key="'r' + idx">
                                <th>
                                    <strong>{{ idx }}</strong>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="rank_table_wrap ui_brd is-data-v2" ref="rankContainer" v-container>
                <div class="rank_table_box wrap" ref="rankTableBox">
                    <tmpl-age-rank-item v-for="(keywords, index) in dataList" v-model="analsList" :key="'a' + index" :id="keywords.seq" :keywords="keywords.opts" :rankRange="rankRange" :common-search-opts="commonSearchOpts" :focusWord="focusWord" @updateOpts="evt_update" @updateFocusWord="updateFocusWord" />

                    <div v-for="i in getEmptyLength" :key="i" class="empty_table">
                        <span class="ui_no_data_txt"></span>
                    </div>
                </div>
            </div>
            <div class="btn_box">
                <button class="prev_btn" type="button" @click="--pageNum" :disabled="pageNum == 0">&#xe001;</button>
                <button class="next_btn" type="button" @click="pageNum++" :disabled="pageNum == pageCount - 1">&#xe000;</button>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';

import TmplAgeRankItem from './AgeRankItem.vue';

/**
 * RankContainer의 width를 계산하여 저장
 */
const container = {
    inserted(el, binding, vnode) {
        el.__resizeHandler__ = () => {
            container.update(el, binding, vnode);
        };
        window.addEventListener('resize', el.__resizeHandler__);
        container.update(el, binding, vnode);
    },
    update(el, binding, vnode) {
        const { offsetWidth } = el;
        vnode.context.rankContainerWidth = offsetWidth;
    },
    unbind(el) {
        window.removeEventListener('resize', el.__resizeHandler__);
        delete el.__resizeHandler__;
    },
};

export default {
    name: 'tmpl-age',
    data() {
        return {
            pageNum: 0, // 현재 페이징 번호
            rankContainerWidth: 0,
            focusWord: '',
            rankThHeight: 0, // 랭크 박스 container thead 영역 높이 조절용
        };
    },
    props: {
        id: { type: String },
        keywordList: { type: Array }, // 검색 조건
        commonSearchOpts: { type: Object }, // 공통 검색 조건
        rankRange: { type: [String, Number], default: '20' }, //순위 범위
        value: {},
    },
    components: {
        TmplAgeRankItem,
    },
    computed: {
        analsList: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        getEmptyLength() {
            // 데이터 없는 테이블 갯수 반환
            let { length } = this.keywordList;

            return length % 4 > 0 ? 4 - (length % 4) : 0;
        },
        pageCount() {
            let { length } = this.keywordList;
            return Math.ceil(length / 4);
        },
        getRankContainerLeft() {
            return this.rankContainerWidth * this.pageNum + 10 * this.pageNum;
        },

        dataList() {
            return this.keywordList.map((keyword, idx) => {
                keyword = { seq: idx, opts: [...keyword] };

                return keyword;
            });
        },
    },

    mounted() {
        /**
         * 순위 테이블 이외에 다른 테이블의 thead 의 높이값과 동일하게 설정
         */
        this.$nextTick(() => {
            const target = document.querySelector('.keyword_table');

            Array.from(target.children).find((child) => {
                if (child.tagName === 'THEAD') {
                    this.rankThHeight = child.offsetHeight + 'px';
                }
            });
        });
    },

    watch: {
        pageNum() {
            this.movePage();
        },
        commonSearchOpts() {
            this.init();
        },
        keywordList(val) {
            // keywordList 세부 값들이 변경 될 때는 init 하지 않고 배열 길이가 변경 되는 경우 init 처리
            this.init();
        },
        rankContainerWidth(val) {
            gsap.to(this.$refs.rankTableBox, 0, {
                x: -this.getRankContainerLeft,
                ease: 'power4.inOut',
            });
        },
    },
    methods: {
        evt_update(val) {
            this.$emit('updateOpts', val);
        },

        init() {
            this.pageNum = 0;
            if (this.keywordList.length !== 0) {
                this.$nextTick(() => {
                    this.movePage();
                });
            }
        },

        movePage() {
            gsap.to(this.$refs.rankTableBox, 0.4, {
                x: -this.getRankContainerLeft,
                ease: 'power4.inOut',
            });
        },

        // 단어에 마우스 오버시 포커싱 css적용
        updateFocusWord(newVal) {
            this.focusWord = newVal;
        },
    },
    directives: {
        container,
    },
};
</script>
