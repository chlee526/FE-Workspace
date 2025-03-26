<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location>
                <span class="item">로케이션</span>
            </comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col w12">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>팝업 - 관련정보</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/templates/modal/relinfo" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>검색 기간</strong> : 데이터 검색 기간</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>최대 검색 기간</strong> : 최대 검색기간 설정</span>
                                                        <ul>
                                                            <li><span>최대 검색 기간 설정시 관련정보 팝업 내 달력 삽입</span></li>
                                                            <li><span>설정한 최대 검색 기간이 검색 기간 보다 작으면 검색 기간 종료 날짜부터 최대 검색 기간만큼 계산되어 자동설정.</span></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>제목</strong> : 상단 제목 - 분석대상(브랜드/카테고리...등) *없는 경우 '관련정보'로 표기</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>서브 제목</strong> : 상단 서브 제목 - 관련정보(채널/감성...등)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>연관어 속성</strong> : 연관 키워드에서 속성 사용여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>추가 검색조건</strong> : 관련정보 팝업 내 검색 조건 필터 추가(셀렉트박스로 구성), *필터 옵션은 예시용이므로 추가/변경 가능 </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <div class="grp">
                                                <strong>검색 기간</strong>
                                                <comp-datepicker id="ts_dp_s" :s_date.sync="searchDates.s_date" :e_date.sync="searchDates.e_date" range="2Y" :min_date.sync="searchDates.min_date" :max_date.sync="searchDates.max_date" :c_type_opts="null"></comp-datepicker>
                                            </div>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>최대 검색 기간</strong>
                                                <comp-input-box id="set_dateMaxRange" class="is-small" type="number" v-model="set.dateMaxRange" placeholder="" label="라벨명 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_usedTitle" class="is-small" v-model="set.usedTitle" label="타이틀"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_usedSubTitle" class="is-small" v-model="set.usedSubTitle" label="서브 타이틀"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_useAttrs" class="is-small" v-model="set.usedAttrs" label="연관어 속성"></comp-switch-btn>
                                            <hr />
                                            <div class="grp">
                                                <strong>추가 검색조건</strong>
                                                <comp-checkbox-grp id="set_cateFilter" class="is-small" v-model="set.cateFilter.value" :opts="set.cateFilter.opts" all-label="전체" :box="true"></comp-checkbox-grp>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap" style="text-align: center">
                                            <comp-button @click="$store.dispatch('MODAL_OPEN', ['relinfo', getPopupData, { useAttrs: getUseAttrs }])"><span class="txt">관련정보 팝업</span></comp-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'templateRelinfo-page',
    data() {
        return {
            searchDates: {
                s_date: {
                    date: new Date(2022, 8, 1, 0, 0, 0).dateToStr(),
                },
                e_date: {
                    date: new Date(2022, 8, 20, 0, 0, 0).dateToStr(),
                },
                ps_date: {
                    date: new Date().dateToStr(),
                },
                pe_date: {
                    date: new Date().dateToStr(),
                },
                min_date: '2022-05-01',
                max_date: '2022-10-31',
            },
            set: {
                title: [{ code: '11_2', name: '식품', type: 'or_type_code' }],
                subTitle: [
                    { code: 'c_94', name: '블로그', type: 'sg_seq' }, // 채널
                    { code: '2', name: '중립', type: 'senti' }, // 감성
                    // { code: '5', name: '연관키워드1', type: 'rkeyword' }, // 연관키워드
                    // { code: '12_3', name: '아이스크림', type: 'or_type_code' }, // 분류체계
                ],
                attrs: null,
                usedTitle: false,
                usedSubTitle: false,
                usedAttrs: false,
                dateMaxRange: '',
                cateFilter: {
                    value: '',
                    opts: [
                        { code: 'sg_seq', name: '채널' },
                        { code: 'senti', name: '감성' },
                    ],
                },
            },
        };
    },
    computed: {
        getPopupData() {
            let result = structuredClone(this.searchDates);
            if (this.set.usedTitle) result.title = this.set.title;
            if (this.set.usedSubTitle) result.subTitle = this.set.subTitle;
            if (this.set.cateFilter.value) result.cateFilters = structuredClone(this.getCateFilterOpts(this.set.cateFilter.value));

            if (this.set.dateMaxRange && this.set.dateMaxRange > 0) {
                result.dateMaxRange = this.set.dateMaxRange;
            } else {
                result.dateMaxRange = '';
            }
            return result;
        },

        getUseAttrs() {
            return this.set.usedAttrs ? this.set.attrs : null;
        },
    },

    mounted() {
        this.set.attrs = this.$store.getters.getRkAttrs.default;
    },

    methods: {
        getCateFilterOpts(val) {
            const types = val.split(',');
            let result = [];
            types.forEach((type) => {
                if (type === 'senti') {
                    result.push({
                        name: '감성',
                        type,
                        value: 's_2',
                        multiple: true,
                        opts: structuredClone(this.$store.getters.getSentis),
                    });
                }
                if (type === 'sg_seq') {
                    result.push({
                        name: '채널',
                        type,
                        value: 'c_94',
                        multiple: true,
                        opts: structuredClone(this.$store.getters.getChns),
                    });
                }
            });
            return result;
        },
    },
};
</script>

<style></style>
