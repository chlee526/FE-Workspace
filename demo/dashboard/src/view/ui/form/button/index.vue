<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <comp-location></comp-location>

            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Button</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/form/button" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Button - Button형 UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : xsmall, small, normal, large, xlare의 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>가로 사이즈 고정</strong> : 버튼의 가로 크기를 고정</span>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>텍스트</strong> : 텍스트로만 이루어진 버튼</li>
                                                            <li><strong>아이콘</strong> : 아이콘으로만 이루어진 버튼</li>
                                                            <li><strong>아이콘 + 텍스트</strong> : 아이콘 + 텍스트로 이루어진 버튼(순서와 상관없이 교차가 가능)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>색상</strong>
                                                        <ul>
                                                            <li><strong>없음</strong> : 기본 화이트/그레이 컬러</li>
                                                            <li><strong>포인트</strong> : 프로젝트 컬러(클라이언트 primary 컬러)</li>
                                                            <li><strong>블랙</strong> : 블랙컬러</li>
                                                            <li><strong>사용자</strong> : colorpicker를 통해 컬러 설정</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>로더</strong> : 로더를 포함한 버튼, 로딩중일때 사용(중복 실행 방지를 위해, 자동 미사용 기능 활성화)</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 150px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>가로 사이즈 고정</strong>
                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" min="50" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>색상</strong>
                                                <comp-radio-grp id="set_color" name="btnColors" v-model="set.colors.value" :opts="set.colors.opts" :box="true"></comp-radio-grp>
                                                <comp-colorpicker :color.sync="set.colors.fill" :useConfirm="true" :disabled="set.colors.value != 3" />
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_loading" class="is-small" v-model="set.loading" label="로더(로딩중일때)"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac">
                                            <comp-button :class="[set.size.opts.getParseDatas({ code: set.size.value })[0].className, getClass, getColorClass]" :style="getWid" :custom-color="getFill" :disabled="set.disabled" :loading="set.loading"> <span v-if="set.type.value == 1 || set.type.value == 2" class="icon">&#xe007;</span> <span v-if="set.type.value == 0 || set.type.value == 2" class="txt">버튼</span> </comp-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Example -->
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Example</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong></strong></th>
                                                                <th><strong>Default</strong></th>
                                                                <th><strong>Active</strong></th>
                                                                <th><strong>Disabled</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>&lt;a&gt; tag</strong></th>
                                                                <td>
                                                                    <comp-button href="#"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" class="is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-button class="is-small"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-small is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="" class="is-small" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-button><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-button class="is-large"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-large is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-large" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="no_bg">
                                                                    <comp-button class="is-xlarge"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-xlarge is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-xlarge" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>포인트컬러</strong></th>
                                                                <td><comp-button class="is-color-hl">버튼</comp-button></td>
                                                                <td>
                                                                    <comp-button class="is-color-hl is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-color-hl" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>블랙컬러</strong></th>
                                                                <td><comp-button class="is-color-black">버튼</comp-button></td>
                                                                <td>
                                                                    <comp-button class="is-color-black is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-color-black" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>커스텀 컬러</strong></th>
                                                                <td>
                                                                    <comp-button custom-color="#ea8cd0"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-only is-active" custom-color="#6880d8"><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after" custom-color="#d6a924" disabled><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>아이콘(only)</strong></th>
                                                                <td>
                                                                    <comp-button href="#" class="is-icon-only"><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" class="is-icon-only is-active"><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" class="is-icon-only" disabled><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>아이콘(with) - before</strong></th>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-before"><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-before is-active"><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-before" disabled><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>아이콘(with) - after</strong></th>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after"><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after is-active"><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after" disabled><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>로딩 기능 사용</strong></th>
                                                                <td>
                                                                    <comp-button :loading="true"><span class="txt">다운로드</span></comp-button>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-button',
    data() {
        return {
            set: {
                size: {
                    value: 2,
                    opts: [
                        { code: 0, name: 'X-Small', className: 'is-xsmall' },
                        { code: 1, name: 'Small', className: 'is-small' },
                        { code: 2, name: 'Normal', className: '' },
                        { code: 3, name: 'Large', className: 'is-large' },
                        { code: 4, name: 'X-Large', className: 'is-xlarge' },
                    ],
                    wid: null,
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '텍스트' },
                        { code: 1, name: '아이콘' },
                        { code: 2, name: '아이콘 + 텍스트' },
                    ],
                    wid: null,
                },
                colors: {
                    value: 0,
                    opts: [
                        { code: 0, name: '없음', className: 'is-color-hl' },
                        { code: 1, name: '포인트', className: 'is-color-hl' },
                        { code: 2, name: '블랙', className: 'is-color-black' },
                        { code: 3, name: '사용자', className: '' },
                    ],
                    fill: '#527EB8',
                },
                disabled: false,
                loading: false,
            },
        };
    },
    computed: {
        getWid() {
            const size = this.set.size.wid && this.set.size.wid.length && this.set.size.wid > 50 ? this.set.size.wid + 'px' : 'auto';
            return `width: ${size}`;
        },
        getClass() {
            let result = '';
            switch (this.set.type.value) {
                case 1:
                    result = 'is-icon-only';
                    break;
                case 2:
                    result = 'is-icon-with';
                    break;
            }
            return result;
        },
        getColorClass() {
            let result = '';
            switch (this.set.colors.value) {
                case 1:
                    result = 'is-color-hl';
                    break;
                case 2:
                    result = 'is-color-black';
                    break;
            }
            return result;
        },
        getFill() {
            return this.set.colors.value == 3 && this.set.colors.fill ? this.set.colors.fill : null;
        },
    },
};
</script>

<style></style>
