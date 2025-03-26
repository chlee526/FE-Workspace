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
                                            <h3><span>기본</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/templates/rkeyword?ref_type=heads" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>아이템 설정</strong>
                                                        <ul>
                                                            <li>
                                                                <span><strong>속성</strong> : 속성 사용여부 , 설정되면 속성 설정 UI 활성</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>속성상세설정</strong> : 속성상세설정 사용 여부 (속성사용시에만 사용 가능)</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>범례</strong> : 범례기능 사용 시, 점유율/순위/사용자설정</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>사용자 설정</strong> : 사용자 설정 순위 사용 시 적용 </span>
                                                                <br />
                                                                <span>
                                                                    랭크 // 해당 순위까지 (~3위) <br />
                                                                    색상 // 해당 순위까지의 색상</span
                                                                >
                                                            </li>
                                                            <li>
                                                                <span><strong>폰트 최소 사이즈</strong> : 워드클라우드 폰트 최소 사이즈(기본: 11)</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>폰트 최대 사이즈</strong> : 워드클라우드 폰트 최대 사이즈(기본: 50), 차트보다 커질경우 -10px씩 줄여가며 다시 그려짐</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>순위</strong> : (순위/전체갯수) 사용 여부</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>ui_function 숨김 처리</strong> : ui_function 숨김 처리</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>분석대상 박스 숨김 처리</strong> : 분석대상 박스 숨김 처리</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>팝업 클라우드 속성 사용</strong> : 정보량 클릭시 호출 되는 '관련정보팝업'에서 클라우드가 속성 사용 여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>달력기간 범위</strong> : 달력사용여부 및 최대기간범위(7, 1M, 1Y)</span>
                                                    </li>
                                                    <li>
                                                        <strong>키워드 설정</strong>
                                                        <ul>
                                                            <li>
                                                                <span><strong>1차 키워드</strong> : 1차 키워드 보기 설정 </span>
                                                            </li>
                                                            <li>
                                                                <span><strong>1차 키워드 정렬조건</strong> : 1차 키워드 정렬조건(TOP/HOT) 기능 사용여부</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>2차 연관키워드</strong> : 2차 연관키워드 사용 여부</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>2차 키워드 정렬조건</strong> : 2차 연관어 Top/Hot 사용여부</span>
                                                            </li>
                                                            <li>
                                                                <span><strong> 최대 키워드 갯수</strong> : 최대 키워드 갯수</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>아이템 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>속성</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-selectbox class="is-small" id="set_legend" v-model="set.selectUseAttrs" :opts="useAttrsList"></comp-selectbox>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>속성상세설정</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_useDetailAttrs" class="is-small" v-model="set.useDetailAttrs" :disabled="set.selectUseAttrs === ''"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>범례</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-selectbox class="is-small" id="set_legend" v-model="set.useLegend" :opts="set.useLegendList"></comp-selectbox>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>범례(숨김)</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_legendShow" class="is-small" v-model="set.legendShow" :disabled="set.useLegend === ''"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt><strong class="disabled">범례 - 순위(사용자 설정)</strong></dt>
                                                        <dd>
                                                            <comp-list id="custom_rank_list" :disabled="set.useLegend !== 'user'" :datas="set.customRank" :component="getRankComponent" @add="evt_itemAdd" @confirm="evt_confirm" @remove="evt_itemRemove"></comp-list>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>폰트 최소 사이즈</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-input-box class="is-small" id="set_minFont" type="number" v-model="cloudOpts.minFont" placeholder="폰트 최소 사이즈" label="폰트 최소 사이즈" min="0" style="width: 70px"></comp-input-box>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>폰트 최대 사이즈</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-input-box class="is-small" id="set_maxFont" type="number" v-model="cloudOpts.maxFont" placeholder="폰트 최대 사이즈" label="폰트 최대 사이즈" min="0" style="width: 70px"></comp-input-box>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>순위 표시</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_useRank" class="is-small" v-model="set.useRank"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <div class="grp">
                                                <comp-datepicker id="ts_dp" :c_type_opts="null" :s_date.sync="set.s_date" :e_date.sync="set.e_date" range="2Y" :min_date.sync="set.min_date" :max_date.sync="set.max_date" data-fixed="true"></comp-datepicker>
                                            </div>
                                        </div>
                                        <div class="rc">
                                            <div class="grp"><comp-switch-btn id="set_hideFunctions" class="is-small" v-model="set.hideFunctions" label="ui_function 숨김 처리"></comp-switch-btn></div>
                                            <hr />
                                            <div class="grp"><comp-switch-btn id="set_hideAnalsList" class="is-small" v-model="set.hideAnalsList" label="분석대상 박스 숨김 처리"></comp-switch-btn></div>
                                            <hr />
                                            <div class="grp"><comp-switch-btn id="set_useAttrsPopup" class="is-small" v-model="set.useAttrsPopup" label="팝업 클라우드 속성 사용"></comp-switch-btn></div>
                                            <hr />
                                            <div class="grp">
                                                <span>달력기간 범위</span>
                                                <comp-input-box id="set_range" v-model="set.range" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-filter-grp pos="BR">
                                                <template v-slot:title>키워드 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>1차 키워드 정렬조건</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_useSort" class="is-small" v-model="set.useSort"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>1차 키워드</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_viewType" class="is-small" v-model="set.viewType"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>2차 연관키워드</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_use2ndRk" class="is-small" v-model="set.use2ndRk"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>2차 키워드 정렬조건</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_useSort2nd" class="is-small" v-model="set.useSort2nd"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>최대 키워드 갯수</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-input-box class="is-small" id="set_keywordLen" type="number" v-model="set.keywordLen" placeholder="최대 키워드 갯수" label="최대 키워드 갯수" min="0" style="width: 70px"></comp-input-box>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row">
                                                <div class="wrap">
                                                    <div class="ui_col">
                                                        <tmpl-rkeyword
                                                            id="rk_01"
                                                            class="ui_box"
                                                            :hide-anals-list="set.hideAnalsList"
                                                            :hide-functions="set.hideFunctions"
                                                            :common-search-opts="searchDatas"
                                                            :keyword-len="set.keywordLen"
                                                            :range="set.range"
                                                            :use-attrs="useAttrs"
                                                            :use-legend="set.useLegendCustom || set.useLegend"
                                                            :legendShow="set.legendShow"
                                                            :use-deatil-attrs="set.useDetailAttrs"
                                                            :use-sort="set.useSort"
                                                            :cloud-opts="cloudOpts"
                                                            :use-sort2nd="set.useSort2nd"
                                                            :use2nd-rk="set.use2ndRk"
                                                            :use-attrs-popup="true"
                                                            :use-rank="set.useRank"
                                                            :view-type="getViewType"
                                                            :isNoData="set.usedNoneData"
                                                            :popup-cate-filters="[
                                                                {
                                                                    name: '채널',
                                                                    type: 'sg_seq',
                                                                    opts: [
                                                                        { code: 'c_93', color: '#97CBFF', name: '언론' },
                                                                        { code: 'c_113', color: '#BD70F9', name: '포탈' },
                                                                        { code: 'c_94', color: '#9AE674', name: '블로그' },
                                                                        { code: 'c_95', color: '#FFAE0C', name: '카페', disabled: true },
                                                                        { code: 'c_97', color: '#EE7CDF', name: '커뮤니티', disabled: true },
                                                                        { code: 'c_99', color: '#6BD3E8', name: '트위터', disabled: true },
                                                                        { code: 'c_100', color: '#6490F2', name: '페이스북', disabled: true },
                                                                        { code: 'c_102', color: '#F26464', name: '유튜브', disabled: true },
                                                                        { code: 'c_110', color: '#EECC3B', name: '정부기관', disabled: true },
                                                                        { code: 'c_111', color: '#3CD6A2', name: '공공/단체', disabled: true },
                                                                        { code: 'c_112', color: '#E56F21', name: '기타', disabled: true },
                                                                    ],
                                                                    value: 'c_94',
                                                                    multiple: true,
                                                                },
                                                            ]">
                                                        </tmpl-rkeyword>
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
import CompListRank from './ListRank.vue';

