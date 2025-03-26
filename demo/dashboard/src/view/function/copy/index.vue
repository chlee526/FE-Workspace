<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">ClipBoard Copy</h2>
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
                                            <h3><span>ClipBoard Copy</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/blob/devel/shared/utils/prototype/README.md#string" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>클립보드에 text 복사 기능</span>
                                                    </li>
                                                    <li>
                                                        <span>String Prototype 'copyClipBoard()'활용</span>
                                                    </li>
                                                    <li>
                                                        <span>사용법</span>
                                                        <ul>
                                                            <li>Noty 미사용 : 복사할 텍스트.copyClipBoard()</li>
                                                            <li>Noty 사용 : 복사할 텍스트.copyClipBoard(true)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>복사할 텍스트</strong>
                                                        <ul>
                                                            <li>복사할 텍스트 입력</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>Noty 사용 여부</strong>
                                                        <ul>
                                                            <li>클립보드에 복사 성공/실패 Noty 사용여부 설정</li>
                                                            <li>파라미터 미전달 또는 false : return 성공여부</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <span>복사할 텍스트</span>
                                                <comp-input-box id="copy_txt" class="is-small" v-model="copyTxt" style="width: 200px" placeholder="복사할 텍스트"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>Noty 사용 여부</span>
                                                <comp-switch-btn id="set_usedNoty" class="is-small" v-model="usedNoty"> </comp-switch-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap" style="text-align: center">
                                            <comp-button class="is-icon-with is-before" :title="copyTxt" @click="copyClipBoard(usedNoty)">
                                                <span class="icon icon-copy"></span>
                                                <span class="txt">{{ copyTxt }}</span>
                                            </comp-button>
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
export default {
    name: 'funciton-copy',
    data() {
        return {
            usedNoty: false,
            copyTxt: 'ClipBoard Copy',
        };
    },
    methods: {
        copyClipBoard(usedNoty) {
            const result = this.copyTxt.copyClipBoard(usedNoty);
            if (!usedNoty) alert('ClipBoard Copy 결과 : ' + result);
        },
    },
};
</script>

<style></style>
