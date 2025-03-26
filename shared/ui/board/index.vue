<template>
    <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
        <div class="wrap">
            <div class="ui_brd is-sticky is-body-twoline-mode is-hgt-fixed">
                <div class="infos">
                    <div class="lc">
                        <div class="page_info">
                            <span
                                >총 <strong>{{ useBrdDatas.total_cnt.addComma() }}</strong> 건</span
                            >
                        </div>
                    </div>
                    <div class="rc">
                        <comp-selectbox :id="id + '_chns'" class="is-small" v-model="chns" :opts="getChns" :multiple="true" useDisabled></comp-selectbox>
                        <hr />
                        <comp-selectbox id="brd_view_len" class="is-small" :opts="getViewLenOpts" v-model="brdOpts.row_limit"></comp-selectbox>
                        <hr />
                        <comp-input-box :id="id + '_input'" class="is-small" type="search" v-model="inputKeyword" placeholder="제목+내용 검색" label="검색어" @keyup="evt_search" :minlength="2" @search="evt_search" style="width: 250px"></comp-input-box>
                    </div>
                </div>
                <div ref="brd_body" class="wrap">
                    <table>
                        <colgroup>
                            <col style="width: 100px" />
                            <col style="width: 150px" />
                            <col />
                            <col style="width: 100px" />
                            <col style="width: 120px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><strong>채널</strong></th>
                                <th><strong>출처</strong></th>
                                <th><strong>원문</strong></th>
                                <th>
                                    <strong>수집일</strong>
                                    <comp-table-sort id="REG_DATE" name="data_list_sort" v-model="brdOpts.order_type"></comp-table-sort>
                                </th>
                                <th>
                                    <strong>인기도</strong>
                                    <!-- <comp-bubble-box class="is-helper" :html-type="true" pos="RB">
                                        <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                        <div slot="html-content" v-html="$store.getters.getHelperContent.popularity"></div>
                                    </comp-bubble-box> -->
                                    <comp-table-sort id="POPULARITY" name="data_list_sort" v-model="brdOpts.order_type"></comp-table-sort>
                                </th>
                            </tr>
                        </thead>
                        <!-- 데이터 없는 경우 -->
                        <tbody v-if="useBrdDatas.list.length == 0">
                            <template v-if="brdOpts.row_limit <= 5">
                                <tr v-for="$idx in 2" :key="'no_data_before_' + $idx" class="is-no-over">
                                    <td :colspan="brdOpts.colCnt"></td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="$idx in 4" :key="'no_data_before_' + $idx" class="is-no-over">
                                    <td :colspan="brdOpts.colCnt"></td>
                                </tr>
                            </template>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt" class="no_over no_data in_list"><span class="ui_no_data_txt">데이터가 없습니다.</span></td>
                            </tr>
                            <template v-if="brdOpts.row_limit <= 5">
                                <tr v-for="$idx in 2" :key="'no_data_after_' + $idx" class="is-no-over">
                                    <td :colspan="brdOpts.colCnt"></td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="$idx in 5" :key="'no_data_after_' + $idx" class="is-no-over">
                                    <td :colspan="brdOpts.colCnt"></td>
                                </tr>
                            </template>
                        </tbody>
                        <!-- // 데이터 없는 경우 -->

                        <!-- 데이터 있는 경우 -->
                        <tbody v-else>
                            <tr v-for="($item, $idx) in useBrdDatas.list" :key="$idx">
                                <th class="ui_fc_dm">
                                    <span>{{ $store.getters.getChns.getParseDatas({ code: $item.SG_SEQ })[0]?.name }}</span>
                                </th>
                                <th class="ui_fc_dm">
                                    <span>{{ $item.SITE_NAME }}</span>
                                </th>
                                <td class="ui_al" :class="{ 'has-cafe': $item.CAFE_URL }">
                                    <span v-if="$item.CAFE_URL" class="is-cafe">
                                        <comp-button :href="$item.CAFE_URL.buzmsLink()" target="_blank" class="ui_btn is-icon-only is-xsmall" title="카페 바로가기"><span class="icon">&#xe055;</span></comp-button>
                                    </span>
                                    <comp-bubble-box class="is-board" :subject="$item.TITLE" :content="$item.CONTENT" style="max-width: 1000px">
                                        <a :href="$item.URL.buzmsLink()" target="_blank" class="is-title-txts" :html-type="true">
                                            <strong v-html="$item.TITLE"></strong>
                                            <span v-if="$item.CONTENT != ''" class="txt ui_fc_dm" v-html="$item.CONTENT"></span>
                                        </a>
                                    </comp-bubble-box>
                                </td>
                                <td class="ui_fc_dm">
                                    <span>{{ $item.REG_DATE.dateToStr() }}</span>
                                </td>
                                <td class="ui_fc_dm">
                                    <span>{{ $item.POPULARITY }}</span>
                                </td>
                            </tr>
                            <tr v-for="$idx in brdOpts.row_limit - useBrdDatas.list.length > 0 ? brdOpts.row_limit - useBrdDatas.list.length : 0" class="is-no-over" :key="$idx">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                        </tbody>
                        <!-- // 데이터 있는 경우 -->
                    </table>
                </div>
                <div class="footer">
                    <comp-paginate :datas="brdOpts" :total-len="useBrdDatas.total_cnt" v-model="brdOpts.page_num"></comp-paginate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import { API_datalist } from '@shared/api/datalist';
