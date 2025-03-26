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
                                            <h3><span>정보량</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/templates/volume" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>정보량 템플릿<br />크기를 보여주기 위해 샘플 컨텐츠위 배경이 회색이나, 템플릿의 위치에 따라서 배경색은 변경됨.</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>템플릿</strong> : 스타일, 현재는 1개만 운영중</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 목록의 가로/세로 크기, 스크롤 자동 생성</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>제목</strong> : 상단 제목 사용</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>분석대상</strong> : 분석대상 사용</span>
                                                        <ul>
                                                            <li><strong>분석대상명</strong> : 분석대상 이름(비어 있으면 사용안함 상태)</li>
                                                            <li><strong>색상</strong> : 분석대상 색상</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>라벨명</strong> : 라벨명(기본:정보량, 상단 제목영역과 카운트 위의 텍스트)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>감성</strong> : 감성 점유율 차트 사용(게이지 차트)</span>
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
                                                <strong>크기</strong>
                                                <comp-input-box id="set_size_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로 입력" style="width: 70px"></comp-input-box>
                                                <comp-input-box id="set_size_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_usedTitle" class="is-small" v-model="set.usedTitle" label="제목"></comp-switch-btn>
                                            <hr />
                                            <comp-filter-grp pos="BR">
                                                <template v-slot:title>분석대상</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>분석대상명</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-input-box id="set_anals_name" v-model="set.anals.name" placeholder="분석대상명" label="분석대상명 입력" style="width: 150px"></comp-input-box>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>색상</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-colorpicker class="is-small" v-model="set.anals.fill" :use-confirm="false" />
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <div class="grp">
                                                <strong>라벨명</strong>
                                                <comp-input-box id="set_label" v-model="set.label" placeholder="라벨명" label="라벨명 입력" style="width: 150px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_usedSenti" class="is-small" v-model="set.usedSenti" label="감성"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <tmpl-volume id="vol_tmpl" class="is-3dp noData" :template="set.template.value" :common-search-opts="getSearchDatas" :header-disabled="!set.usedTitle" :label="getLabel" :anals-title="getAnals" :use-attrs="$store.getters.getRkAttrs.default" :style="getSize" :isNoData="set.usedNoneData"></tmpl-volume>
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
import sharedStyles from '@shared/styles/styles.module.scss';

export default {
    name: 'templateVolume-page',
    data() {
        return {
            topSearchInputDatas: {
                s_date: {
                    date: new Date(2022, 8, 12, 0, 0, 0).dateToStr(),
                },
                e_date: {
                    date: new Date(2022, 8, 20, 0, 0, 0).dateToStr(),
                },
                ps_date: {
                    date: new Date(2022, 8, 1, 0, 0, 0).dateToStr(),
                },
                pe_date: {
                    date: new Date(2022, 8, 9, 0, 0, 0).dateToStr(),
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),
                p_min_date: '2021-01-01',
                p_max_date: new Date().dateToStr(),
                sg_seq: '',
            },
            topSearchDatas: {},

            set: {
                template: {
                    value: 0,
                    opts: [{ code: 1, name: '템플릿 1' }],
                },
                size: {
                    wid: 400,
                    hgt: 250,
                },
                usedTitle: true,
                anals: {
                    name: '분석대상',
                    fill: sharedStyles.point_color,
                },
                label: '정보량',
                usedSenti: true,
                usedNoneData: false,
            },

            analsData: {
                data: [{ category: '분석대상', categoryCode: '분석대상_1', code: '분석대상_1', name: '분석대상', color: sharedStyles.point_color, seq: 1, value: 1200, data: [] }],
            },
        };
    },
    computed: {
        ...mapGetters(['getSentis']),
        getDateGrp() {
            var date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
        getSearchDatas() {
            let cloneSearchData = JSON.parse(JSON.stringify(this.topSearchDatas));
            if (this.set.usedSenti) cloneSearchData.senti = this.getSentis.arrObjAttrToStr('code');
            else delete cloneSearchData.senti;

            if (this.set.usedNoneData) {
                cloneSearchData.s_date.date = '2099-01-02';
                cloneSearchData.e_date.date = '2099-01-02';
                cloneSearchData.ps_date.date = '2099-01-01';
                cloneSearchData.pe_date.date = '2099-01-01';
            }

            console.log('cloneSearchData', cloneSearchData);

            return cloneSearchData;
        },
        getSize() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'};min-height: ${this.set.size.hgt ? this.set.size.hgt + 'px' : 'auto'}`;
        },
        getLabel() {
            return this.set.label;
        },
        getAnals() {
            let result = { ...this.analsData.data[0] };
            result.name = this.set.anals.name;
            result.color = this.set.anals.fill;
            return result.name.length ? result : null;
        },
    },
    methods: {
        evt_click(val) {
            console.log(val);
        },
    },
};
</script>

<style></style>
