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
                                            <h3><span>Tab</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">Tab(Radio) 컴포넌트.<br />Page/Box/Content Tab 3가지로 분류.<br />기본 Content Tab.</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                        <dd>타입 : 'is-page'(페이지탭)/'is-box(박스탭)'</dd>
                                                        <dd>사이즈 : 'is-small'/'is-large'/'is-xlarge'</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>opts<span class="type">Array</span></dt>
                                                        <dd>옵션목록</dd>
                                                        <dd>[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)" } ]</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">String</span></dt>
                                                        <dd>탭 선택값</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- Content Tab -->
    <comp-tab id="아이디명" class="클래스명" :opts="옵션목록" v-model="Vue Variables"></comp-tab>
    
    <!-- Page Tab -->
    <div id="container">
        <div id="content">
            <div class="wrap">
                <div class="contents">
                    <div class="wrap">
                        <!-- Page Tab은 이자리에 들어감 -->
                        <comp-tab id="아이디명" class="is-page 추가클래스" :opts="옵션목록" v-model="Vue Variables"></comp-tab>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Box Tab -->
    <div class="ui_box">
        <div class="header">
            <div class="wrap">
                <!-- Box Tab은 이자리에 들어감 -->
                <comp-tab id="아이디명" class="is-box 추가클래스" :opts="옵션목록" v-model="Vue Variables"></comp-tab>
            </div>
        </div>
        <div class="content">
            컨텐츠
        </div>
    </div>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 110px" />
                                                            <col style="width: 800px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>Content Tab</th>
                                                                <th><strong>기본</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-tab id="tab_01" class="is-small" :opts="tabOpts_1" v-model="tabIdx_1"></comp-tab>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-tab id="tab_02" :opts="tabOpts_1" v-model="tabIdx_1"></comp-tab>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 110px" />
                                                            <col style="width: 800px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>Page Tab</th>
                                                                <th><strong>기본</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-tab id="tab_11" class="is-page" :opts="tabOpts_2" v-model="tabIdx_2"></comp-tab>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 110px" />
                                                            <col style="width: 800px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>Box Tab</th>
                                                                <th><strong>기본</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td style="padding: 30px; background: #f2f2f2 !important">
                                                                    <div class="ui_box">
                                                                        <div class="header">
                                                                            <div class="wrap">
                                                                                <comp-tab id="tab_21" class="is-box" :opts="tabOpts_3" v-model="tabIdx_3"></comp-tab>
                                                                            </div>
                                                                        </div>
                                                                        <div class="content">컨텐츠</div>
                                                                    </div>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Content Tab Example 1</span></h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <button type="button" class="ui_btn"><span class="txt">버튼</span></button>
                                        </div>
                                        <div class="rc">
                                            <button type="button" class="ui_btn"><span class="txt">버튼</span></button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <!-- 컨텐츠 탭 -->
                                        <comp-tab id="exp_tab_01" :opts="tabOpts_1" v-model="tabIdx_1"></comp-tab>
                                        <!-- // 컨텐츠 탭 -->

                                        <div class="ui_tab_content">Content Tab 아래 바로 컨텐츠가 존재하는 경우</div>
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
                                            <h3><span>Content Tab Example 2</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <!-- 컨텐츠 탭 -->
                                        <comp-tab id="exp_tab_02" :opts="tabOpts_1" v-model="tabIdx_1"></comp-tab>
                                        <!-- // 컨텐츠 탭 -->

                                        <div class="ui_function is-box">
                                            <div class="lc">
                                                <button type="button" class="ui_btn"><span class="txt">버튼</span></button>
                                            </div>
                                            <div class="rc">
                                                <button type="button" class="ui_btn"><span class="txt">버튼</span></button>
                                            </div>
                                        </div>

                                        <div class="ui_tab_content">Content Tab 아래 'ui_function'영역이 존재하는 경우</div>
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
    name: 'component-tab',
    data() {
        return {
            tabOpts_1: [
                { code: '1', name: 'Tab 1' },
                { code: '2', name: 'Tab 2' },
                { code: '3', name: 'Tab 3', disabled: true },
            ],
            tabOpts_2: [
                { code: '1', name: 'Page Tab 1' },
                { code: '2', name: 'Page Tab 2' },
                { code: '3', name: 'Page Tab 3', disabled: true },
            ],
            tabOpts_3: [
                { code: '1', name: 'Tab 1' },
                { code: '2', name: 'Tab 2' },
                { code: '3', name: 'Tab 3', disabled: true },
            ],
            tabIdx_1: 1,
            tabIdx_2: 1,
            tabIdx_3: 1,
            tabIdx_4: 1,
            calendarDatas: {
                dateRange: '1M',
                sdateNoTime: {
                    date: '2021-05-13',
                },
                edateNoTime: {
                    date: '2021-05-13',
                },
                sdate: {
                    date: '2019-05-08',
                    time: '00:00:00',
                },
                edate: {
                    date: '2019-06-08',
                    time: '23:59:59',
                },
                minDate: '2019-01-10',
                maxDate: '2030-12-31',
            },
            timeDatas: {
                time: '23:00:00',
            },
        };
    },
};
</script>

<style></style>
