<template>
    <div class="item" :class="{ 'is-dims': getNotActive }">
        <span class="bg" @click="$emit('select')"></span>
        <comp-input-box :id="id" class="input" v-model="inputText" :disabled-reset="!mdfy" placeholder="검색그룹명 입력" :readonly="!mdfy" @keyup="evt_mdfy_confirm_click" @click="$emit('select')" :maxlength="15"></comp-input-box>
        <button v-if="!mdfy" type="button" class="btn_mdfy" title="그룹명 수정" tabindex="-1" @click="evt_mdfy_click"><span class="icon">&#xe008;</span></button>
        <button v-else type="button" class="btn_mdfy_complete" title="수정완료" tabindex="-1" @click="evt_mdfy_confirm_click"><span class="icon">&#xe053;</span></button>
        <button type="button" class="btn_reset" title="초기화" tabindex="-1" @click="evt_reset_click"><span class="icon">&#xe020;</span></button>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'comp-modal-adv-detail-tab',

    data() {
        return {
            beforeText: '',
            inputText: this.value,
            mdfy: false,
        };
    },

    props: {
        id: { type: String, default: '' }, // ID
        value: {}, // V-Model
        adv: {},
    },

    computed: {
        values: {
            get() {
                console.log('get value', this.value);
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
        getNotActive() {
            return !this.adv.name.length && !this.adv.keyword_normal.length;
        },
    },
    mounted: function () {},
    watch: {
        mdfy($val) {
            if (!$val) $(document).unbind('click', this.evt_docClick);
        },
        value($val) {
            this.inputText = $val;
        },
    },
    methods: {
        evt_mdfy_click() {
            this.beforeText = this.inputText;

            this.mdfy = true;
            this.$el.querySelector('input').focus();
            this.$el.querySelector('input').select();

            $(document).unbind('click', this.evt_docClick);
            $(document).click(this.evt_docClick);
        },
        evt_mdfy_confirm_click() {
            this.values = this.inputText;
            this.mdfy = false;
            this.$emit('confirm');
        },
        evt_reset_click() {
            this.$emit('reset');
        },
        evt_docClick: function ($e) {
            if (!$.contains(this.$el, $e.target)) {
                this.inputText = this.beforeText;
                this.mdfy = false;
                $(document).unbind('click', this.evt_docClick);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
