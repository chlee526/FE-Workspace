# UI - Tooltip

-   말풍선 컴포넌트
-   일반형/HTML형/이미지형 중 선택해서 사용
-   기본은 일반형
-   Slot으로 제작되어 말풍선 타겟을 설정할 수 있음

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                        |
| ---------- | ----- | --------------------------- |
| 2025-01-14 | 1.0.1 | showFixed type 재정의       |
| 2023-04-06 | 1.0.0 | Tooltip 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 기본 -->
<comp-bubble-box subject="제목" content="컨텐츠" subcontent="서브컨텐츠" pos="LT" custom-color="사용자 색상">
    <타켓 엘리먼트/컴포넌트></타켓 엘리먼트/컴포넌트>
</comp-bubble-box>

<!-- 말풍선 활성화 여부 -->
<comp-bubble-box subject="제목" showFixed="true/false/null" content="컨텐츠" subcontent="서브컨텐츠" pos="LT" custom-color="사용자 색상">
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
```

---

### Props

| 필수 | Prop             | Sync | 설명                                                                                                                                                                                                                                                       | 타입/값          | Default |
| :--: | :--------------- | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
|      | **class**        |      | `'is-validation'` : 유효성 검사일 경우<br>`'is-helper'` : 도움말일 경우                                                                                                                                                                                    | `String`         |         |
|      | **subject**      |      | 말풍선 제목                                                                                                                                                                                                                                                | `String`         |         |
|      | **content**      |      | 말풍선 내용                                                                                                                                                                                                                                                | `String`         |         |
|      | **contentLimit** |      | 말풍선 내용 글자수 제한할때 사용                                                                                                                                                                                                                           | `String`         | NaN     |
|      | **subcontent**   |      | 말풍선 서브텍스트                                                                                                                                                                                                                                          | `Number`         |         |
|      | **htmlType**     |      | 말풍선 내용에 HTML 사용여부<br>HTML사용할 경우 SLOT으로 말풍선 제작(예시참조)                                                                                                                                                                              | `Boolean`        | false   |
|      | **image**        |      | Image보기 사용할 경우, url값을 전달함                                                                                                                                                                                                                      | `String`         |         |
|      | **pos**          |      | 말풍선 위치(horizontal/vertical)<br>`LT/CT/RT, LB/CB/RB, L/R`                                                                                                                                                                                              | `String`         | LT      |
|      | **arrowFixed**   |      | 말풍선 위치 14px로 고정                                                                                                                                                                                                                                    | `Boolean`        | false   |
|      | **showFixed**    |      | 말풍선 활성화 여부 <br>`true` : 말풍선 고정<br>`false` : 말풍선 비활성화<br>`null(default)` : hover 시 말풍선 on/off<br><hr>단, `null` 일 경우<br> `content` `subcontent` `htmlType` `title` `image`<br> props의 전달 값이 하나라도 없으면 말풍선 비활성화 | `Boolean` `Null` | null    |
|      | **click**        |      | 클릭 액션 사용 여부<br>클릭 시 말풍선 토글 - toggle로 대체                                                                                                                                                                                                 | `Boolean`        | false   |
|      | **toggle**       |      | 클릭 액션 사용 여부<br>클릭 시 말풍선 토글                                                                                                                                                                                                                 | `Boolean`        | false   |
|      | **style**        |      | 최대 width를 설정 하기 위해서만 사용(max-width:100px)                                                                                                                                                                                                      | `CSS`            |         |
|      | **customColor**  |      | 커스텀 색상 설정                                                                                                                                                                                                                                           | `Hex`            |         |

---

### Events

-   Events 없음
