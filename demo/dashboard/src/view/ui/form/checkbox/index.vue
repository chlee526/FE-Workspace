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
                                            <h3><span>CheckBox/Group</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/form/checkbox" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Button - Button형 UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : xsmall, small, normal, large, xlare의 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>기본형</strong> : 기본 체크박스 형태</li>
                                                            <li><strong>버튼형</strong> : 버튼형태</li>
                                                            <li><strong>그룹형</strong> : 버튼을 이어놓은 형태</li>
                                                            <li><strong>아이콘 포함</strong> : 아이콘 포함 형태</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>색상</strong>
                                                        <ul>
                                                            <li><strong>없음</strong> : 기본 화이트/그레이 컬러</li>
                                                            <li><strong>사용자</strong> : colorpicker를 통해 컬러 설정</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>전체선택</strong> : 체크박스 제일 앞에 전체 선택/해제 기능 추가</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>전체해제가능</strong> : 선택된 값이 없을 수 있음, 이 기능이 해제되면 전체 해제가 되지 않음(체크박스값이 필수요소일 때 사용)</span>
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
                                                <strong>체크박스 갯수</strong>
                                                <comp-input-box id="set_listLen" type="number" min="1" max="10" v-model="set.datas.len" label="갯갯수 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 150px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                                <comp-switch-btn id="set_type_icon" class="is-small" v-model="set.type.icon" label="아이콘 포함" :disabled="set.type.value == 0"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>색상</strong>
                                                <comp-radio-grp id="set_color" name="btnColors" v-model="set.colors.value" :opts="set.colors.opts" :box="true"></comp-radio-grp>
                                                <comp-colorpicker v-model="set.colors.fill" :useConfirm="true" :disabled="set.colors.value != 1" />
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_all" class="is-small" v-model="set.all" label="전체선택"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_all_unchk" class="is-small" v-model="set.all_unchk" label="전체해제가능"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac">
                                            <comp-checkbox-grp id="chk_grp" :class="getSize" v-model="set.datas.values" :opts="getItmes" :btn="set.type.value == 1" :box="set.type.value == 2" :all-label="getUsedAll" :allUnchkDisabled="!set.all_unchk"></comp-checkbox-grp>
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
    name: 'component-checkbox',
    data() {
        return {
            set: {
                all: false,
                all_unchk: true,
                datas: {
                    len: 5,
                    values: '',
                    value: [],
                },
                size: {
                    value: 2,
                    opts: [
                        // { code: 0, name: 'X-Small', className: 'is-xsmall' },
                        { code: 1, name: 'Small', className: 'is-small' },
                        { code: 2, name: 'Normal', className: '' },
                        { code: 3, name: 'Large', className: 'is-large' },
                        { code: 4, name: 'X-Large', className: 'is-xlarge' },
                    ],
                    wid: null,
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '기본형', className: '' },
                        { code: 1, name: '버튼형', className: 'is-btn' },
                        { code: 2, name: '그룹형', className: 'is-box' },
                    ],
                    icon: false,
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
                chkedList_opts_grp: [
                    [
                        { code: 1, name: '체크1' },
                        { code: 2, name: '체크2', disabled: true },
                        { code: 3, name: '체크3' },
                    ],
                    [
                        { code: 4, name: '체크4' },
                        { code: 5, name: '체크5', disabled: true },
                        { code: 6, name: '체크6' },
                    ],
                ],
                chkedList_opts_customcolor: [
                    { code: 1, name: '체크1', color: '#ea8cd0' },
                    { code: 2, name: '체크2', color: '#6880d8', disabled: true },
                    { code: 3, name: '체크3', color: '#d6a924' },
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
        getDatasList() {
            return Array.from({ length: this.set.datas.len }).map((_item, idx) => ({
                code: idx,
                name: `체크박스 ${idx + 1}`,
            }));
        },
        getItmes() {
            let result = JSON.parse(JSON.stringify(this.getDatasList));

            result.forEach((item) => {
                if (this.set.type.icon) item.before = '&#xe075;';
                if (this.set.disabled) item.disabled = true;
                if (this.set.colors.value == 1) item.color = this.set.colors.fill;
            });
            // before: '&#xe075;'
            return result;
        },
        getWid() {
            const size = this.set.size.wid && this.set.size.wid.length && this.set.size.wid > 50 ? this.set.size.wid + 'px' : 'auto';
            return `width: ${size}`;
        },
        getSize() {
            return this.set.size.opts.getParseDatas({ code: this.set.size.value })[0].className;
        },
        getType() {
            return this.set.type.opts.getParseDatas({ code: `${this.set.type.value}` })[0].className;
        },
        getIcon() {
            return this.set.type.value != 0 && this.set.type.icon ? '&#xe075;' : null;
        },
        getColorClass() {
            let result = '';
            switch (this.set.colors.value) {
                case 1:
                    result = 'is-color-hl';
                    break;
                case 2:
                    result = 'is-color-black';
                    break;
            }
            return result;
        },
        getFill() {
            return this.set.colors.value == 3 && this.set.colors.fill ? this.set.colors.fill : null;
        },
        getUsedAll() {
            return this.set.all ? '전체' : null;
        },
    },
    watch: {},
};
</script>

<style></style>
