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
                                            <h3><span>InputBox</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/inputbox" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>크기</strong> : small, normal, large, xlarge의 네가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>가로 사이즈 고정</strong> : 인풋박스의 가로 크기를 고정</span>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>'text'</strong> : 기본 텍스트 입력창</li>
                                                            <li><strong>'search'</strong> : 검색어 입력 창</li>
                                                            <li><strong>'number'</strong> : 숫자 입력 창</li>
                                                            <li><strong>'password'</strong> : 비밀번호 입력 창 (비밀번호 유효성 검사 ex : 최소 4자리)</li>
                                                            <li><strong>'dbClickActive'</strong> : 데이터 저장 입력창 (인풋창 더블 클릭 및 연필 아이콘 클릭시 입력활성화) - Enter , ✓ 로 입력 데이터 저장 (저장 안하면 기존 입력된 데이터로 복구)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>데이터 설정</strong>
                                                        <ul>
                                                            <li>
                                                                <strong>최소/최대</strong>
                                                                <ul>
                                                                    <li><span>- 타입이 'text', 'search' 일 경우 최소 글자수/최대 글자수 설정 가능</span></li>
                                                                    <li><span>- 타입이 'number' 일 경우 최솟값/최대값 설정 가능</span></li>
                                                                </ul>
                                                            </li>
                                                            <li><strong>입력 데이터 제한</strong> : 입력 금지 문자 또는 단어 설정</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>검색 카테고리</strong> : 타입이 'search' 일 경우 검색 카테고리 사용 여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>자동완성</strong> : 자동완성 사용여부 (샘플 목록 : '자동완성 1', '자동완성 2' ...)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>초기화 버튼</strong> : 인풋박스 입력 데이터 초기화</span>
                                                        <ul>
                                                            <li>
                                                                <span><strong>사용</strong>: 버튼 항상 노출</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>포커스</strong>: 인풋박스에 포커스 되면 노출</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>미사용</strong>: 초기화 버튼 미사용</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>빈값 버튼 활성화</strong> : 데이터가 빈값일때 버튼(검색,저장) 활성화 여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>읽기 전용</strong> : 읽기 전용 상태</span>
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
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 120px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>가로 사이즈 고정</span>
                                                <comp-input-box id="set_size_width" type="number" v-model="set.size.width" placeholder="가로" :min="219" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-filter-grp pos="BR">
                                                    <template v-slot:title>타입</template>
                                                    <template v-slot:items>
                                                        <dl v-for="(item, idx) in set.type.opts" :key="idx">
                                                            <dt>{{ item.name }}</dt>
                                                            <dd><comp-switch-btn :id="`switch_${idx}`" :key="item.code" radio-grp="switch_radio" class="switch-btn is-xsmall" v-model="set.type.value" :val="item.code"></comp-switch-btn></dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-filter-grp pos="BL">
                                                    <template v-slot:title>데이터 설정</template>
                                                    <template v-slot:items>
                                                        <dl>
                                                            <dt>
                                                                <strong>최소/최대</strong>
                                                            </dt>
                                                            <dd style="display: flex; align-items: center">
                                                                <comp-input-box id="set_size_width" class="is-small" type="number" v-model="set.min" :placeholder="getType != 'number' ? '최소 글자수' : '최솟값'" style="width: 100px" :disabled="getType === 'password'"></comp-input-box>
                                                                <span style="margin: 0 5px">/</span>
                                                                <comp-input-box id="set_size_width" class="is-small" type="number" v-model="set.max" :placeholder="getType != 'number' ? '최대 글자수' : '최대값'" style="width: 100px" :disabled="getType === 'password'"></comp-input-box>
                                                            </dd>
                                                        </dl>
                                                        <hr />
                                                        <dl>
                                                            <dt>
                                                                <strong>입력 데이터 제한</strong>
                                                            </dt>
                                                            <dd>
                                                                <comp-input-box id="set_forbidden" v-model="set.forbiddenValue" placeholder=", 로 구분"></comp-input-box>
                                                            </dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_inputSelect" class="is-small" v-model="set.inputSelect" label="검색 카테고리" :disabled="getType !== 'search'"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_autoComplete" class="is-small" v-model="set.autoComplete" label="자동완성" :disabled="getType === 'number' || getType === 'password'"></comp-switch-btn>
                                            <hr />
                                            <div class="grp">
                                                <strong>초기화 버튼</strong>
                                                <comp-radio-grp id="set_resetBtn" name="resetBtn" v-model="set.resetBtn.value" :opts="set.resetBtn.opts" :box="true"></comp-radio-grp>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_readOnly" class="is-small" v-model="set.activeZeroLength" label="빈값 버튼 활성화"></comp-switch-btn>
                                            <comp-switch-btn id="set_readOnly" class="is-small" v-model="set.readOnly" :disabled="getType === 'dbClickActive'" label="읽기전용"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" :disabled="getType === 'dbClickActive'" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac" style="margin-bottom: 10px">
                                            <comp-input-box
                                                id="input_demo"
                                                :class="getSize"
                                                v-model="datas.value"
                                                :type="getType"
                                                :min="getType === 'number' && set.min"
                                                :max="getType === 'number' && set.max"
                                                :minlength="getType != 'number' && set.min != '' ? Number(set.min) : null"
                                                :maxlength="getType != 'number' && set.max != '' ? Number(set.max) : null"
                                                :autocomplete="getType != 'number' && getType != 'password' && set.autoComplete ? datas.opts : null"
                                                :disableZeroLength="!set.activeZeroLength"
                                                :style="getWid"
                                                :readonly="set.readOnly"
                                                :disabled="set.disabled"
                                                :disabled-reset="set.resetBtn.value == 2"
                                                :focusResetVisible="set.resetBtn.value == 1"
                                                :validation="getType === 'password' ? setValidatePw : null"
                                                :forbidden-chars="getForbidden"
                                                :placeholder="getType === 'dbClickActive' ? '입력하세요.' : ''"
                                                @search="evtSearch">
                                                <comp-selectbox v-if="set.inputSelect" slot="inputSelect" id="input_select" :class="getSize" v-model="datas.selectValue" :opts="datas.selectOpts"></comp-selectbox>
                                            </comp-input-box>
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
import sampleData from './VirtualSample.json';
export default {
    name: 'component-input-box',
    data() {
        return {
            datas: {
                value: '',
                opts: [
                    { code: '1', value: '자동완성 1' },
                    { code: '2', value: '자동완성 2' },
                    { code: '3', value: '자동완성 3' },
                    { code: '4', value: '자동완성 4' },
                    { code: '5', value: '자동완성 5' },
                    { code: '6', value: '자동완성 6' },
                    { code: '7', value: '자동완성 7' },
                    { code: '8', value: '자동완성 8' },
                    { code: '9', value: '자동완성 9' },
                    { code: '10', value: '자동완성 10' },
                ],
                selectValue: '',
                selectOpts: [
                    { code: '1', name: '채널' },
                    { code: '2', name: '제목' },
                    { code: '3', name: '본문' },
                ],
            },
            set: {
                readOnly: false,

                activeZeroLength: false,
                resetBtn: {
                    value: 0,
                    opts: [
                        { code: 0, name: '사용' },
                        { code: 1, name: '포커스' },
                        { code: 2, name: '미사용' },
                    ],
                },
                autoComplete: false,
                min: '',
                max: '',
                forbiddenValue: '',
                inputSelect: false,
                size: {
                    width: '',
                    value: 1,
                    opts: [
                        { code: 0, name: 'Small', className: 'is-small' },
                        { code: 1, name: 'Normal', className: '' },
                        { code: 2, name: 'Large', className: 'is-large' },
                        { code: 3, name: 'X-Large', className: 'is-xlarge' },
                    ],
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: 'text' },
                        { code: 1, name: 'search' },
                        { code: 2, name: 'number' },
                        { code: 3, name: 'password' },
                        { code: 4, name: 'dbClickActive' },
                    ],
                },
            },
            sampleDatas: [],
        };
    },
    computed: {
        getSize() {
            return this.set.size.opts.getParseDatas({ code: this.set.size.value })[0].className;
        },
        getWid() {
            const size = this.set.size.width && this.set.size.width.length ? this.set.size.width + 'px' : 'auto';
            return `width: ${size}`;
        },
        getType() {
            return this.set.type.opts.getParseDatas({ code: `${this.set.type.value}` })[0].name;
        },

        getForbidden() {
            return !this.set.forbiddenValue ? null : this.set.forbiddenValue.split(',');
        },
    },
    watch: {
        'set.type.value': function (val) {
            this.datas.value = '';
            this.set.min = '';
            this.set.max = '';
            this.set.forbiddenValue = '';
        },
    },

    methods: {
        setValidatePw(val) {
            let msg = null;
            if (this.datas.value.trim().length < 4) {
                msg = '비밀번호는 최소4자리 입니다.';
            } else if (this.datas.value.trim().length === 4) {
                msg = true;
            }

            return msg;
        },

        // 가상스크롤 테스트
        parsingTest() {
            const data = sampleData;
            data.mkt_name.map((item, idx) => {
                this.sampleDatas.push({ code: idx, value: item.mkt_name });
            });
        },

        evtSave(e) {
            console.log('save', e);
        },
        evtSearch(e) {
            console.log('search', e);
        },
    },
};
</script>

<style></style>
