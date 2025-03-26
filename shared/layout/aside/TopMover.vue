<template>
    <button class="top_btn" @click="goToTop"><span>TOP</span></button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'comp-side-follow-top-btn',
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['getUseageLNB']),
    },
    methods: {
        goToTop() {
            window.scrollTo({ top, behavior: 'smooth' });
        },
    },

    mounted() {},
};
</script>

<style></style>
