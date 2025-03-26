<template>
    <div class="ui_image ui-loader-container" :class="[{ 'is-no-image': error }, { 'is-background': background }, { 'is-loading': loading }]">
        <span v-if="background" class="background" :style="background ? `background-image:url(${src})` : ''"></span>
        <img :src="src" @error="evt_error" />
    </div>
</template>

<script>
export default {
    name: 'comp-image',

    data() {
        return {
            error: false,
        };
    },

    mounted() {},
    props: {
        src: { type: String },
        background: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
    },
    watch: {
        src: function ($val) {
            this.error = false;
        },
    },

    methods: {
        evt_error: function ($e) {
            this.error = true;
        },
    },
};
</script>

<style lang="scss" scoped></style>
