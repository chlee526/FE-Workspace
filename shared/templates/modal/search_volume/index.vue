<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_search_volume" :class="{ 'is-loading': loading }" :style="'height:' + hgt + 'px'">
            <span class="bg" @click="close" :style="'height:' + hgt + 'px'"></span>
            <div class="header">
                <div class="wrap">
                    <h2>
                        <!-- 타이틀 -->
                        <strong>검색량</strong>

                        <!-- 서브 타이틀(추가정보) -->
                        <div class="sub_title">
                            <!-- 날짜 -->
                            <template v-if="searchParams">
                                <span v-if="searchParams.ps_date && searchParams.ps_date.date" class="ui_bedge" :title="searchParams.ps_date.date + '~' + searchParams.pe_date.date + '~ vs ' + searchParams.s_date.date + '~' + searchParams.e_date.date"
                                    >{{ searchParams.ps_date.date }} ~ {{ searchParams.pe_date.date }} vs <strong>{{ searchParams.s_date.date }} ~ {{ searchParams.e_date.date }}</strong></span
                                >
                                <span v-else class="ui_bedge" :title="searchParams.s_date.date + '~' + searchParams.e_date.date"
                                    ><strong>{{ searchParams.s_date.date }} ~ {{ searchParams.e_date.date }}</strong></span
                                >
                            </template>
                        </div>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
            </div>
            <div class="wrap">
                <div class="content" :class="{ 'is-loading': loading }" :style="'max-height:' + (hgt - contentHgt) + 'px'">
                    <div class="ui_row is-3dp">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box is-3dp">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>검색량 추이</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <a href="#" title="Excel 다운로드" class="ui_btn is-icon-only is-small"><span class="icon">&#xe005;</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">asdasd</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui_row is-3dp">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box is-3dp">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>성별/연령별/디바이스별 추이</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <a href="#" title="Excel 다운로드" class="ui_btn is-icon-only is-small"><span class="icon">&#xe005;</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content" style="height: 1000px">asdasd</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
export default {
    name: 'tmpl-modal-search_volume',
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
    computed: {},
    mounted: function () {},
    watch: {},
    methods: {
        close: function () {
            EventBus.$emit('MODAL_CLOSE', this.popName);
        },
    },
};
</script>

<style lang="scss" scoped>
.popup_item {
    > .header,
    > .wrap,
    > .footer {
        max-width: 700px !important;
    }
}
</style>
