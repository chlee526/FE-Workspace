<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>도움말</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap" v-html="getHelperContent.sample"></div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <comp-bubble-box class="is-helper" :html-type="true" pos="LB">
                                                <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                                <div class="ui_help" slot="html-content" v-html="getHelperContent.sample"></div>
                                            </comp-bubble-box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'component-helper',
    computed: {
        ...mapGetters(['getHelperContent']),
    },
};
</script>

<style></style>
