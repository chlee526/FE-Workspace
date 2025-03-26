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
                                                <div class="description">체크박스(단일형) 컴포넌트.<br />라벨/버튼형(라벨필수) 선택이 가능.<br />한개의 체크박스에 한개의 데이터 연결.</div>
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
                                                        <dt>val<span class="type">String</span></dt>
                                                        <dd>Value값</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Vue Variables</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>label<span class="type">String</span><span class="default">""</span></dt>
                                                        <dd>라벨 사용 시, 라벨 명</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>btn <span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>버튼 타입으로 사용시</dd>
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
                                                        code='<!-- 기본 -->
    <comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" label="라벨명" custom-color="커스텀컬러"></comp-checkbox>
    
    <!-- 버튼형 -->
    <comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" label="라벨명(라벨필수)" :btn="true" custom-color="커스텀컬러"></comp-checkbox>
    
    <!-- 라벨 없음 -->
    <comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" custom-color="커스텀컬러"></comp-checkbox>
    
    <!-- 미사용(Disabled) -->
    <comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" label="라벨명" custom-color="커스텀컬러" disabled></comp-checkbox>
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
                                                                <th><strong>아이콘 포함</strong></th>
                                                                <th><strong>커스텀컬러</strong></th>
                                                                <th><strong>라벨 없음(체크박스 단독사용)</strong></th>
                                                                <th><strong>미사용(Disabled)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-checkbox class="is-small" id="chk_01_01" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1"></comp-checkbox>
                                                                    <comp-checkbox class="is-small" id="chk_01_02" :val="2" v-model="checkboxDatas.checked_01_02" label="체크 2"></comp-checkbox>
                                                                    <comp-checkbox class="is-small" id="chk_01_03" :val="3" v-model="checkboxDatas.checked_01_03" label="체크 3" disabled></comp-checkbox>
                                                                    <comp-checkbox class="is-small" id="chk_01_04" :val="4" v-model="checkboxDatas.checked_01_04" label="체크 4"></comp-checkbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-checkbox class="is-small" id="chk_01_18" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_41" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true" before="&#xe075;"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_51" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true" custom-color="#ea8cd0"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_22" :val="1" v-model="checkboxDatas.checked_01_01"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_31" :val="1" v-model="checkboxDatas.checked_01_01" disabled></comp-checkbox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-checkbox id="chk_01_06" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1"></comp-checkbox>
                                                                    <comp-checkbox id="chk_01_07" :val="2" v-model="checkboxDatas.checked_01_02" label="체크 2"></comp-checkbox>
                                                                    <comp-checkbox id="chk_01_08" :val="3" v-model="checkboxDatas.checked_01_03" label="체크 3" disabled></comp-checkbox>
                                                                    <comp-checkbox id="chk_01_09" :val="4" v-model="checkboxDatas.checked_01_04" label="체크 4"></comp-checkbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-checkbox id="chk_01_19" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_42" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true" after="&#xe074;"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_52" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true" custom-color="#ea8cd0" after="&#xe074;"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox id="chk_01_23" :val="1" v-model="checkboxDatas.checked_01_01"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_32" :val="1" v-model="checkboxDatas.checked_01_01" disabled></comp-checkbox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-checkbox class="is-large" id="chk_01_10" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1"></comp-checkbox>
                                                                    <comp-checkbox class="is-large" id="chk_01_11" :val="2" v-model="checkboxDatas.checked_01_02" label="체크 2"></comp-checkbox>
                                                                    <comp-checkbox class="is-large" id="chk_01_12" :val="3" v-model="checkboxDatas.checked_01_03" label="체크 3" disabled></comp-checkbox>
                                                                    <comp-checkbox class="is-large" id="chk_01_13" :val="4" v-model="checkboxDatas.checked_01_04" label="체크 4"></comp-checkbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-checkbox class="is-large" id="chk_01_20" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true"></comp-checkbox>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <comp-checkbox class="is-large" id="chk_01_24" :val="1" v-model="checkboxDatas.checked_01_01"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_33" :val="1" v-model="checkboxDatas.checked_01_01" disabled></comp-checkbox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="ui_al">
                                                                    <comp-checkbox class="is-xlarge" id="chk_01_14" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1"></comp-checkbox>
                                                                    <comp-checkbox class="is-xlarge" id="chk_01_15" :val="2" v-model="checkboxDatas.checked_01_02" label="체크 2"></comp-checkbox>
                                                                    <comp-checkbox class="is-xlarge" id="chk_01_16" :val="3" v-model="checkboxDatas.checked_01_03" label="체크 3" disabled></comp-checkbox>
                                                                    <comp-checkbox class="is-xlarge" id="chk_01_17" :val="4" v-model="checkboxDatas.checked_01_04" label="체크 4"></comp-checkbox>
                                                                </td>
                                                                <td class="ui_al">
                                                                    <comp-checkbox class="is-xlarge" id="chk_01_21" :val="1" v-model="checkboxDatas.checked_01_01" label="체크 1" :btn="true"></comp-checkbox>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <comp-checkbox class="is-xlarge" id="chk_01_25" :val="1" v-model="checkboxDatas.checked_01_01"></comp-checkbox>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox class="is-small" id="chk_01_34" :val="1" v-model="checkboxDatas.checked_01_01" disabled></comp-checkbox>
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
                                            <h3><span>그룹형</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">체크박스(그룹형) 컴포넌트.<br />기본형/버튼형/박스형 선택이 가능.<br />옵션목록으로 체크박스 데이터 연결.</div>
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
                                                        <dd>[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러" } ]</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>allLabel<span class="type">String</span><span class="default">""</span></dt>
                                                        <dd>전체 기능 사용시 라벨명</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>btn<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>버튼형 사용 여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>box<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>박스형 사용 여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>disabled<span class="type">Attribute</span></dt>
                                                        <dd>미사용 여부</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>allUnchkDisabled<span class="type">Boolean</span><span class="default">false</span></dt>
                                                        <dd>전체해제(1개 남았을때 해제)가 안됨</dd>
                                                        <dd>allLabel 미사용시에만 사용</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본형 -->
    <comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 라벨명"></comp-checkbox-grp>
    
    <!-- 버튼형 -->
    <comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 라벨명" :btn="true"></comp-checkbox-grp>
    
    <!-- 박스형 -->
    <comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 라벨명" :box="true"></comp-checkbox-grp>
    
    <!-- 미사용(Disabled) -->
    <comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 라벨명" disabled></comp-checkbox-grp>
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col style="width: 350px" />
                                                            <col style="width: 450px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>기본형</th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>전체 사용</strong></th>
                                                                <th><strong>전체 사용(전체해제 불가능)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_01" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_02" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_03" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" all-unchk-disabled></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_04" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_05" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_07" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_08" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_10" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_11" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체"></comp-checkbox-grp>
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
                                                            <col style="width: 130px" />
                                                            <col style="width: 350px" />
                                                            <col style="width: 450px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>버튼형</th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>전체 사용</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_11" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_12" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_13" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_14" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_15" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_16" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_17" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :btn="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_18" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :btn="true"></comp-checkbox-grp>
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
                                                            <col style="width: 130px" />
                                                            <col style="width: 350px" />
                                                            <col style="width: 450px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>박스형</th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>전체 사용</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_21" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_22" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_23" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_24" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_25" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_26" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_27" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_02_28" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts" all-label="전체" :box="true"></comp-checkbox-grp>
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
                                                            <col style="width: 130px" />
                                                            <col style="width: 350px" />
                                                            <col style="width: 450px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>박스형</th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>전체 사용</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_21" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_22" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_23" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_24" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_25" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_26" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_27" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_04_28" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_grp" all-label="전체" :box="true"></comp-checkbox-grp>
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
                                                            <col style="width: 130px" />
                                                            <col style="width: 350px" />
                                                            <col style="width: 450px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>박스형</th>
                                                                <th><strong>기본</strong></th>
                                                                <th><strong>전체 사용</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_21" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_22" class="is-small" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_23" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_24" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_25" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_26" class="is-large" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" all-label="전체" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_27" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" :box="true"></comp-checkbox-grp>
                                                                </td>
                                                                <td>
                                                                    <comp-checkbox-grp id="chk_03_28" class="is-xlarge" v-model="checkboxDatas.checked_02" :opts="checkboxDatas.chkedList_opts_customcolor" all-label="전체" :box="true"></comp-checkbox-grp>
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
    name: 'component-checkbox',
    data() {
        return {
            checkboxDatas: {
                chkedList_opts: [
                    { code: 1, name: '체크1' },
                    { code: 2, name: '체크2', disabled: true },
                    { code: 3, name: '체크3' },
                ],
                chkedList_opts_grp: [
                    [
                        { code: 1, name: '체크1' },
                        { code: 2, name: '체크2', disabled: true },
                        { code: 3, name: '체크3' },
                    ],
                    [
                        { code: 4, name: '체크4' },
                        { code: 5, name: '체크5', disabled: true },
                        { code: 6, name: '체크6' },
                    ],
                ],
                chkedList_opts_customcolor: [
                    { code: 1, name: '체크1', color: '#ea8cd0' },
                    { code: 2, name: '체크2', color: '#6880d8', disabled: true },
                    { code: 3, name: '체크3', color: '#d6a924' },
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
