<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Word Colud - 기본</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/wordcloud" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>범례 설정</strong>
                                                        <ul>
                                                            <li><strong>범례 사용</strong> : 활성화 시 데이터 범례 종류 타입으로 설정 가능 (최초 설정은 순위로 표시)</li>
                                                            <li><strong>종류</strong> : 데이터 범례 방식 순위/점유율 선택</li>
                                                            <li><strong>순위색상-사용자 지정</strong> : 데이터 범례 순위 선택 시 순위 별 색상 사용자 커스텀 설정 처리</li>
                                                            <li><strong>순위</strong> : 순위 등록은 총 10개까지만 가능</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>활성화 색상 고정</strong> : 선택기능 사용시, 아이템 선택 시 활성화 색상 고정 사용 가능</span>
                                                        <ul>
                                                            <li><strong>활성화 색상 기능 사용되고 있지만 색깔 선택을 하지 않을 경우 범례 고유 색깔로 선택처리</strong></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 차트의 가로*세로 사이즈(px)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>선택기능 사용여부</strong> : 선택기능 사용시, 단일/멀티 선택인지 설정</span>
                                                        <ul>
                                                            <li>
                                                                <span><strong>선택기능 사용여부</strong> : 선택기능 사용시, 단일/멀티 선택인지 설정</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>단, 선택없음 사용 시 그래프 설정 중 활성화 색상 고정 사용 불가</strong></span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>데이터</strong>
                                                        <ul>
                                                            <li><strong>속성 포함</strong> : 차트 데이터 속성이름 표시 여부</li>
                                                            <li><strong>증감률 포함</strong> : 차트 데이터 증감률 표시 여부</li>
                                                            <li><strong>순위 포함</strong> : 차트 데이터 순위 표시 여부</li>
                                                        </ul>
                                                    </li>

                                                    <li>
                                                        <span><strong>차트/게시판 양식 이름</strong> : 변경 시 차트/게시판 양식 타입 설정</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>범례</template>
                                                <template v-slot:items>
                                                    <template>
                                                        <dl>
                                                            <dt>
                                                                <strong>범례 사용</strong>
                                                            </dt>
                                                            <dd>
                                                                <comp-switch-btn id="chart_03_lengendUse" class="is-small" v-model="chart_03_lengendUse"></comp-switch-btn>
                                                            </dd>
                                                        </dl>
                                                        <dl>
                                                            <dt><strong>종류</strong></dt>
                                                            <dd><comp-selectbox id="set_legend" :disabled="!chart_03_lengendUse" v-model="legendType" :opts="legendTypeArray"></comp-selectbox></dd>
                                                        </dl>

                                                        <hr />
                                                        <dl>
                                                            <dt>
                                                                <strong>순위색상-사용자 지정</strong>
                                                            </dt>

                                                            <dd>
                                                                <comp-switch-btn :disabled="legendType != 'rank' || !chart_03_lengendUse" id="chart_03_lengend" class="is-small" v-model="chart_03_lengend"></comp-switch-btn>
                                                            </dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>순위</strong> <comp-button :disabled="legendType != 'rank' || !chart_03_lengendUse || copyLegendCustom.length > 8" class="ui_btn is-xsmall is-icon-only" title="순위 추가" @click="evt_graph_add"><span class="icon">&#xe017;</span></comp-button>
                                                            </dt>
                                                            <dd>
                                                                <comp-list style="height: 150px" :disabled="legendType != 'rank' || !chart_03_lengendUse">
                                                                    <template v-slot:list>
                                                                        <comp-filter-grp v-for="(item, idx) in copyLegendCustom" :key="item.code" pos="R" class="is-small">
                                                                            <template v-slot:title>
                                                                                <dt v-if="item.rank != ''">~ {{ item.rank }}위</dt>
                                                                                <dt v-else>그 외</dt>
                                                                                <button v-if="item.rank != ''" class="btn_del" title="그래프 삭제" @click.stop="evt_graph_del(item)">삭제</button>
                                                                            </template>
                                                                            <template v-slot:items>
                                                                                <dl>
                                                                                    <dt>
                                                                                        <strong>순위</strong>
                                                                                    </dt>
                                                                                    <dd>
                                                                                        <comp-input-box type="number" :id="`code_${idx}_name`" class="is-small" v-model="item.rank" placeholder="순위" label="순위 입력" style="width: 100px"></comp-input-box>
                                                                                    </dd>
                                                                                </dl>
                                                                                <dl>
                                                                                    <dt>
                                                                                        <strong>컬러</strong>
                                                                                    </dt>
                                                                                    <dd>
                                                                                        <comp-colorpicker :color="item.color" v-model="item.color" />
                                                                                    </dd>
                                                                                </dl>
                                                                            </template>
                                                                        </comp-filter-grp>
                                                                    </template>
                                                                </comp-list>
                                                            </dd>
                                                        </dl>
                                                        <!-- <dl v-for="(item, idx) in copyLegendCustom" :key="idx">
                                                                    <dt v-if="item.rank != ''">~ {{ item.rank }}위</dt>
                                                                    <dt v-else>그 외</dt>
                                                                    <dd><comp-colorpicker :disabled="!(legendType == 'rank' && chart_03_lengend)" :color="item.color" v-model="item.color" @confirm="colorConfirm" /></dd>
                                                                </dl> -->
                                                    </template>
                                                </template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <span>활성화 색상 고정</span>
                                                <comp-switch-btn id="chart_03_fixActiveColor" class="is-small" v-model="chart_03_fixActiveColor"></comp-switch-btn>
                                                <comp-colorpicker :disabled="!chart_03_fixActiveColor" v-model="fixActiveColor" @confirm="colorConfirm" style="margin-left: 10px" />
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>크기</span>
                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" min="200" style="width: 70px"></comp-input-box>
                                                <comp-input-box id="set_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로크기 입력" min="100" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-radio-grp id="chart_03_sel" class="is-small" name="chart_03_sel" v-model="chart_03_sel" :opts="chart_03_sel_opts" :box="true"></comp-radio-grp>
                                            <hr />
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>데이터</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt><strong>속성포함</strong></dt>
                                                        <dd><comp-switch-btn id="chart_03_attrs" class="is-small" v-model="chart_03_attrs"></comp-switch-btn></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt><strong>증감률 포함</strong></dt>
                                                        <dd><comp-switch-btn id="chart_03_fluc" class="is-small" v-model="chart_03_fluc"></comp-switch-btn></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt><strong>순위 포함</strong></dt>
                                                        <dd><comp-switch-btn id="chart_03_rank" class="is-small" v-model="chart_03_rank"></comp-switch-btn></dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <comp-radio-grp id="chart_03_opts" class="is-small" name="chart_03_opts" v-model="chart_03_opts_value" :opts="chart_03_opts" :box="true"></comp-radio-grp>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row is-not-top-brd">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_col w12">
                                                        <comp-chart-wordcloud id="chart_01" :fix-active-color="chart_03_fixActiveColor ? fixActiveColor : ''" :toggle-type="chart_03_sel" :opts="{ maxFont: 80 }" :label-name="chart_03_opts.getParseDatas({ code: chart_03_opts_value })[0].name" :chart-data="contentDatas" v-model="selectedKeyword" :style="getSize" :use-rank="chart_03_rank" :legend="chart_03_lengendUse ? (!chart_03_lengend ? legendType : legendCustom) : ''" :legendShow="chart_03_lengendUse"></comp-chart-wordcloud>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>커스텀 색상</span>
                                                <div class="sub_title">
                                                    <span class="item">단일 활성</span>
                                                    <span class="item">클릭 이벤트</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <comp-chart-wordcloud id="chart_03" :opts="{ maxFont: 90 }" :chart-data="contentDatas2" toggle-type="one" v-model="selectedKeyword3" style="height: 300px" @click="evt_chart_click"></comp-chart-wordcloud>
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
import List from './list.vue';
export default {
    name: 'chart-wordcloud',
    data() {
        return {
            set: {
                size: {
                    wid: null,
                    hgt: 400,
                },
                data: [],
            },
            contentDatas: {
                data: [
                    { code: '1', value: 1565308, keyword: '생각', attrName: '일반', color: '#059263' },
                    { code: '2', value: 955660, keyword: '가능하다', attrName: '긍정', color: '#78B4DC' },
                    { code: '3', value: 864588, keyword: '못한다', attrName: '부정', color: '#e37d7d' },
                    { code: '4', value: 763446, keyword: '제공', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '5', value: 757949, keyword: '가격', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '6', value: 751557, keyword: '정보', attrName: '일반', color: '#059263' },
                    { code: '7', value: 744484, keyword: '모르다', attrName: '일반', color: '#059263' },
                    { code: '8', value: 720483, keyword: '사용', attrName: '일반', color: '#059263' },
                    { code: '9', value: 686637, keyword: '서울', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '10', value: 677506, keyword: '추천', attrName: '일반', color: '#059263' },
                    { code: '11', value: 630762, keyword: '제품', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '12', value: 628582, keyword: '사랑', attrName: '일반', color: '#059263' },
                    { code: '13', value: 584689, keyword: '구매', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '14', value: 546029, keyword: '최고', attrName: '일반', color: '#059263' },
                    { code: '15', value: 544414, keyword: '문제', attrName: '일반', color: '#059263' },
                    { code: '16', value: 536716, keyword: '2019년', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '17', value: 536636, keyword: '좋아하다', attrName: '긍정', color: '#78B4DC' },
                    { code: '18', value: 489756, keyword: '지역', attrName: '일반', color: '#059263' },
                    { code: '19', value: 489594, keyword: '다음', attrName: '일반', color: '#059263' },
                    { code: '20', value: 474915, keyword: '이용', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '21', value: 463203, keyword: '한국', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '22', value: 460977, keyword: '기준', attrName: '일반', color: '#059263' },
                    { code: '23', value: 444364, keyword: '안되다', attrName: '부정', color: '#e37d7d' },
                    { code: '24', value: 427236, keyword: '판매', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '25', value: 415954, keyword: '쉽다', attrName: '긍정', color: '#78B4DC' },
                    { code: '26', value: 414022, keyword: '귀엽다', attrName: '긍정', color: '#78B4DC' },
                    { code: '27', value: 410440, keyword: '아이', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '28', value: 404494, keyword: '관리', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '29', value: 403825, keyword: '소개', attrName: '일반', color: '#059263' },
                    { code: '30', value: 400561, keyword: '일정', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '31', value: 391821, keyword: '이야기', attrName: '일반', color: '#059263' },
                    { code: '32', value: 368017, keyword: '중요하다', attrName: '일반', color: '#059263' },
                    { code: '33', value: 363206, keyword: '고민', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '34', value: 362543, keyword: '후기', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '35', value: 361555, keyword: '맛집', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '36', value: 361355, keyword: '상담', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '37', value: 358281, keyword: '참여', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '38', value: 357907, keyword: '할인', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '39', value: 354829, keyword: '방문', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '40', value: 348208, keyword: '도움', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '41', value: 347700, keyword: '아침', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '42', value: 346146, keyword: '영상', attrName: 'TPOP', color: '#9A87FA' },
                    { code: '43', value: 346015, keyword: 'naver', attrName: '일반', color: '#059263' },
                    { code: '44', value: 344852, keyword: '이벤트', attrName: '일반', color: '#059263' },
                    { code: '45', value: 338148, keyword: '자세하다', attrName: '일반', color: '#059263' },
                    { code: '46', value: 336745, keyword: '힘들어지다', attrName: '일반', color: '#059263' },
                    { code: '47', value: 334054, keyword: '원하다', attrName: '일반', color: '#059263' },
                    { code: '48', value: 327104, keyword: '힘들다', attrName: '일반', color: '#059263' },
                    { code: '49', value: 324305, keyword: '노력하다', attrName: '일반', color: '#059263' },
                    { code: '50', value: 316534, keyword: '사업', attrName: 'TPOP', color: '#9A87FA' },
                ],
            },

            contentDatas2: {
                data: [
                    { code: '1', value: 1565308, color: '#6DC1E8', keyword: '생각' },
                    { code: '2', value: 955660, color: '#6DC1E8', keyword: '가능하다' },
                    { code: '3', value: 864588, color: '#6DC1E8', keyword: '못한다' },
                    { code: '4', value: 763446, color: '#6DC1E8', keyword: '제공' },
                    { code: '5', value: 757949, color: '#6F9FEC', keyword: '가격' },
                    { code: '6', value: 751557, color: '#6F9FEC', keyword: '정보' },
                    { code: '7', value: 744484, color: '#6F9FEC', keyword: '모르다' },
                    { code: '8', value: 720483, color: '#6F9FEC', keyword: '사용' },
                    { code: '9', value: 686637, color: '#6F7AEC', keyword: '서울' },
                    { code: '10', value: 677506, color: '#6F7AEC', keyword: '추천' },
                    { code: '11', value: 630762, color: '#6F7AEC', keyword: '제품' },
                    { code: '12', value: 628582, color: '#6F7AEC', keyword: '사랑' },
                    { code: '13', value: 584689, color: '#6F7AEC', keyword: '구매' },
                    { code: '14', value: 546029, color: '#6F7AEC', keyword: '최고' },
                    { code: '15', value: 544414, color: '#6F7AEC', keyword: '문제' },
                    { code: '16', value: 536716, color: '#6F7AEC', keyword: '2019년' },
                    { code: '17', value: 536636, color: '#8A70EB', keyword: '좋아하다' },
                    { code: '18', value: 489756, color: '#8A70EB', keyword: '지역' },
                    { code: '19', value: 489594, color: '#8A70EB', keyword: '다음' },
                    { code: '20', value: 474915, color: '#8A70EB', keyword: '이용' },
                    { code: '21', value: 463203, color: '#8A70EB', keyword: '한국' },
                    { code: '22', value: 460977, color: '#8A70EB', keyword: '기준' },
                    { code: '23', value: 444364, color: '#8A70EB', keyword: '안되다' },
                    { code: '24', value: 427236, color: '#8A70EB', keyword: '판매' },
                    { code: '25', value: 415954, color: '#AE6FEB', keyword: '쉽다' },
                    { code: '26', value: 414022, color: '#AE6FEB', keyword: '귀엽다' },
                    { code: '27', value: 410440, color: '#AE6FEB', keyword: '아이' },
                    { code: '28', value: 404494, color: '#AE6FEB', keyword: '관리' },
                    { code: '29', value: 403825, color: '#AE6FEB', keyword: '소개' },
                    { code: '30', value: 400561, color: '#AE6FEB', keyword: '일정' },
                    { code: '31', value: 391821, color: '#AE6FEB', keyword: '이야기' },
                    { code: '32', value: 368017, color: '#AE6FEB', keyword: '중요하다' },
                    { code: '33', value: 363206, color: '#D570EB', keyword: '고민' },
                    { code: '34', value: 362543, color: '#D570EB', keyword: '후기' },
                    { code: '35', value: 361555, color: '#D570EB', keyword: '맛집' },
                    { code: '36', value: 361355, color: '#D570EB', keyword: '상담' },
                    { code: '37', value: 358281, color: '#D570EB', keyword: '참여' },
                    { code: '38', value: 357907, color: '#D570EB', keyword: '할인' },
                    { code: '39', value: 354829, color: '#D570EB', keyword: '방문' },
                ],
            },
            chart_03_attrs: false,
            chart_03_fluc: false,
            chart_03_rank: false,
            chart_03_lengend: false,
            chart_03_lengendUse: false,
            chart_03_fixActiveColor: false,
            chart_03_legendCustom: '',
            legendType: 'rank',
            legendTypeArray: [
                { code: 'rank', name: '순위' },
                { code: 'share', name: '점유율' },
            ],
            chart_03_opts: [
                { code: '1', name: '#해시태그' },
                { code: '2', name: '키워드' },
                { code: '3', name: '연관어' },
                { code: '4', name: '검색어' },
            ],
            chart_03_opts_value: '3',
            chart_03_sel: null,
            chart_03_sel_opts: [
                { code: null, name: '선택없음' },
                { code: 'one', name: '단일선택' },
                { code: 'oneToggle', name: '단일선택(Toggle)' },
                { code: 'multi', name: '멀티선택' },
            ],
            copyContentDatas: {
                data: [],
            },
            copyLegendCustom: [
                { code: '1', rank: '5', color: '#EC5151' },
                { code: '2', rank: '10', color: '#F58B39' },
                { code: '3', rank: '20', color: '#F6B61F' },
                { code: '4', rank: '', color: '#AAAAAA' },
            ],
            legendCustom: [
                { rank: '5', color: '#EC5151' },
                { rank: '10', color: '#F58B39' },
                { rank: '20', color: '#F6B61F' },
                { rank: '', color: '#AAAAAA' },
            ],
            selectedKeyword: null,
            selectedKeyword2: null,
            selectedKeyword3: null,
            selectedKeyword4: null,
            colors: '',
            fixActiveColor: '#ff0000',
            colorList: ['#EC5151', '#F58B39', '#F6B61F', '#ABC834', '#69B229', '#28AA53', '#1E9BC9', '#3972D5', '#9C69DF', '#AAAAAA'],
        };
    },
    components: {
        'comp-list': List,
    },
    computed: {
        getSize() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt || 400}px`;
        },
    },
    mounted() {
        this.copyContentDatas = JSON.parse(JSON.stringify(this.contentDatas));

        let result = JSON.parse(JSON.stringify(this.copyContentDatas));

        if (this.chart_03_attrs) {
            this.contentDatas = result;
        } else {
            result.data = this.contentDatas.data.map((item) => {
                delete item.attrName;
                delete item.color;
                return item;
            });

            this.contentDatas = result;
        }
    },
    watch: {
        copyLegendCustom: {
            handler(val) {
                this.legendCustom = JSON.parse(JSON.stringify(val));
            },
            deep: true,
        },
        chart_03_lengendUse(val) {
            let result = JSON.parse(JSON.stringify(this.contentDatas));
            if (!val) {
                this.contentDatas = result;
            } else {
                this.chart_03_attrs = false;
                result.data = this.contentDatas.data.map((item) => {
                    delete item.color;
                    return item;
                });

                this.contentDatas = result;
            }
        },
        chart_03_fixActiveColor(val) {
            if (val) this.chart_03_lengend = false;
        },
        legendType(val) {
            if (val == 'share') {
                this.chart_03_lengend = false;
            }
        },
        //선택기능 사용 버튼
        chart_03_sel() {
            this.selectedKeyword = [];
        },

        // 속성
        chart_03_attrs($val) {
            let result = JSON.parse(JSON.stringify(this.copyContentDatas));
            if ($val) {
                this.chart_03_lengendUse = false;
                this.contentDatas = result;
            } else {
                result.data = this.contentDatas.data.map((item) => {
                    delete item.attrName;
                    delete item.color;
                    return item;
                });

                this.contentDatas = result;
            }
        },
        // 증감률
        chart_03_fluc($val) {
            const result = JSON.parse(JSON.stringify(this.contentDatas));
            result.data.forEach(($item) => {
                if ($val) $item.factor_per = (Math.random() * 1000 - 500).toFixed(1);
                else delete $item.factor_per;
            });
            this.contentDatas = result;
        },

        chart_03_opts_value(val) {
            if (val == '1') {
                const result = JSON.parse(JSON.stringify(this.contentDatas));
                result.data.forEach((item) => {
                    item.keyword = '#' + item.keyword;
                });
                const result2 = JSON.parse(JSON.stringify(this.contentDatas2));
                result2.data.forEach((item) => {
                    item.keyword = '#' + item.keyword;
                });
                this.contentDatas = result;
                this.contentDatas2 = result2;
            } else {
                const result = JSON.parse(JSON.stringify(this.contentDatas));
                result.data.forEach((item) => {
                    if (item.keyword.indexOf('#') >= 0) {
                        item.keyword = item.keyword.replace('#', '');
                    }
                });

                const result2 = JSON.parse(JSON.stringify(this.contentDatas2));
                result2.data.forEach((item) => {
                    if (item.keyword.indexOf('#') >= 0) {
                        item.keyword = item.keyword.replace('#', '');
                    }
                });

                this.contentDatas = result;
                this.contentDatas2 = result2;
            }
        },
    },
    methods: {
        evt_graph_add(e) {
            let lastIdx;
            let lastRank;
            let last = this.copyLegendCustom.pop();

            if (this.copyLegendCustom.length > 0) {
                lastIdx = parseInt(this.copyLegendCustom[this.copyLegendCustom.length - 1].code) + 1;
                lastRank = parseInt(this.copyLegendCustom.at(-1).rank) + 5;
            } else {
                lastIdx = 0;
                lastRank = 5;
            }

            this.copyLegendCustom.push({
                name: '아이템 ' + lastIdx,
                code: lastIdx.numAddZero(),
                rank: lastRank.toString(),
                data: {},
                // color: '#' + Math.round(Math.random() * 0xffffff).toString(16),
                color: this.colorList[this.copyLegendCustom.length + 1],
            });

            this.copyLegendCustom.push(last);
        },
        evt_graph_del(delItem) {
            this.copyLegendCustom = this.copyLegendCustom.removeItem({ code: delItem.code });
        },

        changeColor(e) {
            if (e) {
                this.legendCustom = JSON.parse(JSON.stringify(this.copyLegendCustom));
            } else {
                this.copyLegendCustom = JSON.parse(JSON.stringify(this.legendCustom));
            }
        },
        evt_chart_click(e) {
            console.log(e);
        },

        colorConfirm(val) {
            console.log(val);
            // val.color = val.colors;
            // this.fixActiveColor = val;
        },
    },
};
</script>

<style></style>
