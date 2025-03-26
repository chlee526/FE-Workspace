<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_rel_info" :style="'height:' + hgt + 'px'">
            <span class="bg" @click="close" :style="'height:' + hgt + 'px'"></span>
            <div class="header">
                <div class="wrap">
                    <h2>
                        <!-- 타이틀 -->
                        <strong>
                            <template v-if="searchParams.title && searchParams.title.length">
                                <span v-for="($item, $idx) in searchParams.title" :key="$idx" :title="$item.name" style="max-width: 600px">{{ $item.name }}</span>
                            </template>
                            <template v-else>유사수량</template>
                        </strong>

                        <!-- 서브 타이틀(추가정보) -->
                        <div class="sub_title">
                            <!-- 날짜 -->
                            <template v-if="searchParams">
                                <span class="ui_bedge" :title="searchParams.s_date.date + '~' + searchParams.e_date.date"
                                    ><strong>{{ searchParams.s_date.date }} ~ {{ searchParams.e_date.date }}</strong></span
                                >
                            </template>
                        </div>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
            </div>
            <div class="wrap">
                <div class="content">
                    <div class="ui_box is-2dp">
                        <div class="header">
                            <div class="wrap">
                                <h3>
                                    <span>회사 분석</span>
                                </h3>
                                <div class="rc_wrap">
                                    <a href="#" class="ui_btn is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="content ui-loader-container" :class="{ 'is-loading': loading }" :style="'max-height:' + (hgt - contentHgt) + 'px'">
                            <div class="ui_brd is-sticky is-body-twoline-mode">
                                <div class="infos">
                                    <div class="lc">
                                        <comp-input-box :id="popName + '_ searchInput'" class="is-small" v-model="inputKeyword" @keyup="evt_searchClick" style="width: 300px" placeholder="검색어를 입력하세요." label="입력창"></comp-input-box>
                                        <button class="ui_btn is-icon-only is-small" title="검색" @click="evt_searchClick"><span class="icon">&#xe007;</span></button>
                                    </div>
                                    <div class="rc">
                                        <div class="page_info">
                                            <span
                                                >총 <strong>{{ useBrdDatas.total_cnt.addComma() }}</strong> 건</span
                                            >
                                            <hr />
                                            <span
                                                ><strong>{{ brdOpts.page_num.addComma() }}</strong> / <strong>{{ (Math.ceil(useBrdDatas.total_cnt / brdOpts.row_limit) || 1).addComma() }}</strong> Pages</span
                                            >
                                        </div>
                                        <comp-selectbox id="brd_view_len" class="is-small" :opts="getBrdViewOpts" v-model="brdOpts.row_limit"></comp-selectbox>
                                    </div>
                                </div>
                                <div ref="brd_body" class="wrap" style="height: 517px">
                                    <table>
                                        <colgroup>
                                            <col style="width: 150px" />
                                            <col />
                                            <col style="width: 100px" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th><strong>수집원</strong></th>
                                                <th><strong>원문</strong></th>
                                                <th><strong>수집일</strong></th>
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
                                                    <span>{{ $item.MD_SITE_NAME }}</span>
                                                </th>
                                                <td class="ui_al">
                                                    <comp-bubble-box class="is-board" :subject="$item.ID_TITLE" :content="$item.ID_CONTENT" style="max-width: 1000px">
                                                        <a :href="$item.ID_URL.buzmsLink()" target="_blank" class="is-title-txts" :html-type="true">
                                                            <strong v-html="$item.ID_TITLE"></strong>
                                                            <span v-if="$item.ID_CONTENT.trim() != ''" class="txt ui_fc_dm" v-html="$item.ID_CONTENT"></span>
                                                        </a>
                                                    </comp-bubble-box>
                                                </td>
                                                <td class="ui_fc_dm">
                                                    <span>{{ $item.MD_DATE.dateToStr() }}</span>
                                                </td>
                                            </tr>
                                            <tr v-for="$idx in brdOpts.row_limit - useBrdDatas.list.length > 0 ? brdOpts.row_limit - useBrdDatas.list.length : 0" :key="$idx" class="is-no-over">
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
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
import { API_datalist } from '@shared/api/datalist.js';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
export default {
    name: 'tmpl-modal-similar',

    data: function () {
        return {
            loading: false,
            apiUID: uuid.v4(),
            contentHgt: 170,
            inputKeyword: '',
            useInputKeyword: '',
            brdOpts: {
                colCnt: 3, // 게시판 Col
                row_limit: 30, // 게시판 Row
                page_num: 1, // 현재 페이지 번호
                pagingColCnt: 10, // 페이징 갯수
                text_limit: {
                    // 데이터 텍스트 제한
                    title: '10,30',
                    content: '10,500',
                },
            },
            brdDatas: {
                total_cnt: 0,
                list: [
                    // {
                    //     MD_SITE_NAME: '출처 1',
                    //     ID_TITLE: '제목입니다',
                    //     ID_CONTENT: '내용입니다. <strong class="is-anal">내용입니다.</strong> 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
                    //     ID_URL: 'http://realsn.com',
                    //     ID_SENTI: 0,
                    //     MD_DATE: '2018-01-01',
                    // },
                ],
            },
            useBrdDatas: {
                total_cnt: 0,
                list: [],
            },
        };
    },
    props: {
        popName: { type: String },
        searchParams: { type: Object },
        hgt: { type: Number },
        useAttrs: { default: false },
    },
    computed: {
        ...mapGetters(['getBrdViewLen']),
        getBrdViewOpts() {
            var result = this.getBrdViewLen.exptAttr({ code: '5' });
            return result;
        },
        getDefaultSubTitle() {
            return this.searchParams.subTitle.filter(function ($item) {
                return $item.type != 'rkeyword';
            });
        },
        getBrdDatas() {
            let _this = this;
            let result = JSON.parse(JSON.stringify(this.brdDatas));
            result.list.forEach((item) => {
                // 수집키워드 매칭
                if (item.c_keyword) {
                    item.c_keyword.forEach((keyword) => {
                        item.ID_TITLE = String(item.ID_TITLE).replaceAll(keyword, '<span class="is-hl-colKeyword">' + keyword + '</span>');
                        item.ID_CONTENT = String(item.ID_CONTENT).replaceAll(keyword, '<span class="is-hl-colKeyword">' + keyword + '</span>');
                    });
                }
                // 검색어 매칭
                if (this.useInputKeyword.trim().length) {
                    const inputKeyword = this.useInputKeyword.trim().strEscape();
                    item.ID_TITLE = String(item.ID_TITLE).replaceAll(inputKeyword, '<span class="is-hl-inputkeyword">' + this.useInputKeyword.trim() + '</span>');
                    item.ID_CONTENT = String(item.ID_CONTENT).replaceAll(inputKeyword, '<span class="is-hl-inputkeyword">' + this.useInputKeyword.trim() + '</span>');
                }
            });
            return result;
        },
        getSearchCondition() {
            let result = JSON.parse(JSON.stringify(this.searchParams));

            // 입력 키워드
            if (this.inputKeyword.length) {
                if (!result.search_keyword) result.search_keyword = [];
                result.search_keyword.push({
                    type: 'A',
                    keyword: this.useInputKeyword,
                });
            }

            // 모문서 시퀀스
            result.md_pseq = this.searchParams.title[0].code;

            // 페이지당 로우수
            result.row_limit = this.brdOpts.row_limit;

            // 페이지 번호
            result.page_num = this.brdOpts.page_num;

            // 로우데이터 텍스트 조건
            result.text_limit = this.brdOpts.text_limit;

            return JSON.parse(JSON.stringify(result));
        },
    },
    mounted: function () {
        this.fetchData();
    },
    watch: {
        searchParams: {
            deep: true,
            handler($val) {
                if (this.brdOpts.page_num == 1) this.fetchData();
                else this.brdOpts.page_num = 1;
                this.fetchData();
            },
        },
        // Row 갯수
        'brdOpts.row_limit'($val) {
            if (this.brdOpts.page_num == 1) this.fetchData();
            else this.brdOpts.page_num = 1;
        },
        // 현재 페이지
        'brdOpts.page_num'($val) {
            this.fetchData();
        },
    },
    methods: {
        async fetchData() {
            this.loading = true;

            await API_datalist(this.apiUID, this.getSearchCondition)
                .then((res) => {
                    this.brdDatas = res.data;
                    this.useBrdDatas = this.getBrdDatas;
                })
                .catch((err) => {
                    console.log('*********************************************************');
                    console.log(err);
                });

            this.loading = false;

            // 게시판 상단 이동
            if (this.$refs.brd_body) this.$refs.brd_body.scrollTop = 0;
        },
        evt_searchClick() {
            this.useInputKeyword = this.inputKeyword;
            if (this.brdOpts.page_num == 1) this.fetchData();
            else this.brdOpts.page_num = 1;
        },
        close: function () {
            EventBus.$emit('MODAL_CLOSE', this.popName);
        },
    },
};
</script>

<style lang="scss" scoped></style>
