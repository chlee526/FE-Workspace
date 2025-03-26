<template>
    <footer v-if="getCopy">
        <div class="wrap" v-html="getCopy"></div>
    </footer>
</template>

<script>
export default {
    name: 'comp-footer',
    computed: {
        getCopy() {
            return process.env.VUE_APP_USEAGE_FOOTER;
        },
    },
};
</script>

<style></style>
