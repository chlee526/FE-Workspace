# UI - Form - SelectBox

-   셀렉트박스(단일선택/다중선택) 컴포넌트
-   옵션목록으로 셀렉트박스 데이터 연결

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                    |
| ---------- | ----- | --------------------------------------- |
| 2024-11-13 | 1.0.0 | props 추가 : useAnchorWidth,expandWidth |
| 2024-01-03 | 1.0.0 | 기능 추가 : 방향키로 목록 선택 가능     |
| 2023-04-06 | 1.0.0 | SelectBox 패키지 마이그레이션           |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 기본형 -->
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

<!-- 부모(selectBox) 넓이 사용 안함  -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" :useAnchorWidth="false"></comp-selectbox>

<!-- selectbox list 넓이 고정 -->
<comp-selectbox id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" expandWidth="200px"></comp-selectbox>
```

---

### Props

|           필수            | Prop                 | 설명                                                                                                                                                                    | 타입/값         | Default |
| :-----------------------: | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| :triangular_flag_on_post: | **id**               | 아이디<br>'아이디\_' + 넘버링 으로 개별 컴포넌트 ID 생성됨                                                                                                              | `String`        |         |
|                           | **class**            | 클래스명<br> 사이즈 : `'is-small'/'is-large'/'is-xlarge'`                                                                                                               | `String`        |         |
| :triangular_flag_on_post: | **v-model**          | 컴포넌트 할당 변수                                                                                                                                                      | `Vue Variables` |         |
| :triangular_flag_on_post: | **opts**             | 옵션 목록<br><pre>[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러", before: "라벨 아이콘", after: "라벨 아이콘" }, ... ]</pre> | `Array`         |         |
|                           | **style**            | width를 설정하기 위해서 사용(width: 100px)                                                                                                                              | `Css`           |         |
|                           | **notSelectedLabel** | 선택이 없는 경우, '선택없음' 같은 텍스트 설정이 필요할 때 사용 <br>설정한 텍스트가 기본 텍스트로 설정                                                                   | `String`        |         |
|                           | **allSelectedLabel** | 전체 선택이 필요한경우, '전체'같은 텍스트 설정이 필요할때 사용 <br>설정한 텍스트로 옵션이 추가됨                                                                        | `String`        |         |
|                           | **autoComplete**     | 자동완성 사용여부                                                                                                                                                       | `Boolean`       | false   |
|                           | **multiple**         | 다중선택 사용 여부                                                                                                                                                      | `Boolean`       | false   |
|                           | **useColor**         | 색상포함 여부                                                                                                                                                           | `Boolean`       | false   |
|                           | **disabled**         | 미사용 여부                                                                                                                                                             | `Attribute`     |         |
|                           | **useEllipsis**      | 말줄임표 적용 여부                                                                                                                                                      | `Boolean`       | false   |
|                           | **useAnchorWidth**   | anchor width(selectbox width) 사용여부<br> 부모 넓이 사용 안하면 list가 가진 요소의 넓이만큼 갖게 됨                                                                    | `Boolean`       | false   |
|                           | **expandWidth**      | list 고정 넓이 값                                                                                                                                                       | `String`        |         |

---

### Events

|   Event    | 설명                       | Callback  |
| :--------: | :------------------------- | :-------- |
| **change** | value 변경될때 이벤트 발생 | `Object`  |
