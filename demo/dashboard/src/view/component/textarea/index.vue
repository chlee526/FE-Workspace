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
                                            <h3><span>텍스트 에어리어</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">텍스트 에어리어 컴포넌트.</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>v-model<span class="type">String</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>rows<span class="type">Number</span></dt>
                                                        <dd>Textarea rows 설정값</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>cols<span class="type">Number</span></dt>
                                                        <dd>Textarea cols 설정값</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>placeholder<span class="type">String</span></dt>
                                                        <dd>'placeholder' 값 설정</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>style<span class="type">CSS</span></dt>
                                                        <dd>CSS 설정</dd>
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
    <comp-textarea id="아이디명" class="클래스명" v-model="Vue Variables" rows="줄수" cols="글자수" placeholder=""></comp-textarea>
    
    <!-- Width 고정 -->
    <comp-textarea id="아이디명" class="클래스명" v-model="Vue Variables" rows="줄수" cols="글자수" style="width속성설정"></comp-textarea>
    
    <!-- 미사용(Disabled) -->
    <comp-textarea id="아이디명" class="클래스명" v-model="Vue Variables" rows="줄수" cols="글자수" disabled></comp-textarea>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col />
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>Width 고정</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <comp-textarea id="ta_01" v-model="textareaVal" :rows="10" :cols="20"></comp-textarea>
                                                                </td>
                                                                <td>
                                                                    <comp-textarea id="ta_01" v-model="textareaVal" :rows="10" :cols="20" style="width: 300px"></comp-textarea>
                                                                </td>
                                                                <td>
                                                                    <comp-textarea id="ta_03" v-model="textareaVal" :rows="10" :cols="20" disabled></comp-textarea>
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
    name: 'component-textarea',
    data() {
        return {
            textareaVal: '',
        };
    },
};
</script>

<style></style>
