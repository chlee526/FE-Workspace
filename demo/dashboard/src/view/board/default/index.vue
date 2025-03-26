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
                                                <span>로우데이터 게시판</span>
                                                <div class="sub_title">
                                                    <span class="keyword">감성셀렉트</span>
                                                    <span class="keyword">키워드검색</span>
                                                    <span class="keyword">정렬</span>
                                                    <span class="keyword">말풍선</span>
                                                    <span class="keyword">헤더필터</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <button class="ui_btn is-icon-only" title="작성">
                                                <span class="icon">&#xe008;</span>
                                            </button>
                                            <button class="ui_btn is-icon-only" title="엑셀 다운로드">
                                                <span class="icon">&#xe005;</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed">
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
                                                    <comp-selectbox id="tmp1" class="is-small" :opts="$store.getters.getSentis" v-model="senti"></comp-selectbox>
                                                    <hr />
                                                    <comp-selectbox id="brd_view_len1" class="is-small" :opts="$store.getters.getBrdViewLen" v-model="brdOpts.row_limit"></comp-selectbox>
                                                    <hr />
                                                    <comp-input-box type="search" id="brd_searchInput1" class="is-small" v-model="tmpSearchKeyword" @keyup="evt_brd_reload" style="width: 250px" placeholder="검색어를 입력하세요." label="입력창"></comp-input-box>
                                                </div>
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col style="width: 150px" />
                                                        <col />
                                                        <col style="width: 100px" />
                                                        <col style="width: 120px" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <!-- <strong>채널</strong> -->
                                                                <comp-table-filter id="table_filter_1" name="종류" v-model="tableFilter.value" :opts="tableFilter.opts" @confirm="evtConfirm"></comp-table-filter>
                                                                <comp-table-sort id="chn" name="brd_sort_01" v-model="brdOpts.brdSort"></comp-table-sort>
                                                            </th>
                                                            <th>
                                                                <!-- <strong>수집원</strong> -->
                                                                <comp-table-filter id="table_filter_2" name="채널" v-model="tableFilter2.value" :opts="tableFilter2.opts" :labelVisibleNum="2" @confirm="evtConfirm" :multi="true"></comp-table-filter>
                                                                <comp-table-sort id="origin" name="brd_sort_01" v-model="brdOpts.brdSort"></comp-table-sort>
                                                            </th>
                                                            <th><strong>원문</strong></th>
                                                            <th><strong>성향</strong></th>
                                                            <th>
                                                                <strong>수집일</strong>
                                                                <comp-table-sort id="crawl_time" name="brd_sort_01" v-model="brdOpts.brdSort"></comp-table-sort>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt" class="no_over no_data in_list">
                                                                <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="($item, $idx) in brdDatas.list" :key="$idx">
                                                            <th class="ui_fc_dm">
                                                                <span>
                                                                    {{
                                                                        $store.getters.getChns.getParseDatas({
                                                                            code: $item.SG_SEQ,
                                                                        })[0]?.name
                                                                    }}
                                                                </span>
                                                            </th>
                                                            <!-- 수집원 -->
                                                            <th class="ui_fc_dm">
                                                                <span>{{ $item.MD_SITE_NAME }}</span>
                                                            </th>
                                                            <td class="ui_al" :class="{ 'has-cafe': $item.CAFE_URL }">
                                                                <span v-if="$item.CAFE_URL" class="is-cafe">
                                                                    <comp-button :href="$item.CAFE_URL.buzmsLink()" target="_blank" class="ui_btn is-icon-only is-xsmall" title="카페 바로가기"><span class="icon">&#xe055;</span></comp-button>
                                                                </span>
                                                                <comp-bubble-box class="is-board" :subject="$item.ID_TITLE" style="max-width: 1000px">
                                                                    <a :href="$item.ID_URL.buzmsLink()" target="_blank">
                                                                        <strong>{{ $item.ID_TITLE }}</strong>
                                                                    </a>
                                                                </comp-bubble-box>
                                                            </td>
                                                            <!-- 감성 -->
                                                            <td class="ui_fc_dm">
                                                                <span
                                                                    class="ui_ico_senti"
                                                                    :class="$item.ID_SENTI.sentiToIcoClass()"
                                                                    :title="
                                                                        $store.getters.getSentis.getParseDatas({
                                                                            code: $item.ID_SENTI,
                                                                        })[0]
                                                                    ">
                                                                    <span>
                                                                        {{
                                                                            $store.getters.getSentis.getParseDatas({
                                                                                code: $item.ID_SENTI,
                                                                            })[0]
                                                                        }}
                                                                    </span>
                                                                </span>
                                                            </td>
                                                            <!-- 수집일 -->
                                                            <td class="ui_fc_dm">
                                                                <span>{{ $item.MD_DATE }}</span>
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
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>로우데이터 게시판2</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_row">
                                            <div class="wrap">
                                                <div class="ui_col">
                                                    <div class="ui_box is-2dp" :class="{ 'is-loading': brdLoading }">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>로우데이터 게시판2</span>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div class="content">
                                                            <div class="ui_row">
                                                                <div class="wrap">
                                                                    <div class="ui_col">
                                                                        <div class="ui_box is-3dp" :class="{ 'is-loading': brdLoading }">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h4>
                                                                                        <span>로우데이터 게시판2</span>
                                                                                        <div class="sub_title">
                                                                                            <span class="keyword">원문 2줄(제목/내용)</span>
                                                                                            <span class="keyword">말풍선</span>
                                                                                        </div>
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                            <div class="ui_function is-box">
                                                                                <div class="rc">
                                                                                    <button class="ui_btn is-icon-only" title="작성">
                                                                                        <span class="icon">&#xe008;</span>
                                                                                    </button>
                                                                                    <button class="ui_btn is-icon-only" title="엑셀 다운로드">
                                                                                        <span class="icon">&#xe005;</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">
                                                                                <div class="ui_brd is-hgt-fixed is-body-twoline-mode">
                                                                                    <div class="infos">
                                                                                        <div class="lc">
                                                                                            <div class="page_info">
                                                                                                <span>
                                                                                                    총
                                                                                                    <strong>{{ brdDatas.total_cnt }}</strong>
                                                                                                    건
                                                                                                </span>
                                                                                                <hr />
                                                                                                <span>
                                                                                                    <strong>{{ brdOpts2.page_num }}</strong>
                                                                                                    /
                                                                                                    <strong>{{ Math.ceil(brdDatas.total_cnt / brdOpts2.row_limit) || 1 }}</strong>
                                                                                                    Pages
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="wrap">
                                                                                        <table>
                                                                                            <colgroup>
                                                                                                <col style="width: 120px" />
                                                                                                <col style="width: 150px" />
                                                                                                <col />
                                                                                                <col style="width: 100px" />
                                                                                                <col style="width: 120px" />
                                                                                            </colgroup>
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th><strong>채널</strong></th>
                                                                                                    <th><strong>수집원</strong></th>
                                                                                                    <th><strong>원문</strong></th>
                                                                                                    <th><strong>성향</strong></th>
                                                                                                    <th><strong>수집일</strong></th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <!-- 데이터 없는 경우 -->
                                                                                            <tbody v-if="brdDatas.list.length == 0">
                                                                                                <tr v-for="$idx in Math.floor((brdOpts2.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                                                                    <td :colspan="brdOpts2.colCnt"></td>
                                                                                                </tr>
                                                                                                <tr class="is-no-over">
                                                                                                    <td :colspan="brdOpts2.colCnt" class="no_over no_data in_list">
                                                                                                        <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr v-for="$idx in Math.ceil((brdOpts2.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                                                                    <td :colspan="brdOpts2.colCnt"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                            <!-- // 데이터 없는 경우 -->

                                                                                            <!-- 데이터 있는 경우 -->
                                                                                            <tbody v-else>
                                                                                                <tr v-for="($item, $idx) in brdDatas.list" :key="$idx">
                                                                                                    <!-- 
                                                                                                            채널 
                                                                                                            - 코드 사용
                                                                                                            - store채널 목록에서 해당 값 매칭 후, 해당 name 반환하여 표현
                                                                                                        -->
                                                                                                    <th class="ui_fc_dm">
                                                                                                        <span>
                                                                                                            {{
                                                                                                                $store.getters.getChns.getParseDatas({
                                                                                                                    code: $item.SG_SEQ,
                                                                                                                })[0]?.name
                                                                                                            }}
                                                                                                        </span>
                                                                                                    </th>
                                                                                                    <!-- 수집원 -->
                                                                                                    <th class="ui_fc_dm">
                                                                                                        <span>{{ $item.MD_SITE_NAME }}</span>
                                                                                                    </th>
                                                                                                    <!-- 
                                                                                                            원문 
                                                                                                            - 말풍선 이용
                                                                                                            - buzzms를 통하여 리다이렉션을 통해 원문 접근 필수
                                                                                                        -->
                                                                                                    <td class="ui_al" :class="{ 'has-cafe': $item.CAFE_URL }">
                                                                                                        <span v-if="$item.CAFE_URL" class="is-cafe">
                                                                                                            <comp-button :href="$item.CAFE_URL.buzmsLink()" target="_blank" class="ui_btn is-icon-only is-xsmall" title="카페 바로가기"><span class="icon">&#xe055;</span></comp-button>
                                                                                                        </span>
                                                                                                        <comp-bubble-box class="is-board" :subject="$item.ID_TITLE" :content="$item.ID_CONTENT" style="max-width: 1000px">
                                                                                                            <a :href="$item.ID_URL.buzmsLink()" target="_blank" class="is-title-txts" :html-type="true">
                                                                                                                <strong v-html="$item.ID_TITLE"></strong>
                                                                                                                <span v-if="$item.ID_CONTENT != ''" class="txt ui_fc_dm" v-html="$item.ID_CONTENT"></span>
                                                                                                            </a>
                                                                                                        </comp-bubble-box>
                                                                                                    </td>
                                                                                                    <!-- 감성 -->
                                                                                                    <td class="ui_fc_dm">
                                                                                                        <span
                                                                                                            class="ui_ico_senti"
                                                                                                            :class="$item.ID_SENTI.sentiToIcoClass()"
                                                                                                            :title="
                                                                                                                $store.getters.getSentis.getParseDatas({
                                                                                                                    code: $item.ID_SENTI,
                                                                                                                })[0]
                                                                                                            ">
                                                                                                            <span>
                                                                                                                {{
                                                                                                                    $store.getters.getSentis.getParseDatas({
                                                                                                                        code: $item.ID_SENTI,
                                                                                                                    })[0]
                                                                                                                }}
                                                                                                            </span>
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    <!-- 수집일 -->
                                                                                                    <td class="ui_fc_dm">
                                                                                                        <span>{{ $item.MD_DATE }}</span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr v-for="$idx in brdOpts2.row_limit - brdDatas.list.length > 0 ? brdOpts2.row_limit - brdDatas.list.length : 0" v-bind:key="$idx" class="is-no-over">
                                                                                                    <td :colspan="brdOpts2.colCnt"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                            <!-- // 데이터 있는 경우 -->
                                                                                        </table>
                                                                                    </div>
                                                                                    <div class="footer">
                                                                                        <comp-paginate :limit-len="10001" :datas="brdOpts2" :total-len="brdDatas.total_cnt" v-model="brdOpts2.page_num"></comp-paginate>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box" :class="{ 'is-loading': brdLoading }">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>로우데이터 게시판3</span>
                                                <div class="sub_title">
                                                    <span class="keyword">헤더 2줄</span>
                                                    <span class="keyword">말풍선</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <button class="ui_btn is-icon-only" title="작성">
                                                <span class="icon">&#xe008;</span>
                                            </button>
                                            <button class="ui_btn is-icon-only" title="엑셀 다운로드">
                                                <span class="icon">&#xe005;</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed is-multiline">
                                            <div class="infos">
                                                <div class="lc">
                                                    <div class="page_info">
                                                        <span>
                                                            총
                                                            <strong>{{ brdDatas.total_cnt }}</strong>
                                                            건
                                                        </span>
                                                        <hr />
                                                        <span>
                                                            <strong>{{ brdOpts3.page_num }}</strong>
                                                            /
                                                            <strong>{{ Math.ceil(brdDatas.total_cnt / brdOpts3.row_limit) || 1 }}</strong>
                                                            Pages
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col style="width: 150px" />
                                                        <col />
                                                        <col style="width: 80px" />
                                                        <col style="width: 80px" />
                                                        <col style="width: 80px" />
                                                        <col style="width: 120px" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th rowspan="2"><strong>채널</strong></th>
                                                            <th rowspan="2"><strong>수집원</strong></th>
                                                            <th rowspan="2"><strong>원문</strong></th>
                                                            <th colspan="3"><strong>성향</strong></th>
                                                            <th rowspan="2"><strong>수집일</strong></th>
                                                        </tr>
                                                        <tr>
                                                            <th><strong>긍정</strong></th>
                                                            <th><strong>부정</strong></th>
                                                            <th><strong>중립</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts3.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts3.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts3.colCnt" class="no_over no_data in_list">
                                                                <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts3.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts3.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="($item, $idx) in brdDatas.list" :key="$idx">
                                                            <!-- 
                                                                    채널 
                                                                    - 코드 사용
                                                                    - store채널 목록에서 해당 값 매칭 후, 해당 name 반환하여 표현
                                                                -->
                                                            <th class="ui_fc_dm">
                                                                <span>
                                                                    {{
                                                                        $store.getters.getChns.getParseDatas({
                                                                            code: $item.SG_SEQ,
                                                                        })[0]?.name
                                                                    }}
                                                                </span>
                                                            </th>
                                                            <!-- 수집원 -->
                                                            <th class="ui_fc_dm">
                                                                <span>{{ $item.MD_SITE_NAME }}</span>
                                                            </th>
                                                            <!-- 
                                                                    원문 
                                                                    - 말풍선 이용
                                                                    - buzzms를 통하여 리다이렉션을 통해 원문 접근 필수
                                                                -->
                                                            <td class="ui_al">
                                                                <comp-bubble-box class="is-board" :content="$item.ID_TITLE" style="max-width: 800px">
                                                                    <a :href="$item.ID_URL.buzmsLink()" target="_blank">
                                                                        <strong>{{ $item.ID_TITLE }}</strong>
                                                                    </a>
                                                                </comp-bubble-box>
                                                            </td>
                                                            <!-- 감성 -->
                                                            <td class="is-number ui_fc_dm">
                                                                <a class="lnk ui_fc_positive" href="#" target="_blank" :title="'긍정: ' + String(123456789).addComma() + '건'">
                                                                    <span class="txt">{{ Number(123456789).lengthLimitComma() }}</span>
                                                                </a>
                                                            </td>
                                                            <td class="is-number ui_fc_dm">
                                                                <a class="lnk ui_fc_negative" href="#" target="_blank" :title="'부정: ' + String(1234567).addComma() + '건'">
                                                                    <span class="txt">{{ Number(1234567).lengthLimitComma() }}</span>
                                                                </a>
                                                            </td>
                                                            <td class="is-number ui_fc_dm">
                                                                <a class="lnk ui_fc_neutral" href="#" target="_blank" :title="'중립: ' + String(123456).addComma() + '건'">
                                                                    <span class="txt">{{ Number(123456).lengthLimitComma() }}</span>
                                                                </a>
                                                            </td>
                                                            <!-- 수집일 -->
                                                            <td class="ui_fc_dm">
                                                                <span>{{ $item.MD_DATE }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts3.row_limit - brdDatas.list.length > 0 ? brdOpts3.row_limit - brdDatas.list.length : 0" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts3.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
                                            </div>
                                            <div class="footer">
                                                <comp-paginate :datas="brdOpts3" :total-len="brdDatas.total_cnt" v-model="brdOpts3.page_num"></comp-paginate>
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
                                                <span>로우데이터 게시판4</span>
                                                <div class="sub_title">
                                                    <span class="keyword">탭포함</span>
                                                    <span class="keyword">말풍선</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <button class="ui_btn is-icon-only" title="작성">
                                                <span class="icon">&#xe008;</span>
                                            </button>
                                            <button class="ui_btn is-icon-only" title="엑셀 다운로드">
                                                <span class="icon">&#xe005;</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd is-hgt-fixed">
                                            <div class="infos">
                                                <div class="lc">
                                                    <div class="page_info">
                                                        <span>
                                                            총
                                                            <strong>{{ brdDatas.total_cnt }}</strong>
                                                            건
                                                        </span>
                                                        <hr />
                                                        <span>
                                                            <strong>{{ brdOpts4.page_num }}</strong>
                                                            /
                                                            <strong>{{ Math.ceil(brdDatas.total_cnt / brdOpts4.row_limit) || 1 }}</strong>
                                                            Pages
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab">
                                                <!-- 게시판 탭 -->
                                                <comp-tab id="board_tab" class="is-board" :opts="tabOpts" v-model="brdOpts4.tabIdx"></comp-tab>
                                                <!-- // 게시판 탭 -->
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 120px" />
                                                        <col style="width: 150px" />
                                                        <col />
                                                        <col style="width: 100px" />
                                                        <col style="width: 120px" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th><strong>채널</strong></th>
                                                            <th><strong>수집원</strong></th>
                                                            <th><strong>원문</strong></th>
                                                            <th><strong>성향</strong></th>
                                                            <th><strong>수집일</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="$idx in Math.floor((brdOpts4.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts4.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts4.colCnt" class="no_over no_data in_list">
                                                                <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in Math.ceil((brdOpts4.row_limit - 1) / 2)" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts4.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="($item, $idx) in brdDatas.list" :key="$idx">
                                                            <th class="ui_fc_dm">
                                                                <span>
                                                                    {{
                                                                        $store.getters.getChns.getParseDatas({
                                                                            code: $item.SG_SEQ,
                                                                        })[0]?.name
                                                                    }}
                                                                </span>
                                                            </th>
                                                            <!-- 수집원 -->
                                                            <th class="ui_fc_dm">
                                                                <span>{{ $item.MD_SITE_NAME }}</span>
                                                            </th>

                                                            <td class="ui_al">
                                                                <comp-bubble-box class="is-board" :content="$item.ID_TITLE" style="max-width: 800px">
                                                                    <a :href="$item.ID_URL.buzmsLink()" target="_blank">
                                                                        <strong>{{ $item.ID_TITLE }}</strong>
                                                                    </a>
                                                                </comp-bubble-box>
                                                            </td>
                                                            <!-- 감성 -->
                                                            <td class="ui_fc_dm">
                                                                <span
                                                                    class="ui_ico_senti"
                                                                    :class="$item.ID_SENTI.sentiToIcoClass()"
                                                                    :title="
                                                                        $store.getters.getSentis.getParseDatas({
                                                                            code: $item.ID_SENTI,
                                                                        })[0]
                                                                    ">
                                                                    <span>
                                                                        {{
                                                                            $store.getters.getSentis.getParseDatas({
                                                                                code: $item.ID_SENTI,
                                                                            })[0]
                                                                        }}
                                                                    </span>
                                                                </span>
                                                            </td>
                                                            <!-- 수집일 -->
                                                            <td class="ui_fc_dm">
                                                                <span>{{ $item.MD_DATE }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="$idx in brdOpts4.row_limit - brdDatas.list.length > 0 ? brdOpts4.row_limit - brdDatas.list.length : 0" v-bind:key="$idx" class="is-no-over">
                                                            <td :colspan="brdOpts4.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
                                            </div>
                                            <div class="footer">
                                                <comp-paginate :datas="brdOpts4" :total-len="brdDatas.total_cnt" v-model="brdOpts4.page_num"></comp-paginate>
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
import '@shared/utils/index';
export default {
    name: 'board-default',
    data() {
        return {
            tableFilter: {
                value: 'AND',
                opts: [
                    { code: 'AND', name: 'AND' },
                    { code: '구문', name: '구문' },
                    { code: '인접', name: '인접' },
                    { code: '고유', name: '고유' },
                    { code: '포함', name: '포함' },
                ],
            },
            tableFilter2: {
                value: '뉴스,유튜브',
                opts: [
                    { code: '뉴스', name: '뉴스' },
                    { code: '유튜브', name: '유튜브' },
                    { code: '카페', name: '카페' },
                    { code: '인스타', name: '인스타' },
                    { code: '블로그', name: '블로그' },
                ],
            },
            senti: 's_1',
            tabOpts: [
                { code: '1', name: 'Board Tab 1' },
                { code: '2', name: 'Board Tab 2' },
                { code: '3', name: 'Board Tab 3' },
            ],
            brdOpts: {
                colCnt: '5', // 게시판 Col
                row_limit: '10', // 게시판 Row
                brdSort: 'brd_sort_01_origin_up', // 게시판 정렬 : name + id + ( up or dn )
                page_num: '2', // 현재 페이지 번호
                pagingColCnt: '10', // 페이징 갯수
                tabIdx: '2', // Tab IDX
            },
            brdOpts2: {
                colCnt: '6', // 게시판 Col
                row_limit: '20', // 게시판 Row
                brdSort: 'brd_sort_02_senti_positive_up', // 게시판 정렬 : name + id + ( up or dn )
                page_num: '1', // 현재 페이지 번호
                pagingColCnt: '10', // 페이징 갯수
            },
            brdOpts3: {
                colCnt: '6', // 게시판 Col
                row_limit: '10', // 게시판 Row
                brdSort: 'brd_sort_02_senti_positive_up', // 게시판 정렬 : name + id + ( up or dn )
                page_num: '1', // 현재 페이지 번호
                pagingColCnt: '10', // 페이징 갯수
            },
            brdOpts4: {
                colCnt: '6', // 게시판 Col
                row_limit: '10', // 게시판 Row
                brdSort: 'brd_sort_02_senti_positive_up', // 게시판 정렬 : name + id + ( up or dn )
                page_num: '1', // 현재 페이지 번호
                pagingColCnt: '10', // 페이징 갯수
            },
            brdLoading: false,
            brdDatas: {
                total_cnt: 10001,
                list: [],
            },
            brdDatas2: {
                total_cnt: 0,
                list: [],
            },
            tmpSearchKeyword: '',
        };
    },

    created() {
        for (var Loop1 = 0; Loop1 < 30; ++Loop1) {
            let seqNo = ['c_93', 'c_113', 'c_94', 'c_95', 'c_97', 'c_99', 'c_100', 'c_102'][parseInt(Math.random() * 8)];
            this.brdDatas.list.push({
                ID_TITLE: '게시글제목 ' + Loop1,
                ID_URL: 'http://realsn.com',
                SG_SEQ: seqNo,
                MD_SITE_NAME: '출처사이트명 ' + Loop1,
                MD_DATE: '2022-11-01',
                ID_CONTENT: '게시글 본문 ' + Loop1,
                ID_SENTI: ['s_1', 's_2', 's_3'][parseInt(Math.random() * 3)],
                // CAFE_URL: seqNo == 'c_95' ? true : false,
                CAFE_URL: 'http://realsn.com',
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

            setTimeout(function () {
                this.brdLoading = false;
            }, 1000);
        },

        evtConfirm(val) {
            console.log('confirm', val);
        },
    },
};
</script>

<style></style>
