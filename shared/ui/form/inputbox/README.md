# UI - Form - InputBox

-   InputBox UI

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                                                                                    |
| ---------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| 2024-06-18 | 1.2.0 | props -'preventTab' 추가                                                                                                |
| 2023-11-13 | 1.2.0 | 'dbClickActive' 타입에 'is-hover-transparent' 클래스 추가                                                               |
| 2023-11-08 | 1.2.0 | 'search' 타입에 검색 카테고리 추가를 위해 'inputSelect' 슬롯 추가                                                       |
| 2023-11-03 | 1.2.0 | type: 'dbClickActive' 타입 UI 추가, props -"validation" : 조건 성립 안되면 보더 컬러 효과 추가                          |
| 2023-09-06 | 1.2.0 | props -"autocomplete" String도 넘길 수 있음(단, store.getters 이름만 가능)                                              |
| 2023-08-04 | 1.2.0 | props -"focusResetVisible" 추가, 자동완성 리스트 "vue-virtual-scroll-list" 라이브러리 적용                              |
| 2023-07-14 | 1.1.0 | props -"validation": 타입 및 기능 수정. <br/> 기존: 유효성검사 여부 체크(Boolean) -> 변경: 커스텀 유효성 함수(Function) |
| 2023-04-06 | 1.0.0 | InputBox 패키지 마이그레이션                                                                                            |

---

#### File

| 파일명  | 타입     | 설명                                                                                  |
| ------- | -------- | ------------------------------------------------------------------------------------- |
| index   | index    | 공유 컴포넌트 메인                                                                    |
| AtcItem | 컴포넌트 | "vue-virtual-scroll-list" 라이브러리 사용을 위한 자동완성 목록 아이템 컴포넌트로 분리 |

---

#### Useage

```vue
<template>
    <!-- 기본형 -->
    <comp-input-box id="아이디명" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값"></comp-input-box>

    <!-- Type -->
    <comp-input-box id="아이디명" type="number" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :min="0" :max="200" style="width속성설정"></comp-input-box>

    <!-- Type: dbClickActive -->
    <comp-input-box id="아이디명" type="dbClickActive" class="클래스명" v-model="Vue Variables" :disableZeroLength="true" placeholder="placeholder값" label="라벨값" style="width속성설정"></comp-input-box>

    <!-- Width 고정 -->
    <comp-input-box id="아이디명" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" style="width속성설정"></comp-input-box>

    <!-- 선택없음 포함 -->
    <comp-input-box id="아이디명" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" readonly></comp-input-box>

    <!-- 미사용 -->
    <comp-input-box id="아이디명" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" disabled></comp-input-box>

    <!-- 초기화 버튼 미사용 -->
    <comp-input-box id="아이디명" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :disabled-reset="true"></comp-input-box>

    <!-- 인풋박스 포커싱 될 때만 초기화 버튼 보임 -->
    <comp-input-box id="아이디명" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :focus-reset-visible:="true"></comp-input-box>

    <!-- 커스텀 유효성 체크  -->
    <comp-input-box id="아이디명" type="password" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :validation="Function"></comp-input-box>

    <!-- 최소 글자수 설정 -->
    <comp-input-box id="아이디명" type="search" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :minlength="최소글자수(number)"></comp-input-box>

    <!-- 최소 글자수 설정 시 빈 값일 때 검색 버튼 비활성화  -->
    <comp-input-box id="아이디명" type="search" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :minlength="최소글자수(number)" :disableZeroLength="true"></comp-input-box>

    <!-- 'inputSelect' 슬롯 사용  -->
    <comp-input-box id="아이디명" type="search" class="클래스명" v-model="Vue Variables" placeholder="placeholder값" label="라벨값" :minlength="최소글자수(number)" :disableZeroLength="true">
        <comp-selectbox slot="inputSelect" id="input_select" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)"></comp-selectbox>
    </comp-input-box>
</template>

<script>
 <!-- 커스텀 유효성 체크 함수 전달시 예시 (에러 메세지(string) or true/false or null 리턴) -->
methods: {
       setValidate() {
            if (this.datas.value.trim().length === 0 || this.datas.value.trim().length < 5) {
                return '5글자 이상 입력해주세요';
            } else if (this.datas.value.length === 5) {
                return true;  // 'is-success' 클래스 적용
            } else if (this.datas.value.length > 5) {
                return false; // 초기화
            }
        },
}
</script>
```

---

#### Props

