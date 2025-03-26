<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box" :class="{ 'is-loading': brdLoading }">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>데이터 게시판</span>
                                                <div class="sub_title">
                                                    <span class="keyword">정렬</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed is-data">
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th><strong>채널</strong></th>
                                                            <th><strong>cnt_1</strong><comp-table-sort id="origin" name="brd_sort_cnt_1" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_2</strong><comp-table-sort id="origin" name="brd_sort_cnt_2" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_3</strong><comp-table-sort id="origin" name="brd_sort_cnt_3" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_4</strong><comp-table-sort id="origin" name="brd_sort_cnt_4" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_5</strong><comp-table-sort id="origin" name="brd_sort_cnt_5" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_6</strong><comp-table-sort id="origin" name="brd_sort_cnt_6" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_7</strong><comp-table-sort id="origin" name="brd_sort_cnt_7" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts.row_limit - 1) / 2)" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt" class="no_over no_data in_list"><span class="ui_no_data_txt">데이터가 없습니다.</span></td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts.row_limit - 1) / 2)" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="($item, $idx) in brdDatas.list">
                                                            <th>
                                                                <strong>{{ $item.name }}</strong>
                                                            </th>
                                                            <td>
                                                                <span>{{ $item.cnt_1.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_2.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_3.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_4.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_5.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_6.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_7.lengthLimitComma() }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts.row_limit - brdDatas.list.length > 0 ? brdOpts.row_limit - brdDatas.list.length : 0" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box" :class="{ 'is-loading': brdLoading }">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>데이터 게시판</span>
                                                <div class="sub_title">
                                                    <span class="ver.2">ver.2</span>
                                                    <span class="keyword">정렬</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed is-data-v2">
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th><strong>채널</strong></th>
                                                            <th><strong>cnt_1</strong><comp-table-sort id="origin" name="brd_sort_cnt_1" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_2</strong><comp-table-sort id="origin" name="brd_sort_cnt_2" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_3</strong><comp-table-sort id="origin" name="brd_sort_cnt_3" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_4</strong><comp-table-sort id="origin" name="brd_sort_cnt_4" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_5</strong><comp-table-sort id="origin" name="brd_sort_cnt_5" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_6</strong><comp-table-sort id="origin" name="brd_sort_cnt_6" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                            <th><strong>cnt_7</strong><comp-table-sort id="origin" name="brd_sort_cnt_7" v-model="brdOpts.brdSort"></comp-table-sort></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts.row_limit - 1) / 2)" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt" class="no_over no_data in_list"><span class="ui_no_data_txt">데이터가 없습니다.</span></td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts.row_limit - 1) / 2)" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="($item, $idx) in brdDatas.list">
                                                            <th>
                                                                <strong>{{ $item.name }}</strong>
                                                            </th>
                                                            <td>
                                                                <span>{{ $item.cnt_1.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_2.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_3.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_4.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_5.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_6.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{ $item.cnt_7.lengthLimitComma() }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts.row_limit - brdDatas.list.length > 0 ? brdOpts.row_limit - brdDatas.list.length : 0" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box" :class="{ 'is-loading': brdLoading }">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>데이터 게시판</span>
                                                <div class="sub_title">
                                                    <span class="ver.2">ver.2</span>
                                                    <span class="CrossOver">CrossOver</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed is-data-v2">
                                            <div class="wrap">
                                                <table ref="crossOverBrd">
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                        <col />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th><strong>채널</strong></th>
                                                            <th><strong>cnt_1</strong></th>
                                                            <th><strong>cnt_2</strong></th>
                                                            <th><strong>cnt_3</strong></th>
                                                            <th><strong>cnt_4</strong></th>
                                                            <th><strong>cnt_5</strong></th>
                                                            <th><strong>cnt_6</strong></th>
                                                            <th><strong>cnt_7</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts.row_limit - 1) / 2)" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt" class="no_over no_data in_list"><span class="ui_no_data_txt">데이터가 없습니다.</span></td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts.row_limit - 1) / 2)" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else @mouseleave="evt_out">
                                                        <tr v-for="($item, $idx) in brdDatas.list">
                                                            <th
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 1;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 1 }">
                                                                <strong>{{ $item.name }}</strong>
                                                            </th>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 2;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 2 }">
                                                                <span>{{ $item.cnt_1.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 3;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 3 }">
                                                                <span>{{ $item.cnt_2.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 4;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 4 }">
                                                                <span>{{ $item.cnt_3.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 5;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 5 }">
                                                                <span>{{ $item.cnt_4.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 6;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 6 }">
                                                                <span>{{ $item.cnt_5.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 7;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 7 }">
                                                                <span>{{ $item.cnt_6.lengthLimitComma() }}</span>
                                                            </td>
                                                            <td
                                                                @mouseenter="
                                                                    rowIdx = $idx + 1;
                                                                    colIdx = 8;
                                                                "
                                                                @mouseleave="
                                                                    rowIdx = NaN;
                                                                    colIdx = NaN;
                                                                "
                                                                :class="{ 'is-crossover': rowIdx - 1 == $idx || colIdx == 8 }">
                                                                <span>{{ $item.cnt_7.lengthLimitComma() }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts.row_limit - brdDatas.list.length > 0 ? brdOpts.row_limit - brdDatas.list.length : 0" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
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
export default {
    name: 'page-board-data',
    data() {
        return {
            senti: 's_1',
            tabOpts: [
                { code: '1', name: 'Board Tab 1' },
                { code: '2', name: 'Board Tab 2' },
                { code: '3', name: 'Board Tab 3' },
            ],
            brdOpts: {
                colCnt: 8, // 게시판 Col
                row_limit: 10, // 게시판 Row
                brdSort: 'brd_sort_01_origin_up', // 게시판 정렬 : name + id + ( up or dn )
                tabIdx: 2, // Tab IDX
            },
            brdLoading: false,
            brdDatas: {
                list: [],
            },
            tmpSearchKeyword: '',
            rowIdx: NaN,
            colIdx: NaN,
            topSearchInputDatas: {},
            topSearchDatas: {},
        };
    },
    mounted() {
        for (var Loop1 = 0; Loop1 < 30; ++Loop1) {
            this.brdDatas.list.push({
                name: '아이템 1',
                cnt_1: Math.random() * 1000000,
                cnt_2: Math.random() * 1000000,
                cnt_3: Math.random() * 1000000,
                cnt_4: Math.random() * 1000000,
                cnt_5: Math.random() * 1000000,
                cnt_6: Math.random() * 1000000,
                cnt_7: Math.random() * 1000000,
            });
        }
    },
    watch: {
        // 탭 이동시 호출
        'brdOpts.tabIdx': function () {
            this.brdLoading = true;

            var _this = this;
            setTimeout(function () {
                _this.brdLoading = false;
            }, 1000);
        },
        // 게시판 페이지 이동시 호출
        'brdOpts.page_num': function () {
            this.brdLoading = true;

            var _this = this;
            setTimeout(function () {
                _this.brdLoading = false;
            }, 1000);
        },
    },
    methods: {
        evt_brd_reload() {
            this.brdLoading = true;

            var _this = this;
            setTimeout(function () {
                _this.brdLoading = false;
            }, 1000);
        },
        // 크로스 오버용 이벤트
        evt_over($e) {
            this.evt_out();

            const parentElm = $e.currentTarget.parentElement;
            const colIdx = parseInt([].slice.call(parentElm.children).indexOf($e.currentTarget));
            const overElm = [].slice.call(parentElm.children).concat([].slice.call(this.$refs.crossOverBrd.querySelectorAll('td:nth-child(' + (colIdx + 1) + ')')));

            overElm.forEach(($item) => {
                $item.classList.add('is-crossover');
            });

            // for (const $item of parentElm.children) {
            //     $item.classList.add('is-crossover');
            // }
        },
        evt_out($e) {
            const items = this.$refs.crossOverBrd.querySelectorAll('.is-crossover');
            for (const $item of items) {
                $item.classList.remove('is-crossover');
            }
            // const parentElm = $e.currentTarget.parentElement;
            // parentElm.children.classList.add('is-crossover');
            // parentElm.classList.add('is-crossover');
            // const colIdx =
            // console.log(parentElm.children);
        },
    },
};
</script>

<style></style>
