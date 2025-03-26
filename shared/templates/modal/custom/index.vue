<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_rel_info" :class="{ 'is-loading': loading }" :style="`height: ${hgt}px`">
            <span class="bg" @click="close" :style="'height:' + hgt + 'px'"></span>
            <div class="header" :style="getStyles">
                <div class="wrap">
                    <h2>
                        <!-- 타이틀 -->
                        <strong>{{ searchParams?.custom?.title || '사용자 팝업' }}</strong>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
            </div>
            <div class="wrap" :style="getStyles">
                <div class="content" :class="{ 'is-loading': loading }" :style="'max-height:' + (hgt - contentHgt) + 'px'" v-html="searchParams.custom.slot"></div>
            </div>
        </section>
    </div>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
export default {
    name: 'tmpl-modal-custom',
    data() {
        return {
            loading: false,
            contentHgt: 145,
        };
    },
    props: {
        popName: { type: String },
        searchParams: { type: Object },
        hgt: { type: Number },
        useAttrs: { default: false },
    },
    computed: {
        getStyles() {
            return this.searchParams?.custom?.styles || '';
        },
    },
    mounted: function () {},
    watch: {},
    methods: {
        close: function () {
            EventBus.$emit('MODAL_CLOSE', this.popName);
        },
    },
};
</script>

<style></style>
