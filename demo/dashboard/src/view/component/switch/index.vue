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
                                            <h3><span>스위치(체크박스형)</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">스위치(체크박스형) 컴포넌트.<br />기본형/라벨포함형/박스형(라벨필수) 선택이 가능.<br />한개의 스위치에 한개의 데이터 연결.</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                        <dd>'아이디_' + 넘버링 으로 개별 컴포넌트 ID 생성됨</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                        <dd>사이즈 : 'is-small'/'is-large'/'is-xlarge'</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Vue Variables</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>label<span class="type">String</span><span class="default">""</span></dt>
                                                        <dd>라벨명</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>box<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>박스형 사용 여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본형 -->
    <comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables"></comp-switch-btn>
    
    <!-- 라벨포함 -->
    <comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables" label="라벨"></comp-switch-btn>
    
    <!-- 박스형(라벨필수) -->
    <comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables" label="라벨(라벨필수)" box="true"></comp-switch-btn>
    
    <!-- 미사용(Disabled) -->
    <comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables" disabled></comp-switch-btn>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col />
                                                            <col />
                                                            <col />
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>라벨포함</strong></th>
                                                                <th><strong>박스형 라벨포함</strong></th>
                                                                <th><strong>Disabled</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_01" v-model="checkboxDatas.toggle01" class="is-small"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_02" v-model="checkboxDatas.toggle01" label="라벨" class="is-small"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_04" v-model="checkboxDatas.toggle01" label="라벨" :box="true"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_03" v-model="checkboxDatas.toggle01" class="is-small" disabled></comp-switch-btn>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_05" v-model="checkboxDatas.toggle01"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_06" v-model="checkboxDatas.toggle01" label="라벨"></comp-switch-btn>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_08" v-model="checkboxDatas.toggle01" class="is-large"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_09" v-model="checkboxDatas.toggle01" label="라벨" class="is-large"></comp-switch-btn>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_11" v-model="checkboxDatas.toggle01" class="is-xlarge"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_12" v-model="checkboxDatas.toggle01" label="라벨" class="is-xlarge"></comp-switch-btn>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>스위치(라디오형)</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">스위치(라디오형) 컴포넌트.<br />기본형/라벨포함형 선택이 가능.<br />여러개의 스위치에 한개의 데이터 연결.</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                        <dd>'아이디_' + 넘버링 으로 개별 컴포넌트 ID 생성됨</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                        <dd>사이즈 : 'is-small'/'is-large'/'is-xlarge'</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>radioGrp<span class="type">String</span></dt>
                                                        <dd>그룹명</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Vue Variables</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>val<span class="type">String</span></dt>
                                                        <dd>Value값</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>label<span class="type">String</span><span class="default">""</span></dt>
                                                        <dd>라벨명</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본형 -->
    <comp-switch-btn id="아이디명" class="클래스명" radio-grp="그룹명" v-model="Vue Variables" val="Value값"></comp-switch-btn>
    
    <!-- 라벨포함 -->
    <comp-switch-btn id="아이디명" class="클래스명" radio-grp="그룹명" v-model="Vue Variables" val="Value값" label="라벨"></comp-switch-btn>
    
    <!-- 미사용(Disabled) -->
    <comp-switch-btn id="아이디명" class="클래스명" radio-grp="그룹명" v-model="Vue Variables" val="Value값" disabled></comp-switch-btn>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col />
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>라벨포함</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_01" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" class="is-small"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_02" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" class="is-small"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_04" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" label="라벨" class="is-small"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_05" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" label="라벨" class="is-small"></comp-switch-btn>
                                                                </td>
                                                                <td>
                                                                    <comp-switch-btn id="toggle_radio_03" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" class="is-small" disabled></comp-switch-btn>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_07" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_08" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_10" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" label="라벨"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_11" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" label="라벨"></comp-switch-btn>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_13" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" class="is-large"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_14" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" class="is-large"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_16" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" label="라벨" class="is-large"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_17" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" label="라벨" class="is-large"></comp-switch-btn>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_19" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" class="is-xlarge"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_20" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" class="is-xlarge"></comp-switch-btn>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-switch-btn id="toggle_radio_22" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="1" label="라벨" class="is-xlarge"></comp-switch-btn>
                                                                    <comp-switch-btn id="toggle_radio_23" v-model="checkboxDatas.toggle02" radio-grp="radio_switch" val="2" label="라벨" class="is-xlarge"></comp-switch-btn>
                                                                </td>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>북마크</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">북마크 전용 컴포넌트로, 체크박스 형태로 제작되어 있음</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                        <dd>'아이디_' + 넘버링 으로 개별 컴포넌트 ID 생성됨</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Vue Variables</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs language="html" code='<comp-favorites id="아이디명" v-model="Vue Variables"></comp-favorites>' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong>기본</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td class="ui_al">
                                                                    <comp-favorites id="favorites_01" v-model="checkboxDatas.toggle01"></comp-favorites>
                                                                </td>
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
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-switch',
    data() {
        return {
            checkboxDatas: {
                chkedList_opts: [
                    { code: 1, name: '체크1' },
                    { code: 2, name: '체크2', disabled: true },
                    { code: 3, name: '체크3' },
                ],
                checked_01_01: '',
                checked_01_02: '',
                checked_01_03: '',
                checked_01_04: '',
                checked_02: '',
                checked_03: '',
                toggle01: false,
                toggle02: '2',
            },
        };
    },
};
</script>

<style></style>
