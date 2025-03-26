<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Image</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/image" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>이미지 컴포넌트, 비율 유지 시켜주며, 이미지 없는경우 자동으로 없는 상태로 변경</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 차트의 가로*세로 사이즈(px)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>백그라운드모드</strong> : 이미지 비율 유지가 되기 때문에, 비는 공간에 현재 이미지를 blur형태로 채워서 보여줌</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>이미지없음</strong> : 이미지를 못불러오거나, 이미지가 없는 경우</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>로딩</strong> : 이미지를 불러오는 중인 경우</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <comp-bubble-box content="차트의 가로 * 세로 크기 설정" pos="LB">
                                                    <span>크기</span>
                                                </comp-bubble-box>
                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" min="50" style="width: 70px"></comp-input-box>
                                                <comp-input-box id="set_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로크기 입력" min="50" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_bg_used" class="is-small" v-model="set.background" label="백그라운드모드"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_none_used" class="is-small" v-model="set.noneImg" label="이미지없음"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_loading" class="is-small" v-model="set.loading" label="로딩"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <comp-image :src="getUrl" :style="getSize" :background="set.background" :loading="set.loading"></comp-image>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-icon',
    data() {
        return {
            set: {
                size: {
                    wid: 200,
                    hgt: 200,
                },
                noneImg: false,
                background: false,
                loading: false,
            },
        };
    },
    computed: {
        getUrl() {
            return !this.set.noneImg ? 'https://www.realsn.com/_nuxt/img/38ee8fb.jpg' : '';
        },
        getSize() {
            return `width: ${this.set.size.wid}px; height: ${this.set.size.hgt}px`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
