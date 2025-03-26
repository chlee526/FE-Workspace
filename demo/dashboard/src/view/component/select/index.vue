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
                                            <h3>
                                                <span>셀렉트박스</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">셀렉트박스(단일선택/다중선택) 컴포넌트.<br />옵션목록으로 셀렉트박스 데이터 연결.</div>
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
                                                    <dl class="nec">
                                                        <dt>opts<span class="type">Array</span></dt>
                                                        <dd>옵션 목록</dd>
                                                        <dd>[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)" } ]</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>style<span class="type">Css</span></dt>
                                                        <dd>width를 설정 하기 위해서만 사용(width:100px)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>notSelectedLabel<span class="type">String</span></dt>
                                                        <dd>선택이 없는 경우, '선택없음'같은 텍스트 설정이 필요할때 사용</dd>
                                                        <dd>설정한 텍스트가 기본 텍스트로 설정</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>allSelectedLabel<span class="type">String</span></dt>
                                                        <dd>전체 선택이 필요한 경우, '전체'같은 텍스트 설정이 필요할때 사용</dd>
                                                        <dd>설정한 텍스트로 옵션이 추가됨</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>autoComplete<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>자동완성 사용여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>multiple<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>다중선택 사용 여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                    <dl class="evt">
                                                        <dt>change<span class="type">Event</span></dt>
                                                        <dd>value 변경될 때 이벤트 발생</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본형 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)"></comp-selectbox>

<!-- Width 고정 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" style="width속성설정"></comp-selectbox>

<!-- 선택없음 포함 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" not-selected-label="선택없음 텍스트"></comp-selectbox>

<!-- 전체 선택 포함 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-selected-label="전체선택 텍스트"></comp-selectbox>

<!-- 다중선택 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" :multiple="true"></comp-selectbox>

<!-- 미사용 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" disabled></comp-selectbox>

