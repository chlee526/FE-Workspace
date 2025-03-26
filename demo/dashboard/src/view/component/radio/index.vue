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
                                            <h3><span>단일형</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">라디오버튼(단일형) 컴포넌트.<br />라벨/버튼형 선택이 가능.<br />다수의 라디오버튼에 한개의 데이터 연결.</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                        <dd>사이즈 : 'is-small'/'is-large'/'is-xlarge'</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>name<span class="type">String</span></dt>
                                                        <dd>그룹명</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>val<span class="type">String</span></dt>
                                                        <dd>Value값</dd>
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
                                                        <dt>btn <span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>버튼형으로 사용시</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>customColor<span class="type">String</span><span class="default">null</span></dt>
                                                        <dd>사용자색상</dd>
                                                        <dd>hex컬러값 입력</dd>
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
    <comp-radio id="아이디명" class="클래스명" name="그룹명" :val="Value값" v-model="Vue Variables" label="라벨명"></comp-radio>
    
    <!-- 박스형 -->
    <comp-radio id="아이디명" class="클래스명" name="그룹명" :val="Value값" v-model="Vue Variables" label="라벨명" box="true"></comp-radio>
    
    <!-- 미사용(Disabled) -->
    <comp-radio id="아이디명" class="클래스명" name="그룹명" :val="Value값" v-model="Vue Variables" label="라벨명" disabled></comp-radio>
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
                                                                <th><strong>버튼형</strong></th>
                                                                <th><strong>아이콘포함</strong></th>
                                                                <th><strong>커스텀컬러</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_01" class="is-small" name="radio_01" :val="1" v-model="radioDatas.radio_01" label="라디오 1"></comp-radio>
                                                                    <comp-radio id="radio_01_02" class="is-small" name="radio_01" :val="2" v-model="radioDatas.radio_01" label="라디오 2"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_03" class="is-small" name="radio_02" :val="1" v-model="radioDatas.radio_01" label="라디오 1" :btn="true"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_04" class="is-small" name="radio_03" :val="1" v-model="radioDatas.radio_01" label="라디오 1" :btn="true" before="&#xe075;"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_05" class="is-small" name="radio_04" :val="1" v-model="radioDatas.radio_01" label="라디오 1" :btn="true" custom-color="#ea8cd0"></comp-radio>
                                                                </td>
                                                                <td>
                                                                    <comp-radio id="radio_01_06" class="is-small" name="radio_05" :val="1" v-model="radioDatas.radio_01" label="라디오 1" disabled></comp-radio>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_11" name="radio_06" :val="1" v-model="radioDatas.radio_01" label="라디오 1"></comp-radio>
                                                                    <comp-radio id="radio_01_12" name="radio_07" :val="2" v-model="radioDatas.radio_01" label="라디오 2"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_13" name="radio_08" :val="3" v-model="radioDatas.radio_01" label="라디오 3" :btn="true"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_14" name="radio_09" :val="4" v-model="radioDatas.radio_01" label="라디오 4" :btn="true" after="&#xe074;"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_15" name="radio_10" :val="5" v-model="radioDatas.radio_01" label="라디오 5" :btn="true" custom-color="#ea8cd0" after="&#xe074;"></comp-radio>
                                                                </td>
                                                                <td>
                                                                    <comp-radio id="radio_01_16" name="radio_11" :val="6" v-model="radioDatas.radio_01" label="라디오 6" disabled></comp-radio>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_21" class="is-large" name="radio_12" :val="1" v-model="radioDatas.radio_01" label="라디오 1"></comp-radio>
                                                                    <comp-radio id="radio_01_22" class="is-large" name="radio_13" :val="2" v-model="radioDatas.radio_01" label="라디오 2"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_23" class="is-large" name="radio_14" :val="1" v-model="radioDatas.radio_01" label="라디오 1" :btn="true"></comp-radio>
                                                                </td>
                                                                <td>
                                                                    <comp-radio id="radio_01_24" class="is-large" name="radio_15" :val="1" v-model="radioDatas.radio_01" label="라디오 1" disabled></comp-radio>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_31" class="is-xlarge" name="radio_16" :val="1" v-model="radioDatas.radio_01" label="라디오 1"></comp-radio>
                                                                    <comp-radio id="radio_01_32" class="is-xlarge" name="radio_17" :val="2" v-model="radioDatas.radio_01" label="라디오 2"></comp-radio>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio id="radio_01_33" class="is-xlarge" name="radio_18" :val="1" v-model="radioDatas.radio_01" label="라디오 1" :btn="true"></comp-radio>
                                                                </td>
                                                                <td>
                                                                    <comp-radio id="radio_01_34" class="is-xlarge" name="radio_19" :val="1" v-model="radioDatas.radio_01" label="라디오 1" disabled></comp-radio>
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
                                            <h3><span>그룹형</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">라디오버튼(그룹형) 컴포넌트.<br />버튼형/박스형 선택이 가능.<br />옵션목록으로 라디오 버튼 데이터 연결.</div>
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
                                                        <dt>name<span class="type">String</span></dt>
                                                        <dd>그룹명</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Vue Variables</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>opts<span class="type">Array</span></dt>
                                                        <dd>옵션 목록</dd>
                                                        <dd>일반 - [ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러" } ]</dd>
                                                        <dd>그룹 - [ [ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러" } ], [ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러" } ] ]</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>box<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>박스형 사용 여부</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본형 -->
    <comp-radio-grp id="아이디명" class="클래스명" name="그룹명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)"></comp-radio-grp>
    
    <!-- 박스형 -->
    <comp-radio-grp id="아이디명" class="클래스명" name="그룹명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" :box="true"></comp-radio-grp>
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
                                                                <th><strong>버튼형</strong></th>
                                                                <th><strong>박스형</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_01" class="is-small" :opts="radioGrp.list_opts" name="radio_20" v-model="radioDatas.radio_02"></comp-radio-grp>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_02" class="is-small" :opts="radioGrp.list_opts" name="radio_21" v-model="radioDatas.radio_02" :box="true"></comp-radio-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_03" :opts="radioGrp.list_opts" name="radio_22" v-model="radioDatas.radio_02"></comp-radio-grp>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_04" :opts="radioGrp.list_opts" name="radio_23" v-model="radioDatas.radio_02" :box="true"></comp-radio-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_05" class="is-large" :opts="radioGrp.list_opts" name="24" v-model="radioDatas.radio_02"></comp-radio-grp>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_06" class="is-large" :opts="radioGrp.list_opts" name="25" v-model="radioDatas.radio_02" :box="true"></comp-radio-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>xlarge 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_07" class="is-xlarge" :opts="radioGrp.list_opts" name="radio_26" v-model="radioDatas.radio_02"></comp-radio-grp>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_08" class="is-xlarge" :opts="radioGrp.list_opts" name="radio_27" v-model="radioDatas.radio_02" :box="true"></comp-radio-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>사용자색상/그룹</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_09" class="is-small" :opts="radioGrpColor.list_opts" name="radio_28" v-model="radioDatas.radio_02"></comp-radio-grp>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-radio-grp id="radio_02_10" :opts="radioGrpColor.list_opts" name="radio_29" v-model="radioDatas.radio_02" :box="true"></comp-radio-grp>
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
    name: 'component-radio',
    data() {
        return {
            radioDatas: {
                radio_01: 1,
                radio_02: 1,
                radio_03: 1,
            },
            radioGrp: {
                list_opts: [
                    { code: 1, name: '라디오 1' },
                    { code: 2, name: '라디오 2' },
                    { code: 3, name: '라디오 3', disabled: true },
                ],
            },
            radioGrpColor: {
                list_opts: [
                    [
                        { code: 1, name: '라디오 1', color: '#ea8cd0' },
                        { code: 2, name: '라디오 2', color: '#6880d8' },
                        { code: 3, name: '라디오 3', color: '#d6a924', disabled: true },
                    ],
                    [
                        { code: 11, name: '라디오 11', color: '#ea8cd0' },
                        { code: 12, name: '라디오 12', color: '#6880d8' },
                        { code: 13, name: '라디오 13', color: '#d6a924', disabled: true },
                    ],
                ],
            },
            checkboxDatas: {
                toggle01: false,
                toggle02: '2',
            },
        };
    },
};
</script>

<style></style>
