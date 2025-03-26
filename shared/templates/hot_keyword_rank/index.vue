<template>
    <div class="hot_keyword_wrap ui-loader-container" :id="id">
        <div v-if="keywordList.length === 0" class="ui_nodata" style="height: 816px"></div>
        <div v-else>
            <div v-if="keyword" class="chg_summary_box">
                <div class="focus_box"></div>
                <div v-for="(rank, index) in getRankArray" :key="'s' + index">
                    <div class="summary">
                        <div class="triangle"></div>
                        <p>W{{ keywordList[index].weekend }}</p>
                        <p class="rank" v-if="rank < 0 || rank > Number(rankRange)">-</p>
                        <p class="rank" v-else>
                            {{ rank }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="rank_wrap">
                <div class="rank_box ui_brd is-data-v2">
                    <div class="wrap">
                        <table>
                            <thead>
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
                <div class="rank_table_wrap ui_brd is-data-v2" ref="rankContainer" :class="{ 'is-bg-white': setBgWhite }" v-container>
                    <div class="rank_table_box wrap" ref="rankTableBox">
                        <table v-for="(keywords, index) in keywordList" :key="'a' + index" class="keyword_table">
                            <thead>
                                <tr>
                                    <th>
                                        <strong>W{{ keywords.weekend }}</strong>
                                    </th>
                                    <th>
                                        <strong>{{ keywords.s_date }}~{{ keywords.e_date }}</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="keywords.list.length">
                                <tr v-for="(rank, idx) in Number(rankRange)" :key="idx" :class="{ dataListHighlight: keywords.list[idx]?.name === keyword, on: keywords.list[idx]?.name === focusWord, no_data: !keywords.list[idx] }" @mouseover="focusWord = keywords.list[idx]?.name !== '' && keywords.list[idx]?.name ? keywords.list[idx].name : ''" @mouseout="focusWord = ''">
                                    <td colspan="2">
                                        <div>
                                            <span class="rank">{{ rank }}</span>
                                            <span v-if="keywords.list[idx]">{{ keywords.list[idx].name }}</span>
                                            <span v-else>-</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else class="empty_table">
                                <tr class="no_data">
                                    <td colspan="2" class="no_data">
                                        <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-for="i in getEmptyLength" :key="i" class="empty_table">
                            <span class="ui_no_data_txt"></span>
                        </div>
                    </div>
                </div>
                <div class="btn_box">
                    <button class="prev_btn" type="button" @click="--pageNum" :disabled="pageNum == 0">&#xe001;</button>
                    <button class="next_btn" type="button" @click="pageNum++" :disabled="pageNum == getPageCount - 1">&#xe000;</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gsap from 'gsap';

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
    name: 'tmpl-hot-keyword',
    data() {
        return {
            keyword: '',
            defaultColor: '#aaa',
            focusWord: '', //마우스 올린 단어
            pageNum: 0,
            rankContainerWidth: 0,
        };
    },
    props: {
        id: { type: String },
        commonSearchOpts: { type: Object }, //검색 조건(기간, 키워드)
        keywordList: { type: Array, default: null },
        customColor: { default: null }, //커스텀 색상(Object 또는 String)
        focousBoxOnOff: { type: Boolean, default: false },
        rankRange: { type: [String, Number], default: '20' }, //순위 범위
        fixActiveColor: { type: String, default: null }, //활성화 시 색상 강제 설정
        setBgWhite: { type: Boolean, default: false }, // 배경색 흰색으로 설정 여부
    },
    computed: {
        getEmptyLength() {
            // 데이터 없는 테이블 갯수 반환
            const { length } = this.keywordList;
            return length % 4 > 0 ? 4 - (length % 4) : 0;
        },
        getRankArray() {
            // 주차별 순위
            const arr = [];
            let rank;

            this.keywordList.forEach((obj) => {
                rank = obj.list.findIndex((keyword) => keyword.name === this.keyword);
                arr.push(rank > -1 ? rank + 1 : rank);
            });

            return arr;
        },
        getPageCount() {
            const { length } = this.keywordList;
            return Math.ceil(length / 4);
        },
        getRankColors() {
            if (this.customColor) {
                return this.customColor;
            } else {
                return this.$store.getters.getRanks;
            }
        },
        getColorArray() {
            let { getRankArray, getRankColors, defaultColor } = this;
            const { length } = getRankArray;
            const colors = [];

            if (typeof getRankColors === 'object') {
                const rangeColors = getRankColors.default.filter((range) => {
                    if (range.rank === '') {
                        defaultColor = range.color;
                    } else {
                        return range;
                    }
                });
                // color 배열 기본 색으로 초기화
                for (let i = 0; i < length; i++) {
                    colors.push(defaultColor.hexToRgb());
                }

                getRankArray.forEach((rank, idx) => {
                    if (rank > 0 && rank < Number(this.rankRange) + 1) {
                        // prev 제거시 오류 발생
                        rangeColors.reduceRight((prev, curr) => {
                            if (curr?.rank >= rank) {
                                colors[idx] = curr.color.hexToRgb();
                            }
                        }, 0);
                    }
                });
            } else if (typeof getRankColors === 'string') {
                getRankArray.forEach(() => {
                    colors.push(getRankColors.hexToRgb());
                });
            } else {
                console.error('getColorArray() : 형식이 올바르지 않습니다.(Only object, string)');
                return null;
            }
            return colors;
        },
        getRankContainerLeft() {
            return this.rankContainerWidth * this.pageNum + 10 * this.pageNum;
        },
    },
    watch: {
        commonSearchOpts: {
            deep: true,
            handler() {
                this.init();
            },
        },
        keywordList(val) {
            this.init();
        },
        pageNum() {
            if (this.focousBoxOnOff) {
                this.setFocusBox();
            }
            this.movePage();
        },
        rankContainerWidth(val) {
            // console.log('사이즈 변함  >> ', val);
            gsap.to(this.$refs.rankTableBox, 0, {
                x: -this.getRankContainerLeft,
                ease: 'power4.inOut',
            });
            // this.rankContainerWidth = value;
        },
        customColor: {
            deep: true,
            handler(val) {
                //
                console.log('customColor >> ', val);
                this.setRankColors();
            },
        },
        focousBoxOnOff(val) {
            this.setFocusBox();
        },
    },
    methods: {
        init() {
            this.keyword = this.commonSearchOpts?.analsList[0]?.name;
            this.pageNum = 0;
            if (this.keywordList.length !== 0) {
                this.$nextTick(() => {
                    // this.setEmptyTableHeight();
                    this.movePage();
                    this.setRankColors();
                    if (this.focousBoxOnOff) {
                        this.setFocusBox();
                    }
                });
            }
        },
        setRankColors() {
            const $summaryBox = document.querySelectorAll(`#${this.id} .chg_summary_box div.summary`);
            const $keywordTable = document.querySelectorAll(`#${this.id} .rank_table_box table.keyword_table tbody`);
            const colors = this.getColorArray;

            if (!$summaryBox.length) return;

            if (colors) {
                colors.forEach((color, i) => {
                    const { style: boxStyle } = $summaryBox[i];
                    const trs = $keywordTable[i].querySelectorAll('tr');

                    // summaryBox Style
                    boxStyle.background = `rgb(${color})`;
                    $summaryBox[i].querySelector('.triangle').style.borderLeftColor = `rgb(${color})`;

                    // rankTable Style
                    trs.forEach((tr) => {
                        tr.querySelectorAll('td').forEach((item) => {
                            item.style = '';
                        });
                        if (tr.querySelector('.rank')) {
                            tr.querySelector('.rank').style = '';
                        }

                        if (tr.classList.contains('dataListHighlight')) {
                            if (this.fixActiveColor) {
                                color = this.fixActiveColor.hexToRgb();
                            }
                            tr.querySelectorAll('td').forEach((item) => {
                                item.style.setProperty('--color', `rgba(${color}, 0.5)`);
                                item.style.setProperty('color', `${color}, 0.5`.getTextColorByBG());
                            });
                            tr.querySelector('.rank').style.background = `rgb(${color})`;
                        }
                    });
                });
            } else {
                console.error('setRankColors : colors가 존재하지 않습니다.');
            }
        },
        setFocusBox() {
            // const { style } = document.querySelector(`#${this.id} .focus_box`);
            const focusBox = document.querySelector(`#${this.id} .focus_box`);
            if (!focusBox) return;
            const { style } = focusBox;

            if (this.focousBoxOnOff) {
                const { offsetWidth, offsetLeft } = document.querySelector(`#${this.id} .chg_summary_box > div:nth-child(2)`);

                if (this.pageNum + 1 === this.getPageCount) {
                    style.width = `${offsetWidth * (this.keywordList.length % 4)}px`;
                } else {
                    style.width = `${offsetWidth * 4}px`;
                }
                style.left = `${offsetLeft + offsetWidth * 4 * this.pageNum}px`;
                style.display = 'block';
            } else {
                style.display = 'none';
            }
        },
        movePage() {
            gsap.to(this.$refs.rankTableBox, 0.4, {
                x: -this.getRankContainerLeft,
                ease: 'power4.inOut',
            });
        },
        setEmptyTableHeight() {
            // const emptyTable = document.querySelector(`#${this.id} tbody.empty_table`);
            // if (emptyTable) {
            //     const { offsetHeight } = document.querySelector(`#${this.id} .rank_box tbody`);
            //     emptyTable.style.height = `${offsetHeight}px`;
            // }
        },
    },
    directives: {
        container,
    },
};
</script>
