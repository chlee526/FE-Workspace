<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">달력</h2>
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
                                            <h3><span>ColorPicker</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/colorPicker" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>색상코드</strong> : 16진수 색 코드 입력 시 색깔 변경</span>
                                                        <ul>
                                                            <li>EX: #32328C</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>위치 자동설정</strong> : 브라우저 창 크기에 맞춰서 colorPicker 창 위치 변경</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>위치</strong> : colorPicker 버튼 클릭 시 활성화 되는 창 위치 설정</span>
                                                        <ul>
                                                            <li><strong>Override</strong> : OL, OC, OR</li>
                                                            <li><strong>Bottom</strong> : BL, BC, BR</li>
                                                            <li><strong>Top</strong> : TL, TC, TR</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : xsmall, small, normal, large, xlare의 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>적용 표시</strong> : colorPicker 창 활성화 후 선택 시 적용 처리 버튼 유무</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>Enter 사용</strong> : colorPicker 창 활성화 후 선택 시 Enter 버튼 사용 유무</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>색상코드</strong>
                                                <comp-input-box id="set_colors" v-model="set.colors" placeholder="색상코드" label="가로크기 입력"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_disabled" class="is-small" v-model="set.setPosition" label="위치 자동설정"></comp-switch-btn>
                                            </div>
                                            <div class="grp">
                                                <strong>위치</strong>
                                                <comp-selectbox id="set_pos" :disabled="set.setPosition" v-model="set.pos.value" :opts="set.pos.opts"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts"></comp-selectbox>
                                            </div>

                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                            <comp-switch-btn id="set_confirm" class="is-small" v-model="set.confirm" label="적용 표시"></comp-switch-btn>
                                            <comp-switch-btn id="set_useEnter" class="is-small" v-model="set.useEnter" label="Eneter 사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac">
                                            <comp-colorpicker v-model="set.colors" :setPosition="set.setPosition" :pos="set.pos.value" :disabled="set.disabled" :class="[set.size.opts.getParseDatas({ code: set.size.value })[0].className]" :useConfirm="set.confirm" :useEnter="set.useEnter" />
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
    name: 'component-colorPicker',
    data() {
        return {
            set: {
                useEnter: true,
                colors: '',
                size: {
                    value: 2,

                    opts: [
                        { code: 0, name: 'X-Small', className: 'is-xsmall' },
                        { code: 1, name: 'Small', className: 'is-small' },
                        { code: 2, name: 'Normal', className: '' },
                        { code: 3, name: 'Large', className: 'is-large' },
                        { code: 4, name: 'X-Large', className: 'is-xlarge' },
                    ],
                    volume: true,
                },
                pos: {
                    value: 'BL',
                    opts: [
                        { code: 'OL', name: '좌측 겹침' },
                        { code: 'OC', name: '가운데 겹침' },
                        { code: 'OR', name: '우측 겹침' },
                        { code: 'BL', name: '좌측 하단' },
                        { code: 'BC', name: '가운데 하단' },
                        { code: 'BR', name: '우측 하단' },
                        { code: 'TL', name: '좌측 상단' },
                        { code: 'TR', name: '우측 상단' },
                        { code: 'TC', name: '가운데 상단' },
                    ],
                },
                confirm: false,
                disabled: false,
                setPosition: false,
                wid: null,
            },
        };
    },
};
</script>

<style></style>
