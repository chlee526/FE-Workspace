<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- 사이드 영역 -->
            <comp-side-follow></comp-side-follow>
            <!-- 사이드 영역 -->

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
                                            <h3>
                                                <span>분석대상 선택</span>
                                            </h3>
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
                                                        <span><strong>템플릿</strong> : 디자인 템플릿</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>분석목록</strong> : 분석 목록(채널/감성)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>최대 선택갯수</strong> : 최대 선택 가능 갯수수</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>데이터없음</strong> : 데이터없는 경우</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <div class="grp">
                                                <strong>검색 기간</strong>
                                                <comp-datepicker id="ts_dp_s" :s_date.sync="topSearchInputDatas.s_date" :e_date.sync="topSearchInputDatas.e_date" range="2Y" :min_date.sync="topSearchInputDatas.min_date" :max_date.sync="topSearchInputDatas.max_date" :c_type_opts="null"></comp-datepicker>
                                            </div>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>템플릿</strong>
                                                <comp-selectbox id="set_template" v-model="set.template.value" :opts="set.template.opts"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>분석목록</strong>
                                                <comp-selectbox id="set_template" v-model="set.anals.value" :opts="set.anals.opts"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>최대 선택갯수</strong>
                                                <comp-input-box id="set_dateMaxRange" type="number" min="1" max="10" v-model="set.maxSelLen" label="최대 선택 갯수 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_col w12">
                                                        <div class="ui_box is-2dp">
                                                            <div class="header">
                                                                <div class="wrap">
                                                                    <h4>
                                                                        <span>분석대상</span>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div class="content">
                                                                <div class="wrap">
                                                                    <tmpl-attr_selector id="attr_selector_01" :template="set.template.value" :common-search-opts="topSearchDatas" :attr-list="getAnalsList" :max-sel-len="set.maxSelLen" v-model="set.selAnals" :isNoData="set.usedNoneData"></tmpl-attr_selector>
                                                                    <hr />
                                                                    <div class="ui_row">
                                                                        <div class="wrap is-cols-pad">
                                                                            <div class="ui_col w12">
                                                                                <div class="ui_box is-2dp">
                                                                                    <div class="header">
                                                                                        <div class="wrap">
                                                                                            <h4>
                                                                                                <span>분석 컨텐츠</span>
                                                                                            </h4>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div v-if="!set.usedNoneData" class="ui_function is-box">
                                                                                        <div class="lc">
                                                                                            <comp-checkbox-grp id="anal_content_list" class="is-small" v-model="set.content.anals.value" :opts="set.selAnals" all-label="전체" :btn="true"></comp-checkbox-grp>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="content">
                                                                                        <div class="wrap">분석 컨텐츠 내용</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
import { mapGetters } from 'vuex';

export default {
    name: 'tmpl-attr_selector-page',
    data() {
        return {
            topSearchInputDatas: {
                s_date: {
                    date: new Date().dateToStr(),
                },
                e_date: {
                    date: new Date().dateToStr(),
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),
            },
            topSearchDatas: {},
            or_type_code: [],
            or_type_code2: [],
            or_type_code3: [],
            or_type_code3_sel: '',

            set: {
                selAnals: [],
                template: {
                    value: '1',
                    opts: [
                        { code: '1', name: '템플릿 1' },
                        { code: '2', name: '템플릿 2' },
                    ],
                },
                anals: {
                    value: 'sg',
                    opts: [
                        { code: 'sg', name: '채널' },
                        { code: 'senti', name: '감성' },
                    ],
                },
                maxSelLen: 3,
                content: {
                    anals: {
                        value: '',
                        opts: [],
                    },
                },
                usedNoneData: false,
            },
        };
    },
    computed: {
        ...mapGetters(['getChns', 'getSentis']),
        getDateGrp() {
            var date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
        getAnalsList() {
            return (this.set.anals.value === 'sg' ? this.getChns : this.getSentis) || [];
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.topSearchDatas = structuredClone(this.topSearchInputDatas);
        });
    },
    watch: {
        'set.anals': {
            deep: true,
            handler(val) {
                this.topSearchDatas = { ...this.topSearchInputDatas };
            },
        },
        topSearchDatas: {
            deep: true,
            handler($val) {
                let tmp = JSON.parse(JSON.stringify(this.topSearchInputDatas));
                this.$emit('update:searchDatas', tmp);

                // // 검색조건 저장
                // if (!this.isFirstSet) {
                //     this.$store.dispatch('SAVE_SEARHOPTIONS', [this.$store.getters.getPage, this.$store.getters.getUser.id, tmp]);
                // }

                // 최초 설정 후 값 변경
                // this.isFirstSet = false;

                console.log('$val  >>  ', $val);

                // 전체 로딩 시작
                this.$store.dispatch('opts/LOAD_START');
            },
        },
    },
};
</script>

<style></style>