<!-- 옵션 컬러 사용 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" use-color></comp-selectbox>
' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto" style="height: 700px">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>
                                                                    <strong>기본(사이즈 자동)</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>Width 고정</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>선택없음 포함</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>전체 선택 포함</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>다중선택</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>Disabled</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>다중선택(멀티)</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>색상포함</strong>
                                                                </th>
                                                                <th>
                                                                    <strong>색상포함(멀티)</strong>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>
                                                                    <strong>Small 사이즈</strong>
                                                                </th>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_01" class="is-small" :opts="select_opts" v-model="select_01" @change="evt_change"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_02" class="is-small" :opts="select_opts" v-model="select_01" style="width: 100px"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_03" class="is-small" :opts="select_opts" v-model="select_02" not-selected-label="선택하세요"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_04" class="is-small" :opts="select_opts" v-model="select_03" all-selected-label="전체" @change="evt_change"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_06" class="is-small" :opts="select_opts" v-model="select_04" :multiple="true" @change="evt_change"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_07" class="is-small" :opts="select_opts" v-model="select_01" disabled></comp-selectbox>
                                                                </td>
                                                                <td><comp-selectbox id="select_01_22" class="is-small" :opts="select_opts_color" :multiple="true" v-model="select_22"></comp-selectbox></td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_21" class="is-small" :opts="select_opts_color" use-color v-model="select_21"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_22" class="is-small" :opts="select_opts_color" use-color :multiple="true" v-model="select_22"></comp-selectbox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <strong>Normal 사이즈</strong>
                                                                </th>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_04" :opts="select_opts" v-model="select_01"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_05" :opts="select_opts" v-model="select_01" style="width: 120px"></comp-selectbox>
                                                                </td>
                                                                <td>
                                                                    <comp-selectbox id="select_01_06" :opts="select_opts" v-model="select_04" :multiple="true" :tree-view="false" not-selected-label="선택하세요"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al"></td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_06" :opts="select_opts" v-model="select_05" :multiple="true" :tree-view="false" :input-box="true"></comp-selectbox>
                                                                </td>
                                                                <td></td>
                                                                <td class="ui_al">
                                                                    <!-- <comp-selectbox id="select_01_06" :parent-item="select_07" :opts="select_07" v-model="select_06" :multiple="true" :tree-view="true" :input-box="true"></comp-selectbox> -->
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <strong>Large 사이즈</strong>
                                                                </th>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_07" class="is-large" :opts="select_opts" v-model="select_01"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_08" class="is-large" :opts="select_opts" v-model="select_01" style="width: 150px"></comp-selectbox>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <strong>X-Large 사이즈</strong>
                                                                </th>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_10" class="is-xlarge" :opts="select_opts" v-model="select_01"></comp-selectbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-selectbox id="select_01_11" class="is-xlarge" :opts="select_opts" v-model="select_01" style="width: 180px"></comp-selectbox>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
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
    name: 'component-select',
    data() {
        return {
            select_opts: [
                { code: '1', name: '라디오 1' },
                { code: '2', name: '라디오 2' },
                { code: '3', name: '라디오 3' },
                { code: '4', name: '라디오 4' },
                { code: '5', name: '라디오 5', disabled: true },
                { code: '6', name: '라디오 6' },
                { code: '7', name: '라디오 7' },
                { code: '8', name: '라디오 8' },
                { code: '9', name: '라디오 9' },
                { code: '10', name: '라디오 10' },
                { code: '11', name: '라디오 11' },
                { code: '12', name: '라디오 12' },
                { code: '13', name: '라디오 13' },
                { code: '14', name: '라디오 14' },
                { code: '15', name: '라디오 15' },
                { code: '16', name: '라디오 16' },
                { code: '17', name: '라디오 17' },
                { code: '18', name: '라디오 18' },
                { code: '19', name: '라디오 19' },
                { code: '20', name: '라디오 20' },
                { code: '21', name: '라디오 21' },
                { code: '22', name: '라디오 22' },
                { code: '23', name: '라디오 23' },
                { code: '24', name: '라디오 24' },
                { code: '25', name: '라디오 25' },
                { code: '26', name: '라디오 26' },
                { code: '27', name: '라디오 27' },
                { code: '28', name: '라디오 28' },
                { code: '29', name: '라디오 29' },
                { code: '30', name: '라디오 30' },
            ],
            select_opts1: [
                {
                    code: 1,
                    name: 'My Tree',
                    is_check: false,
                    children: [
                        { name: 'hello', code: 2, is_check: false },
                        { name: 'wat', code: 3, is_check: false },
                        {
                            code: 4,
                            name: 'child folder',
                            is_check: false,
                            children: [
                                {
                                    code: 5,
                                    name: 'child folder1',
                                    children: [
                                        {
                                            name: 'test',
                                            code: 6,
                                            is_check: false,
                                        },
                                        {
                                            name: 'test2',
                                            code: 7,
                                            is_check: false,
                                        },
                                    ],
                                },
                                {
                                    name: 'hello1',
                                    code: 8,
                                    is_check: false,
                                },
                                { name: 'wat1', code: 9, is_check: false },
                                {
                                    code: 10,
                                    name: 'child folder2',
                                    is_check: false,
                                    children: [
                                        {
                                            name: 'hello2',
                                            code: 11,
                                            is_check: false,
                                        },
                                        {
                                            name: 'wat2',
                                            code: 12,
                                            is_check: false,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            select_opts_color: [
                { code: 's_1', name: '긍정', color: '#5BA1E0' },
                { code: 's_2', name: '부정', color: '#EA7071' },
                { code: '1_1', name: '자사', color: '#53C2F0' },
                { code: '1_2', name: '경쟁사', color: '#F1711B' },
                { code: '4_5', name: '평가', color: '#FFA901' },
                { code: '4_4', name: '이슈', color: '#2DB24A' },
                { code: '3_2', name: '긴급', color: '#F77890' },
            ],
            select_01: '1',
            select_02: '',
            select_03: '',
            select_04: '1,2,3',
            select_05: '',
            select_06: '',
            select_07: [
                {
                    name: 'hello',
                    code: '2',
                    is_check: false,
                    is_open: false,
                },
                {
                    name: 'wat',
                    code: '3',
                    is_check: false,
                    is_open: false,
                },
                {
                    code: '4',
                    name: 'child folder',
                    is_check: false,
                    is_open: false,
                    children: [
                        {
                            code: '5',
                            name: 'child folder1',
                            is_check: false,
                            is_open: false,
                        },
                        {
                            name: 'hello1',
                            code: '8',
                            is_check: false,
                            is_open: false,
                        },
                        {
                            name: 'wat1',
                            code: '9',
                            is_check: false,
                            is_open: false,
                        },
                        {
                            code: '10',
                            name: 'child folder2',
                            is_check: false,
                            is_open: false,
                            children: [
                                {
                                    name: 'hello2',
                                    code: '11',
                                    is_check: false,
                                    is_open: false,
                                    children: [
                                        {
                                            name: 'wat20',
                                            code: '17',
                                            is_check: false,
                                            is_open: false,
                                        },
                                    ],
                                },
                                {
                                    name: 'wa3t2',
                                    code: '12',
                                    is_check: false,
                                    is_open: false,
                                    children: [
                                        {
                                            name: 'wat21',
                                            code: '13',
                                            is_check: false,
                                            is_open: false,
                                        },
                                        {
                                            name: 'wat22',
                                            code: '14',
                                            is_check: false,
                                            is_open: false,
                                        },
                                        {
                                            name: 'wat23',
                                            code: '15',
                                            is_check: false,
                                            is_open: false,
                                        },
                                        {
                                            name: 'wat24',
                                            code: '16',
                                            is_check: false,
                                            is_open: false,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    code: '41',
                    name: '41 folder',
                    is_check: false,
                    is_open: false,
                    children: [
                        {
                            name: '42',
                            code: '42',
                            is_check: false,
                            is_open: false,
                        },
                        {
                            name: '43',
                            code: '43',
                            is_check: false,
                            is_open: false,
                        },
                    ],
                },
            ],
            select_21: '',
            select_22: '',
        };
    },
    methods: {
        evt_change(val) {
            console.log('change', val);
        },
    },
    created() {
        // for (var Loop1 = 31; Loop1 < 1000; ++Loop1) {
        // 	this.select_opts.push({
        // 		code: String(Loop1),
        // 		name: '라디오 ' + Loop1,
        // 	});
        // }
    },
};
</script>

<style></style>
