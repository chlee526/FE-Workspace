<template>
    <div class="dcp_switch" :class="{ 'is-box': box }">
        <input v-if="radioGrp" ref="input" :id="id" type="radio" :name="radioName" v-model="checked" :value="val" :disabled="disabled" @click="evt_click" />

        <input v-else :id="id" ref="input" type="checkbox" v-model="checked" :value="val" :disabled="disabled" @click="evt_click" />
        <label :for="id" @click.stop>
            <strong v-if="label" class="txt">{{ label }}</strong>
            <div class="wrap"><span class="bg"></span><span class="anchor"></span></div>
        </label>
    </div>
</template>
<script>
export default {
    name: 'comp-switch-btn',
    data() {
        return {
            chk: false,
        };
    },
    props: {
        id: { type: String },
        val: {}, // 라디오 고유 값
        value: {}, //v-model 연결 값
        label: { type: String },
        box: { type: Boolean, default: false },
        radioGrp: { type: String },
        radioName: { type: String },
        disabled: { type: Boolean },
        valForm: {}, // return 값 필터링
    },
    computed: {
        checked: {
            get() {
                if (this.valForm) {
                    return this.valForm[0].code === this.value;
                }
                return this.value;
            },
            set(val, oldVal) {
                if (val == oldVal) return;
                if (this.valForm) {
                    let result = val ? this.valForm[0].code : this.valForm[1].code;
                    this.$emit('input', result);
                } else {
                    this.$emit('input', val);
                }
            },
        },
    },
    methods: {
        evt_click(evt) {
            setTimeout(() => {
                this.$emit('click', evt);
            }, 0);
        },
    },
};
</script>
