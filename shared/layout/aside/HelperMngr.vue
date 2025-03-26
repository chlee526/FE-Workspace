<template>
    <div class="helper">
        <strong class="title">도움말</strong>
        <comp-switch-btn id="all_helper_toggle" v-model="helpEnable" class="is-small" @click="evt_click"></comp-switch-btn>
    </div>
</template>

<script>
export default {
    name: 'comp-side-follow-helper',
    data() {
        return {
            helpEnable: this.$store.getters.getHelperEnable,
        };
    },
    watch: {
        helpEnable: function ($val) {
            if (this.$store.getters.getHelperEnable != $val) this.$store.commit('setting/SET_HELPERENABLE', $val);
        },
        '$store.getters.getHelperEnable': function ($val) {
            this.helpEnable = $val;
        },
    },
    methods: {
        evt_click: function () {
            this.$store.commit('setting/SET_HELPERENABLE', this.helpEnable);
            // this.$store.EventBus.$emit('SET_ALL_HELPER', this.helpEnable);
        },
    },
};
</script>
