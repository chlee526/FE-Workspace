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
                                            <h3><span>Tooltip</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/tooltip" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Tooltip - 제목/컨텐츠/서브컨텐츠, HTML, Image, 도움말형태로 구성</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>가로 사이즈 제한</strong> : 최대 크기 제한</span>
                                                    </li>
                                                    <li>
                                                        <strong>형태</strong>
                                                        <ul>
                                                            <li><strong>텍스트형</strong> : 제목/컨텐츠/서브컨텐츠로 구성된 툴팁</li>
                                                            <li><strong>HTML형</strong> : HTML형태로 이루어진 툴팁</li>
                                                            <li><strong>이미지형</strong> : 이미지형태의 툴팁(이미지 확대보기 or 원본 이미지 보기의 개념)</li>
                                                            <li><strong>도움말형</strong> : 도움말형태의 툴팁</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>툴팁 내용</strong> : 툴팁 내용을 수정, 제목/내용/보조내용 으로 구성되어 있으며, 형태에 따라 입력 가능 내용이 상이함.</span>
                                                    </li>
                                                    <li>
                                                        <strong>인터렉션형태</strong>
                                                        <ul>
                                                            <li><strong>오버/아웃</strong> : Over/Out의 일반적인 인터렉션</li>
                                                            <li><strong>토글</strong> : toggle형태의 인터렉션</li>
                                                            <li><strong>고정</strong> : 인터렉션과 무관하게 고정</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>경고성</strong> : 경고성 툴팁으로 컬러가 레드로 고정되며, "툴팁내용"만 사용 가능</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>작은툴팁</strong> : 작은 형태의 Tooltip</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>사용자 색상</strong> : 사용자 지정 색상으로 표현</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>위치</strong>
                                                <comp-selectbox id="set_pos" v-model="set.pos.value" :opts="set.pos.opts"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>가로 사이즈 제한</strong>
                                                <comp-input-box id="set_wid" type="number" v-model="set.wid" placeholder="가로" label="가로크기 입력" min="50" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>형태</strong>
                                                <comp-radio-grp id="set_content_type" name="contentType" v-model="set.content.type.value" :opts="set.content.type.opts" :box="true"></comp-radio-grp>
                                            </div>
                                            <comp-filter-grp pos="BR" :disabled="set.content.type.value == 2">
                                                <template v-slot:title>툴팁 내용</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>제목</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_txt_1" v-model="set.content.txt1" placeholder="제목" style="width: 300px" :disabled="set.content.type.value != 0 || set.red"></comp-input-box></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>컨텐츠</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_txt_2" v-model="set.content.txt2" placeholder="내용" style="width: 300px" :disabled="set.content.type.value != 0"></comp-input-box></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>서브컨텐츠</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_txt_3" v-model="set.content.txt3" placeholder="보조내용" style="width: 300px" :disabled="set.content.type.value != 0 || set.red"></comp-input-box></dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <div class="grp">
                                                <strong>인터렉션 형태</strong>
                                                <comp-radio-grp id="set_interRaction_type" name="interRactionType" v-model="set.interRactionType.value" :opts="set.interRactionType.opts" :box="true"></comp-radio-grp>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_red" class="is-small" v-model="set.red" label="경고성"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_small" class="is-small" v-model="set.small" label="작은툴팁" :disabled="set.red"></comp-switch-btn>
                                            <hr />
                                            <div class="grp">
                                                <strong>사용자색상</strong>
                                                <comp-colorpicker v-model="set.fill" :use-confirm="false" pos="BR" :disabled="set.red" useReset />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row">
                                                <div class="wrap">
                                                    <div class="ui_col" style="padding: 80px 0; text-align: center">
                                                        <comp-bubble-box :class="[{ 'is-validation': set.red }, { 'is-small': !set.red && set.small }]" :pos="set.pos.value" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :toggle="set.interRactionType.value == 1" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill" :show-fixed="set.interRactionType.value == 2">
                                                            <button class="ui_btn"><span class="txt">툴팁 확인용 버튼</span></button>
                                                            <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                        </comp-bubble-box>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div class="ui_row">
                                                <div class="wrap">
                                                    <div class="ui_col">
                                                        <div class="ui_box is-2dp">
                                                            <div class="header">
                                                                <div class="wrap">
                                                                    <h3>
                                                                        <span>위치별 샘플</span>
                                                                        <div class="sub_title">
                                                                            <span title="채널 유효성 검사" class="keyword">인터렉션 "오버/아웃"만 적용</span>
                                                                        </div>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div class="content">
                                                                <div class="wrap">
                                                                    <div class="ui_brd is-data is-size-auto">
                                                                        <div class="wrap">
                                                                            <table>
                                                                                <colgroup>
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                    <col style="width: 100px" />
                                                                                </colgroup>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th><strong>좌측</strong></th>
                                                                                        <th><strong>우측</strong></th>
                                                                                        <th><strong>좌측 상단</strong></th>
                                                                                        <th><strong>중앙 상단</strong></th>
                                                                                        <th><strong>우측 상단</strong></th>
                                                                                        <th><strong>좌측 하단</strong></th>
                                                                                        <th><strong>중앙 하단</strong></th>
                                                                                        <th><strong>우측 하단</strong></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="L" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <button class="ui_btn"><span class="txt">툴팁</span></button>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="R" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <span>툴팁</span>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="LT" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <button class="ui_btn is-icon-only"><span class="icon">&#xe006;</span></button>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="CT" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <span>툴팁</span>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="RT" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <comp-image src="https://www.realsn.com/_nuxt/img/34bcaf6.png"></comp-image>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="LB" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <span>툴팁</span>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="CB" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <span>툴팁</span>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
                                                                                        </td>
                                                                                        <td>
                                                                                            <comp-bubble-box :class="{ 'is-validation': set.red }" pos="RB" :subject="set.content.txt1" :content="set.content.txt2" :subcontent="set.content.txt3" :image="getImg" :html-type="getHtml || getHelper" :style="getWid" :custom-color="set.fill">
                                                                                                <span>툴팁</span>
                                                                                                <comp-tooltip-html slot="html-content" :html="getHtml" :helper="getHelper"></comp-tooltip-html>
                                                                                            </comp-bubble-box>
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
                                                <span>Example</span>
                                                <div class="sub_title">
                                                    <span title="채널 유효성 검사" class="keyword">채널 유효성 검사</span>
                                                    <span title="게시판 헤더 도움말" class="keyword">게시판 헤더 도움말</span>
                                                    <span title="게시판 본문 상세(제목 Over)" class="keyword">게시판 본문 상세(제목 Over)</span>
                                                </div>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s02"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s02">
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
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <comp-bubble-box content="채널은 필수 입니다." class="is-validation" pos="LT" :show-fixed="!brdChn.length">
                                                    <strong>채널</strong>
                                                </comp-bubble-box>
                                                <comp-selectbox id="brd_chn2" v-model="brdChn" :opts="getChns" :multiple="true" style="width: 150px"></comp-selectbox>
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
import { mapGetters } from 'vuex';

