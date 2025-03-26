<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">달력</h2>
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
                                            <h3><span>달력(단일)</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">달력(단일) 컴포넌트.<br />달력 영역 외 클릭시 달력 Close.<br />달력에서 날짜를 선택하는 즉시 데이터에 반영 됨.</div>
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
                                                        <dt>s_date<span class="type">Object</span></dt>
                                                        <dd>시작 날짜(시간) 값</dd>
                                                        <dd>단일 인 경우(범위아님) s_date만 설정</dd>
                                                        <dd>{ date: "날짜(2020-01-01)", time: "시간(00:00:00)" }</dd>
                                                        <dd>시간을 사용하는 경우에만 'time'속성을 설정함(기본적으로 시간이 포함된 경우 시(hour)만 수정 가능).</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>e_date<span class="type">Object</span></dt>
                                                        <dd>종료 날짜(시간) 값</dd>
                                                        <dd>{ date: "날짜(2020-01-01)", time: "시간(00:00:00)" }</dd>
                                                        <dd>시간을 사용하는 경우에만 'time'속성을 설정함(기본적으로 시간이 포함된 경우 시(hour)만 수정 가능).</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>p_date<span class="type">Object</span></dt>
                                                        <dd>종료 날짜(시간) 값</dd>
                                                        <dd>{ date: "날짜(2020-01-01)", time: "시간(00:00:00)", popChk: POP활성여부(true/false) }</dd>
                                                        <dd>시간을 사용하는 경우에만 'time'속성을 설정함(기본적으로 시간이 포함된 경우 시(hour)만 수정 가능).</dd>
                                                        <dd>popChk가 true인경우 초기 설정부터 POP 날짜가 반영됨.(시간딜레이가 있을수 있으니, 개발시 해당 부분 고려)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>minuteEdit<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>시간을 사용하는 경우에만 사용 가능</dd>
                                                        <dd>'분' 단위 설정 UI제공</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>secondEdit<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>시간을 사용하는 경우에만 사용 가능</dd>
                                                        <dd>'초' 단위 설정 UI제공</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>min_date<span class="type">String</span></dt>
                                                        <dd>이동 가능한 최소 날짜</dd>
                                                        <dd>설정하지 않는 경우 달력 이동에 최소 제한이 없음</dd>
                                                        <dd>이전기간 달력의 최소날짜는 검색기간의 최소날짜보다 하루전으로 설정(필수)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>max_date<span class="type">String</span></dt>
                                                        <dd>이동 가능한 최대 날짜</dd>
                                                        <dd>설정하지 않는 경우 달력 이동에 최대 제한이 없음</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>dataFixed<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>클릭 인터렉션시 사용되는 캘린더의 Position을 Static으로 사용하는 경우에 설정</dd>
                                                        <dd>포지션의 기본설정 값은 'absolute'</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>completeBtn<span class="type">String</span><span class="default">확인</span></dt>
                                                        <dd>캘린더에 버튼(String)이 출력</dd>
                                                        <dd>버튼 클릭시에만 달력이 반영됨</dd>
                                                        <dd>미사용시 :complete-btn="null"</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>date_grp<span class="type">Array</span></dt>
                                                        <dd>현재(오늘)날짜 기준으로 옵션에서 설정한 날짜만큼 이전날짜로 자동 이동.</dd>
                                                        <dd><strong>X일</strong>: 0(오늘)</dd>
                                                        <dd><strong>X개월</strong>: 1BM(현재일자 기준 X월전)</dd>
                                                        <dd><strong>X월</strong>: 3M(3월)</dd>
                                                        <dd><strong>X년</strong>: 1BY(현재일자 기준 X년전)</dd>
                                                        <dd><strong>X년</strong>: 2021Y(2021년)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>pDateChk<span class="type">Boolean</span></dt>
                                                        <dd>이전기간 달력으로 사용 여부</dd>
                                                        <dd>사용할 경우 POP버튼 노출</dd>
                                                        <dd>:p-date-chk.sync="popChk"</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>pDate<span class="type">Object</span></dt>
                                                        <dd>이전기간 달력(pDateChk)으로 사용 할경우 사용</dd>
                                                        <dd>현재날짜를 오브젝트 형태로 전달</dd>
                                                        <dd>{s_date: { date: "날짜" },e_date: { date: "날짜" }}</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :min_date.sync="이동 가능한 최소 날짜" :max_date="이동 가능한 최대 날짜" :data-fixed="고정포지션사용여부"></comp-datepicker>
    
    <!-- 확인 버튼 미포함 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :complete-btn="null"></comp-datepicker>
    
    <!-- 자동선택 날짜 그룹 포함 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :date_grp="[설정날짜]"></comp-datepicker>
    
    <!-- 시간 포함/시간 설정(분/초단위 설정) -->
    시작날짜: {
        date: "2021-01-01",
        time: "15:33:33"
    }
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :complete-btn="null" :minute-edit="true" :second-edit="true"></comp-datepicker>
    
    <!-- 미사용(Disabled) -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" disabled></comp-datepicker>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 110px" />
                                                            <col />
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>시간 포함</strong></th>
                                                                <th><strong>확인 버튼 미사용</strong></th>
                                                                <th><strong>버튼이름정의</strong></th>
                                                                <th><strong>기준날짜 변경(1일전)</strong></th>
                                                                <th><strong>그룹 포함</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_01" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_02" class="is-small" :s_date.sync="calendarDatas.sdate" :minute-edit="true" :second-edit="true" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_03" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" :complete-btn="null" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_04" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" complete-btn="반영" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_05" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" :c_date_gap="-1" :date_grp="[0]" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_06" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" data-fixed="true" :date_grp="[0, 1, 2, '1M']"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_07" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" data-fixed="true" disabled></comp-datepicker>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_11" :s_date.sync="calendarDatas.sdateNoTime" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_21" class="is-large" :s_date.sync="calendarDatas.sdateNoTime" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_31" class="is-xlarge" :s_date.sync="calendarDatas.sdateNoTime" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>달력(기간)</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">달력(기간) 컴포넌트.<br />달력 영역 외 클릭시 달력 Close.<br />달력에서 날짜를 선택하는 즉시 데이터에 반영 됨.</div>
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
                                                        <dt>s_date<span class="type">Object</span></dt>
                                                        <dd>시작 날짜(시간) 값</dd>
                                                        <dd>{ date: "날짜(2020-01-01)", time: "시간(00:00:00)" }</dd>
                                                        <dd>시간을 사용하는 경우에만 'time'속성을 설정함(기본적으로 시간이 포함된 경우 시(hour)만 수정 가능).</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>e_date<span class="type">Object</span></dt>
                                                        <dd>종료 날짜(시간) 값</dd>
                                                        <dd>{ date: "날짜(2020-01-01)", time: "시간(00:00:00)" }</dd>
                                                        <dd>시간을 사용하는 경우에만 'time'속성을 설정함.</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>c_type_opts<span class="type">Array</span><span class="default">["day", "week", "month", "quarter", "half", "year"]</span></dt>
                                                        <dd>달력 타입 변경 셀렉트 박스</dd>
                                                        <dd>사용하고자 하는 옵션명만 Prop으로 전달, 기본은 전체</dd>
                                                        <dd>미사용시 "null" 전달(:c_type_opts="null")</dd>
                                                        <dd><strong>day</strong>: 일별</dd>
                                                        <dd><strong>week</strong>: 주별</dd>
                                                        <dd><strong>month</strong>: 월별</dd>
                                                        <dd><strong>quarter</strong>: 분기별</dd>
                                                        <dd><strong>half</strong>: 반기별</dd>
                                                        <dd><strong>year</strong>: 연별</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>c_type<span class="type">String</span><span class="default">day</span></dt>
                                                        <dd>달력 타입 설정</dd>
                                                    </dl>

                                                    <dl>
                                                        <dt>minuteEdit<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>시간을 사용하는 경우에만 사용 가능</dd>
                                                        <dd>'분' 단위 설정 UI제공</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>secondEdit<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>시간을 사용하는 경우에만 사용 가능</dd>
                                                        <dd>'초' 단위 설정 UI제공</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>min_date<span class="type">String</span></dt>
                                                        <dd>이동 가능한 최소 날짜</dd>
                                                        <dd>설정하지 않는 경우 달력 이동에 최소 제한이 없음</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>max_date<span class="type">String</span></dt>
                                                        <dd>이동 가능한 최대 날짜</dd>
                                                        <dd>설정하지 않는 경우 달력 이동에 최대 제한이 없음</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>dataFixed<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>클릭 인터렉션시 사용되는 캘린더의 Position을 Static으로 사용하는 경우에 설정</dd>
                                                        <dd>포지션의 기본설정 값은 'absolute'</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>completeBtn<span class="type">String</span><span class="default">확인</span></dt>
                                                        <dd>캘린더에 버튼(String)이 출력</dd>
                                                        <dd>버튼 클릭시에만 달력이 반영됨</dd>
                                                        <dd>미사용시 :complete-btn="null"</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>date_grp<span class="type">Array</span></dt>
                                                        <dd>현재(오늘)날짜 기준으로 옵션에서 설정한 날짜만큼 이전날짜로 자동 이동.</dd>
                                                        <dd><strong>X일</strong>: 0(오늘)</dd>
                                                        <dd><strong>X개월</strong>: 1BM(현재일자 기준 X월전)</dd>
                                                        <dd><strong>X월</strong>: 3M(3월)</dd>
                                                        <dd><strong>X년</strong>: 1BY(현재일자 기준 X년전)</dd>
                                                        <dd><strong>X년</strong>: 2021Y(2021년)</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :e_date.sync="종료날짜" range="기간범위" :min_date="이동 가능 최소 날짜" :max_date="이동 가능 최대 날짜" data-fixed="고정포지션사용여부"></comp-datepicker>
    
    <!-- 확인 버튼 미포함 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :e_date.sync="종료날짜" :complete-btn="null"></comp-datepicker>
    
    <!-- 자동선택 날짜 그룹 포함 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :e_date.sync="종료날짜" :date_grp="[설정날짜]"></comp-datepicker>
    
    <!-- 시간 포함/시간 설정(분/초단위 설정) -->
    시작날짜: {
        date: "2021-01-01",
        time: "15:33:33"
    }
    <comp-datepicker id="아이디명" class="클래스명" s_date.sync="시작날짜" :complete-btn="null" :minute-edit="true" :second-edit="true"></comp-datepicker>
    
    <!-- 달력 타입 옵션 설정 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :e_date.sync="종료날짜" :c_type_opts="[옵션목록]"></comp-datepicker>
    
    <!-- 달력 타입 변경 -->
    <comp-datepicker id="아이디명" class="클래스명" :s_date.sync="시작날짜" :e_date.sync="종료날짜" :c_type="변경옵션"></comp-datepicker>
    
    <!-- 미사용(Disabled) -->
    <comp-datepicker id="아이디명" class="클래스명" s_date.sync="시작날짜" :e_date.sync="종료날짜" disabled></comp-datepicker>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 110px" />
                                                            <col />
                                                            <col />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>시간 포함</strong></th>
                                                                <th><strong>전체 기능 포함</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_001" :c_type_opts="null" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" :e_date.sync="calendarDatas.edateNoTime" range="30" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_002" :c_type_opts="null" class="is-small" :s_date.sync="calendarDatas.sdate" :e_date.sync="calendarDatas.edate" range="3M" :minute-edit="true" :second-edit="true" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_006" class="is-small" c_type="day" :s_date.sync="calendarDatas.sdateNoTimeWeek2" :e_date.sync="calendarDatas.edateNoTimeWeek2" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" range="3M" data-fixed="true" :date_grp="[0, 1, 7, '1BM', '4M', '7M', '8M', '1BY', '2021Y', '2022Y']"></comp-datepicker>
                                                                    <br />
                                                                    <comp-datepicker id="dp_006_02" class="is-small" c_type="week" :s_date.sync="calendarDatas.sdateNoTimeWeek" :e_date.sync="calendarDatas.edateNoTimeWeek" range="2M" data-fixed="true" :date_grp="[0, 7, '1BM', '3M', '2021Y']"></comp-datepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_007" :c_type_opts="null" class="is-small" :s_date.sync="calendarDatas.sdateNoTime" :e_date.sync="calendarDatas.edateNoTime" range="10Y" data-fixed="true" disabled></comp-datepicker>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_011" :c_type_opts="null" :s_date.sync="calendarDatas.sdateNoTime" :e_date.sync="calendarDatas.edateNoTime" range="35" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td></td>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_012" :c_type_opts="['day', 'week', 'month', 'year']" c_type="month" :s_date.sync="calendarDatas.sdateNoTimeMonth" :e_date.sync="calendarDatas.edateNoTimeMonth" range="2Y" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true" :date_grp="[0, 7, '1BM', '3M', '2021Y']"></comp-datepicker>
                                                                    <br />
                                                                    <comp-datepicker id="dp_013" c_type="quarter" :s_date.sync="calendarDatas.sdateNoTimeQuarter" :e_date.sync="calendarDatas.edateNoTimeQuarter" range="2Y" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true" :date_grp="[0, 7, '1BM', '3M', '2021Y']"></comp-datepicker>
                                                                    <br />
                                                                    <comp-datepicker id="dp_014" c_type="half" :s_date.sync="calendarDatas.sdateNoTimeHalf" :e_date.sync="calendarDatas.edateNoTimeHalf" range="2Y" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true" :date_grp="[0, 7, '1BM', '3M', '2021Y']"></comp-datepicker>
                                                                    <br />
                                                                    <comp-datepicker id="dp_015" c_type="year" :s_date.sync="calendarDatas.sdateNoTimeYear" :e_date.sync="calendarDatas.edateNoTimeYear" range="2Y" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true" :date_grp="[0, 7, '1BM', '3M', '2021Y', '2022Y']"></comp-datepicker>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_021" :c_type_opts="null" class="is-large" :s_date.sync="calendarDatas.sdateNoTime" :e_date.sync="calendarDatas.edateNoTime" range="10Y" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-datepicker id="dp_031" :c_type_opts="null" class="is-xlarge" :s_date.sync="calendarDatas.sdateNoTime" :e_date.sync="calendarDatas.edateNoTime" range="10Y" :min_date.sync="calendarDatas.minDate" :max_date="calendarDatas.maxDate" data-fixed="true"></comp-datepicker>
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

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>시간</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">시간 컴포넌트.<br />기본으로 시간단위 설정 UI만 제공.<br />분/초 단위 설정시 옵션이용.</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                        <dd>사이즈 : 'is-small'/'is-large'/'is-xlarge'</dd>
                                                        <dd>box mode에서는 사이즈 설정을 할 수 없음</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">String</span></dt>
                                                        <dd>시간값</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>minutesSet<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>'분' 단위 설정 UI제공</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>secondsSet<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>'초' 단위 설정 UI제공</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>box-mode<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>박스모드로 사용하는 경우 설정</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본 -->
    <comp-timepicker id="아이디명" class="클래스명" v-model="Vue Variables"></comp-timepicker>
    
    <!-- 분/초 설정 -->
    <comp-timepicker id="아이디명" class="클래스명" v-model="Vue Variables" :minutes-set="true" :seconds-set="true"></comp-timepicker>
    
    <!-- 박스 모드 -->
    <comp-timepicker id="아이디명" class="클래스명" v-model="Vue Variables" :box-mode="true"></comp-timepicker>
    
    <!-- 미사용(Disabled) -->
    <comp-timepicker id="아이디명" class="클래스명" v-model="Vue Variables" disabled></comp-timepicker>
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
                                                                <th><strong>시간/분/초 설정</strong></th>
                                                                <th><strong>박스모드</strong></th>
                                                                <th><strong>disabled</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_01" class="is-small" v-model="timeDatas.time"></comp-timepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_02" class="is-small" v-model="timeDatas.time" :minutes-set="true" :seconds-set="true"></comp-timepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_03" class="is-small" v-model="timeDatas.time" :box-mode="true"></comp-timepicker>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_04" class="is-small" v-model="timeDatas.time" disabled></comp-timepicker>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_11" v-model="timeDatas.time"></comp-timepicker>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_11" class="is-large" v-model="timeDatas.time"></comp-timepicker>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-timepicker id="tp_11" class="is-xlarge" v-model="timeDatas.time"></comp-timepicker>
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
    name: 'component-calendar',
    data() {
        return {
            calendarDatas: {
                dateRange: '1M',
                sdateNoTime: {
                    date: '2022-09-01',
                },
                edateNoTime: {
                    date: '2022-11-31',
                },
                sdateNoTimeWeek: {
                    date: '2022-11-14',
                },
                edateNoTimeWeek: {
                    date: '2022-11-30',
                },
                sdateNoTimeWeek2: {
                    date: '2022-08-01',
                },
                edateNoTimeWeek2: {
                    date: '2022-10-31',
                },
                sdateNoTimeMonth: {
                    date: '2021-06-14',
                },
                edateNoTimeMonth: {
                    date: '2022-11-5',
                },
                sdateNoTimeQuarter: {
                    date: '2021-05-14',
                },
                edateNoTimeQuarter: {
                    date: '2022-11-30',
                },
                sdateNoTimeHalf: {
                    date: '2021-04-14',
                },
                edateNoTimeHalf: {
                    date: '2022-11-30',
                },
                sdateNoTimeYear: {
                    date: '2021-05-14',
                },
                edateNoTimeYear: {
                    date: '2022-11-30',
                },
                sdate: {
                    date: '2019-05-08',
                    time: '00:00:00',
                },
                edate: {
                    date: '2019-06-08',
                    time: '23:59:59',
                },
                minDate: '2021-04-02',
                maxDate: new Date().dateToStr(),
            },
            timeDatas: {
                time: '23:00:00',
            },
        };
    },
};
</script>

<style></style>