export default {
    name: 'template-rkeyword',
    data() {
        return {
            set: {
                s_date: {
                    date: '2022-10-19',
                },
                e_date: {
                    date: '2022-10-20',
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),
                customRank: [
                    { code: 1, name: '3', rank: 3, color: '#ff0000' },
                    { code: 2, name: '10', rank: 10, color: '#FF8700' },
                ],
                hideAnalsList: false,
                hideFunctions: false,
                useDetailAttrs: true,
                selectUseAttrs: '',
                keywordLen: 30,
                useRange: true,
                useSort: true,
                useSort2nd: true,
                viewType: true,
                use2ndRk: true,
                useRank: true,
                useAttrsPopup: true,
                range: '2',
                useLegendList: [
                    { code: '', name: '미사용' },
                    { code: 'share', name: '점유율' },
                    { code: 'rank', name: '순위' },
                    { code: 'user', name: '순위(사용자설정)' },
                ],
                useLegend: '',
                useLegendCustom: null,
                legendShow: false,
                usedNoneData: false,
            },
            searchDatas: {},
            cloudOpts: {
                minFont: 11,
                maxFont: 50,
            },
            useAttrs: null,
            tmpData: {
                data: [
                    {
                        cnt_d: '7153',
                        cnt_p: '27',
                        code: '453',
                        factor_per: '26392.6',
                        name: '바나나맛우유',
                        new: '',
                        senti_1: '7011',
                        senti_2: '18',
                        senti_3: '124',
                    },
                    { cnt_d: '6002', cnt_p: '45', code: '12', factor_per: '13237.8', name: '메로나', new: '', senti_1: '719', senti_2: '27', senti_3: '5256' },
                    {
                        cnt_d: '4566',
                        cnt_p: '26',
                        code: '182',
                        factor_per: '17461.5',
                        name: '가성비 좋음',
                        new: '',
                        senti_1: '4496',
                        senti_2: '0',
                        senti_3: '70',
                    },
                    {
                        cnt_d: '3320',
                        cnt_p: '0',
                        code: '613',
                        factor_per: '0.0',
                        name: '정치인 비비빅 언급',
                        new: 'new',
                        senti_1: '3275',
                        senti_2: '0',
                        senti_3: '45',
                    },
                    {
                        cnt_d: '3061',
                        cnt_p: '0',
                        code: '192',
                        factor_per: '0.0',
                        name: '한동훈장관 관련',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '0',
                        senti_3: '3061',
                    },
                    {
                        cnt_d: '2926',
                        cnt_p: '2926',
                        code: '1354',
                        factor_per: '0.0',
                        name: '롯데제과X현대오일뱅크 바이오 공동 사업 협약',
                        new: '',
                        senti_1: '2926',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    { cnt_d: '2898', cnt_p: '0', code: '862', factor_per: '0.0', name: '맛있다', new: 'new', senti_1: '2827', senti_2: '0', senti_3: '71' },
                    {
                        cnt_d: '2436',
                        cnt_p: '0',
                        code: '497',
                        factor_per: '0.0',
                        name: '롯데제과 주식회사 공식 출범',
                        new: 'new',
                        senti_1: '2436',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '2425',
                        cnt_p: '2411',
                        code: '1463',
                        factor_per: '0.6',
                        name: '낙농가 매일유업 빙그레 공장앞 집회',
                        new: '',
                        senti_1: '0',
                        senti_2: '0',
                        senti_3: '2425',
                    },
                    {
                        cnt_d: '2422',
                        cnt_p: '0',
                        code: '1608',
                        factor_per: '0.0',
                        name: '서울우유 낙농제도 개편 배제',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '2387',
                        senti_3: '35',
                    },
                    {
                        cnt_d: '2317',
                        cnt_p: '0',
                        code: '1787',
                        factor_per: '0.0',
                        name: '롯데 카이스트 R&D 디자인센터 건립',
                        new: 'new',
                        senti_1: '2317',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '2131',
                        cnt_p: '0',
                        code: '868',
                        factor_per: '0.0',
                        name: '아카페라 아메리카노',
                        new: 'new',
                        senti_1: '27',
                        senti_2: '18',
                        senti_3: '2086',
                    },
                    { cnt_d: '2095', cnt_p: '0', code: '1722', factor_per: '0.0', name: '당류 함량', new: 'new', senti_1: '0', senti_2: '0', senti_3: '2095' },
                    {
                        cnt_d: '2047',
                        cnt_p: '891',
                        code: '375',
                        factor_per: '129.7',
                        name: '붕어싸만코',
                        new: '',
                        senti_1: '341',
                        senti_2: '519',
                        senti_3: '1187',
                    },
                    {
                        cnt_d: '1869',
                        cnt_p: '0',
                        code: '1578',
                        factor_per: '0.0',
                        name: '롯데제과 디지몬빵 출시',
                        new: 'new',
                        senti_1: '1869',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '1816',
                        cnt_p: '108',
                        code: '1515',
                        factor_per: '1581.5',
                        name: '따옴 오가닉 유기농 주스',
                        new: '',
                        senti_1: '1816',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '1778',
                        cnt_p: '126',
                        code: '223',
                        factor_per: '1311.1',
                        name: '롯데제과 푸드 합병',
                        new: '',
                        senti_1: '1484',
                        senti_2: '0',
                        senti_3: '294',
                    },
                    {
                        cnt_d: '1733',
                        cnt_p: '90',
                        code: '480',
                        factor_per: '1825.6',
                        name: '동원F&B 제조 스누피우유  변질 논란',
                        new: '',
                        senti_1: '0',
                        senti_2: '1724',
                        senti_3: '9',
                    },
                    {
                        cnt_d: '1715',
                        cnt_p: '0',
                        code: '1694',
                        factor_per: '0.0',
                        name: '동원F&B 추석 선물세트 출시',
                        new: 'new',
                        senti_1: '1715',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    { cnt_d: '1663', cnt_p: '899', code: '346', factor_per: '85.0', name: '빵또아', new: '', senti_1: '195', senti_2: '439', senti_3: '1029' },
                    { cnt_d: '1402', cnt_p: '286', code: '269', factor_per: '390.2', name: '더단백', new: '', senti_1: '848', senti_2: '259', senti_3: '295' },
                    { cnt_d: '1375', cnt_p: '126', code: '372', factor_per: '991.3', name: '비비빅', new: '', senti_1: '547', senti_2: '99', senti_3: '729' },
                    {
                        cnt_d: '1330',
                        cnt_p: '0',
                        code: '703',
                        factor_per: '0.0',
                        name: '남양유업 손녀 황하나 언급',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '546',
                        senti_3: '784',
                    },
                    {
                        cnt_d: '1288',
                        cnt_p: '1288',
                        code: '1449',
                        factor_per: '0.0',
                        name: '매일유업 대리점 분야 공정거래 협약 평가 최우수',
                        new: '',
                        senti_1: '1288',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '1266',
                        cnt_p: '0',
                        code: '154',
                        factor_per: '0.0',
                        name: '빙그레우스 광고',
                        new: 'new',
                        senti_1: '318',
                        senti_2: '7',
                        senti_3: '941',
                    },
                    {
                        cnt_d: '1197',
                        cnt_p: '0',
                        code: '1739',
                        factor_per: '0.0',
                        name: '롯데제과 설레임 인도 시장 공략',
                        new: 'new',
                        senti_1: '1197',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '1170',
                        cnt_p: '0',
                        code: '64',
                        factor_per: '0.0',
                        name: '아연워터 출시',
                        new: 'new',
                        senti_1: '1152',
                        senti_2: '0',
                        senti_3: '18',
                    },
                    {
                        cnt_d: '1134',
                        cnt_p: '0',
                        code: '1593',
                        factor_per: '0.0',
                        name: '서울우유 목장경영 안정자금 긴급 지원',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '0',
                        senti_3: '1134',
                    },
                    {
                        cnt_d: '1064',
                        cnt_p: '1064',
                        code: '1482',
                        factor_per: '0.0',
                        name: '롯데제과 2분기 영업익 250억',
                        new: '',
                        senti_1: '161',
                        senti_2: '0',
                        senti_3: '903',
                    },
                    {
                        cnt_d: '1055',
                        cnt_p: '161',
                        code: '241',
                        factor_per: '555.3',
                        name: '엑설런트',
                        new: '',
                        senti_1: '762',
                        senti_2: '144',
                        senti_3: '149',
                    },
                    { cnt_d: '1051', cnt_p: '80', code: '428', factor_per: '1213.8', name: '캔디바', new: '', senti_1: '125', senti_2: '35', senti_3: '891' },
                    {
                        cnt_d: '956',
                        cnt_p: '0',
                        code: '799',
                        factor_per: '0.0',
                        name: '동원F&B 스누피우유 대장균 검출',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '956',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '943',
                        cnt_p: '269',
                        code: '454',
                        factor_per: '250.6',
                        name: '이슬톡톡 캔디바',
                        new: '',
                        senti_1: '835',
                        senti_2: '36',
                        senti_3: '72',
                    },
                    {
                        cnt_d: '938',
                        cnt_p: '637',
                        code: '1546',
                        factor_per: '47.3',
                        name: '서울시 공업용수 2025년 폐쇄',
                        new: '',
                        senti_1: '0',
                        senti_2: '0',
                        senti_3: '938',
                    },
                    { cnt_d: '935', cnt_p: '216', code: '333', factor_per: '332.9', name: '따옴바', new: '', senti_1: '856', senti_2: '25', senti_3: '54' },
                    {
                        cnt_d: '933',
                        cnt_p: '96',
                        code: '812',
                        factor_per: '871.9',
                        name: '롯데제과XBTS광고캠페인',
                        new: '',
                        senti_1: '933',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '916',
                        cnt_p: '916',
                        code: '1221',
                        factor_per: '0.0',
                        name: '빙그레재단 독립유공자 후손 장학금 수여',
                        new: '',
                        senti_1: '916',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '904',
                        cnt_p: '0',
                        code: '106',
                        factor_per: '0.0',
                        name: '빙그레 대한민국 패키징 수상',
                        new: 'new',
                        senti_1: '904',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '861',
                        cnt_p: '861',
                        code: '1509',
                        factor_per: '0.0',
                        name: '서울우유 낙농가 인상 촉구 집회',
                        new: '',
                        senti_1: '0',
                        senti_2: '847',
                        senti_3: '14',
                    },
                    {
                        cnt_d: '856',
                        cnt_p: '0',
                        code: '1571',
                        factor_per: '0.0',
                        name: '동원F&B 수산 간편요리 키트 출시',
                        new: 'new',
                        senti_1: '856',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '854',
                        cnt_p: '833',
                        code: '1494',
                        factor_per: '2.5',
                        name: '동원F&B 미네마인 패키지 디자인 리뉴얼',
                        new: '',
                        senti_1: '854',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '847',
                        cnt_p: '0',
                        code: '1718',
                        factor_per: '0.0',
                        name: '롯데제과 추석 선물 세트 판매',
                        new: 'new',
                        senti_1: '847',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '833',
                        cnt_p: '0',
                        code: '1585',
                        factor_per: '0.0',
                        name: '신동빈 상반기 보수',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '0',
                        senti_3: '833',
                    },
                    {
                        cnt_d: '833',
                        cnt_p: '0',
                        code: '1807',
                        factor_per: '0.0',
                        name: '롯데제과 디지몬빵 품절 대란템',
                        new: 'new',
                        senti_1: '833',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '832',
                        cnt_p: '343',
                        code: '1159',
                        factor_per: '142.6',
                        name: '동원F&B 리챔 참치 가격 인상',
                        new: '',
                        senti_1: '0',
                        senti_2: '832',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '805',
                        cnt_p: '805',
                        code: '1457',
                        factor_per: '0.0',
                        name: '동원F&B 디쉬 출시',
                        new: '',
                        senti_1: '805',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '798',
                        cnt_p: '798',
                        code: '1370',
                        factor_per: '0.0',
                        name: '롯데제과 노사문화 우수기업 선정',
                        new: '',
                        senti_1: '798',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '792',
                        cnt_p: '0',
                        code: '930',
                        factor_per: '0.0',
                        name: '동원F&B 덴마크 픽앤고 출시',
                        new: 'new',
                        senti_1: '792',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '791',
                        cnt_p: '0',
                        code: '1599',
                        factor_per: '0.0',
                        name: '동원F&B 프리미엄 동원 참치액 출시',
                        new: 'new',
                        senti_1: '791',
                        senti_2: '0',
                        senti_3: '0',
                    },
                    {
                        cnt_d: '763',
                        cnt_p: '0',
                        code: '1625',
                        factor_per: '0.0',
                        name: '정부 원유차등가격제 조속 도입',
                        new: 'new',
                        senti_1: '0',
                        senti_2: '490',
                        senti_3: '273',
                    },
                ],
            },
            tmpData2: {
                data: [
                    { cnt_d: '7153', code: '453', name: '바나나맛우유', senti_1: '7011', senti_2: '18', senti_3: '124' },
                    { cnt_d: '6002', code: '12', name: '메로나', senti_1: '719', senti_2: '27', senti_3: '5256' },
                    { cnt_d: '4566', code: '182', name: '가성비 좋음', senti_1: '4496', senti_2: '0', senti_3: '70' },
                    { cnt_d: '3320', code: '613', name: '정치인 비비빅 언급', senti_1: '3275', senti_2: '0', senti_3: '45' },
                    { cnt_d: '3061', code: '192', name: '한동훈장관 관련', senti_1: '0', senti_2: '0', senti_3: '3061' },
                    { cnt_d: '2926', code: '1354', name: '롯데제과X현대오일뱅크 바이오 공동 사업 협약', senti_1: '2926', senti_2: '0', senti_3: '0' },
                    { cnt_d: '2898', code: '862', name: '맛있다', senti_1: '2827', senti_2: '0', senti_3: '71' },
                    { cnt_d: '2436', code: '497', name: '롯데제과 주식회사 공식 출범', senti_1: '2436', senti_2: '0', senti_3: '0' },
                    { cnt_d: '2425', code: '1463', name: '낙농가 매일유업 빙그레 공장앞 집회', senti_1: '0', senti_2: '0', senti_3: '2425' },
                    { cnt_d: '2422', code: '1608', name: '서울우유 낙농제도 개편 배제', senti_1: '0', senti_2: '2387', senti_3: '35' },
                    { cnt_d: '2317', code: '1787', name: '롯데 카이스트 R&D 디자인센터 건립', senti_1: '2317', senti_2: '0', senti_3: '0' },
                    { cnt_d: '2131', code: '868', name: '아카페라 아메리카노', senti_1: '27', senti_2: '18', senti_3: '2086' },
                    { cnt_d: '2095', code: '1722', name: '당류 함량', senti_1: '0', senti_2: '0', senti_3: '2095' },
                    { cnt_d: '2047', code: '375', name: '붕어싸만코', senti_1: '341', senti_2: '519', senti_3: '1187' },
                    { cnt_d: '1869', code: '1578', name: '롯데제과 디지몬빵 출시', senti_1: '1869', senti_2: '0', senti_3: '0' },
                    { cnt_d: '1816', code: '1515', name: '따옴 오가닉 유기농 주스', senti_1: '1816', senti_2: '0', senti_3: '0' },
                    { cnt_d: '1778', code: '223', name: '롯데제과 푸드 합병', senti_1: '1484', senti_2: '0', senti_3: '294' },
                    { cnt_d: '1733', code: '480', name: '동원F&B 제조 스누피우유  변질 논란', senti_1: '0', senti_2: '1724', senti_3: '9' },
                    { cnt_d: '1715', code: '1694', name: '동원F&B 추석 선물세트 출시', senti_1: '1715', senti_2: '0', senti_3: '0' },
                    { cnt_d: '1663', code: '346', name: '빵또아', senti_1: '195', senti_2: '439', senti_3: '1029' },
                    { cnt_d: '1402', code: '269', name: '더단백', senti_1: '848', senti_2: '259', senti_3: '295' },
                    { cnt_d: '1375', code: '372', name: '비비빅', senti_1: '547', senti_2: '99', senti_3: '729' },
                    { cnt_d: '1330', code: '703', name: '남양유업 손녀 황하나 언급', senti_1: '0', senti_2: '546', senti_3: '784' },
                    { cnt_d: '1288', code: '1449', name: '매일유업 대리점 분야 공정거래 협약 평가 최우수', senti_1: '1288', senti_2: '0', senti_3: '0' },
                    { cnt_d: '1266', code: '154', name: '빙그레우스 광고', senti_1: '318', senti_2: '7', senti_3: '941' },
                    { cnt_d: '1197', code: '1739', name: '롯데제과 설레임 인도 시장 공략', senti_1: '1197', senti_2: '0', senti_3: '0' },
                    { cnt_d: '1170', code: '64', name: '아연워터 출시', senti_1: '1152', senti_2: '0', senti_3: '18' },
                    { cnt_d: '1134', code: '1593', name: '서울우유 목장경영 안정자금 긴급 지원', senti_1: '0', senti_2: '0', senti_3: '1134' },
                    { cnt_d: '1064', code: '1482', name: '롯데제과 2분기 영업익 250억', senti_1: '161', senti_2: '0', senti_3: '903' },
                    { cnt_d: '1055', code: '241', name: '엑설런트', senti_1: '762', senti_2: '144', senti_3: '149' },
                    { cnt_d: '1051', code: '428', name: '캔디바', senti_1: '125', senti_2: '35', senti_3: '891' },
                    { cnt_d: '956', code: '799', name: '동원F&B 스누피우유 대장균 검출', senti_1: '0', senti_2: '956', senti_3: '0' },
                    { cnt_d: '943', code: '454', name: '이슬톡톡 캔디바', senti_1: '835', senti_2: '36', senti_3: '72' },
                    { cnt_d: '938', code: '1546', name: '서울시 공업용수 2025년 폐쇄', senti_1: '0', senti_2: '0', senti_3: '938' },
                    { cnt_d: '935', code: '333', name: '따옴바', senti_1: '856', senti_2: '25', senti_3: '54' },
                    { cnt_d: '933', code: '812', name: '롯데제과XBTS광고캠페인', senti_1: '933', senti_2: '0', senti_3: '0' },
                    { cnt_d: '916', code: '1221', name: '빙그레재단 독립유공자 후손 장학금 수여', senti_1: '916', senti_2: '0', senti_3: '0' },
                    { cnt_d: '904', code: '106', name: '빙그레 대한민국 패키징 수상', senti_1: '904', senti_2: '0', senti_3: '0' },
                    { cnt_d: '861', code: '1509', name: '서울우유 낙농가 인상 촉구 집회', senti_1: '0', senti_2: '847', senti_3: '14' },
                    { cnt_d: '856', code: '1571', name: '동원F&B 수산 간편요리 키트 출시', senti_1: '856', senti_2: '0', senti_3: '0' },
                    { cnt_d: '854', code: '1494', name: '동원F&B 미네마인 패키지 디자인 리뉴얼', senti_1: '854', senti_2: '0', senti_3: '0' },
                    { cnt_d: '847', code: '1718', name: '롯데제과 추석 선물 세트 판매', senti_1: '847', senti_2: '0', senti_3: '0' },
                    { cnt_d: '833', code: '1585', name: '신동빈 상반기 보수', senti_1: '0', senti_2: '0', senti_3: '833' },
                    { cnt_d: '833', code: '1807', name: '롯데제과 디지몬빵 품절 대란템', senti_1: '833', senti_2: '0', senti_3: '0' },
                    { cnt_d: '832', code: '1159', name: '동원F&B 리챔 참치 가격 인상', senti_1: '0', senti_2: '832', senti_3: '0' },
                    { cnt_d: '805', code: '1457', name: '동원F&B 디쉬 출시', senti_1: '805', senti_2: '0', senti_3: '0' },
                    { cnt_d: '798', code: '1370', name: '롯데제과 노사문화 우수기업 선정', senti_1: '798', senti_2: '0', senti_3: '0' },
                    { cnt_d: '792', code: '930', name: '동원F&B 덴마크 픽앤고 출시', senti_1: '792', senti_2: '0', senti_3: '0' },
                    { cnt_d: '791', code: '1599', name: '동원F&B 프리미엄 동원 참치액 출시', senti_1: '791', senti_2: '0', senti_3: '0' },
                    { cnt_d: '763', code: '1625', name: '정부 원유차등가격제 조속 도입', senti_1: '0', senti_2: '490', senti_3: '273' },
                ],
            },
            tmpSelect: null,
        };
    },
    computed: {
        getRankComponent() {
            return CompListRank;
        },
        useAttrsList() {
            let arr = [];
            arr.push({ code: '', name: '미사용' });
            for (let attrs in this.$store.getters.getRkAttrs) {
                // arr.push({ code: this.$store.getters.getRkAttrs[attrs], name: attrs });
                arr.push({ code: attrs, name: attrs });
            }

            return arr;
        },
        getDateGrp() {
            var date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
        getViewType() {
            return this.set.viewType ? '1' : null;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.searchDatas = structuredClone(this.set);
        });
    },
    watch: {
        'set.s_date': {
            deep: true,
            handler(val) {
                this.searchDatas = structuredClone(this.set);
            },
        },
        'set.e_date': {
            deep: true,
            handler(val) {
                this.searchDatas = structuredClone(this.set);
            },
        },
        'set.useLegend'(val) {
            if (val == 'user') this.set.useLegendCustom = this.set.customRank;
            else this.set.useLegendCustom = null;
        },
        cloudOpts: {
            handler(val) {
                if (typeof val.maxFont == 'string') {
                    this.cloudOpts.maxFont = Number(val.maxFont);
                }

                if (typeof val.minFont == 'string') {
                    this.cloudOpts.minFont = Number(val.minFont);
                }
            },
            deep: true,
        },
        'set.keywordLen'(val) {
            if (typeof val == 'string') {
                this.set.keywordLen = Number(val);
            }
        },
        'set.selectUseAttrs'(val) {
            this.useAttrs = this.$store.getters.getRkAttrs[val];
        },
    },
    methods: {
        evt_graph_add(e) {
            let item = {
                rank: 0,
                color: '',
            };
            this.set.customRank.push(item);
        },
        evt_cloudClick($e) {
            console.log($e);
        },

        evt_itemAdd() {
            this.set.customRank.push({
                code: `${this.set.customRank.length + 1}`,
                name: '추가 순위',
                rank: '추가 순위',
                fill: '#ff0000',
            });
        },
        evt_itemRemove(tg) {
            const index = this.set.customRank.findIndex((item) => item.code === tg.code && item.rank === tg.rank);
            this.set.customRank.splice(index, 1);
        },
        evt_confirm(val) {
            this.$set(this.set.customRank, val.index, val.item);
        },

        evt_update(val) {
            // let datasName = this.set.typeDetail.value === 1 ? 'datas1' : this.set.typeDetail.value === 2 ? 'datas2' : 'datas';
            // this.set[datasName] = structuredClone(val);
        },
        evt_selected(val) {
            console.log('evt_selected', val);
        },
    },
};
</script>

<style></style>
