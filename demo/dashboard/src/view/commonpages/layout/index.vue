<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <!-- 사이드 영역 -->
            <comp-side-follow></comp-side-follow>
            <!-- 사이드 영역 -->

            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 검색조건 -->
            <comp-topsearch :search-input-datas.sync="pageDatas.topSearchInputDatas" :search-datas.sync="pageDatas.topSearchDatas" :noty-disabled="true">
                <!-- 조건 -->
                <template slot="input_forms">
                    <tr>
                        <th><h4>조건</h4></th>
                        <td>조건</td>
                    </tr>
                </template>

                <template slot="input_result">
                    <span>조건</span>
                </template>

                <!-- 결과 -->
                <template slot="results">
                    <span class="item">조건</span>
                </template>
            </comp-topsearch>
            <!-- // 검색조건 -->

            <div class="contents" :class="{ 'is-fixed': headerFixed }">
                <div class="wrap">
                    <!-- <div style="display: flex; flex-direction: row">
                        <div>1</div>
                        <div>
                            <div>
                                <div style="position: sticky; top: 0">스티키</div>
                                <div style="height: 5000px"></div>
                            </div>
                        </div>
                    </div> -->

                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col w12">
                                <div class="ui_box" data-track="박스1">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>박스1</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">컨텐츠</div>
                                </div>
                            </div>
                            <div class="ui_col w12">
                                <div class="ui_box" data-track="박스2">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>박스2</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <button type="button" class="ui_btn" @click="$store.dispatch('DIALOG')">
                                                <span class="txt">버튼</span>
                                            </button>
                                        </div>
                                        <div class="rc">
                                            <button type="button" class="ui_btn" @click="$store.dispatch('EXCEL_DOWN')">
                                                <span class="txt">버튼</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content">컨텐츠</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box" data-track="박스3">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>
                                                    <span title="1뎁스 박스1뎁스 박스1뎁스 박스1뎁스 박스">박스3</span>
                                                    <span title="1뎁스 박스1뎁스 박스1뎁스 박스1뎁스 박스">1뎁스 박스1뎁스 박스1뎁스 박스1뎁스 박스</span>
                                                </span>
                                                <div class="sub_title">
                                                    <span class="keyword" title="서브타이틀서브타이틀">서브타이틀서브타이틀</span>
                                                    <span class="keyword" title="서브타이틀서브타이틀">서브타이틀서브타이틀</span>
                                                </div>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01"></comp-helpbox-btn>
                                                <a href="#" class="ui_btn is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <ul>
                                                    <li>
                                                        <strong>검색어</strong>
                                                        <ul>
                                                            <li>[제목 + 본문] 영역에서 검색어가 포함된 데이터를 검색합니다.</li>
                                                            <li>입력 가능한 결과 내 검색어 글자 수는 최대 15자입니다.</li>
                                                            <li>Basic에서 띄어쓰기는 AND 연산으로 인식되며, AND 이외의 키워드 연산을 지원하지 않습니다.</li>
                                                            <li>Advanced에서는 일반, 구문, 인접, 제외의 다양한 키워드 연산을 지원합니다.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>최근 검색어</strong>
                                                        <ul>
                                                            <li>검색어 입력창 클릭 시, 최근 입력한 00개의 키워드(룰)에서 선택할 수 있습니다. 00개 초과 시, 오래된 순으로 자동 삭제됩니다.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>추천 검색어</strong>
                                                        <ul>
                                                            <li>포털사이트의 실시간 급상승 검색어를 순위가 높은 순으로 보여줍니다.<br /><em>(Naver 1~20위, Daum 1~10위/ 중복 검색어 제외/ 1시간 단위 업데이트)</em></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <div class="grp">
                                                <strong>타이틀</strong>
                                                <button class="ui_btn is-icon-only">
                                                    <span class="txt">아이템</span>
                                                </button>
                                            </div>
                                            <hr />
                                            <button class="ui_btn is-icon-only">
                                                <span class="txt">아이템</span>
                                            </button>
                                            <button class="ui_btn is-icon-only">
                                                <span class="txt">아이템</span>
                                            </button>
                                            <hr />
                                            <button class="ui_btn is-icon-only">
                                                <span class="txt">아이템</span>
                                            </button>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>타이틀</strong>
                                                <button class="ui_btn is-icon-only">
                                                    <span class="txt">아이템</span>
                                                </button>
                                            </div>
                                            <hr />
                                            <button class="ui_btn is-icon-only">
                                                <span class="txt">아이템</span>
                                            </button>
                                            <button class="ui_btn is-icon-only">
                                                <span class="txt">아이템</span>
                                            </button>
                                            <hr />
                                            <button class="ui_btn is-icon-only">
                                                <span class="txt">아이템</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content is-top-pad">
                                        <div class="ui_row is-2dp">
                                            <div class="wrap">
                                                <div class="ui_col">
                                                    <div class="ui_box is-2dp" data-track="박스3-1">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>
                                                                        <span>박스3-1</span>
                                                                        <span>2뎁스2뎁스2뎁스 박스</span>
                                                                        <span>2뎁스2뎁스2뎁스 박스</span>
                                                                    </span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <comp-helpbox-btn id="helper_s01_01" class="is-small"></comp-helpbox-btn>
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                            <div class="ui_help_box" data-for="helper_s01_01">
                                                                <div class="wrap">
                                                                    <ul>
                                                                        <li>
                                                                            <strong>도움말</strong>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="ui_function is-box">
                                                            <div class="lc">
                                                                <button type="button" class="ui_btn is-small">
                                                                    <span class="txt">버튼</span>
                                                                </button>
                                                            </div>
                                                            <div class="rc">
                                                                <button type="button" class="ui_btn is-small">
                                                                    <span class="txt">버튼</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="content">
                                                            <div class="wrap">컨텐츠</div>
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
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>1뎁스 박스</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s02"></comp-helpbox-btn>
                                                <a href="#" class="ui_btn is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s02">
                                            <div class="wrap">
                                                <ul>
                                                    <li>
                                                        <strong>도움말</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <button type="button" class="ui_btn">
                                                <span class="txt">버튼</span>
                                            </button>
                                        </div>
                                        <div class="rc">
                                            <button type="button" class="ui_btn">
                                                <span class="txt">버튼</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content is-top-pad">
                                        <div class="ui_row is-2dp">
                                            <div class="wrap is-cols-pad">
                                                <div class="ui_col w12">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <comp-helpbox-btn id="helper_s02_01" class="is-small"></comp-helpbox-btn>
                                                                    <a href="#" class="ui_btn is-icon-only is-small" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                            <div class="ui_help_box" data-for="helper_s02_01">
                                                                <div class="wrap">
                                                                    <ul>
                                                                        <li>
                                                                            <strong>도움말</strong>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="ui_function is-box">
                                                            <div class="lc">
                                                                <button type="button" class="ui_btn is-small">
                                                                    <span class="txt">버튼</span>
                                                                </button>
                                                            </div>
                                                            <div class="rc">
                                                                <button type="button" class="ui_btn is-small">
                                                                    <span class="txt">버튼</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
                                                </div>

                                                <hr />

                                                <div class="ui_col w12">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <comp-helpbox-btn id="helper_s02_02" class="is-small"></comp-helpbox-btn>
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                            <div class="ui_help_box" data-for="helper_s02_02">
                                                                <div class="wrap">
                                                                    <ul>
                                                                        <li>
                                                                            <strong>도움말</strong>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
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
                                            <h3>
                                                <span>1뎁스 박스</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s03"></comp-helpbox-btn>
                                                <a href="#" class="ui_btn is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s03">
                                            <div class="wrap">
                                                <ul>
                                                    <li>
                                                        <strong>도움말</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <button type="button" class="ui_btn">
                                                <span class="txt">버튼</span>
                                            </button>
                                        </div>
                                        <div class="rc">
                                            <button type="button" class="ui_btn">
                                                <span class="txt">버튼</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div>컨텐츠</div>

                                        <hr />

                                        <div class="ui_row is-2dp">
                                            <div class="wrap is-cols-pad">
                                                <div class="ui_col w12">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
                                                </div>

                                                <hr />

                                                <div class="ui_col w12">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />

                                        <div class="ui_row is-2dp">
                                            <div class="wrap is-cols-pad">
                                                <div class="ui_col w12">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
                                                </div>
                                                <div class="ui_col w12">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
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
                                            <h3>
                                                <span>1뎁스 박스</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div>컨텐츠</div>
                                        <hr />
                                        <div class="ui_row is-2dp">
                                            <div class="wrap">
                                                <div class="ui_col">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="content">컨텐츠</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="ui_row is-2dp">
                                            <div class="wrap">
                                                <div class="ui_col">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>2뎁스 박스</span>
                                                                </h4>
                                                                <div class="rc_wrap">
                                                                    <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="ui_function is-box">
                                                            <div class="lc">
                                                                <button type="button" class="ui_btn is-small">
                                                                    <span class="txt">버튼</span>
                                                                </button>
                                                            </div>
                                                            <div class="rc">
                                                                <button type="button" class="ui_btn is-small">
                                                                    <span class="txt">버튼</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="content">
                                                            <div class="ui_row is-3dp">
                                                                <div class="wrap is-cols-pad">
                                                                    <div class="ui_col w8">
                                                                        <div class="ui_box is-3dp">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h5>
                                                                                        <span>3뎁스 박스</span>
                                                                                    </h5>
                                                                                    <div class="rc_wrap">
                                                                                        <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="ui_function is-box">
                                                                                <div class="lc">
                                                                                    <button type="button" class="ui_btn is-small">
                                                                                        <span class="txt">버튼</span>
                                                                                    </button>
                                                                                </div>
                                                                                <div class="rc">
                                                                                    <button type="button" class="ui_btn is-small">
                                                                                        <span class="txt">버튼</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">컨텐츠</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ui_col w8">
                                                                        <div class="ui_box is-3dp">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h5>
                                                                                        <span>3뎁스 박스</span>
                                                                                    </h5>
                                                                                    <div class="rc_wrap">
                                                                                        <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">컨텐츠</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ui_col w8">
                                                                        <div class="ui_box is-3dp">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h5>
                                                                                        <span>3뎁스 박스</span>
                                                                                    </h5>
                                                                                    <div class="rc_wrap">
                                                                                        <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">컨텐츠</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="ui_row is-3dp">
                                                                <div class="wrap is-cols-pad">
                                                                    <div class="ui_col w8">
                                                                        <div class="ui_box is-3dp">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h5>
                                                                                        <span>3뎁스 박스</span>
                                                                                    </h5>
                                                                                    <div class="rc_wrap">
                                                                                        <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">컨텐츠</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ui_col w8">
                                                                        <div class="ui_box is-3dp">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h5>
                                                                                        <span>3뎁스 박스</span>
                                                                                    </h5>
                                                                                    <div class="rc_wrap">
                                                                                        <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">컨텐츠</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ui_col w8">
                                                                        <div class="ui_box is-3dp">
                                                                            <div class="header">
                                                                                <div class="wrap">
                                                                                    <h5>
                                                                                        <span>3뎁스 박스</span>
                                                                                    </h5>
                                                                                    <div class="rc_wrap">
                                                                                        <a href="#" class="ui_btn is-small is-icon-only" title="Excel 다운로드"><span class="icon">&#xe005;</span></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="content">컨텐츠</div>
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
                        </div>
                    </div>
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col">
                                <div class="ui_box is-expt">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>상세분석</span>
                                                <div class="sub_title">
                                                    <span class="keyword" title="분석대상">분석대상 선택 안됨</span>
                                                    <span class="keyword is-customColor" style="--color: #ff0000" title="분석대상: 빙그레">빙그레</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">컨텐츠</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col">
                                <div class="ui_box is-expt">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>상세분석</span>
                                                <div class="sub_title">
                                                    <span class="keyword" title="분석대상">분석대상 선택 가능</span>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <strong>단일</strong>
                                            <comp-radio-grp id="anals_radio" v-model="pageDatas.anals_radio" name="anals_radio" :opts="$store.getters.getAnalTargets.comp" :box="true"></comp-radio-grp>
                                            <hr />
                                            <strong>멀티</strong>
                                            <comp-checkbox-grp id="anals" v-model="pageDatas.anals" :opts="$store.getters.getAnalTargets.comp" :box="true"></comp-checkbox-grp>
                                        </div>
                                    </div>
                                    <div class="content">컨텐츠</div>
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
    name: 'Common-layout',
    data() {
        return {
            headerFixed: false,
            pageDatas: {
                anals: '2_1,2_3',
                anals_radio: '2_1',
                topSearchInputDatas: {},
                topSearchDatas: {},
            },
        };
    },
    watch: {
        'pageDatas.topSearchDatas': function ($val) {},
        'pageDatas.topSearchInputDatas': function () {},
    },
    created() {
        this.pageDatas.topSearchInputDatas = {};
    },
};
</script>

<style></style>
