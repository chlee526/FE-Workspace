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
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Dialog</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/function/noty" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Noty UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>내용</strong> : Dialog 내용(내용필수)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>자동닫기</strong> : 기본적으로 Noty는 알림이 시작되고 5초후에 자동 종료되지만, 해당 기능을 끌 수 있음("Noty 닫기" 버튼을 이용해 강제 종료가능)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>버튼사용</strong> : 기본적으로 Noty는 알림이 시작되고 5초후에 자동 종료되지만, 해당 기능이 추가되면 사용자 인터렉션에 의해 종료 됨.("관리" 버튼을 통해서 버튼의 추가/삭제 가능)</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>내용</strong>
                                                <comp-input-box id="set_txt" type="text" v-model="set.txt" placeholder="내용" label="내용 입력" :minlength="0" style="width: 200px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_autoClose" class="is-small" v-model="set.autoClose" label="자동닫기"></comp-switch-btn>
                                                <comp-button @click="evt_notyLongCloseClick" :disabled="set.autoClose"><span class="txt">Noty 닫기</span></comp-button>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_usedBtn" class="is-small" v-model="set.usedBtn" label="버튼사용" :disabled="set.autoClose"></comp-switch-btn>
                                                <comp-filter-grp pos="BR" :disabled="set.autoClose || !set.usedBtn">
                                                    <template v-slot:title>관리</template>
                                                    <template v-slot:items>
                                                        <!-- 아래 형식으로 다수 제공 가능-->
                                                        <dl>
                                                            <dt>
                                                                <strong>버튼목록</strong> <comp-button class="ui_btn is-xsmall is-icon-only" title="아이템 추가" @click="evt_btnAdd"><span class="icon">&#xe017;</span></comp-button>
                                                            </dt>
                                                            <dd>
                                                                <comp-list v-model="set.btn.opts" :component="compBtn" :sortable="true"></comp-list>
                                                            </dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_brd is-data is-multiline is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 150px" />
                                                            <col style="width: 150px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong>종류</strong></th>
                                                                <th><strong>알림</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="trItem in set.type.opts" :key="trItem.code">
                                                                <th>
                                                                    <strong>{{ trItem.name }}</strong>
                                                                </th>
                                                                <td>
                                                                    <template v-if="set.autoClose">
                                                                        <button @click="$store.dispatch(trItem.code, set.txt)"><span class="txt">메세지</span></button>
                                                                    </template>
                                                                    <template v-else>
                                                                        <template v-if="!set.usedBtn">
                                                                            <button @click="evt_notyLongClick(trItem.code)"><span class="txt">메세지</span></button>
                                                                        </template>
                                                                        <template v-else>
                                                                            <button @click="$store.dispatch(`${trItem.code}_CONFIRM`, [set.txt, set.btn.opts])"><span class="txt">메세지</span></button>
                                                                        </template>
                                                                    </template>
                                                                </td>
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
import CompListGrp_Btn from './list_btns.vue';

export default {
    name: 'funciton-dialog',
    data() {
        return {
            set: {
                txt: 'Noty 내용',
                type: {
                    opts: [
                        { code: 'NOTY_INFO', name: '정보' },
                        { code: 'NOTY_COM', name: '완료/확인' },
                        { code: 'NOTY_ERR', name: '에러/실패' },
                    ],
                },
                btn: {
                    opts: [{ name: '확인', click: this.evt_click }],
                },
                autoClose: true,
                usedBtn: false,
            },
            notyIdxs: {
                default: [],
            },
            compBtn: CompListGrp_Btn,
        };
    },
    computed: {
        getNotyId() {
            return 'noty_' + parseInt(Math.random() * 999999999999999999);
        },
    },
    methods: {
        evt_notyLongClick(typeCode) {
            const idx = `noty_long_${new Date().getTime()}`;
            this.notyIdxs.default.push(idx);
            this.$store.dispatch(`${typeCode}_LONG`, [this.set.txt, idx]);
        },
        evt_notyLongCloseClick(e) {
            this.notyIdxs.default.forEach((item) => {
                this.$store.dispatch('NOTY_CLOSE', item);
            });
        },
        evt_btnAdd() {
            this.set.btn.opts.push({
                name: '버튼',
            });
        },
        evt_click(res) {
            console.log('Return  >>  ' + res);
        },
    },
};
</script>

<style></style>
