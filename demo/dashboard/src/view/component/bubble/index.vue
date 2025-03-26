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
                                            <h3><span>말풍선</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">말풍선 컴포넌트.<br />일반형/HTML형/이미지형 중 선택해서 사용.<br />기본은 일반형.<br />Slot으로 제작되어 말풍선 타겟을 설정할 수 있음.</div>
                                                <div class="ref">
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>'is-validation': 유효성 검사일 경우</dd>
                                                        <dd>'is-helper': 도움말일 경우</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>subject<span class="type">String</span></dt>
                                                        <dd>말풍선 제목</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>content<span class="type">String</span></dt>
                                                        <dd>말풍선 내용</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>contentLimit<span class="type">Number</span><span class="default">NaN</span></dt>
                                                        <dd>말풍선 내용 글자수 제한할때 사용</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>subcontent<span class="type">String</span></dt>
                                                        <dd>말풍선 서브텍스트</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>htmlType<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>말풍선 내용에 HTML 사용여부</dd>
                                                        <dd>HTML사용할 경우 SLOT으로 말풍선 제작(예시참조)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>image<span class="type">String</span></dt>
                                                        <dd>Image보기 사용할 경우, url값을 전달함.</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>pos<span class="type">String</span><span class="default">"LT"</span></dt>
                                                        <dd>말풍선 위치(horizontal/vertical)</dd>
                                                        <dd>LT/CT/RT, LB/CB/RB</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>arrowFixed<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>말풍선 위치 14px로 고정</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>showFixed<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>말풍선 강제로 보이기</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>click<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>클릭 액션 사용 여부</dd>
                                                        <dd>LT(좌측상단)/CT(중앙상단)/RT(우측상단), LB(좌측하단)/CB(중앙하단)/RB(우측하단)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>style<span class="type">Css</span></dt>
                                                        <dd>최대 width를 설정 하기 위해서만 사용(max-width:100px)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>customColor<span class="type">Hex</span></dt>
                                                        <dd>커스텀 색상 설정</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본 --> 
    <comp-bubble-box subject="제목" content="컨텐츠" subcontent="서브컨텐츠" pos="LT" custom-color="사용자 색상">
        <타켓 엘리먼트/컴포넌트></타켓 엘리먼트/컴포넌트>
    </comp-bubble-box>
    
    <!-- Click --> 
    <comp-bubble-box subject="제목" content="컨텐츠" subcontent="서브컨텐츠" pos="LT" :click="true">
        <타켓 엘리먼트/컴포넌트></타켓 엘리먼트/컴포넌트>
    </comp-bubble-box>
    
    <!-- 최대 Width 설정 -->
    <comp-bubble-box subject="제목" content="컨텐츠" subcontent="서브컨텐츠" pos="LT" style="max-width: 100px;">
        <타켓 엘리먼트/컴포넌트></타켓 엘리먼트/컴포넌트>
    </comp-bubble-box>
    
    <!-- HTML형 -->
    <comp-bubble-box subject="제목" pos="LT" :html-type="true">
        <타켓 엘리먼트/컴포넌트></타켓 엘리먼트/컴포넌트>
        <사용자 엘리먼트></사용자 엘리먼트>
    </comp-bubble-box>
    
    <!-- Image형 -->
    <comp-bubble-box pos="LT" image="이미지경로">
        <타켓 엘리먼트/컴포넌트></타켓 엘리먼트/컴포넌트>
    </comp-bubble-box>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 110px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong>포지션</strong></th>
                                                                <th><strong>Hover</strong></th>
                                                                <th><strong>Click</strong></th>
                                                                <th><strong>최대 Width 고정</strong></th>
                                                                <th><strong>HTML형</strong></th>
                                                                <th><strong>Image형</strong></th>
                                                                <th><strong>Slot미사용(dispath)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>
                                                                    <comp-bubble-box content="선택된 항목이 없습니다" class="is-validation" :arrow-fixed="true" :show-fixed="chks_val.length ? false : true">
                                                                        <strong>LT</strong>
                                                                    </comp-bubble-box>
                                                                </th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용" subcontent="서브텍스트">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="LT" :click="true">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="<strong>툴팁내용</strong>툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="LT" style="max-width: 200px">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" pos="LT" :html-type="true">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe007;</span></button>
                                                                        <div slot="html-content" style="padding: 200px"><strong>HTML</strong> Content <span style="color: red">Data</span></div>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box
                                                                        pos="LT"
                                                                        image="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMzBfMTg2%2FMDAxNTcyMzY1MzM0MTg4.QWWkXFUBGycK8Todrsr0gqAh5RMMP7-YCLPOeDXiY1wg.vLTW44Vra3GbgjYrRjI34YUOf-wsxnVeDgTzbFMaB-0g.JPEG.wldms95123%2F190216_%25B5%25CE%25B1%25D9%25B5%25CE%25B1%25D9_%25B6%25B3%25B7%25C8%25B4%25F8_%25BE%25C6%25C0%25CC%25C1%25EE%25BF%25F8%25C0%25C7_%25C3%25B9_%25B9%25F8%25C2%25B0_%25C7%25CF%25C0%25CC%25C5%25CD%25C4%25A1%25C8%25B8%25B0%25A1_%25B3%25A1%25B3%25B5%25BD%25C0%25B4%25CF%25B4%25D9.jpg&type=sc960_832"
                                                                        style="max-width: 200px"
                                                                        :click="true">
                                                                        <comp-image
                                                                            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMzBfMTg2%2FMDAxNTcyMzY1MzM0MTg4.QWWkXFUBGycK8Todrsr0gqAh5RMMP7-YCLPOeDXiY1wg.vLTW44Vra3GbgjYrRjI34YUOf-wsxnVeDgTzbFMaB-0g.JPEG.wldms95123%2F190216_%25B5%25CE%25B1%25D9%25B5%25CE%25B1%25D9_%25B6%25B3%25B7%25C8%25B4%25F8_%25BE%25C6%25C0%25CC%25C1%25EE%25BF%25F8%25C0%25C7_%25C3%25B9_%25B9%25F8%25C2%25B0_%25C7%25CF%25C0%25CC%25C5%25CD%25C4%25A1%25C8%25B8%25B0%25A1_%25B3%25A1%25B3%25B5%25BD%25C0%25B4%25CF%25B4%25D9.jpg&type=sc960_832"></comp-image>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chks" v-model="chks_val" :opts="chks" all-label="전체"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>CT</strong></th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용" pos="CT">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <comp-bubble-box
                                                                        pos="CT"
                                                                        image="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMzBfMTg2%2FMDAxNTcyMzY1MzM0MTg4.QWWkXFUBGycK8Todrsr0gqAh5RMMP7-YCLPOeDXiY1wg.vLTW44Vra3GbgjYrRjI34YUOf-wsxnVeDgTzbFMaB-0g.JPEG.wldms95123%2F190216_%25B5%25CE%25B1%25D9%25B5%25CE%25B1%25D9_%25B6%25B3%25B7%25C8%25B4%25F8_%25BE%25C6%25C0%25CC%25C1%25EE%25BF%25F8%25C0%25C7_%25C3%25B9_%25B9%25F8%25C2%25B0_%25C7%25CF%25C0%25CC%25C5%25CD%25C4%25A1%25C8%25B8%25B0%25A1_%25B3%25A1%25B3%25B5%25BD%25C0%25B4%25CF%25B4%25D9.jpg&type=sc960_832"
                                                                        style="max-width: 200px">
                                                                        <comp-image
                                                                            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMzBfMTg2%2FMDAxNTcyMzY1MzM0MTg4.QWWkXFUBGycK8Todrsr0gqAh5RMMP7-YCLPOeDXiY1wg.vLTW44Vra3GbgjYrRjI34YUOf-wsxnVeDgTzbFMaB-0g.JPEG.wldms95123%2F190216_%25B5%25CE%25B1%25D9%25B5%25CE%25B1%25D9_%25B6%25B3%25B7%25C8%25B4%25F8_%25BE%25C6%25C0%25CC%25C1%25EE%25BF%25F8%25C0%25C7_%25C3%25B9_%25B9%25F8%25C2%25B0_%25C7%25CF%25C0%25CC%25C5%25CD%25C4%25A1%25C8%25B8%25B0%25A1_%25B3%25A1%25B3%25B5%25BD%25C0%25B4%25CF%25B4%25D9.jpg&type=sc960_832"></comp-image>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>RT</strong></th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="RT">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>LB</strong></th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="LB">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>CB</strong></th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용" pos="CB">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>RB</strong></th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="RB">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>사용자색상</strong></th>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용" subcontent="서브텍스트" custom-color="#52beba">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="LT" :click="true" custom-color="#52beba">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" content="<strong>툴팁내용</strong>툴팁내용툴팁내용툴팁내용툴팁내용툴팁내용" pos="LT" style="max-width: 200px" custom-color="#52beba">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box subject="툴팁제목" pos="LT" :html-type="true" custom-color="#52beba">
                                                                        <button class="ui_btn is-icon-only"><span class="icon">&#xe007;</span></button>
                                                                        <div slot="html-content" style="padding: 200px"><strong>HTML</strong> Content <span style="color: red">Data</span></div>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box
                                                                        pos="LT"
                                                                        image="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMzBfMTg2%2FMDAxNTcyMzY1MzM0MTg4.QWWkXFUBGycK8Todrsr0gqAh5RMMP7-YCLPOeDXiY1wg.vLTW44Vra3GbgjYrRjI34YUOf-wsxnVeDgTzbFMaB-0g.JPEG.wldms95123%2F190216_%25B5%25CE%25B1%25D9%25B5%25CE%25B1%25D9_%25B6%25B3%25B7%25C8%25B4%25F8_%25BE%25C6%25C0%25CC%25C1%25EE%25BF%25F8%25C0%25C7_%25C3%25B9_%25B9%25F8%25C2%25B0_%25C7%25CF%25C0%25CC%25C5%25CD%25C4%25A1%25C8%25B8%25B0%25A1_%25B3%25A1%25B3%25B5%25BD%25C0%25B4%25CF%25B4%25D9.jpg&type=sc960_832"
                                                                        style="max-width: 200px"
                                                                        custom-color="#52beba">
                                                                        <comp-image
                                                                            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMzBfMTg2%2FMDAxNTcyMzY1MzM0MTg4.QWWkXFUBGycK8Todrsr0gqAh5RMMP7-YCLPOeDXiY1wg.vLTW44Vra3GbgjYrRjI34YUOf-wsxnVeDgTzbFMaB-0g.JPEG.wldms95123%2F190216_%25B5%25CE%25B1%25D9%25B5%25CE%25B1%25D9_%25B6%25B3%25B7%25C8%25B4%25F8_%25BE%25C6%25C0%25CC%25C1%25EE%25BF%25F8%25C0%25C7_%25C3%25B9_%25B9%25F8%25C2%25B0_%25C7%25CF%25C0%25CC%25C5%25CD%25C4%25A1%25C8%25B8%25B0%25A1_%25B3%25A1%25B3%25B5%25BD%25C0%25B4%25CF%25B4%25D9.jpg&type=sc960_832"></comp-image>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>도움말</strong></th>
                                                                <td>
                                                                    <comp-bubble-box class="is-helper" :html-type="true" pos="LB">
                                                                        <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                                                        <div slot="html-content">
                                                                            <ol>
                                                                                <li>급상승 해시태그에서 표시하고 싶지 않은 해시태그를 제외어로 설정합니다.</li>
                                                                                <li>최대 100개의 해시태그를 제외할 수 있습니다.</li>
                                                                                <li>
                                                                                    입력한 그대로의 해시태그만 제외됩니다.
                                                                                    <br /><span class="ex">#<span style="color: #ffaf1c">광고</span> ▶ #유료<span style="color: #ffaf1c">광고</span>(X), #<span style="color: #ffaf1c">광고</span>임(X) 등의 해시태그 제외 안됨</span>
                                                                                </li>
                                                                            </ol>
                                                                        </div>
                                                                    </comp-bubble-box>
                                                                </td>
                                                                <td>
                                                                    <comp-bubble-box class="is-helper" :html-type="true" pos="RB" click>
                                                                        <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                                                        <div slot="html-content">
                                                                            <ol>
                                                                                <li>급상승 해시태그에서 표시하고 싶지 않은 해시태그를 제외어로 설정합니다.</li>
                                                                                <li>최대 100개의 해시태그를 제외할 수 있습니다.</li>
                                                                                <li>
                                                                                    입력한 그대로의 해시태그만 제외됩니다.
                                                                                    <br /><span class="ex">#<span style="color: #ffaf1c">광고</span> ▶ #유료<span style="color: #ffaf1c">광고</span>(X), #<span style="color: #ffaf1c">광고</span>임(X) 등의 해시태그 제외 안됨</span>
                                                                                </li>
                                                                            </ol>
                                                                        </div>
                                                                    </comp-bubble-box>
                                                                </td>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>말풍선 Example - 게시판</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01"></comp-helpbox-btn>
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
                                                    <li>
                                                        <strong>추천 검색어</strong>
                                                        <ul>
                                                            <li class="is-no-hypen">
                                                                <span class="ex">
                                                                    <table>
                                                                        <colgroup>
                                                                            <col style="width: 120px" />
                                                                            <col style="width: 100px" />
                                                                            <col style="width: 100px" />
                                                                            <col style="width: 170px" />
                                                                            <col style="width: 100px" />
                                                                        </colgroup>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>블로그</th>
                                                                                <th>카페</th>
                                                                                <th>유튜브</th>
                                                                                <th>인스타그램</th>
                                                                                <th>트위터</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>누적 방문자 수</td>
                                                                                <td>회원 수</td>
                                                                                <td>구독자 수</td>
                                                                                <td>게시물 좋아요 수 + 댓글 수</td>
                                                                                <td>팔로워 수</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd">
                                            <div class="infos">
                                                <div class="rc">
                                                    <div class="page_info">
                                                        <span>총 <strong>1</strong> 건</span>
                                                        <hr />
                                                        <span><strong>1</strong> / <strong>20</strong> Pages</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 200px" />
                                                        <col />
                                                        <col style="width: 100px" />
                                                        <col style="width: 140px" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <strong>출처</strong>
                                                                <comp-bubble-box class="is-helper" :html-type="true" pos="LB">
                                                                    <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                                                    <div class="ui_help" slot="html-content">
                                                                        <ol>
                                                                            <li>급상승 해시태그에서 표시하고 싶지 않은 해시태그를 제외어로 설정합니다.</li>
                                                                            <li>최대 100개의 해시태그를 제외할 수 있습니다.</li>
                                                                            <li>
                                                                                입력한 그대로의 해시태그만 제외됩니다.
                                                                                <br />
                                                                                <span class="ex">#<span style="color: #ffaf1c">광고</span> ▶ #유료<span style="color: #ffaf1c">광고</span>(X), #<span style="color: #ffaf1c">광고</span>임(X) 등의 해시태그 제외 안됨</span>
                                                                                <br />
                                                                                <span class="ex">
                                                                                    <table>
                                                                                        <colgroup>
                                                                                            <col style="width: 120px" />
                                                                                            <col style="width: 100px" />
                                                                                            <col style="width: 100px" />
                                                                                            <col style="width: 170px" />
                                                                                            <col style="width: 100px" />
                                                                                        </colgroup>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th>블로그</th>
                                                                                                <th>카페</th>
                                                                                                <th>유튜브</th>
                                                                                                <th>인스타그램</th>
                                                                                                <th>트위터</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>누적 방문자 수</td>
                                                                                                <td>회원 수</td>
                                                                                                <td>구독자 수</td>
                                                                                                <td>게시물 좋아요 수 + 댓글 수</td>
                                                                                                <td>팔로워 수</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </span>
                                                                            </li>
                                                                        </ol>

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
                                                                            <li>
                                                                                <strong>추천 검색어</strong>
                                                                                <ul>
                                                                                    <li class="is-no-hypen">
                                                                                        <span class="ex">
                                                                                            <table>
                                                                                                <colgroup>
                                                                                                    <col style="width: 120px" />
                                                                                                    <col style="width: 100px" />
                                                                                                    <col style="width: 100px" />
                                                                                                    <col style="width: 170px" />
                                                                                                    <col style="width: 100px" />
                                                                                                </colgroup>
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>블로그</th>
                                                                                                        <th>카페</th>
                                                                                                        <th>유튜브</th>
                                                                                                        <th>인스타그램</th>
                                                                                                        <th>트위터</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td>누적 방문자 수</td>
                                                                                                        <td>회원 수</td>
                                                                                                        <td>구독자 수</td>
                                                                                                        <td>게시물 좋아요 수 + 댓글 수</td>
                                                                                                        <td>팔로워 수</td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </span>
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </comp-bubble-box>
                                                            </th>
                                                            <th><strong>제목</strong></th>
                                                            <th><strong>성향</strong></th>
                                                            <th><strong>수집시간</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <!-- 데이터 없는 경우 -->
                                                    <tbody v-if="brdDatas.list.length == 0">
                                                        <tr v-for="idx in Math.floor((brdOpts.rowCnt - 1) / 2)" :key="'a_' + idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                        <tr class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt" class="no_over no_data in_list">
                                                                <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="idx in Math.ceil((brdOpts.rowCnt - 1) / 2)" :key="'b_' + idx" class="is-no-over">
                                                            <td :colspan="brdOpts.colCnt"></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 없는 경우 -->

                                                    <!-- 데이터 있는 경우 -->
                                                    <tbody v-else>
                                                        <tr v-for="(item, idx) in brdDatas.list" :key="'c_' + idx">
                                                            <th>
                                                                <span>{{ item.origin }}</span>
                                                            </th>
                                                            <td class="ui_al">
                                                                <comp-bubble-box class="is-board" :content="item.txts" style="max-width: 800px">
                                                                    <a class="lnk" href="#" target="_blank"
                                                                        ><span>{{ item.title }}</span></a
                                                                    >
                                                                </comp-bubble-box>
                                                            </td>
                                                            <td>
                                                                <span class="ui_ico_senti is-positive"
                                                                    ><span>{{ item.senti }}</span></span
                                                                >
                                                            </td>
                                                            <td>
                                                                <span>{{ item.date }}</span>
                                                            </td>
                                                        </tr>
                                                        <tr v-for="idx in brdOpts.rowCnt - brdDatas.list.length > 0 ? brdOpts.rowCnt - brdDatas.list.length : 0" :key="idx" class="is-no-over">
                                                            <th></th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                    <!-- // 데이터 있는 경우 -->
                                                </table>
                                            </div>
                                            <div class="footer">
                                                <comp-paginate :datas="brdOpts" :total-len="brdDatas.totalLen" v-model="brdOpts.curIdx"></comp-paginate>
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
    name: 'component-bubble',
    data() {
        return {
            brdOpts: {
                colCnt: 4, // 게시판 Col
                rowCnt: 10, // 게시판 Row
                brdSort: 'brd_sort_01_origin_up', // 게시판 정렬 : name + id + ( up or dn )
                curIdx: 1, // 현재 페이지 번호
                pagingColCnt: 10, // 페이징 갯수
                tabIdx: 2, // Tab IDX
            },
            brdLoading: false,
            brdDatas: {
                totalLen: 354,
                list: [
                    {
                        origin: '출처 1',
                        title: '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
                        txts: '내용입니다. <strong>내용입니다.</strong> 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
                        lnk: 'http://realsn.com',
                        senti: 0,
                        date: '2018-01-01 00:00:00',
                    },
                    {
                        origin: '출처 2',
                        title: '제목입니다',
                        txts: '내용입니다. <strong>내용입니다.</strong> 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
                        lnk: 'http://realsn.com',
                        senti: 0,
                        date: '2018-01-01 00:00:00',
                    },
                ],
            },
            switch01: true,
            chks_val: '',
            chks: [
                { code: 1, name: '체크 1' },
                { code: 2, name: '체크 2' },
                { code: 3, name: '체크 3' },
                { code: 4, name: '체크 4' },
            ],
        };
    },
};
</script>

<style></style>