import CompTooltipHtml from './tooltipHtml.vue';

export default {
    name: 'component-bubble',
    data() {
        return {
            set: {
                pos: {
                    value: 'LT',
                    opts: [
                        { code: 'L', name: '좌측' },
                        { code: 'R', name: '우측' },
                        { code: 'LT', name: '좌측 상단' },
                        { code: 'CT', name: '중앙 상단' },
                        { code: 'RT', name: '우측 상단' },
                        { code: 'LB', name: '좌측 하단' },
                        { code: 'CB', name: '중앙 하단' },
                        { code: 'RB', name: '우측 하단' },
                    ],
                },
                content: {
                    type: {
                        value: 0,
                        opts: [
                            { code: 0, name: '텍스트형' },
                            { code: 1, name: 'HTML형' },
                            { code: 2, name: '이미지형' },
                            { code: 3, name: '도움말형' },
                        ],
                    },
                    txt1: '툴팁 제목',
                    txt2: '툴팁 내용내용내용내용',
                    txt3: '툴팁 보조',
                    txt4: '<p>HTML Content</p>',
                },
                interRactionType: {
                    value: 0,
                    opts: [
                        { code: 0, name: '오버/아웃' },
                        { code: 1, name: '토글' },
                        { code: 2, name: '고정' },
                    ],
                },
                fixed: false,
                red: false,
                toggle: false,
                wid: null,
                small: false,
            },
            brdChn: '',
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
    components: {
        'comp-tooltip-html': CompTooltipHtml,
    },
    computed: {
        ...mapGetters(['getChns']),
        getWid() {
            return `max-width:${this.set.wid ? this.set.wid + 'px' : 'none'}`;
        },
        getImg() {
            return this.set.content.type.value == 2 ? 'https://www.realsn.com/_nuxt/img/34bcaf6.png' : undefined;
        },
        getHtml() {
            return this.set.content.type.value == 1;
        },
        getHelper() {
            return this.set.content.type.value == 3;
        },
    },
};
</script>

<style></style>
