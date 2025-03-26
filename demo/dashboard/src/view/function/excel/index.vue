<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
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
                                            <h3><span>Excel</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/excel_btn" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>

                                                <ul>
                                                    <li>
                                                        <span>엑셀 다운로드 UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : xsmall, small, normal, large, xlare의 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>로더</strong> : 로더를 포함한 버튼, 로딩중일때 사용(중복 실행 방지를 위해, 자동 미사용 기능 활성화)</span>
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
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 120px"></comp-selectbox>
                                            </div>

                                            <hr />
                                            <comp-switch-btn id="set_loading" class="is-small" v-model="set.loading" label="로더(로딩중일때)"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac" style="width: 100%">
                                            <comp-excel-btn id="excel_btn_demo" :class="getSize" :disabled="set.disabled" :loading="set.loading"></comp-excel-btn>
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
    name: 'function-excel',
    data() {
        return {
            set: {
                loading: false,
                disabled: false,
                size: {
                    value: 2,
                    opts: [
                        { code: 0, name: 'X-Small', className: 'is-xsmall' },
                        { code: 1, name: 'Small', className: 'is-small' },
                        { code: 2, name: 'Normal', className: '' },
                        { code: 3, name: 'Large', className: 'is-large' },
                        { code: 4, name: 'X-Large', className: 'is-xlarge' },
                    ],
                },
            },
        };
    },
    computed: {
        getSize() {
            return this.set.size.opts.getParseDatas({ code: this.set.size.value })[0].className;
        },
    },
};
</script>

<style></style>
