<template>
    <!-- <div ref="container" class="dcp inputBox" :class="type == null && disabledReset == true ? 'disabled_reset' : type === 'dbClickActive' ? 'is-dbClickActive' : type" @click="$emit('click')"> -->
    <div ref="container" class="dcp inputBox" :class="[{ disabled_reset: type == null && disabledReset == true }, { 'is-dbClickActive': type === 'dbClickActive' }, { 'is-search': type === 'search' }]" @click="$emit('click')">
        <!-- Type : Text, Search, Password -->
        <div v-if="type != 'number' && type !== 'dbClickActive'" class="input" :class="{ 'is-pass': type == 'password', 'is-use-select': $slots.inputSelect, 'is-focused': $slots.inputSelect && isFocused }">
            <!-- 검색 카테고리 슬롯 -->
            <div v-if="$slots.inputSelect" class="input-select" @mouseenter="isFocused = true" @mouseleave="isFocused = false"><slot name="inputSelect"></slot></div>

            <!-- 타입이 패스워드일 경우 유효성검사 -->
            <comp-bubble-box v-if="type == 'password'" class="is-validation password" :content="errMsg" :arrow-fixed="true" :show-fixed="validateChk" :pos="bubblePosition">
                <input ref="input" :id="id" :class="$vnode.data.staticClass" v-model="inputValue" :type="type" :name="name" :minlength="minlength" :maxlength="maxlength" :placeholder="getPlaceholder" :readonly="readonly" :disabled="disabled" :autocomplete="disablePwdAutoComplete ? 'new-password' : 'off'" @input="evt_input" @change="validation ? getValidate : checkPassword" @keydown.tab="evt_keydown_tab" @keyup.enter="evt_keyup_enter" @focus="evt_focus" @blur="evt_blur" />
                <label :for="id" class="ui_invisible">{{ getLabel }}</label>
                <button v-if="type == 'password'" class="btn_passVisible" :class="{ 'is-active': passVisible }" type="button" @click="passVisible = !passVisible" tabindex="-1"></button>
            </comp-bubble-box>

            <!-- props 에 minlength(최소글자수) 값이 있거나 validation 있을 경우 -->
            <comp-bubble-box v-else-if="minlength || minlength === 0 || validation" class="is-validation" :content="errMsg" :arrow-fixed="true" :show-fixed="validateChk" :pos="bubblePosition">
                <input
                    ref="input"
                    :id="id"
                    :type="type"
                    :class="[$vnode.data.staticClass, { 'is-focus-reset': focusResetVisible }]"
                    v-model="inputValue"
                    :name="name"
                    :minlength="minlength"
                    :maxlength="maxlength"
                    :placeholder="getPlaceholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    autocomplete="off"
                    @input="evt_input"
                    @change="evt_change"
                    @compositionend="evt_compositionend"
                    @keydown="evt_keydown"
                    @keydown.tab="evt_keydown_tab"
                    @keyup="validation ? getValidate : evt_keyup()"
                    @keyup.enter="evt_keyup_enter"
                    @focus="evt_focus"
                    @blur="evt_blur"
                    @mouseenter="isFocused = true"
                    @mouseleave="isFocused = false" />
                <label :for="id" class="ui_invisible">{{ getLabel }}</label>

                <button v-if="resetBtnChk && !focusResetVisible" ref="reset" class="btn_reset" type="button" tabindex="-1" :readonly="readonly" :disabled="val.length <= 0" @click="evt_click_reset"></button>
                <!-- focusResetVisible 일경우 -->
                <button v-else-if="focusResetVisible && showResetBtn" ref="reset" class="btn_reset" type="button" tabindex="-1" :readonly="readonly" :disabled="val.length <= 0" @click="evt_click_reset"></button>

                <div class="search" v-if="type == 'search'">
                    <button ref="search" class="btn_search" type="button" :disabled="disableSearch" @click="evt_click_search"></button>
                </div>
            </comp-bubble-box>
            <template v-else>
                <input ref="input" :id="id" :class="[$vnode.data.staticClass, { 'is-focus-reset': focusResetVisible }]" v-model="inputValue" :type="type" :name="name" :minlength="minlength" :maxlength="maxlength" :placeholder="getPlaceholder" :readonly="readonly" :disabled="disabled" autocomplete="off" @input="evt_input" @change="evt_change" @compositionend="evt_compositionend" @keydown="evt_keydown" @keydown.tab="evt_keydown_tab" @keyup="evt_keyup" @keyup.enter="evt_keyup_enter" @focus="evt_focus" @blur="evt_blur" @mouseenter="isFocused = true" @mouseleave="isFocused = false" />
                <label :for="id" class="ui_invisible">{{ getLabel }}</label>

                <button v-if="resetBtnChk && !focusResetVisible" ref="reset" class="btn_reset" type="button" tabindex="-1" :data-id="id" :readonly="readonly" :disabled="val.length <= 0" @click="evt_click_reset"></button>
                <!-- focusResetVisible 일경우 -->
                <button v-else-if="focusResetVisible && showResetBtn" ref="reset" class="btn_reset" type="button" tabindex="-1" :data-id="id" :readonly="readonly" :disabled="val.length <= 0" @click="evt_click_reset"></button>

                <div class="search" v-if="type == 'search'">
                    <button ref="search" class="btn_search" type="button" :disabled="val.length <= 0 && disableZeroLength" @click="evt_click_search"></button>
                </div>
            </template>

            <!-- 자동완성  -->
            <transition name="fade_posy">
                <virtual-list v-if="isAutoComplete && isOpen" ref="atcList" id="atcList" class="atc_list" :data-sources="computedItems" :data-component="item" data-key="code" :extra-props="{ val, activeAtcItemIdx, evt_actItem_click, getAtcItemSelect }" v-atcInit v-click-outside="evt_docClick" v-behavior-scroll-resize="evt_resizeScroll"></virtual-list>
            </transition>
        </div>
        <!-- Type : Number -->
        <div v-if="type === 'number'" class="input">
            <!-- props 에 validation 있을 경우 -->
            <comp-bubble-box v-if="validation" class="is-validation" :content="errMsg" :arrow-fixed="true" :show-fixed="validateChk" :pos="bubblePosition">
                <input ref="input" :id="id" class="input" :class="$vnode.data.staticClass" v-model="inputValue" :type="type" :name="name" :min="min" :max="max" :minlength="minlength" :maxlength="maxlength" :placeholder="getPlaceholder" :readonly="readonly" :disabled="disabled" autocomplete="off" @input="evt_input" @keypress="evt_keypress" @keydown="$emit('keydown', $event)" @keydown.tab="evt_keydown_tab" @keyup="validation && getValidate" @keyup.enter="evt_keyup_enter" @focus="evt_focus" @blur="evt_blur" />
                <label :for="id" class="ui_invisible">{{ getLabel }}</label>
            </comp-bubble-box>

            <input v-else ref="input" :id="id" class="input" :class="$vnode.data.staticClass" v-model="inputValue" :type="type" :name="name" :min="min" :max="max" :minlength="minlength" :maxlength="maxlength" :placeholder="getPlaceholder" :readonly="readonly" :disabled="disabled" autocomplete="off" @input="evt_input" @keypress="evt_keypress" @keydown="$emit('keydown', $event)" @keydown.tab="evt_keydown_tab" @keyup.enter="evt_keyup_enter" @blur="evt_blur" />
            <label :for="id" class="ui_invisible">{{ getLabel }}</label>
        </div>

        <!-- Type : dbClickActive -->
        <div v-if="type === 'dbClickActive'" ref="uiInput" class="input" :class="$vnode.data.staticClass" @mouseenter="evt_mouseover" @mouseleave="evt_mouseleave">
            <div class="is-not-active" :class="{ 'is-hide': isActive }" @dblclick.stop="evtDbClick" @blur="evt_blur">
                <span :class="{ 'is-placeholder': !val && placeholder }">{{ !val ? placeholder : val }} </span>

                <transition name="fade"><button v-if="!isActive && editBtnVisible" class="btn_edit" ref="edit" type="button" tabindex="-1" @click="evt_click_edit"></button></transition>
            </div>

            <input v-if="isActive" type="text" ref="input" :id="id" :class="[$vnode.data.staticClass, { 'is-hide': !isActive }]" :value="dbClickActiveValue" autocomplete="off" :placeholder="getPlaceholder" @blur="evt_blur" @input="evt_input" @change="evt_change" @compositionend="evt_compositionend" @keydown="evt_keydown" @keyup.enter="evt_keyup_enter" />
            <label :for="id" class="ui_invisible">{{ getLabel }}</label>
            <button v-if="isActive" ref="reset" class="btn_reset" type="button" tabindex="-1" :disabled="disableResetBtn" @click="evt_click_reset"></button>
            <button v-if="isActive" ref="save" class="btn_save" type="button" tabindex="-1" :disabled="disableSaveBtn" @click="evt_click_save"></button>
        </div>
    </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import { throttle, memoize, debounce, isString } from 'lodash';