export default {
    name: 'comp-default-board',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null,
            loading: false,
            isFirstLoad: true,
            chns: this.commonSearchOpts.sg_seq,
            inputKeyword: '', // 키워드 검색값 - 인풋용
            useInputKeyword: '', // 키워드 검색값 - 실제 데이터 삽입 용
            brdOpts: {
                colCnt: 5, // 게시판 Col
                row_limit: 30, // 게시판 Row
                page_num: 1, // 현재 페이지 번호
                pagingColCnt: 10, // 페이징 갯수
                /**
                 * 정렬
                 * MD_DATE^A: 인기도 오름
                 * MD_DATE^D: 인기도 내림
                 * popularity^A: 인기도 오름
                 * popularity^D: 인기도 내림
                 */
                order_type: 'POPULARITY^D', // 정렬
                text_limit: {
                    // 데이터 텍스트 제한
                    title: '10,100',
                    content: '10,200',
                },
            },
            brdDatas: {
                // API를 통해 데이터 전달
                total_cnt: 0,
                list: [],
            },
            useBrdDatas: {
                // 게시판 데이터 키워드 매칭을 위해 클론데이터 사용
                total_cnt: 0,
                list: [],
            },
        };
    },
    props: {
        id: { type: String },
        commonSearchOpts: {
            type: Object,
            default: () => {
                return { sg_seq: 'c_94,c_95,c_97', analsList: [{ name: '#방콕' }] };
            },
        },
        analsCode: { type: Array },
    },
    created() {
        this.searching();
    },
    computed: {
        // 게시판 n개씩 보기 옵션 목록(store데이터에서 5개 제외후 반환)
        getViewLenOpts() {
            return this.$store.getters.getBrdViewLen.exptAttr({ code: '5' });
        },
        /**
         * 분석 대상 목록
         * @returns {Array}
         */
        getAnals() {
            if (!this.commonSearchOpts.analsList) return [];
            let result = [];
            for (const $key in this.commonSearchOpts.analsList) {
                if (this.commonSearchOpts.analsList[$key].name && this.commonSearchOpts.analsList[$key].name.length) result.push(this.commonSearchOpts.analsList[$key]);
            }
            return result;
        },
        /**
         * 사용가능한 채널 목록(상단조건에서 제외된 채널 빼고 목록화)
         * @returns {Array}
         */
        getChns() {
            if (!this.commonSearchOpts.sg_seq) return [];

            var _this = this;

            var result = JSON.parse(JSON.stringify(this.$store.getters.getChns.delAttr('color'))).filter(($item) => {
                if (_this.commonSearchOpts.sg_seq.strToArr().includes($item.code)) return $item;
            });

            return result;
        },
        /**
         * 템플릿에서 사용할 데이터를 매칭 키워드 변환 후 전달
         * @returns {Object}
         */
        getBrdDatas() {
            var _this = this;
            var result = JSON.parse(JSON.stringify(this.brdDatas));

            result.list.forEach(function ($item) {
                if (_this.commonSearchOpts.analsList.length > 0) {
                    const reg = new RegExp(_this.commonSearchOpts.analsList[0].name.trim(), 'gi');
                    $item.TITLE = String($item.TITLE).replace(reg, ($match) => '<span class="is-hl-colKeyword">' + $match + '</span>');
                    $item.CONTENT = String($item.CONTENT).replace(reg, ($match) => '<span class="is-hl-colKeyword">' + $match + '</span>');
                }

                // 수집키워드 매칭
                if ($item.c_keyword) {
                    $item.c_keyword = JSON.parse(JSON.stringify($item.c_keyword));
                    let reg = new RegExp($item.c_keyword.join('|'), 'gi');
                    $item.TITLE = String($item.TITLE).replace(reg, ($match) => '<span class="is-hl-colKeyword">' + $match + '</span>');
                    $item.CONTENT = String($item.CONTENT).replace(reg, ($match) => '<span class="is-hl-colKeyword">' + $match + '</span>');
                }
                // 공통 검색어 매칭
                if (_this.commonSearchOpts.search_keyword && _this.commonSearchOpts.search_keyword.length) {
                    var tmp = JSON.parse(JSON.stringify(_this.commonSearchOpts.search_keyword));
                    tmp.forEach(function ($item2) {
                        var inputKeyword = $item2.keyword.trim().strEscape();
                        if (inputKeyword.length) {
                            $item.TITLE = String($item.TITLE).replaceAll(inputKeyword, '<span class="is-hl-inputkeyword">' + inputKeyword + '</span>');
                            $item.CONTENT = String($item.CONTENT).replaceAll(inputKeyword, '<span class="is-hl-inputkeyword">' + inputKeyword + '</span>');
                        }
                    });
                }
                // 검색어 매칭
                if (_this.inputKeyword.trim().length) {
                    const inputKeyword = _this.inputKeyword.trim().strEscape();
                    $item.TITLE = String($item.TITLE).replaceAll(inputKeyword, '<span class="is-hl-inputkeyword">' + _this.inputKeyword.trim() + '</span>');
                    $item.CONTENT = String($item.CONTENT).replaceAll(inputKeyword, '<span class="is-hl-inputkeyword">' + _this.inputKeyword.trim() + '</span>');
                }

                // 공백제거
                // $item.TITLE = String($item.TITLE).escapeSpace();
                // $item.CONTENT = String($item.CONTENT).escapeSpace();
            });

            return result;
        },
        /**
         * 파라미터에서 사용할 검색 조건 정의 후 전달
         * @returns {Object}
         */
        getSearchCondition() {
            var result = JSON.parse(JSON.stringify(this.commonSearchOpts));

            // 분석 대상
            // result.or_type_code = this.analsCode;
            // result = addTypeCode(result, { analsCode: this.analsCode });

            // 채널
            result.sg_seq = this.chns;

            // 입력 키워드
            if (this.useInputKeyword.length) {
                if (!result.search_keyword) result.search_keyword = [];
                result.search_keyword.push({
                    type: 'A',
                    keyword: this.useInputKeyword,
                });
            }

            // 페이지당 로우수
            result.row_limit = this.brdOpts.row_limit;

            // 페이지 번호
            result.page_num = this.brdOpts.page_num;

            // 로우데이터 텍스트 조건
            result.text_limit = this.brdOpts.text_limit;

            // 정렬
            result.order_type = this.brdOpts.order_type;

            // result.rk_seq = result.analsList.arrObjAttrToStr('code');
            result.rk_seq = result.analsList;

            return JSON.parse(JSON.stringify(result));
        },
    },
    filters: {
        dateFormat(val) {
            let str = String(val);

            return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
        },
    },
    watch: {
        // 공통 검색 조건
        commonSearchOpts: {
            deep: true,
            handler($val) {
                this.chns = $val.sg_seq;
                this.useInputKeyword = '';
                this.inputKeyword = '';

                this.searching();

                // if (this.analsCode == this.getAnals.arrObjAttrToStr('code', ',')) {
                //     this.searching();
                // } else {
                //     this.analsCode = this.getAnals.arrObjAttrToStr('code', ',');
                // }
            },
        },
        // 분석대상
        analsCode($val) {
            this.searching();
        },
        // Row 갯수
        'brdOpts.row_limit'($val) {
            this.searching();
        },
        // 현재 페이지
        'brdOpts.page_num'($val) {
            this.fetchData();
        },
        // 채널 변경
        chns($val) {
            this.searching();
        },
        // 정렬 변경
        'brdOpts.order_type'($val) {
            this.searching();
        },
    },
    methods: {
        /**
         * 조건 변경으로 인한 검색 시작
         * 페이지 번호를 1로 이동시키거나 검색 시작
         */
        searching() {
            if (this.brdOpts.page_num == 1) this.fetchData();
            else this.brdOpts.page_num = 1;
        },
        async fetchData() {
            this.loading = true;
            this.apiParams = this.getSearchCondition;

            this.apiParams.e_date = {
                date: '2023-04-14',
            };
            this.apiParams.s_date = {
                date: '2023-04-08',
            };

            await API_datalist(this.apiUID, this.apiParams)
                .then((res) => {
                    res.data = {
                        total_cnt: 51,
                        page_num: '1',
                        list: [
                            { SG_SEQ: 'c_94', REG_DATE: 20230412, TITLE: '태국 방콕 여행코스 실시간 방콕 날씨', CONTENT: '고 오세요. ㅠㅠ #방콕여행,#방콕여행코스,#방콕,#태국여행,#방콕날씨,#태국방콕', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/neweunha/223071936551', POPULARITY: 88 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230408, TITLE: '태국 방콕 여행 / 프롤로그(에어부산 프리미엄 번들 기내식, 전자담배 반입금지!!)', CONTENT: '다. #아이콘시암,#방콕여행,#태국여행,#짜뚜짝시장', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/jaedolls/223068433768', POPULARITY: 82 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230410, TITLE: '태국 방콕 날씨 우기 건기 시즌 옷차림 마스크 정보', CONTENT: '하기    \n\n #방콕여행,#방콕우기건기,#태국날씨,#방콕,#방콕날씨,#방콕자유여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/phantasma86/223069632751', POPULARITY: 81 },
                            {
                                SG_SEQ: 'c_94',
                                REG_DATE: 20230412,
                                TITLE: '4월 태국 여행 송크란축제 방콕 3박5일 여행코스',
                                CONTENT: ' 하고 \n겸사겸사 #방콕여행 까지 하고 오면 \n잊지못할 뜨거운 "초여름" 휴가가 될 것 같다. \n\n여행 기간이 짧거나 준비할 시간이 없는 분들이라면\n우리 일행들끼리만 오붓하게 즐길 수 있는 \n단독투어로 꽉 채운 방콕 가이드맨의 \n3박5일 핵심팩 일정 완전 강추!!!!! \n클래식~트렌디한 방콕 주요 명소들을 돌아보고 \n맛집, 마사지까지 매일 매일 조질 수 있어서 알차다. \n',
                                S_SEQ: 3554,
                                SITE_NAME: '네이버블로그',
                                URL: 'https://blog.naver.com/diary_travelssun/223072776505',
                                POPULARITY: 81,
                            },
                            { SG_SEQ: 'c_94', REG_DATE: 20230413, TITLE: '태국 방콕 여행 숙소 : 터미널21과 연결된 그란데 센터 포인트 호텔', CONTENT: '3     \n\n #방콕여행,#방콕호텔,#그란데센터포인트,#태국여행,#방콕터미널21,#터미널21호텔', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/rockbeertravel/222884757956', POPULARITY: 81 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230408, TITLE: '방콕 디너크루즈 추천 짜오프라야 프린세스 크루즈 할인 티켓 예약 정보 후기', CONTENT: '루즈 #크루즈여행 #방콕여행 #방콕야경 #방콕자유여행코스 #방콕디너크루즈예약 #방콕디너크루즈할인 #방콕자유여행코스,#방콕짜오프라야프린세스크루즈,#방콕디너크루즈,#방콕여행,#방콕야경,#차오프라야프린세스크루즈,#방콕디너크루즈할인,#방콕크루즈,#방콕디너크루즈예약,#크루즈여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/sidvi/223068898511', POPULARITY: 80 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230410, TITLE: '[방콕/Phloen Chit Rd] 송파 바쿠테 Song Fa Buk Kut Teh @****** Embassy', CONTENT: '******.do #방콕여행,#여행,#송파바쿠테,#태국음식,#태국,#센트럴엠버시,#방콕,#태국여행,#세계여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/swiss9769/222943567202', POPULARITY: 80 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230412, TITLE: '[방콕/Phloen Chit Rd] 잇타이 Eathai @****** Embassy', CONTENT: '******.do #방콕여행,#여행,#태국음식,#태국,#방콕,#태국여행,#잇타이,#세계여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/swiss9769/222954876047', POPULARITY: 80 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230412, TITLE: "방콕 디너크루즈 '원더풀 펄 디너' 뷔페 야경 여행", CONTENT: ' #방콕디너크루즈,#방콕여행,#방콕야경,#원더풀펄디너크루즈,#방콕,#크루즈여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/phm8739/223072572254', POPULARITY: 79 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230411, TITLE: '[커플세계여행 시즌 2 D+151] 2022.9.19 태국 방콕여행 // 방콕살이 27일차, 터미널 21...', CONTENT: '계여행 #태국여행 #방콕여행 #태국한달살기 #방콕한달살기 #터미널21아속점 #방콕발마사지 #터미널21 #피어21 #차트라뮤 #방콕여행,#터미널21아속점,#피어21,#차트라뮤,#방콕한달살기,#터미널21,#태국여행,#커플세계여행,#태국한달살기', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/eunjihello/223071166261', POPULARITY: 78 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230409, TITLE: '2023 방콕-몰디브 신혼여행 일정 정리 및 사진 요약', CONTENT: '     \n\n #방콕여행,#몰디브여행,#방콕미슐랭,#방콕신혼여행,#방콕경유몰디브,#신혼여행,#몰디브신혼여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/jejuna17/223069539509', POPULARITY: 77 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230411, TITLE: '2023 방콕-몰디브 신혼여행<2>방콕 호텔 렘브란트&시암 켐핀스키', CONTENT: ',#방콕스쿰빗호텔,#방콕여행,#방콕호텔,#방콕호캉스,#시암호텔,#방콕싸얌호텔,#방콕렘브란트호텔,#시암켐핀스키,#방콕캠핀스키,#방콕가성비숙소,#방콕싸얌켐핀스키,#방콕시암호텔,#방콕켐핀스키,#방콕시암켐핀스키,#방콕숙소,#시암캠핀스키,#방콕램브란트호텔,#방콕가성비호텔,#싸얌켐핀스키,#싸얌캠핀스키', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/jejuna17/223071712462', POPULARITY: 77 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230413, TITLE: '태국 유심 Esim 방콕여행 인터넷 사용후기', CONTENT: '\n#4월방콕여행 #방콕여행     \n\n\n어째 더운 나라 가서 가벼운 쌀면 잔뜩 먹고왔는데\n여행 마치고 오니 몸무게 늘어있는거 실화인가요..\nㅋㅋㅋㅋ 진짜 맛있는게 너무 많은 태국여행 ㅠㅠ\n방콕 한번 더 가서 또 팟타이랑 국수,\n무삥 잔뜩 먹고 오고싶어요! 물가도 착해서\n여행하기 너무 좋은 도시..      \n\n     \n\n방콕여행 준비 필수 아이템!     \n\n\n한국', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/lsb0701/223073160775', POPULARITY: 77 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230408, TITLE: '방콕여행 짜오프라야강에서 수상버스, 16바트로 시간보내기', CONTENT: '      \n\n #방콕여행,#짜오프라야강수상버스,#오렌지플래그', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/bomsworld_/223068187510', POPULARITY: 74 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230412, TITLE: '방콕여행 드디어 팟타이, 방콕 수제맥주 전문점 Yolo Craft Beer Bar', CONTENT: '      \n\n #방콕여행,#방콕수제맥주,#YoloCraftBeerBar', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/bomsworld_/223071853845', POPULARITY: 74 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230408, TITLE: '태국 방콕 아이콘시암 쇼핑몰 맛집 TORO FRIES + 카페', CONTENT: '\n #아이콘시암,#방콕여행,#태국방콕여행,#아이콘시암카페,#아이콘시암맛집,#아이콘시암토로프라이,#태국여행,#방콕아이콘시암맛집,#방콕먹거리', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/hogr1203/222986807828', POPULARITY: 73 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230410, TITLE: '태국 방콕 여행 10. 태국 여행 3일차 일정 공유', CONTENT: ' - #아이콘시암,#방콕여행,#방콕가볼만한곳추천,#딸랏너이,#방콕가볼만한곳,#투어리스트카드,#태국,#방콕딸랏너이,#방콕여행일정,#방콕여행일정추천,#태국여행,#방콕', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/soulmater_/223070139795', POPULARITY: 73 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230414, TITLE: '방콕 추천 카페 홍씨엥콩', CONTENT: '\n #아이콘시암,#방콕여행,#홍씨엥콕카페,#방콕홍씨엥콩카페,#방콕강변뷰카페,#방콕해외여행,#방콕강변카페,#방콕,#방콕카페,#방콕추천카페', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/seeall2004/223074473169', POPULARITY: 67 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230413, TITLE: '태국 방콕 여행 바트 환율 좋은 환전소 아속역 슈퍼리치 이중환전 No', CONTENT: '\n\n #바트환전,#방콕여행,#방콕환율좋은환전소,#방콕환전소,#방콕이중환전,#아속역,#아속역슈퍼리치,#태국여행,#태국이중환전', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/ielf/223073531095', POPULARITY: 66 },
                            {
                                SG_SEQ: 'c_94',
                                REG_DATE: 20230414,
                                TITLE: '방콕여행-센트럴월드/ 로즈우드호텔 바/툭툭/방콕호텔바/방콕맛집',
                                CONTENT: '      \n\n #방콕여행,#방콕현지인추천맛집,#방콕레스토랑추천,#방콕센트럴월드,#방콕맛집,#방콕스트릿푸드,#방콕현지인추천,#태국날씨,#방콕바추천,#방콕하얏트호텔,#방콕밤거리,#방콕로즈우드호텔,#방콕위치좋은호텔,#방콕여행추천,#방콕핫플,#방콕핫플추천,#방콕야경좋은바,#방콕브랜드,#방콕야경,#방콕맛집추천,#방콕한국음식,#타이항공,#태국여행,#태국호텔,#방콕날씨,#방콕먹거리',
                                S_SEQ: 3554,
                                SITE_NAME: '네이버블로그',
                                URL: 'https://blog.naver.com/sugarstation/223074612512',
                                POPULARITY: 66,
                            },
                            { SG_SEQ: 'c_94', REG_DATE: 20230410, TITLE: '방콕 아이랑 여행 게이트웨이 에까마이 하버랜드 키즈카페 6시 이후 50% 할인으로 즐겨요', CONTENT: '돈내산 솔직후기* #방콕여행,#할인,#방콕키즈카페,#방콕하버랜드,#하버랜드,#에까마이하버랜드,#태국여행,#6시이후,#게이트웨이에까마이', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/cheerup84/223070310122', POPULARITY: 65 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230411, TITLE: '태국일기3 :: 늦잠자고 아속역 터미널21 백화점에서 먹방찍기', CONTENT: '속역,#터미널21,#방콕여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/kimsoi2570/223071678447', POPULARITY: 64 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230414, TITLE: '아속 터미널21 라멘맛집 하찌방라멘 8라멘', CONTENT: '멘,#방콕일본라멘,#방콕여행,#8라멘,#터미널21맛집,#아속터미널21,#아속하찌방,#방콕맛집,#아속라멘,#아속해장음식', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/bybybychance/223074047846', POPULARITY: 64 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230409, TITLE: '방콕 아속역 터미설21 딤섬식당 팀호완', CONTENT: '#방콕여행 #아속역맛집 #터미널21 #방콕맛집 #터미널21맛집 #딤섬맛집 #아이와방콕여행     \n\n\n안녕하세요~!!\n라라입니다.\n\n제가 이번 방콕 여행때 숙소가 아속역 근처라 터미널21의 식당을 자주 이용했었는데 그중 만족스러웠던 팀호완(Timhowan) 소개해드릴께요.\n     \n\n\n팀호완은 터미널21 3층에 위치해있습니다.\n방콕엔 대형쇼핑', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/jjoo8402/223069501781', POPULARITY: 63 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230410, TITLE: '태국 방콕 여행기, 두 번째 log', CONTENT: '최고인 것 같다! #방콕여행,#방콕가볼만한곳,#방콕갈만한곳,#여행,#태국,#해외여행,#왓마하탓,#아시아티크,#방콕여행지,#왕랑마켓,#태국갈만한곳,#왓아룬,#방콕,#태국여행,#태국가볼만한곳,#태국여행지,#동남아여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/trav3lwith_y00/223060027892', POPULARITY: 62 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230410, TITLE: '방콕 시암 중심 위치 좋은 가성비호텔, 이비스 방콕 시암', CONTENT: '!! #방콕이비스,#방콕여행,#이비스시암,#방콕호텔,#mbk,#이비스방콕시암,#방콕시암', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/sangeunpower/223070092937', POPULARITY: 62 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230414, TITLE: '태국 방콕 여행기, 세 번째 log', CONTENT: '길 수 있다.\n #방콕여행,#태국방콕여행,#무앙보란,#방콕가볼만한곳,#랏차다야시장,#해외여행,#태국추천,#방콕무앙보란,#태국방콕,#방콕야시장,#방콕추천,#태국여행,#태국가볼만한곳,#동남아여행', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/trav3lwith_y00/223062400609', POPULARITY: 62 },
                            { SG_SEQ: 'c_94', REG_DATE: 20230408, TITLE: '방콕 터미널 21 구경하고 맛집 해브 어 지드 푸팟퐁커리 먹고왔어요', CONTENT: '\n\n끝\n\n #방콕여행,#아속역태국음식,#아속맛집,#방콕해브어지드,#방콕맛집,#해브어지드,#방콕터미널21,#터미널21해브어지드,#터미널21맛집,#아속역맛집,#터미널21쇼핑,#터미널21,#방콕,#수쿰빗맛집,#스쿰빗맛집', S_SEQ: 3554, SITE_NAME: '네이버블로그', URL: 'https://blog.naver.com/spark6615/223068809739', POPULARITY: 59 },
                            {
                                SG_SEQ: 'c_94',
                                REG_DATE: 20230413,
                                TITLE: '포시즌스 방콕에서 아이콘시암 가기(무료셔틀보트)',
                                CONTENT: '#태국여행 #방콕여행 #포시즌스호텔\n#아이콘시암 #대형쇼핑몰 #무료셔틀보트\n\n방콕에서의 첫아침  \n포시즌에서 조식을 맛나게 먹고 \n방콕의 대형쇼핑몰, 아이콘시암으로 향합니다\n포시즌스 호텔과 아이콘시암은\n차오프라야 강을 사이에 두고 마주보는 형상이라\n무료 셔틀보트를 타고 강을 건너갑니다  ⛵️      \n\n포시즌스 호텔에서 바로 선착장이 있어\n슬슬 걸어가면 되욤   ',
                                S_SEQ: 3554,
                                SITE_NAME: '네이버블로그',
                                URL: 'https://blog.naver.com/moonbswife/223073091470',
                                POPULARITY: 59,
                            },
                            {
                                CAFE_URL: 'https://cafe.naver.com/ca-fe/home/search/articles?q=%EB%B9%99%EC%BD%95+%EC%87%BC%ED%95%91%EB%AA%B0%EC%97%90%EC%84%9C+%ED%83%80%EC%9D%B4%ED%8B%B0%EB%A5%BC+%EC%A6%90%EA%B8%B0%EC%9E%90%7E+%EC%B9%B4%EB%A3%AC+%ED%83%80%EC%9D%B4%ED%8B%B0+%EC%B9%B4%ED%8E%98+KARUN+THAI+TEA+BANGKOK',
                                SG_SEQ: 'c_95',
                                REG_DATE: 20230410,
                                TITLE: '빙콕 쇼핑몰에서 타이티를 즐기자~ 카룬 타이티 카페 KARUN THAI TEA BANGKOK',
                                CONTENT: ' 외 #카룬타이티,#방콕여행,#태여사,#태국자유여행,#karunthaitea,#karunthaiteabangkok,#태국여행,#방콕자유여행,#카룬타이티방콕',
                                S_SEQ: 3555,
                                SITE_NAME: '네이버카페',
                                URL: 'https://cafe.naver.com/travellovegroup/48366',
                                POPULARITY: 59,
                            },
                        ],
                    };
                    if (res.data) {
                        this.brdDatas = res.data;
                        this.useBrdDatas = this.getBrdDatas;
                        this.$emit('excelParams', this.apiParams);
                    }

                    this.loading = false;
                })
                .catch((err) => {
                    console.log('*********************************************************');
                    console.log(err);
                });

            // 게시판 상단 이동
            if (this.$refs.brd_body) this.$refs.brd_body.scrollTop = 0;
        },

        evt_search() {
            this.useInputKeyword = this.inputKeyword;
            this.searching();
        },
    },
};
</script>

<style></style>
