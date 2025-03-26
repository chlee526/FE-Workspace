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
                    <!-- 관련정보 Modal -->
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>관련정보</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <ul>
                                                    <li>
                                                        <span>기타 팝업</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>최대 검색 기간</strong> : 최대 검색기간 설정</span>
                                                        <ul>
                                                            <li><span>최대 검색 기간 설정시 관련정보 팝업 내 달력 삽입</span></li>
                                                            <li><span>설정한 최대 검색 기간이 검색 기간 보다 작으면 검색 기간 종료 날짜부터 최대 검색 기간만큼 계산되어 자동설정.</span></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <div class="grp">
                                                <strong>검색 기간</strong>
                                                <comp-datepicker id="ts_dp_s" :s_date.sync="searchDates.s_date" :e_date.sync="searchDates.e_date" range="2Y" :min_date.sync="searchDates.min_date" :max_date.sync="searchDates.max_date" :c_type_opts="null"></comp-datepicker>
                                            </div>
                                            <!-- <hr /> -->
                                            <!-- <div class="grp">
                                                <strong>최대 검색 기간</strong>
                                                <comp-input-box id="set_dateMaxRange" class="is-small" type="number" v-model="set.dateMaxRange" placeholder="" label="라벨명 입력" style="width: 70px"></comp-input-box>
                                            </div> -->
                                            <!-- <hr />
                                            <comp-switch-btn id="set_usedTitle" class="is-small" v-model="set.usedTitle" label="타이틀"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_usedSubTitle" class="is-small" v-model="set.usedSubTitle" label="서브 타이틀"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_useAttrs" class="is-small" v-model="set.usedAttrs" label="연관어 속성"></comp-switch-btn>
                                            <hr />
                                            <div class="grp">
                                                <strong>추가 검색조건</strong>
                                                <comp-checkbox-grp id="set_cateFilter" class="is-small" v-model="set.cateFilter.value" :opts="set.cateFilter.opts" all-label="전체" :box="true"></comp-checkbox-grp>
                                            </div> -->
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 150px" />
                                                            <col style="width: 150px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong>종류</strong></th>
                                                                <th><strong>링크</strong></th>
                                                                <th><strong>팝업 전달</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>제외 키워드</strong></th>
                                                                <td>
                                                                    <a href="#" class="lnk" @click.prevent="$store.dispatch('MODAL_OPEN', ['ex_relation_keyword', { ...searchDates, ...pdExRk }])"><span class="txt">팝업</span></a>
                                                                </td>
                                                                <td>
                                                                    <comp-input-box id="ex_rk_name" v-model="pdExRk.name" placeholder="키워드명" style="width: 120px"></comp-input-box>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>검색량</strong></th>
                                                                <td>
                                                                    -
                                                                    <!-- <a href="#" class="lnk" @click.prevent="$store.dispatch('MODAL_OPEN', ['search_volume', { ...searchDates, ...pdSv }])"><span class="txt">팝업</span></a> -->
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>반응량</strong></th>
                                                                <td>
                                                                    -
                                                                    <!-- <a href="#" class="lnk" @click.prevent="$store.dispatch('MODAL_OPEN', ['reaction-volume', { ...searchDates, ...pdSv }])"><span class="txt">팝업</span></a> -->
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>유사수량</strong></th>
                                                                <td>
                                                                    -
                                                                    <!-- <a href="#" class="lnk" @click.prevent="$store.dispatch('MODAL_OPEN', ['similar', { ...searchDates, ...popupDatas2 }])"><span class="txt">팝업</span></a> -->
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
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
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'template-popup-other',
    data() {
        return {
            searchDates: {
                s_date: {
                    date: new Date().dateToStr(),
                },
                e_date: {
                    date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                },
                ps_date: {
                    date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
                },
                pe_date: {
                    date: moment().subtract(3, 'days').format('YYYY-MM-DD'),
                },
                min_date: '2022-05-01',
                max_date: '2022-10-31',
            },
            pdExRk: {
                name: '',
            },
            pdSv: {
                name: '',
            },
            popupDatas2: {
                title: [
                    {
                        code: '1',
                        name: '문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목',
                        type: 'md_pseq',
                    },
                    {
                        code: '2',
                        name: '문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목문서제목',
                        type: 'md_pseq',
                    },
                ],
                md_pseq: 'doc123456', // 유사수량 MD_PSEQ값
            },
        };
    },
    mounted() {
        console.log(this.popupDatas1);
        console.log(this.popupDatas2);
    },
};
</script>

<style></style>
