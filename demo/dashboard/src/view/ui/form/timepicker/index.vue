<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">TimePicker</h2>
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
                                            <h3><span>TimePicker</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/timepicker" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Timepicker - 시간 선택 UI</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : small, normal, large, xlare의 다섯가지 크기 제공 (Box모드 적용 불가)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>분 UI 활성화</strong> : '분' 단위 설정 UI제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>초 UI 활성화</strong> : '초' 단위 설정 UI제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>Box 모드</strong> : 박스모드로 사용하는 경우 설정</span>
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
                                                <span>크기</span>
                                                <comp-selectbox id="set_size" class="is-small" v-model="pickerOpts.size" :opts="sizeOpts" notSelectedLabel="기본" :disabled="pickerOpts.boxMode"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>분 UI 활성화</span>
                                                <comp-switch-btn id="set_minutesSet" class="is-small" v-model="pickerOpts.minutesSet"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>초 UI 활성화</span>
                                                <comp-switch-btn id="set_secondsSet" class="is-small" v-model="pickerOpts.secondsSet"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>Box 모드 적용</span>
                                                <comp-switch-btn id="set_boxMode" class="is-small" v-model="pickerOpts.boxMode"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>미사용</span>
                                                <comp-switch-btn id="set_disabled" class="is-small" v-model="pickerOpts.disabled"></comp-switch-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap" style="text-align: center">
                                            <comp-timepicker id="timepicker_01" class="demo_timepicker" :class="pickerOpts.size" v-model="timeData" :minutes-set="pickerOpts.minutesSet" :seconds-set="pickerOpts.secondsSet" :box-mode="pickerOpts.boxMode" :disabled="pickerOpts.disabled" :key="pickerOpts.boxMode + pickerOpts.minutesSet + pickerOpts.secondsSet"></comp-timepicker>
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
    name: 'component-calendar',
    data() {
        return {
            timeData: '10:10:35',
            pickerOpts: {
                size: '',
                minutesSet: false,
                secondsSet: false,
                boxMode: false,
                disabled: false,
            },
            sizeOpts: [
                { code: '', name: 'normal' },
                { code: 'is-small', name: 'small' },
                { code: 'is-large', name: 'large' },
                { code: 'is-xlarge', name: 'xlarge' },
            ],
        };
    },
};
</script>

<style></style>
