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
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Switch</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/switch" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Switch - 토글형 UI 컴포넌트, 체크박스/라디오와 같은 기능</span>
                                                    </li>
                                                    <li>
                                                        <span>사용자의 특정 기능 켜고/끄기 같은 곳(토글형 UI)에서 사용</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : xsmall, small, normal, large, xlare의 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>기본형</strong> : 기본 스위치 형태</li>
                                                            <li><strong>박스형</strong> : 박스 형태</li>
                                                            <li><strong>단일선택</strong> : 여러개의 스위치중 하나만 활성화 가능(라디오와 동일한 기능)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>라벨</strong> : 라벨명 설정 가능</span>
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
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 150px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                                <comp-switch-btn id="set_type_icon" class="is-small" v-model="set.type.only" label="단일선택"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>라벨</strong>
                                                <comp-input-box id="set_label" v-model="set.label" placeholder="라벨" label="라벨 입력" style="width: 120px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div style="display: flex; gap: 0 10px; justify-content: center">
                                                <template v-for="(item, idx) in set.datas.list">
                                                    <comp-switch-btn v-if="!set.type.only" :key="item.code" :id="`switch_${idx}`" :class="[getSize]" v-model="set.datas.values[idx]" :label="set.label" :box="getBox" :disabled="set.disabled"></comp-switch-btn>
                                                    <comp-switch-btn v-else :key="item.code" :id="`switch_${idx}`" :class="[getSize]" v-model="set.datas.value" :label="set.label" :box="getBox" radio-grp="getRadioName" :val="item.code" :disabled="set.disabled"></comp-switch-btn>
                                                </template>
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
    name: 'component-switch',
    data() {
        return {
            set: {
                label: '스위치',
                datas: {
                    value: '',
                    values: [],
                    list: [
                        { code: '1', name: '아이템 1' },
                        { code: '2', name: '아이템 2' },
                        { code: '3', name: '아이템 3' },
                    ],
                },
                size: {
                    value: 2,
                    opts: [
                        { code: 0, name: 'XX-Small', className: 'is-xxsmall' },
                        { code: 1, name: 'X-Small', className: 'is-xsmall' },
                        { code: 2, name: 'Small', className: 'is-small' },
                        { code: 3, name: 'Normal', className: '' },
                        { code: 4, name: 'Large', className: 'is-large' },
                        { code: 5, name: 'X-Large', className: 'is-xlarge' },
                    ],
                    wid: null,
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '기본형', className: '' },
                        { code: 1, name: '박스형', className: 'is-btn' },
                    ],
                    only: false,
                },
                colors: {
                    value: 0,
                    opts: [
                        { code: 0, name: '없음', className: 'is-color-hl' },
                        { code: 1, name: '사용자', className: '' },
                    ],
                    fill: '#527EB8',
                },
                disabled: false,
                loading: false,
            },

            checkboxDatas: {
                chkedList_opts: [
                    { code: 1, name: '체크1' },
                    { code: 2, name: '체크2', disabled: true },
                    { code: 3, name: '체크3' },
                ],
                checked_01_01: '',
                checked_01_02: '',
                checked_01_03: '',
                checked_01_04: '',
                checked_02: '',
                checked_03: '',
                toggle01: false,
                toggle02: '2',
            },
        };
    },
    computed: {
        getSize() {
            return this.set.size.opts.getParseDatas({ code: this.set.size.value })[0].className;
        },
        getBox() {
            return this.set.type.value == 1;
        },
        getRadioName() {
            return this.set.type.only ? 'switch_radio' : null;
        },
    },
};
</script>

<style></style>
