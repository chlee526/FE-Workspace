<template>
    <div id="content">
        <div class="wrap">
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>공지사항</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd">
                                            <div class="infos">
                                                <div class="lc">
                                                    <div class="page_info">
                                                        <span
                                                            >총 <strong>{{ brdDatas.total_cnt }}</strong
                                                            >건</span
                                                        >
                                                        <hr />
                                                        <span
                                                            ><strong>{{ brdOpts.page_num }}</strong> / <span>{{ Math.ceil(brdDatas.total_cnt / brdOpts.row_limit) || 1 }}</span> Pages</span
                                                        >
                                                    </div>
                                                </div>
                                                <div class="rc">
                                                    <comp-selectbox id="brd_view_len1" class="is-small" :opts="$store.getters.getBrdViewLen" v-model="brdOpts.row_limit"></comp-selectbox>
                                                    <hr />
                                                    <comp-input-box type="search" id="brd_searchInput1" class="is-small" v-model="search_keyword" style="width: 250px" placeholder="검색어를 입력하세요." label="입력창"></comp-input-box>
                                                </div>
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col />
                                                        <col style="width: 150px" />
                                                        <col style="width: 150px" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th><strong>번호</strong></th>
                                                            <th><strong>제목</strong></th>
                                                            <th><strong>작성자</strong></th>
                                                            <th><strong>등록일</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="idx in Math.floor((brdOpts.row_limit - 1) / 2)" :key="'no_data_before_' + idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt" class="no_over no_data in_list">
                                                                <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="idx in Math.ceil((brdOpts.row_limit - 1) / 2)" :key="'no_data_after_' + idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="(item, idx) in brdDatas.list" :key="'brd_' + idx">
                                                            <!-- 번호 -->
                                                            <td>
                                                                <span>{{ getNo(idx) }}</span>
                                                            </td>
                                                            <!-- 제목 -->
                                                            <td class="ui_al">
                                                                <router-link :to="`/view/notice/${item.seq}`">
                                                                    <strong>{{ item.title }}</strong>
                                                                </router-link>
                                                            </td>
                                                            <!-- 작성자 -->
                                                            <td>
                                                                <span>{{ item.author }}</span>
                                                            </td>
                                                            <!-- 등록일 -->
                                                            <td>
                                                                <span>{{ item.reg_date }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts.row_limit - brdDatas.list.length > 0 ? brdOpts.row_limit - brdDatas.list.length : 0" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
                                            </div>
                                            <div class="footer">
                                                <comp-paginate :datas="brdOpts" :total-len="brdDatas.total_cnt" v-model="brdOpts.page_num"></comp-paginate>
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
</template>

<script>
import { uuid } from 'vue-uuid';
export default {
    name: 'noticePage',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            brdOpts: {
                colCnt: 4, // 게시판 Col
                row_limit: 10, // 게시판 Row
                brdSort: 'brd_sort_01_origin_up', // 게시판 정렬 : name + id + ( up or dn )
                page_num: 1, // 현재 페이지 번호
                pagingColCnt: 10, // 페이징 갯수
            },
            brdDatas: {
                total_cnt: 0,
                list: [],
            },

            search_keyword: '',
        };
    },
    computed: {
        getUseNotice() {
            return process.env.VUE_APP_NOTICE === 'true';
        },
    },

    watch: {
        $route(to, from) {
            if (!this.getUseNotice) this.$router.push({ path: '/err/404' }).catch((err) => {});
        },
    },

    created() {
        if (!this.getUseNotice) this.$router.push({ path: '/err/404' }).catch((err) => {});
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            let sampleData = [
                {
                    seq: '01',
                    title: '공지사항 게시판 안내',
                    content:
                        ' <p>공지사항 안내사항 입니다</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p>',
                    reg_date: '2023-07-03',
                    author: 'rsn',
                },
                {
                    seq: '02',
                    title: '공지사항 게시판 안내2',
                    content:
                        ' <p>공지사항 안내사항 입니다</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p>',
                    reg_date: '2023-07-03',
                    author: 'rsn',
                },
                {
                    seq: '03',
                    title: '공지사항 게시판 안내3',
                    content:
                        ' <p>공지사항 안내사항 입니다</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p>',
                    reg_date: '2023-07-03',
                    author: 'rsn',
                },
            ];
            this.brdDatas = {
                total_cnt: sampleData.length,
                list: sampleData,
            };
        },

        getNo(index) {
            let no = this.brdDatas.total_cnt - index - (this.brdOpts.page_num - 1) * this.brdOpts.row_limit;
            return no > 0 ? no : '';
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
