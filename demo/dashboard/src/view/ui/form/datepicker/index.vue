<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">DatePicker</h2>
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
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>DatePicker</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/datepicker" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Datepicker - 날짜/시간 선택 UI</span>
                                                    </li>
                                                    <li>
                                                        <strong>날짜 설정</strong>
                                                        <ul>
                                                            <li>
                                                                <span><strong>시작 날짜</strong> : 달력 시작 날짜 설정</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>종료 날짜</strong> : 달력 종료 날짜 설정, 적용 시 범위 달력으로 변경</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>최소 날짜</strong> : 선택 가능한 최소 날짜 설정, 범위 달력일 때만 적용 가능</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>최대 날짜</strong> : 선택 가능한 최대 날짜 설정, 범위 달력일 때만 적용 가능</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>이전 기간 달력 적용</strong> : 이전 기간 달력 사용 여부, 범위 달력일 때만 적용 가능</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>이전 기간 최소 날짜</strong> : 이전 기간 선택 가능한 최소 날짜 설정, 기본 달력의 시작 날짜보다 앞으로 설정 필수</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>날짜 범위 설정</strong> : 범위 달력일 때, 날짜 범위 설정 (단위 : 숫자 - 일/ W - 주/ M - 개월/ Y - 년)</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>날짜 갭 설정</strong> : 범위 달력 + 날짜 그룹 사용 시, 기준 날짜 갭 설정 (예시 : -1일 때 날짜 그룹 1일 클릭 시 하루 전 선택) </span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>날짜 그룹</strong> : 날짜 선택 퀵 버튼 적용/추가/삭제/설정, 범위 달력일 때 적용 가능</span>
                                                        <ul>
                                                            <li>
                                                                <span><strong>날짜 그룹 목록</strong> : 그룹 추가(+), 삭제(x)</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>목록 내 날짜 그룹 선택</strong> : 기간, 단위 변경 가능</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>달력 타입</strong> : 달력 타입 설정, 범위 달력일 때 적용 가능</span>
                                                        <ul>
                                                            <li>
                                                                <span><strong>기본 달력 타입</strong> : 달력 타입 초기값 설정</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>사용할 달력 타입</strong> : 선택 가능한 달력 타입 선택</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>시간 포함</strong> : 시간 포함 여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>버튼</strong> : 적용 버튼 포함 여부/ 버튼 타이틀 설정</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>날짜 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <span>시작 날짜</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-datepicker id="set_datepicker_sDate" class="demo_datepicker is-small" :s_date.sync="calendarDatas.s_date"></comp-datepicker>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <span>종료 날짜</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_eDate_used" class="is-small" v-model="setUsed.e_date" style="margin-right: 3px"></comp-switch-btn>
                                                            <comp-datepicker id="set_datepicker_eDate" class="demo_datepicker is-small" :s_date.sync="calendarDatas.e_date" :disabled="!setUsed.e_date"></comp-datepicker>
                                                        </dd>
                                                    </dl>

                                                    <dl>
                                                        <dt>
                                                            <span>최소 날짜</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_minDate_used" class="is-small" v-model="setUsed.min_date" style="margin-right: 3px"></comp-switch-btn>
                                                            <comp-datepicker id="set_datepicker_minDate" class="demo_datepicker is-small" :s_date.sync="calendarDatas.min_date" :disabled="!setUsed.min_date"></comp-datepicker>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <span>최대 날짜</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_maxDate_used" class="is-small" v-model="setUsed.max_date" style="margin-right: 3px"></comp-switch-btn>
                                                            <comp-datepicker id="set_datepicker_maxDate" class="demo_datepicker is-small" :s_date.sync="calendarDatas.max_date" :disabled="!setUsed.max_date"></comp-datepicker>
                                                        </dd>
                                                    </dl>
                                                    <hr />
                                                    <dl>
                                                        <dt>
                                                            <span>이전기간 달력 적용</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_pDateChk" class="is-small" v-model="setUsed.p_date" :disabled="!setUsed.e_date"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <span>이전기간 최소 날짜</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-datepicker id="set_datepicker_p_minDate" class="demo_datepicker is-small" :s_date.sync="calendarDatas.p_min_date" :disabled="!setUsed.p_date"></comp-datepicker>
                                                        </dd>
                                                    </dl>
                                                    <hr />
                                                    <dl>
                                                        <dt>
                                                            <span>날짜 범위 설정</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-input-box id="set_range" class="is-small" v-model="calendarDatas.range" placeholder="1M" style="width: 120px"></comp-input-box>
                                                        </dd>
                                                    </dl>
                                                    <hr />
                                                    <dl>
                                                        <dt>
                                                            <span>날짜 갭 설정</span>
                                                        </dt>
                                                        <dd>
                                                            <comp-input-box id="set_c_date_gap" class="is-small" v-model="calendarDatas.c_date_gap" placeholder="0" style="width: 120px"></comp-input-box>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <div class="grp">
                                                <span>날짜 그룹 포함</span>
                                                <comp-switch-btn id="set_dateGrp" class="is-small" v-model="setUsed.date_grp" :disabled="!setUsed.e_date"></comp-switch-btn>
                                                <comp-filter-grp pos="BL" :disabled="!setUsed.date_grp">
                                                    <template v-slot:title>날짜 그룹 설정</template>
                                                    <template v-slot:items>
                                                        <dl>
                                                            <dt>
                                                                <strong>날짜 그룹</strong>
                                                            </dt>
                                                            <dd>
                                                                <comp-list v-model="calendarDatas.date_grp" :component="compDateGrp" sortable @add="addDateGrpItem"></comp-list>
                                                            </dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>달력 타입 포함</span>
                                                <comp-switch-btn id="set_c_typeOpts" class="is-small" v-model="setUsed.c_type_opts" :disabled="!setUsed.e_date"></comp-switch-btn>
                                                <comp-filter-grp pos="BL" :disabled="!setUsed.c_type_opts">
                                                    <template v-slot:title>달력 타입 설정</template>
                                                    <template v-slot:items>
                                                        <dl>
                                                            <dt>
                                                                <span>기본 달력 타입</span>
                                                            </dt>
                                                            <dd>
                                                                <comp-selectbox id="set_c_type" class="is-small" v-model="calendarDatas.cType" :opts="getCTypeOptsForSelect"></comp-selectbox>
                                                            </dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <span>사용할 달력 타입</span>
                                                            </dt>
                                                            <dd>
                                                                <comp-checkbox-grp id="set_typeOpts_active" class="is-small" v-model="usecTypeOpt" :opts="calendarDatas.c_type_opts" :btn="true"></comp-checkbox-grp>
                                                            </dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>시간 포함</span>
                                                <comp-switch-btn id="set_timePicker" class="is-small" v-model="setUsed.timePicker"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>버튼 포함</span>
                                                <comp-switch-btn id="set_completeBtn" class="is-small" v-model="setUsed.completeBtn"></comp-switch-btn>
                                                <comp-input-box id="set_completeBtn_name" class="is-small" v-model="completeBtn" style="width: 100px" placeholder="버튼 내용" :disabled="!setUsed.completeBtn"></comp-input-box>
                                            </div>
                                            <div class="grp">
                                                <span>미사용</span>
                                                <comp-switch-btn id="set_disabled" class="is-small" v-model="setUsed.disabled"></comp-switch-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap" style="text-align: center">
                                            <div style="display: inline-block; text-align: left">
                                                <comp-datepicker
                                                    id="datepicker_01"
                                                    v-if="!setUsed.e_date"
                                                    class="demo_datepicker"
                                                    :s_date.sync="calendarDatas.s_date"
                                                    :min_date="setUsed.min_date ? calendarDatas.min_date.date : ''"
                                                    :max_date="setUsed.max_date ? calendarDatas.max_date.date : ''"
                                                    :p-date-chk.sync="calendarDatas.pDateChk"
                                                    :complete-btn="setUsed.completeBtn ? completeBtn : null"
                                                    :date_grp="getDateGrp"
                                                    :c_type_opts="getCTypeOpts"
                                                    :c_type="calendarDatas.cType"
                                                    :range="calendarDatas.range"
                                                    :c_date_gap="Number(calendarDatas.c_date_gap)"
                                                    :disabled="setUsed.disabled"
                                                    :key="calendarDatas.pDateChk + 1"></comp-datepicker>
                                                <template v-else>
                                                    <comp-datepicker id="datepicker_02" class="demo_datepicker" :s_date.sync="calendarDatas.s_date" :e_date.sync="calendarDatas.e_date" :min_date="setUsed.min_date ? calendarDatas.min_date.date : ''" :max_date="setUsed.max_date ? calendarDatas.max_date.date : ''" :complete-btn="setUsed.completeBtn ? completeBtn : null" :date_grp="getDateGrp" :c_type_opts="getCTypeOpts" :c_type="calendarDatas.cType" :range="calendarDatas.range" :c_date_gap="Number(calendarDatas.c_date_gap)" :disabled="setUsed.disabled" :key="getDatePickerKey"></comp-datepicker>
                                                </template>
                                                <br /><br />
                                                <comp-datepicker
                                                    id="datepicker_03"
                                                    v-if="setUsed.p_date"
                                                    class="demo_datepicker"
                                                    :s_date.sync="calendarDatas.ps_date"
                                                    :e_date.sync="calendarDatas.pe_date"
                                                    :min_date.sync="calendarDatas.p_min_date.date"
                                                    :max_date.sync="calendarDatas.p_max_date"
                                                    :pDate="{ s_date: calendarDatas.s_date, e_date: calendarDatas.e_date }"
                                                    :p-date-chk.sync="calendarDatas.popChk"
                                                    :complete-btn="setUsed.completeBtn ? completeBtn : null"
                                                    :c_type_opts="getCTypeOpts"
                                                    :c_type="calendarDatas.cType"
                                                    :range="calendarDatas.range"
                                                    :c_date_gap="Number(calendarDatas.c_date_gap)"
                                                    :disabled="setUsed.disabled"
                                                    :key="getDatePickerKey + 1"></comp-datepicker>
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
import CompListGrp_DateGrp from './ListDateGrp.vue';
export default {
    name: 'component-calendar',
    data() {
        return {
            setUsed: {
                e_date: true,
                max_date: false,
                min_date: true,
                p_date: true,
                completeBtn: true,
                date_grp: true,
                c_type_opts: false,
                range: false,
                disabled: false,
                timePicker: false,
            },
            completeBtn: '확인',
            usecTypeOpt: 'day,week,month,quarter,half,year',
            calendarDatas: {
                s_date: {
                    date: new Date().dateToStr(),
                },
                e_date: {
                    date: new Date().dateToStr(),
                },
                ps_date: {
                    date: new Date().dateToStr(),
                },
                pe_date: {
                    date: new Date().dateToStr(),
                },
                p_min_date: {
                    date: '2021-01-01',
                },
                p_max_date: new Date().dateToStr(),
                min_date: {
                    date: '2022-01-01',
                },
                max_date: {
                    date: new Date().dateToStr(),
                },
                popChk: true,
                date_grp: [
                    { value: '1', unit: 'd' },
                    { value: '1', unit: 'BM' },
                    { value: '1', unit: 'M' },
                    { value: '1', unit: 'BY' },
                    { value: '2023', unit: 'Y' },
                ],
                c_type_opts: [
                    { code: 'day', name: '일' },
                    { code: 'week', name: '주' },
                    { code: 'month', name: '월' },
                    { code: 'quarter', name: '분기' },
                    { code: 'half', name: '반기' },
                    { code: 'year', name: '년' },
                ],
                cType: 'day',
                range: '1Y',
                c_date_gap: 0,
            },
            compDateGrp: CompListGrp_DateGrp,
        };
    },
    watch: {
        'setUsed.timePicker'(val) {
            const dates = ['s_date', 'e_date', 'ps_date', 'pe_date'];

            dates.forEach((date) => {
                if (val) {
                    this.calendarDatas[date].time = '00:00:00';
                } else {
                    delete this.calendarDatas[date].time;
                }
            });
        },
    },
    computed: {
        getDateGrp() {
            if (!this.setUsed.date_grp) return [];
            else {
                const dateGrp = this.calendarDatas.date_grp.map((item) => {
                    return `${item.value}${item.unit === 'd' ? '' : item.unit}`;
                });
                return dateGrp;
            }
        },
        getCTypeOpts() {
            if (this.setUsed.c_type_opts) {
                return this.usecTypeOpt.length ? this.usecTypeOpt.split(',') : null;
            }
            return null;
        },
        getCTypeOptsForSelect() {
            const usecTypeOpt = this.usecTypeOpt.split(',');
            const c_type_opts = JSON.parse(JSON.stringify(this.calendarDatas.c_type_opts));

            c_type_opts.map((opt) => {
                const tmp = opt;
                tmp.disabled = !usecTypeOpt.includes(opt.code);
                return tmp;
            });
            return c_type_opts;
        },
        getDatePickerKey() {
            return this.setUsed.e_date + this.setUsed.c_type_opts + this.setUsed.timePicker + this.calendarDatas.cType + this.getCTypeOpts?.length;
        },
    },
    methods: {
        addDateGrpItem() {
            this.calendarDatas.date_grp.push({ value: 1, unit: 'd' });
        },
        deleteDateGrpItem(idx) {
            this.calendarDatas.date_grp.splice(idx, 1);
        },
    },
};
</script>

<style></style>
