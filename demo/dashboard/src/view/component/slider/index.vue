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
                                            <h3><span>슬라이더</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">범위 슬라이더</div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>id<span class="type">String</span></dt>
                                                        <dd>컴포넌트 ID</dd>
                                                        <dd>'아이디_' + 넘버링으로 개별 컴포넌트 Id 생성됨.</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>class<span class="type">String</span></dt>
                                                        <dd>클래스명</dd>
                                                        <dd>사이즈 : 'is-small'</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">String</span></dt>
                                                        <dd>컴포넌트 할당 변수</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>min<span class="type">String</span></dt>
                                                        <dd>최소범위</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>max<span class="type">String</span></dt>
                                                        <dd>최대범위</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>unit<span class="type">String</span><span class="default">null</span></dt>
                                                        <dd>단위</dd>
                                                    </dl>
                                                    <dl class="nec">
                                                        <dt>division<span class="type">String</span><span class="default">null</span></dt>
                                                        <dd>분할 구간 수 설정</dd>
                                                        <dd>'label' 타입을 사용하려면 필수 설정</dd>
                                                        <dd>null 이면 타입에 상관없이 무조건 'nolabel' 타입 적용됨</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>type<span class="type">String</span><span class="default">label</span></dt>
                                                        <dd>타입</dd>
                                                        <dd>type : 'label', 'nolabel'</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='
    <!-- 기본형(Label) -->                                                                   
    <comp-slider id="아이디명" class="클래스명" v-model="Vue Variables" min="최소범위" max="최대범위" unit="단위" division="분할 구간 수"></comp-slider>
    
    <!-- 라벨 없는 타입(Nolabel) -->
    <comp-slider id="아이디명" class="클래스명" type="nolabel" v-model="Vue Variables" min="최소범위" max="최대범위" unit="단위"></comp-slider>
     
    ' />
                                                </div>
                                            </div>
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col style="width: 450px" />
                                                            <col style="width: 450px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong></strong></th>
                                                                <th><strong>기본형(Label)</strong></th>
                                                                <th><strong>라벨 없는 타입(Nolabel)</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr style="height: 200px">
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td style="padding: 20px">
                                                                    <comp-slider id="slider_1" class="is-small" v-model="rangeData" division="10" min="0" max="100"></comp-slider>
                                                                </td>
                                                                <td style="padding: 20px 28px">
                                                                    <comp-slider id="slider_2" class="is-small" type="nolabel" v-model="rangeData2" min="0" max="100" unit="%"></comp-slider>
                                                                </td>
                                                            </tr>

                                                            <tr style="height: 200px">
                                                                <th><strong>Nomal 사이즈</strong></th>
                                                                <td style="padding: 20px">
                                                                    <comp-slider id="slider_3" v-model="rangeData3" min="0" max="100" unit="%" division="10"></comp-slider>
                                                                </td>
                                                                <td style="padding: 20px 28px">
                                                                    <comp-slider id="slider_4" type="nolabel" v-model="rangeData4" min="0" max="80" unit="%"></comp-slider>
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
    name: 'component-slider',
    data() {
        return {
            rangeData: '',
            rangeData2: '',
            rangeData3: '20,60',
            rangeData4: '30,50',
        };
    },
};
</script>

<style></style>
