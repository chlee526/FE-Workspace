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
                                            <h3><span>즐겨찾기</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/favorite" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>즐겨찾기 - 토글형 UI 컴포넌트, 체크박스와 같은 기능이지만, 단일구성</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : Font로 된 컴포넌트이며, 폰트 크기로 조정 가능</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>툴팁</strong> : 마우스 오버시 나오틑 툴팁(브라우저 기본 툴팁)의 텍스트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-input-box type="number" id="set_size" v-model="set.size" placeholder="크기" label="크기 입력" min="12" style="width: 120px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>툴팁(타이틀)</strong>
                                                <comp-input-box id="set_label" v-model="set.title" placeholder="툴팁" label="툴팁 입력" style="width: 120px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac">
                                            <comp-favorites id="favorite" v-model="set.value" :title="getTitle" :disabled="set.disabled" min="12" :style="getStyle"></comp-favorites>
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
    name: 'component-switch',
    data() {
        return {
            set: {
                size: 20,
                value: false,
                title: '관심',
                disabled: false,
            },
        };
    },
    computed: {
        getStyle() {
            return `font-size: ${this.set.size > 0 ? this.set.size + 'px' : '1em'};`;
        },
        getTitle() {
            return this.set.title?.length ? this.set.title : null;
        },
    },
};
</script>

<style></style>
