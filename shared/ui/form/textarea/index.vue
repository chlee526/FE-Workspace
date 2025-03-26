<template>
    <div ref="container" class="dcp textarea" :style="getContainerStyle">
        <textarea ref="textarea" :id="id" @input="evt_input" @change="evt_input" @compositionend="evt_composEnd" @compositionupdate="evt_composUpdate" v-model="val" :disabled="disabled" :cols="cols" :rows="rows" :placeholder="placeholder" @focus="evt_focus" @mousedown="evt_mousedown" @blur="evt_blur" @keydown="evt_keyDown" @keyup="$emit('keyup', $event, val)" required></textarea>
    </div>
</template>

<script>
export default {
    name: 'comp-textarea',
    data() {
        return {
            useComposition: false,
            compositionValue: '',
        };
    },
    props: {
        id: {},
        value: {},
        disabled: {},
        cols: {},
        rows: {},
        placeholder: { type: String, default: '' },
        forbiddenChars: {}, //입력 금지 문자 또는 단어
        forbiddenKeys: { type: Array }, //입력 금지 키
    },
    computed: {
        val: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        getLabel() {
            return this.label ? this.label : '입력';
        },
        getPlaceholder() {
            return this.disabled != undefined ? '입력불가' : this.$vnode.data.attrs.placeholder;
        },
        getContainerStyle() {
            return this.cols ? `display: inline-block; width: auto` : ``;
        },
    },
    watch: {
        value(val) {
            this.val = val;
        },
    },
    methods: {
        /**
         * 입력 금지 문자 제거
         */
        removeForbiddenCharacter(val) {
            const regex = Array.isArray(this.forbiddenChars) ? new RegExp(`${this.forbiddenChars.join('|')}`, 'g') : this.forbiddenChars;
            const result = val.replaceAll(regex, '') || '';
            this.$refs.textarea.value = result;
            return result;
        },

        /**
         * Event - 키다운
         * 입력금지 키가 있는경우 리턴
         */
        evt_keyDown(e) {
            const valueArr = [...e.currentTarget.value];
            // 마지막 입력 글자 영어 일경우 useComposition = false
            if (/^[a-zA-Z]*$/.test(valueArr[valueArr.length - 1])) this.useComposition = false;

            if (this.forbiddenKeys?.map(Number).includes(e.keyCode)) e.preventDefault();
            this.$emit('keydown', e, this.val);
        },

        evt_input(e) {
            // 한글 입력시 compositionend 이전에 인터랙션이 일어나는 경우 한글 잔재 제거
            if (e.inputType == 'insertText' && /^[가-힣]*$/.test(e.data) && e.data !== ' ') {
                e.target.value = [...e.target.value].slice(0, -1).join('');
            }

            const value = (e.inputType === 'insertText' && (e.data === ' ' || e.target.value.match(/[\n]/))) || e.type === 'change' ? this.removeForbiddenCharacter(e.target.value) : e.target.value;
            this.val = value;
        },
        /**
         * Event - 마우스다운
         * 텍스트에어리어 내 마우스 다운시, 한글 사라지는 이슈 방지 하기 위해 value 업데이트
         */
        evt_mousedown(e) {
            if (this.useComposition) {
                this.val = this.compositionValue;
            }
        },

        evt_focus(e) {
            if (this.forbiddenChars) e.target.value = this.removeForbiddenCharacter(e.target.value);
            this.$emit('focus');
        },

        evt_composUpdate(e) {
            this.useComposition = true;
        },

        evt_composEnd(e) {
            if (this.forbiddenChars) e.target.value = this.removeForbiddenCharacter(e.target.value);
            this.compositionValue = e.target.value;
            this.useComposition = true;
            setTimeout(() => {
                this.useComposition = false;
            }, 0);
        },

        evt_blur(e) {
            if (this.useComposition) {
                // 한글 일 경우 마지막 글자 사라지는 이슈 방지를 위해 blur 이벤트시 value 업데이트
                this.val = this.compositionValue;
            }
            this.$emit('blur');
        },
    },
};
</script>

<style></style>
