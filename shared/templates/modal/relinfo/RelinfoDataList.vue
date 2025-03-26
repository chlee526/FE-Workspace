<template>
    <div class="ui_box is-3dp">
        <div class="header">
            <div class="wrap">
                <h3>
                    <span>데이터 목록</span>
                </h3>
                <div class="rc_wrap">
                    <button type="button" title="Excel 다운로드" class="ui_btn is-icon-only is-small" @click="evt_excel"><span class="icon">&#xe005;</span></button>
                </div>
            </div>
        </div>
        <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
            <div class="ui_brd is-sticky is-body-twoline-mode">
                <div class="infos">
                    <div class="lc">
                        <div class="page_info">
                            <span
                                >총 <strong>{{ String(useBrdDatas.total_cnt).addComma() }}</strong> 건</span
                            >
                        </div>
                    </div>
                    <div class="rc">
                        <comp-selectbox :id="popName + '_datalist_viewlen'" class="is-small" :opts="getBrdViewOpts" v-model="brdOpts.row_limit"></comp-selectbox>
                        <hr />
                        <comp-input-box type="search" :id="popName + '_ searchInput'" class="is-small" v-model="tmpSearchKeyword" :minlength="2" @keyup="evt_subTitleClick('input', tmpSearchKeyword)" @search="evt_subTitleClick('input', tmpSearchKeyword)" style="width: 250px" placeholder="검색어를 입력하세요." label="입력창"></comp-input-box>
                    </div>
                </div>
                <div ref="brd_body" class="wrap" style="height: 536px">
                    <table>
                        <colgroup>
                            <col style="width: 150px" />
                            <col />
                            <col style="width: 100px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><strong>출처</strong></th>
                                <th><strong>제목</strong></th>
                                <th><strong>수집일</strong></th>
                            </tr>
                        </thead>
                        <!-- 데이터 없는 경우 -->
                        <tbody v-if="useBrdDatas.list.length == 0">
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt" class="no_over no_data in_list"><span class="ui_no_data_txt">데이터가 없습니다.</span></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                            <tr class="is-no-over">
                                <td :colspan="brdOpts.colCnt"></td>
                            </tr>
                        </tbody>
                        <!-- // 데이터 없는 경우 -->

                        <!-- 데이터 있는 경우 -->
                        <tbody v-else>
                            <tr v-for="($item, idx) in useBrdDatas.list" :key="idx">
                                <th>
                                    <span>{{ $item.SITE_NAME }}</span>
                                </th>
                                <td class="ui_al" :class="{ 'has-cafe': $item.CAFE_URL }">
                                    <span v-if="$item.CAFE_URL" class="is-cafe">
                                        <comp-button :href="$item.CAFE_URL.buzmsLink()" target="_blank" class="ui_btn is-icon-only is-xsmall" title="카페 검색하기"><span class="icon">&#xe055;</span></comp-button>
                                    </span>
                                    <comp-bubble-box class="is-board" :subject="$item.TITLE" :content="$item.CONTENT" style="max-width: 600px">
                                        <a :href="$item.URL.buzmsLink()" target="_blank" class="is-title-txts" :html-type="true">
                                            <strong v-html="$item.TITLE"></strong>
                                            <span v-if="$item.CONTENT.trim() != ''" class="txt ui_fc_dm" v-html="$item.CONTENT"></span>
                                        </a>
                                    </comp-bubble-box>
                                </td>
                                <td>
                                    <span>{{ new Date($item.REG_DATE).dateToStr() }}</span>
                                </td>
                            </tr>
                            <tr v-for="$idx in brdOpts.row_limit - useBrdDatas.list.length > 0 ? brdOpts.row_limit - useBrdDatas.list.length : 0" class="is-no-over" :key="'brd' + $idx">
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
import { API_datalist } from '@shared/api/datalist.js';
import EventBus from '@shared/utils/eventBus';
import { dataListHighlight } from '@shared/utils/prototype/util.object';