|        필수        | Prop                       | 설명                                                                                                                                                                                                                                                                                                                                                                                                                        | 타입/값             | Default |
| :----------------: | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| :heavy_check_mark: | **id**                     | 아이디                                                                                                                                                                                                                                                                                                                                                                                                                      | `String`            |         |
| :heavy_check_mark: | **label**                  | label값 설정 <br>코드에만 존재하고 엘리먼트는 눈에 보이지 않음.                                                                                                                                                                                                                                                                                                                                                             | `String`            |         |
| :heavy_check_mark: | **v-model**                | input 데이터                                                                                                                                                                                                                                                                                                                                                                                                                | `String`            |         |
|                    | **class**                  | 클래스명<br>사이즈 : `'is-small'`/ `'is-large'` / `'is-xlarge'` <br> 'is-hover-transparent' : 타입이 'dbClickActive' 일 경우 사용하는 클래스. 마우스 오버시 연필 아이콘만 표시되고, 'border' 와 'background' 는 표시없음                                                                                                                                                                                                    | `String`            |         |
|                    | **type**                   | 타입 설정<br>`'text'`/ `'search'` / `'number'` / `'password'` / 'dbClickActive'                                                                                                                                                                                                                                                                                                                                             | `String`            | 'text'  |
|                    | **disabledReset**          | 초기화 버튼 미사용 여부                                                                                                                                                                                                                                                                                                                                                                                                     | `Boolean`           | false   |
|                    | **focusResetVisible**      | 인풋에 포커싱 될 때만 초기화 버튼 보임                                                                                                                                                                                                                                                                                                                                                                                      | `Boolean`           | false   |
|                    | **min**                    | 설정가능한 최소값<br>type이 `'number'` 일때만 사용가능                                                                                                                                                                                                                                                                                                                                                                      | `Number`            |         |
|                    | **max**                    | 설정가능한 최대값<br>type이 `'number'` 일때만 사용가능                                                                                                                                                                                                                                                                                                                                                                      | `Number`            |         |
|                    | **validation**             | 커스텀 유효성 검사 함수 - 에러 메세지(String) or true/false(Boolean) or null 리턴<br/> \* 리턴 타입 <br/> `'String'` : 'is-error' 클래스 적용 + 에러메세지 툴팁 <br/>`'Boolean'`: `'true'` -> 'is-success' 클래스 적용 , `'false'`-> 초기화 <br>`'null'` : 초기화 <br><br> validation 이 null 일 경우 기본 유효성 체크 <br> - 타입 'password' : 글자수 체크,<br> - 타입 'text, search' : minlength 있을 경우 minlength 체크 | `Function`          | null    |
|                    | **minlength**              | 최소글자수 설정                                                                                                                                                                                                                                                                                                                                                                                                             | `Number`            |         |
|                    | **maxlength**              | 최대글자수 설정                                                                                                                                                                                                                                                                                                                                                                                                             | `Number`            |         |
|                    | **disableZeroLength**      | 최소 글자수 설정 시 빈 값일 때 검색 버튼 활성화 여부<br> \* type: 'dbClickActive' 일 경우 저장버튼 활성화 여부                                                                                                                                                                                                                                                                                                              | `Boolean`           | false   |
|                    | **autocomplete**           | 자동완성 목록<pre>[ {code: '' , value(name): '' } ]</pre> or Store.getters이름                                                                                                                                                                                                                                                                                                                                              | `Array` or `String` | null    |
|                    | **focusAutocompleteShow**  | 인풋 포커스시 자동완성 목록 보여짐                                                                                                                                                                                                                                                                                                                                                                                          | `Boolean`           | false   |
|                    | **forbiddenChars**         | 입력 금지 문자 또는 단어<pre>[ '\(', '\"', 'word' ]</pre>                                                                                                                                                                                                                                                                                                                                                                   | `Array`             |         |
|                    | **bubblePosition**         | validation사용 시 tooltip 위치                                                                                                                                                                                                                                                                                                                                                                                              | `String`            | 'LB'    |
|                    | **disablePwdAutoComplete** | 비밀번호 브라우저 자동완성 제어                                                                                                                                                                                                                                                                                                                                                                                             | `Boolean`           | false   |
|                    | **preventTab**             | keydown(tab) 이벤트 막을 경우 사용 (포커스 이동 X)                                                                                                                                                                                                                                                                                                                                                                          | `Boolean`           | false   |
|                    | **placeholder**            | 'placeholder' 값 설정                                                                                                                                                                                                                                                                                                                                                                                                       | `String`            |         |
|                    | **disabled**               | 미사용 여부                                                                                                                                                                                                                                                                                                                                                                                                                 | `Attribute`         |         |
|                    | **readonly**               | 읽기전용 여부                                                                                                                                                                                                                                                                                                                                                                                                               | `Attribute`         |         |
|                    | **style**                  | CSS 설정<br>width를 설정 하기 위해서만 사용(width:100px)                                                                                                                                                                                                                                                                                                                                                                    | `CSS`               |         |

---

#### Events

|   Event    | 설명                                     | Callback                                    | Default |
| :--------: | :--------------------------------------- | :------------------------------------------ | ------- |
| **search** | 컴포넌트 검색 이벤트 연결 함수           | `String`<br> '입력 데이터(input value)'     |         |
| **keyup**  | 컴포넌트 keyup(enter) 이벤트 연결 함수   | `String`<br> '입력 데이터(input value)'     |         |
| **enter**  | 컴포넌트 keydown(enter) 이벤트 연결 함수 | `String`<br> '입력 데이터(input value)'     |         |
|  **tab**   | 컴포넌트 keydown(tab) 이벤트 연결 함수   | `$event`<br> 'event'                        |         |
| **reset**  | 컴포넌트 리셋 이벤트 연결 함수           | `없음`<br>이벤트가 일어났을때 이벤트만 전달 |         |
| **change** | 컴포넌트 change 이벤트 연결 함수         | `없음`<br>이벤트가 일어났을때 이벤트만 전달 |         |
|  **save**  | 컴포넌트 save 이벤트 연결 함수           | `String`<br> '입력 데이터(input value)'     |         |
