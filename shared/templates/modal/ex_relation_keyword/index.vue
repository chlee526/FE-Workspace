<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_except_info" :style="'height:' + hgt + 'px'">
            <span class="bg" @click="close" :style="'height:' + hgt + 'px'"></span>
            <div class="header">
                <div class="wrap">
                    <h2>
                        <!-- 타이틀 -->
                        <strong>{{ searchParams.name }} 제외어 설정</strong>
                        <!-- 서브 타이틀(추가정보) -->
                        <div class="sub_title"></div>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
            </div>
            <div class="wrap">
                {{ popName }}
                {{ searchParams }}
                <div class="content" :style="'max-height:' + (hgt - contentHgt) + 'px'">
                    <div class="ui_row is-2dp">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box is-2dp" :class="{ 'is-loading': loading }">
                                    <div class="ui_function" style="justify-content: space-between; gap: 4px">
                                        <comp-input-box v-model="inputKeyword" label="검색어" style="flex: 1 0 80%" @keyup="exceptClick"></comp-input-box>
                                        <comp-button class="is-color-black" @click="exceptClick" style="flex: 0 0 50px" :disabled="inputBoxSelected"><span>추가</span></comp-button>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed">
                                            <div class="infos">
                                                <div class="lc">
                                                    <div class="page_info">
                                                        <span
                                                            >총 <strong>{{ useBrdDatas.total_cnt | addComma }}</strong> 건</span
                                                        >
                                                    </div>
                                                </div>
                                                <div class="rc">
                                                    <comp-button class="is-small" @click="exceptDelClick" :disabled="!checkBoxSelected"><span>선택삭제</span></comp-button>
                                                    <hr />
                                                    <comp-input-box type="search" class="is-small" v-model="deleteKeyword" placeholder="제외어 검색" label="검색어" @keyup="evt_search" @search="evt_search" style="width: 300px"></comp-input-box>
                                                </div>
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 10%" />
                                                        <col />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <strong><comp-checkbox class="is-small" :val="false" :id="'allCheck'" v-model="allCheck" @change="allBtn"></comp-checkbox> </strong>
                                                            </th>
                                                            <th>
                                                                <strong>{{ searchParams.name }} 제외어 설정</strong>
                                                                &nbsp;
                                                                <comp-bubble-box class="is-helper" :html-type="true" pos="CB">
                                                                    <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                                                    <div v-if="searchParams.name == '키워드'" slot="html-content" v-html="$store.getters.getHelperContent.exptKeyword.keyword"></div>
                                                                    <div v-else slot="html-content" v-html="$store.getters.getHelperContent.exptKeyword.hashtag"></div>
                                                                </comp-bubble-box>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없을때 -->
                                                    <tbody v-if="useBrdDatas2.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts.row_limit - 1) / 2)" class="is-no-over" :key="'tr_up_' + $idx">
                                                            <td :colspan="2"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="2" class="no_over no_data in_list">
                                                                <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts.row_limit - 1) / 2)" class="is-no-over" :key="'tr_dn_' + $idx">
                                                            <td :colspan="2"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- 데이터 있을때 -->
                                                    <tbody v-else>
                                                        <tr v-for="($item, $idx) in useBrdDatas2.list" :key="'tr_' + $idx">
                                                            <td><comp-checkbox class="is-small" :id="'chk_01_' + $item.seq" :val="$item.seq" v-model="checkboxDatas"></comp-checkbox></td>
                                                            <td>
                                                                <span>{{ item.name }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts.row_limit - useBrdDatas2.list.length > 0 ? brdOpts.row_limit - useBrdDatas2.list.length : 0" class="is-no-over" :key="'tr_dn' + $idx">
                                                            <td :colspan="2"></td>
                                                        </tr>
                                                    </tbody>
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
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import EventBus from '@shared/utils/eventBus';
import { API_ExRelationKeywordList, API_saveExRelationKeyword, API_delExRelationKeyword } from '@shared/api/template/modal/ex_relation_keyword/ex_relation_keyword';

export default {
    name: 'tmpl-modal-ex_relation_keyword',
    data() {
        return {
            loading: false,
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            contentHgt: 145,
            allCheck: false,
            apiParams: [],
            checkboxDatas: [],
            selectList: [],
            brdOpts: {
                colCnt: 8, // 게시판 Col
                row_limit: 10, // 게시판 Row
                page_num: 1, // 현재 페이지 번호
                pagingColCnt: 5, // 페이징 갯수
                brdSort: 'brd_sort_01_origin_up', // 게시판 정렬 : name + id + ( up or dn )
                tabIdx: 2, // Tab IDX
            },
            useBrdDatas: {
                total_cnt: 0,
                list: [],
            },
            //예비용
            useBrdDatas2: {
                total_cnt: 0,
                list: [],
            },
            inputKeyword: '',
            deleteKeyword: '',
            isChange: false, // 변경된 사항 있는지 체크(추가/삭제 이뤄지면 true)
        };
    },
    props: {
        popName: { type: String },
        searchParams: { type: Object },
        hgt: { type: Number },
        useAttrs: { default: false },
    },
    computed: {
        allSelected: {
            get: function () {
                return this.checkboxDatas.length === this.selectList.length;
            },
            //setter
            set: function (e) {
                this.selectList = e ? this.checkboxDatas : [];
            },
        },
        checkBoxSelected: {
            get: function () {
                return this.checkboxDatas.length > 0;
            },
            set: function () {
                return true;
            },
        },

        inputBoxSelected: {
            get: function () {
                return this.inputKeyword == '' || this.inputKeyword == undefined;
            },
            set: function () {
                return true;
            },
        },
    },
    mounted: function () {},
    watch: {
        'brdOpts.page_num'(val) {
            this.fetchList();
        },

        checkboxDatas(val) {
            if (val.length > 0 && val.length == this.useBrdDatas2.list.length) {
                this.allCheck = true;
            } else {
                this.allCheck = false;
            }
        },

        allCheck(val) {
            // console.log(this.checkboxDatas.length);
            // console.log(this.useBrdDatas2.list.length);
        },
    },
    created() {
        this.fetchList();
    },
    methods: {
        validation() {
            if (this.inputKeyword == '' || this.inputKeyword == undefined) {
                this.$store.dispatch('DIALOG_WRN', ['제외어를 입력해주세요']);
                return false;
            }
            return true;
        },
        allBtn() {
            if (this.allCheck) {
                let res = [];
                this.useBrdDatas2.list.forEach((val) => {
                    res.push(val.seq);
                });

                this.checkboxDatas = res;
            } else {
                this.checkboxDatas = [];
            }
        },
        async fetchList() {
            this.loading = true;
            this.checkboxDatas = [];
            this.apiParams.user_id = this.$store.getters.getUser.id;
            this.apiParams.sec_id = this.searchParams.sc_id;
            this.apiParams.expt_rk_seq = this.deleteKeyword;

            await API_ExRelationKeywordList(this.apiUID, this.apiParams)
                .then((res) => {
                    if (res.data.list == undefined) {
                        this.loading = false;
                    } else {
                        this.useBrdDatas = {
                            list: res.data.list,
                            total_cnt: res.data.list.length,
                        };

                        let tl = this.brdOpts.page_num * this.brdOpts.row_limit - this.brdOpts.row_limit;
                        let tl2 = this.brdOpts.page_num * this.brdOpts.row_limit;

                        this.useBrdDatas2.list = [];

                        for (let i = tl; i < tl2; i++) {
                            if (this.useBrdDatas.list[i]) {
                                this.useBrdDatas2.list.push(this.useBrdDatas.list[i]);
                            }
                        }

                        this.useBrdDatas2.total_cnt = this.useBrdDatas2.list.length;

                        this.loading = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // 게시판 상단 이동
            if (this.$refs.brd_body) this.$refs.brd_body.scrollTop = 0;
        },

        close: function () {
            if (this.isChange) EventBus.$emit('MODAL_CLOSE', this.popName, this.searchParams);
            else EventBus.$emit('MODAL_CLOSE', this.popName);
        },

        evt_search() {
            this.fetchList();

            // let resultList = this.useBrdDatas.list.filter((val) => {
            //     return val.name.includes(this.deleteKeyword);
            // });

            // console.log(resultList);

            // this.useBrdDatas.list = resultList;
            // this.useBrdDatas.total_cnt = this.useBrdDatas.list.length;

            // let tl = this.brdOpts.page_num * this.brdOpts.row_limit - this.brdOpts.row_limit;
            // let tl2 = this.brdOpts.page_num * this.brdOpts.row_limit;

            // this.useBrdDatas2.list = [];

            // for (let i = tl; i < tl2; i++) {
            //     if (this.useBrdDatas.list[i]) {
            //         this.useBrdDatas2.list.push(this.useBrdDatas.list[i]);
            //     }
            // }

            // this.useBrdDatas2.total_cnt = this.useBrdDatas2.list.length;
        },

        lastIdx() {
            let res = [];
            let max = 0;

            if (this.useBrdDatas.list.length < 1) {
                return max + 1;
            } else {
                this.useBrdDatas.list.forEach((val) => {
                    res.push(val.code);
                });

                max = Math.max.apply(null, res);

                return max + 1;
            }
        },

        async exceptClick() {
            const _this = this;

            if (this.validation()) {
                this.apiParams.user_id = this.$store.getters.getUser.id;
                this.apiParams.sec_id = this.searchParams.sc_id;
                this.apiParams.expt_rk_seq = this.inputKeyword;

                await API_saveExRelationKeyword(this.apiUID, this.apiParams)
                    .then((res) => {
                        if (res.data.result) {
                            this.inputKeyword = '';
                            this.deleteKeyword = '';
                            this.brdOpts.page_num = 1;
                            this.fetchList();
                        } else {
                            console.log('추가 실패');
                            this.$store.dispatch('NOTY_ERR', '중복된 제외어입니다.');
                        }
                        this.isChange = true;
                    })
                    .catch((err) => {
                        this.$store.dispatch('NOTY_ERR', '일시적인 장애가 발생하였습니다.<br>다시 시도해주세요.');
                        console.log(err);
                    });
            }
        },

        async exceptDelClick() {
            if (!this.checkboxDatas.length > 0) {
                this.$store.dispatch('NOTY_ERR', ['선택된 내용이 없습니다.']);
                return false;
            } else {
                this.apiParams.user_id = this.$store.getters.getUser.id;
                this.apiParams.sec_id = this.searchParams.sc_id;
                this.apiParams.expt_rk_seq = this.checkboxDatas.join();

                await API_delExRelationKeyword(this.apiUID, this.apiParams)
                    .then((res) => {
                        if (res.data.result) {
                            this.inputKeyword = '';
                            this.deleteKeyword = '';
                            this.fetchList();
                        } else {
                            console.log('삭제 실패');
                        }
                        this.isChange = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.popup_item {
    > .header,
    > .wrap,
    > .footer {
        max-width: 700px !important;
    }
}
</style>