import $ from 'jquery';

import AtcItem from './AtcItem'; // 자동완성 목록 아이템 컴포넌트(가상스크롤 라이브러리 사용을 위해 컴포넌트로 분리)

export default {
    name: 'comp-input-box',
    data() {
        return {
            passVisible: true,
            errMsg: '',
            validateChk: false,
            minlengthChk: false,
            disableSearch: false,
            isOpen: false, // 자동완성 목록 open check
            activeAtcItemIdx: -1,
            listScrollTop: 0,
            item: AtcItem,
            actItemSelect: false, // 자동완성 아이템 선택 여부
            keydown: false,
            prevDatas: [],
            showResetBtn: false,
            inputCompositionVal: '',
            evtComposition: false,
            inputValue: this.value,
            // filteredList: this.autocomplete || [],
            isAutoComplete: false,
            inputTimer: null,
            dbClickActiveValue: this.value,
            isActive: false,
            disableSaveBtn: false,
            disableResetBtn: false,
            editBtnVisible: false,
            isFocused: false,
        };
    },
    components: {
        'virtual-list': VirtualList,
    },
    props: {
        id: { type: String },
        name: { type: String },
        value: { type: [String, Number] },
        type: { type: String, default: 'text' },
        disabled: { default: false },
        label: { type: String },
        readonly: {},
        min: {},
        max: {},
        disabledReset: { type: Boolean, default: false }, // 리셋 버튼 미사용
        focusResetVisible: { type: Boolean, default: false }, // 포커스 되었을 때 리셋 버튼 보여짐
        validation: { type: Function, default: null }, // 비밀번호 유효성 검사 (기본 정책 과 다른 경우)
        placeholder: { type: String },
        maxlength: { type: Number }, // 최대 글자수
        minlength: { type: Number }, // 최소 글자수
        disableZeroLength: { type: Boolean, default: false }, //최소 글자수 설정 시 빈 값일 때 검색 버튼 활성화 여부
        autocomplete: { default: null }, // 자동완성 목록
        forbiddenChars: {}, //입력 금지 문자 또는 단어
        bubblePosition: { type: String, default: 'LB' }, //유효성 검사시 tooltip 위치
        disablePwdAutoComplete: { type: Boolean, default: false }, // 비밀번호 브라우저 자동완성 제어
        focusAutocompleteShow: { type: Boolean, default: false }, // 포커스 되었을때 자동완성 목록 보여짐
        preventTab: { type: Boolean, default: false }, // keyDown.tab 이벤트 막을경우 사용(포커스 이동 X)
    },
    computed: {
        val: {
            get: function () {
                return this.value;
            },
            set: function ($val) {
                if (this.isAutoComplete && $val == '' && this.evtComposition) $val = this.inputCompositionVal;

                // type이 number인데, min/max가 설정되면 최소입력 최대입력에 대해서 임의 변경 처리
                if (this.type === 'number') {
                    $val = Number(String($val).replace(/[^0-9]/g, ''));
                    // if ($val < this.min) $val = this.min;
                    // if ($val > this.max) $val = this.max;
                }

                this.inputValue = $val;
                this.$emit('input', this.type === 'number' ? Number($val) : $val);
            },
        },

        computedItems() {
            return this.filteredList.map((item, index) => {
                item.key = `item_${index}`;
                return item;
            });
        },

        saveBtnChk() {
            return this.disableZeroLength && this.$refs.input.value.trim().length <= 0;
        },

        getLabel: function () {
            return this.label ? this.label : '입력';
        },

        getPlaceholder: function () {
            return this.disabled ? '입력불가' : this.placeholder;
        },

        // 리셋버튼 보여짐 체크 (읽기전용/미사용일 때는 x아이콘 안나오게)
        resetBtnChk() {
            return this.type != 'number' && this.type != 'password' && this.disabledReset == false && this.readonly !== '' && (this.readonly == undefined || this.readonly == false) && this.disabled !== '' && (this.disabled == undefined || this.disabled == false);
        },

        // 자동완성 목록
        filteredList() {
            if (this.isAutoComplete) {
                return this.getAutocompleteList.filter((item) => (item.value || item.name).toLowerCase().indexOf(this.inputValue.toLowerCase()) >= 0);
            }
            return [];
        },

        getThrottleTime() {
            return this.isAutoComplete ? 100 : 0;
        },

        getAutocompleteList() {
            if (this.isOpen) {
                if (isString(this.autocomplete)) return this.$store.getters[this.autocomplete];
                else return this.autocomplete;
            }
            return [];
        },
    },

    mounted() {},

    watch: {
        autocomplete: {
            immediate: true,
            handler(val) {
                this.isAutoComplete = val !== null;
            },
        },
        passVisible: function ($val) {
            if ($val) {
                this.$refs.input.type = 'password';
            } else {
                this.$refs.input.type = 'text';
            }
        },
        val($val) {
            if ($val.length === 0) {
                // 검색어가 0글자 일 때 검색 가능 여부에 따라 버튼 활성화
                if (this.disableZeroLength) this.disableSearch = true;
                this.isOpen = false;
            } else {
                if (this.disableZeroLength) this.disableSearch = false;
                // if (this.isAutoComplete) this.prevDatas = this.autocomplete.filter((item) => (item.value || item.name).toLowerCase().indexOf(this.val.toLowerCase()) >= 0);
            }
            this.validation ? this.getValidate() : this.checkLength();
            this.inputValue = $val;
            this.dbClickActiveValue = $val;
        },

        type(val) {
            this.errMsg = '';
            this.validateChk = false;
        },

        // 자동완성 목록 활성화 아이템 기준으로 스크롤 이동
        activeAtcItemIdx(val) {
            if (this.activeAtcItemIdx >= 0) {
                const item = document.querySelectorAll(`.is-active-atc`);
                const selItemPosY = item.length > 0 ? item[0].offsetTop - this.$refs.atcList?.$el.scrollTop - 40 : 0;
                const delta = selItemPosY + 25 - this.$refs.atcList?.$el.offsetHeight;
                if (delta > 0) {
                    this.listScrollTop = this.$refs.atcList?.$el.scrollTop + delta;
                } else {
                    this.listScrollTop = Math.max(0, this.$refs.atcList?.$el.scrollTop + selItemPosY);
                }
            }
        },

        listScrollTop(val) {
            if (this.$refs.atcList) this.$refs.atcList.$el.scrollTop = val;
        },

        isOpen(val) {
            if (!val) {
                this.activeAtcItemIdx = -1;
                this.evtComposition = false;
            }
        },

        inputValue(val) {
            // if (this.forbiddenChars) this.removeForbiddenCharacter(val);
            if (!this.evtComposition && !val.length) this.isOpen = false;
        },

        /** 빈값 버튼 활성화 사용 여부 */
        disableZeroLength(val) {
            if (!val) {
                if (this.val.trim().length === 0) this.disableSearch = false;
            } else {
                if (this.val.trim().length === 0) this.disableSearch = true;
            }
        },
    },
    methods: {
        // Watcher
        // setAutocomplete(val) {
        //     this.isAutoComplete = val !== null;
        // },

        // 더블클릭 이벤트
        evtDbClick(e) {
            this.isActive = true;
            this.editBtnVisible = false;
            this.setDisableSaveBtn();

            setTimeout(() => {
                this.$refs.input.focus();
            }, 50);
        },

        evt_click_edit() {
            this.isActive = true;
            this.setDisableSaveBtn();

            setTimeout(() => {
                this.$refs.input.focus();
            }, 50);
        },
        // dbClickActive 타입에서 사용하는 mouseover 이벤트
        evt_mouseover(e) {
            if (!this.isActive) this.editBtnVisible = true;
        },
        // dbClickActive 타입에서 사용하는 mouseleave 이벤트
        evt_mouseleave(e) {
            // if (e.toElement === this.$refs.edit) return;
            if (!this.isActive) this.editBtnVisible = false;
        },

        // 저장버튼 disable 체크
        setDisableSaveBtn() {
            setTimeout(() => {
                if (this.disableZeroLength && this.$refs.input.value.trim().length <= 0) {
                    this.disableSaveBtn = true;
                    this.disableResetBtn = true;
                } else if (this.$refs.input.value.trim().length <= 0) {
                    this.disableResetBtn = true;
                    this.disableSaveBtn = false;
                } else {
                    this.disableResetBtn = false;
                    this.disableSaveBtn = false;
                }
            }, 100);
        },

        // 비밀 번호 유효성 검사 (기본 정책: 최소 자릿수 체크)
        checkPassword() {
            if (!this.validation) {
                const pw = this.val;
                const characters = Number(process.env.VUE_APP_PW_CHARACTERS);
                if (pw.length == 0) {
                    this.validateChk = false;
                    this.errMsg = '';
                } else if (pw.length < characters) {
                    this.validateChk = true;
                    this.errMsg = `비밀번호는 최소${characters}자리 입니다.`;
                    return;
                } else {
                    this.validateChk = false;
                    this.errMsg = '';
                }
            }
        },
        /* minlength 있을 경우 최소 글자수 체크 */
        checkLength() {
            if (this.minlength || this.minlength === 0) {
                /** 빈값 버튼 활성화 사용시에는 검색 버튼 활성화 */
                if (!this.disableZeroLength && this.val.trim().length === 0) {
                    this.disableSearch = false;
                    this.validateChk = false;
                    this.errMsg = '';
                } else if (this.val.trim().length === 0 || this.val.trim().length < this.minlength) {
                    this.validateChk = true;
                    this.disableSearch = true;
                    this.errMsg = `${this.minlength}글자 이상 입력해주세요.`;
                } else {
                    this.validateChk = false;
                    this.disableSearch = false;
                    this.errMsg = '';
                }
            }
        },

        /*  props 에 validation 가 있을 경우 */
        getValidate() {
            const inputElm = this.$refs.input;
            const result = this.validation();

            switch (typeof result) {
                case 'string':
                    this.errMsg = result;
                    this.validateChk = true;
                    this.disableSearch = true;
                    inputElm.classList.add('is-error');
                    inputElm.classList.remove('is-success');
                    break;

                case 'boolean':
                    this.errMsg = '';
                    this.validateChk = false;
                    this.disableSearch = false;
                    inputElm.classList.toggle('is-success', result);
                    inputElm.classList.remove('is-error');
                    break;

                default:
                    this.errMsg = '';
                    this.validateChk = false;
                    this.disableSearch = false;
                    inputElm.classList.remove('is-error', 'is-success');
                    break;
            }
        },

        /* 입력 금지 문자 제거  */
        removeForbiddenCharacter(val) {
            if (!this.isAutoComplete) {
                const regex = Array.isArray(this.forbiddenChars) ? new RegExp(`${this.forbiddenChars.join('|')}`, 'g') : this.forbiddenChars;
                const result = val.replaceAll(regex, '') || '';
                this.$refs.input.value = result;

                return result;
            }
        },

        evt_resizeScroll() {
            if (this.isOpen) {
                this.isOpen = false;
                this.activeAtcItemIdx = -1;
                this.$refs.input.blur();
            }
        },

        evt_docClick() {
            if (this.isAutoComplete) this.isOpen = false;
        },

        evt_click_reset: function (e) {
            if (this.type === 'dbClickActive') {
                this.dbClickActiveValue = '';
                this.$refs.input.value = '';
            } else {
                if (this.val == '') return;
                this.val = '';
            }
            this.setDisableSaveBtn();
            this.evtComposition = false;

            this.$refs.input.focus();
            this.$emit('reset');
        },

        evt_click_save(e) {
            if (this.disableZeroLength) {
                if (this.$refs.input.value.trim().length <= 0) return;
            }
            this.dbClickActiveValue = this.$refs.input.value;
            this.val = this.dbClickActiveValue;
            this.$emit('save', this.$refs.input.value);

            setTimeout(() => {
                this.$refs.input.blur();
                this.isActive = false;
            }, 100);
        },

        evt_click_search: function () {
            this.$emit('search', this.value);
        },

        // 자동완성 아이템 선택 여부 확인
        getAtcItemSelect(itemElm) {
            if (document.getElementById('atcList').contains(itemElm)) {
                this.actItemSelect = true;
            } else {
                this.actItemSelect = false;
            }
        },

        // 자동완성 목록 아이템 선택(click)
        evt_actItem_click(val) {
            this.val = val;
            // this.inputValue = val;
            this.isOpen = false;
            this.$refs.input.focus();
        },

        // 자동완성 목록 아이템 선택(enter)
        setSelectedItem(item) {
            this.val = item.value || item.name;
            setTimeout(() => {
                this.activeAtcItemIdx = -1;
            }, 100);
        },

        evt_focus(e) {
            this.showResetBtn = true;
            this.validation ? this.getValidate() : this.checkLength();
            this.isFocused = true;
            if (this.autocomplete && this.focusAutocompleteShow) this.isOpen = true;
            this.$emit('focus', false);
        },

        evt_blur(e) {
            this.val = this.inputValue;
            this.validateChk = false;
            this.errMsg = '';
            this.isFocused = false;

            // type이 number인데, min/max가 설정되면 최소입력 최대입력에 대해서 임의 변경 처리
            if (this.type === 'number') {
                if (this.min && this.min >= 0) {
                    if (this.val < this.min) this.val = this.min;
                }
                if (this.max && this.max >= 0) {
                    if (this.val > this.max) this.val = this.max;
                }
            }

            if (this.type === 'dbClickActive') {
                if ((e.target !== this.$refs.input && e.relatedTarget !== this.$refs.save && e.relatedTarget !== this.$refs.reset) || !this.$el.contains(e.relatedTarget)) {
                    this.dbClickActiveValue = this.val;
                    this.isActive = false;
                    this.editBtnVisible = false;
                    this.isHovered = false;
                }
                if (e.target !== this.$refs.input) this.$emit('blur', false);
            } else {
                if (e.relatedTarget == this.$refs.search || !this.$el.contains(e.relatedTarget)) this.showResetBtn = false;
                this.$emit('blur', false);
            }

            // 자동완성 아이템 선택 외의 상황에서 실행
            if (!this.actItemSelect) {
                setTimeout(() => {
                    this.isOpen = false;
                }, 100);
            }
        },

        /* 한글 입력시 바인딩 오류를 방지하기 위한 코드  */
        evt_compositionend(e) {
            if (this.forbiddenChars) e.target.value = this.removeForbiddenCharacter(e.target.value);
            if (this.val.length < 2 || this.inputValue.length < 2) this.evtComposition = true;
            this.inputCompositionVal = e.target.value;
        },
        evt_change(e) {
            if (this.forbiddenChars) this.val = this.removeForbiddenCharacter(e.target.value);
            this.$emit('change');
        },
        evt_input(e) {
            if (this.forbiddenChars) {
                const value = e.inputType === 'insertText' && (e.data === ' ' || e.target.value.match(/[\n]/)) ? this.removeForbiddenCharacter(e.target.value) : e.target.value;
                this.val = value;
            }

            // 한글 입력시 compositionend 이전에 인터랙션이 일어나는 경우 한글 잔재 제거
            if (e.inputType == 'insertText' && /^[가-힣]*$/.test(e.data) && e.data !== ' ') {
                e.target.value = [...e.target.value].slice(0, -1).join('');
            }

            if (this.type === 'dbClickActive') {
                this.dbClickActiveValue = this.$refs.input.value;
                this.setDisableSaveBtn();
            } else {
                clearTimeout(this.inputTimer);
                this.inputTimer = setTimeout(this.evt_inputThrottle, this.getThrottleTime, e);
                if (this.isAutoComplete) this.isOpen = true;
            }
        },
        evt_inputThrottle(e) {
            this.val = e.target.value;
        },

        evt_keypress: function (e) {
            if (e.keyCode == 43 || e.keyCode == 45) {
                e.preventDefault();
            }
        },

        evt_keydown(e) {
            this.evtComposition = false;

            if (this.type === 'dbClickActive') {
                // ESC
                if (e.keyCode == 27) {
                    this.dbClickActiveValue = this.val;
                    setTimeout(() => {
                        this.isActive = false;
                        this.$refs.input.blur();
                    }, 100);
                }
            }

            if (this.isAutoComplete) {
                // Tab
                if (e.keyCode == 9) {
                    this.showResetBtn = false;
                    this.isOpen = false;
                }
                // Up
                if (e.keyCode == 38) {
                    e.preventDefault();
                    let idx = Math.max(this.activeAtcItemIdx - 1, -1);
                    setTimeout(() => {
                        this.activeAtcItemIdx = idx;
                    }, 60);
                }
                // Down
                if (e.keyCode == 40) {
                    e.preventDefault();
                    if (this.isAutoComplete) {
                        this.isOpen = true;
                        let idx = Math.min(this.activeAtcItemIdx + 1, this.filteredList.length - 1);
                        setTimeout(() => {
                            this.activeAtcItemIdx = idx;
                        }, 60);
                    }
                }
            }

            this.$emit('keydown', e);
        },

        evt_keyup(e) {
            this.checkLength();
        },

        evt_keyup_enter($e) {
            // 글자수 검사
            if (this.minlength) {
                if (this.disableSearch) return;
            }
            if (this.isAutoComplete) {
                if (this.filteredList[this.activeAtcItemIdx]) {
                    this.setSelectedItem(this.filteredList[this.activeAtcItemIdx]);
                    $e.target.value = this.filteredList[this.activeAtcItemIdx]?.value || this.filteredList[this.activeAtcItemIdx]?.name;
                }
                this.isOpen = false;
            }
            // 자동완성일때 blur 안되게(시장센싱)
            if (!this.isAutoComplete) this.$refs.input.blur();

            if (this.type === 'search') {
                this.$emit('search', $e.target.value);
            }

            if (this.type === 'dbClickActive') {
                if (this.disableZeroLength) {
                    if (this.$refs.input.value.trim().length <= 0) return;
                }
                this.dbClickActiveValue = this.$refs.input.value;
                this.val = this.$refs.input.value;
                this.$emit('save', this.$refs.input.value);
            }
            this.$emit('keyup', $e.target.value);
            this.$emit('keyupEnter', $e);
            this.$emit('enter');
        },

        evt_keydown_tab($e) {
            // 자동완성목록아이템 중 포커스된 아이템 선택
            if (this.isAutoComplete && this.filteredList[this.activeAtcItemIdx]) this.setSelectedItem(this.filteredList[this.activeAtcItemIdx]);

            /**
             * 'preventTab' true 일 경우 포커스 이동 막음. false 일 경우만 포커스 이동
             * 2024-06-18
             * 이창환
             * 시장센싱에서 tab 이벤트 제한을 두기 위해 추가
             */
            // this.$refs.input.blur();
            if (!this.preventTab) this.$refs.input.blur();
            this.$emit('tab', $e);
        },
    },

    directives: {
        model: {
            update: function ($el, $binding, $vnode) {
                if ($binding.modifiers.numberRange) {
                    var result = String($binding.value).replace(/[^0-9]/g, '');
                    if ($vnode.data.attrs.min && Number(result) < $vnode.data.attrs.min) {
                        result = $vnode.data.attrs.min;
                    }
                    if ($vnode.data.attrs.max && Number(result) > $vnode.data.attrs.max) {
                        result = $vnode.data.attrs.max;
                    }
                    $vnode.context[$binding.expression] = result;
                    $el.value = result;
                }
            },
        },
        atcInit: {
            inserted: function (el, binding, vnode) {
                el.style.width = vnode.context.$vnode.elm.clientWidth + 'px';
                el.style.top = vnode.context.$vnode.elm.getBoundingClientRect().top + vnode.context.$vnode.elm.clientHeight + 2 + 'px';
                el.style.left = vnode.context.$vnode.elm.getBoundingClientRect().left + 'px';
            },
        },
    },
};
</script>
