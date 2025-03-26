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
                                        <h3><span>자동완성</span></h3>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">자동완성(인풋박스/셀렉트박스) 컴포넌트.<br />Virtual Scroll을 사용하고 있음.</div>
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
                                                    <dl>
                                                        <dt>type<span class="type">String</span><span class="default">"input"</span></dt>
                                                        <dd>Input형/Select형 타입 선택</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>limit<span class="type">Number</span><span class="default">200</span></dt>
                                                        <dd>Virtual Scroll에서 한번에 생성될 목록의 최대 갯수</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Vue Variables</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>autocomplete<span class="type">Array</span></dt>
                                                        <dd>옵션 목록</dd>
                                                        <dd>input: [ "옵션명" ]</dd>
                                                        <dd>select: [ { code: "Value값", name: "옵션명" } ]</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>style<span class="type">Css</span></dt>
                                                        <dd>width를 설정 하기 위해서만 사용(width:100px)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>placeholder<span class="type">String</span></dt>
                                                        <dd>'placeholder' 값 설정</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>label<span class="type">String</span></dt>
                                                        <dd>'label' 값 설정</dd>
                                                        <dd>코드에만 존재하고, 엘리먼트는 눈에 보이지 않음.</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- Input 기본형 -->
<comp-autocomplete-box id="아이디명" class="클래스명" v-model="Vue Variables" :autocomplete="Vue연결 옵션목록(Array)" placeholder="placeholder값" label="라벨값"></comp-autocomplete-box>

<!-- Select 기본형 -->
<comp-autocomplete-box id="아이디명" class="클래스명" type="select" v-model="Vue Variables" :autocomplete="Vue연결 옵션목록(Array)" placeholder="placeholder값" label="라벨값"></comp-autocomplete-box>

<!-- Width 고정 -->
<comp-autocomplete-box id="아이디명" class="클래스명" v-model="Vue Variables" :autocomplete="Vue연결 옵션목록(Array)" placeholder="placeholder값" label="라벨값" style="width속성설정"></comp-autocomplete-box>

<!-- Limit 설정 -->
<comp-autocomplete-box id="아이디명" class="클래스명" :limit="50" v-model="Vue Variables" :autocomplete="Vue연결 옵션목록(Array)" placeholder="placeholder값" label="라벨값"></comp-autocomplete-box>

<!-- 미사용(Disabled) -->
<comp-autocomplete-box id="아이디명" class="클래스명" v-model="Vue Variables" :autocomplete="Vue연결 옵션목록(Array)" placeholder="placeholder값" label="라벨값" disabled></comp-autocomplete-box>
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
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th><strong>기본(Input)</strong></th>
                                                                <th><strong>Width 고정</strong></th>
                                                                <th><strong>Limit 설정</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-autocomplete-box id="inputbox_01" class="is-small" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창"></comp-autocomplete-box>
                                                                </td>
                                                                <td>
                                                                    <comp-autocomplete-box id="inputbox_03" class="is-small" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창" style="width: 200px"></comp-autocomplete-box>
                                                                </td>
                                                                <td>
                                                                    <comp-autocomplete-box id="inputbox_04" class="is-small" :limit="50" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창"></comp-autocomplete-box>
                                                                </td>
                                                                <td>
                                                                    <comp-autocomplete-box id="inputbox_05" class="is-small" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창" disabled></comp-autocomplete-box>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-autocomplete-box id="inputbox_06" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창"></comp-autocomplete-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-autocomplete-box id="inputbox_08" class="is-large" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창"></comp-autocomplete-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-autocomplete-box id="inputbox_10" class="is-xlarge" v-model="ac_01" :autocomplete="input_autocomplete_data" placeholder="입력하세요." label="입력창"></comp-autocomplete-box>
                                                                </td>
                                                                <td></td>
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
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-autocomplate',
    data() {
        return {
            ac_01: '123',
            ac_select_01: '1',
            ac_select_03: '',
            input_autocomplete_data: [],
            select_autocomplete_data: [],
        };
    },
};
</script>

<style></style>