export default {
    name: 'tmpl-modal-relinfo-datalist',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null,
            loading: false,
            isFirst: true,
            brdOpts: {
                colCnt: 3, // 게시판 Col
                row_limit: 30, // 게시판 Row
                page_num: 1, // 현재 페이지 번호
                pagingColCnt: 10, // 페이징 갯수
            },
            brdDatas: {
                total_cnt: 0,
                list: [
                    // {
                    // URL: 'url',
                    // SG_SEQ: '사이트그룹(DN,BL....)',
                    // S_SEQ: '사이트번호',
                    // SITE_NAME: '사이트이름'
                    // TITLE: '제목',
                    // CONTENT :'내용',
                    // REG_DATE: '수집일',
                    // POPULARITY: '인기도'
                    // },
                ],
            },
            useBrdDatas: {
                total_cnt: 0,
                list: [],
            },
            tmpSearchKeyword: '',
        };
    },
    props: {
        popName: { type: String, default: '' },
        searchParams: { type: Object },
    },
    computed: {
        // 게시판 보기 갯수 옵션 설정
        getBrdViewOpts() {
            return this.$store.getters.getBrdViewLen.exptAttr({ code: '5' });
        },
        // 데이터 리스트
        getBrdDatas() {
            const result = JSON.parse(JSON.stringify(this.brdDatas));
            result.list = dataListHighlight(this.searchParams, this.parseDatas(result.list));
            console.log(this.brdDatas);
            return result;
        },
    },
    mounted() {
        this.fetchData();
    },
    watch: {
        searchParams: {
            deep: true,
            handler() {
                if (this.brdOpts.page_num == 1) {
                    if (!this.isFirst) this.fetchData();
                } else this.brdOpts.page_num = 1;
            },
        },
        // Row 갯수
        'brdOpts.row_limit'() {
            if (this.brdOpts.page_num == 1) {
                if (!this.isFirst) this.fetchData();
            } else this.brdOpts.page_num = 1;
        },
        // 현재 페이지
        'brdOpts.page_num'() {
            if (!this.isFirst) this.fetchData();
        },
    },
    methods: {
        async fetchData() {
            this.loading = true;

            this.apiParams = JSON.parse(JSON.stringify(this.searchParams));
            this.apiParams.row_limit = this.brdOpts.row_limit;
            this.apiParams.page_num = this.brdOpts.page_num;
            this.apiParams.text_limit = {
                title: '10,100',
                content: '10,200',
            };
            // 추가 검색조건에서 선택한 날짜 범위가 있을 경우 s_date/e_date 업데이트
            if (this.apiParams.additionalCondition.selectDate) {
                const sDate = Array.isArray(this.apiParams.additionalCondition.selectDate) ? this.apiParams.additionalCondition.selectDate[0] : this.apiParams.additionalCondition.selectDate;
                const eDate = Array.isArray(this.apiParams.additionalCondition.selectDate) ? this.apiParams.additionalCondition.selectDate[1] : this.apiParams.additionalCondition.selectDate;
                this.apiParams.s_date.date = sDate;
                this.apiParams.e_date.date = eDate;
            }

            delete this.apiParams.ps_date;
            delete this.apiParams.pe_date;

            // 정렬 삭제
            if (this.apiParams.order_type) delete this.apiParams.order_type;

            await API_datalist(this.apiUID, this.apiParams)
                .then(($res) => {
                    // /**
                    //  * 임시데이터
                    //  */
                    // let list = [];
                    // for (let index = 0; index < _this.apiParams.row_limit; index++) {
                    //     list.push({
                    //         CONTENT: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
                    //         ID_MAILYN: 'N',
                    //         ID_REGDATE: '2022-11-01 07:45:26.0',
                    //         ID_REPLYCOUNT: '0',
                    //         ID_REPORTYN: 'Y',
                    //         ID_SENTI: 's_3',
                    //         ID_SEQ: '57492',
                    //         TITLE: '제목',
                    //         ID_URL: 'https://blog.naver.com/alrhfpd2/222904793810',
                    //         ID_USEYN: 'Y',
                    //         ID_WRITTER: '김주연',
                    //         IT_SEQ: '0',
                    //         I_SEQ: '0',
                    //         KEYWORD_LIST: '슈퍼콘',
                    //         L_ALPHA: 'KOR',
                    //         REG_DATE: '2022-10-31 20:24:11.0',
                    //         MD_PSEQ: '975448',
                    //         MD_SAME_CT: '0',
                    //         MD_SEQ: '975448',
                    //         MD_SITE_MENU: 'ㅇㅇ',
                    //         SITE_NAME: '출처',
                    //         MD_TYPE: '2',
                    //         MD_WRITER: 'ㅇㅇ',
                    //         M_SEQ: '15',
                    //         REG_TYPE: 'SIM',
                    //         SG_SEQ: 'c_94',
                    //         S_SEQ: '3554',
                    //         c_keyword: ['슈퍼콘'],
                    //     });
                    // }
                    // $res = {
                    //     data: {
                    //         total_cnt: 9484,
                    //         page_num: '1',
                    //     },
                    // };
                    // $res.data.list = list;
                    // // 여기까지 임시데이터

                    this.brdDatas = $res.data;
                    if (this.brdDatas.list) this.useBrdDatas = this.getBrdDatas;
                })
                .catch(($err) => {
                    console.log('*********************************************************');
                    console.log($err);
                });

            this.isFirst = false;
            this.loading = false;

            // 게시판 상단 이동
            if (this.$refs.brd_body) this.$refs.brd_body.scrollTop = 0;
        },

        // 데이터 리스트 아이템 파싱
        parseDatas(datas) {
            // API key값 변경에 따라 parse
            return datas.map((item) => {
                item.CONTENT = item.ID_CONTENT || item.CONTENT;
                item.TITLE = item.ID_TITLE || item.TITLE;
                item.URL = item.ID_URL || item.URL;
                item.SITE_NAME = item.MD_SITE_NAME || item.SITE_NAME;
                item.REG_DATE = item.MD_DATE || item.REG_DATE;
                return item;
            });
        },

        /**
         * 차트 클릭 이벤트 - subTitleSelect 에밋 전달
         * @param {String} type 서브타이틀(추가검색조건) 타입명
         * @param {*} val 서브타이틀(추가검색조건) 데이터
         */
        evt_subTitleClick(type, val) {
            this.$emit('subTitleSelect', { type, val });
        },

        // 엑셀 다운
        evt_excel() {
            let excelParams = JSON.parse(JSON.stringify(this.apiParams));
            excelParams.excel = true;
            excelParams.excel_id = 'relinfo_03';

            if (excelParams.advs) {
                let key = Object.keys(excelParams.advs)[0];
                excelParams.anal = excelParams.advs[key].name;
            } else if (excelParams.rk_seq) {
                excelParams.anal = excelParams.rk_seq[0].name;
            }

            API_datalist(this.apiUID, excelParams)
                .then((res) => {
                    EventBus.$emit('EXCEL_DOWN', res);
                })
                .catch((err) => {
                    console.log('*********************************************************');
                    console.log(err);
                });
        },
    },
};
</script>
