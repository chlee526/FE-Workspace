# UI - Form - Radio

-   라디오버튼(단일형) 컴포넌트
-   라벨/버튼형 선택이 가능
-   다수의 라디오버튼에 한개의 데이터 연결

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                      |
| ---------- | ----- | ------------------------- |
| 2023-04-06 | 1.0.0 | Radio 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 기본형 -->
<comp-radio id="아이디명" class="클래스명" name="그룹명" :val="Value값" v-model="Vue Variables" label="라벨명"></comp-radio>

<!-- 박스형 -->
<comp-radio id="아이디명" class="클래스명" name="그룹명" :val="Value값" v-model="Vue Variables" label="라벨명" box="true"></comp-radio>

<!-- 미사용(Disabled) -->
<comp-radio id="아이디명" class="클래스명" name="그룹명" :val="Value값" v-model="Vue Variables" label="라벨명" disabled></comp-radio>
```

---

### Props

|           필수            | Prop            | 설명                                                       | 타입/값         | Default |
| :-----------------------: | :-------------- | :--------------------------------------------------------- | --------------- | ------- |
| :triangular_flag_on_post: | **id**          | 아이디<br>'아이디\_' + 넘버링 으로 개별 컴포넌트 ID 생성됨 | `String`        |         |
|                           | **class**       | 클래스명<br> 사이즈 : `'is-small'/'is-large'/'is-xlarge'`  | `String`        |         |
|                           | **name**        | 그룹명(name의 값이 같은 것 중에서 하나를 선택)             | `String`        |         |
| :triangular_flag_on_post: | **val**         | input value                                                | `String`        |         |
| :triangular_flag_on_post: | **v-model**     | 컴포넌트 할당 변수                                         | `Vue Variables` |         |
|                           | **label**       | 라벨명                                                     | `String`        |         |
|                           | **btn**         | 버튼형으로 사용시                                          | `Boolean`       | false   |
|                           | **box**         | 박스형으로 사용시(comp-radio-grp 전용)                     | `Boolean`       | false   |
|                           | **grp**         | 그룹형으로 사용시(comp-radio-grp 전용)                     | `Boolean`       | false   |
|                           | **customColor** | 사용자색상                                                 | `Hex`           | null    |
|                           | **disabled**    | 미사용 여부                                                | `Boolean`       |         |
|                           | **before**      | 라벨 아이콘 (가상요소 X, label 앞 쪽에 element 삽입)       | `String`        |         |
|                           | **after**       | 라벨 아이콘 (가상요소 X, label 뒤 쪽에 element 삽입)       | `String`        |         |

---

### Events

|   Event   | 설명                           | Callback                  |
| :-------: | :----------------------------- | :------------------------ |
| **click** | 컴포넌트 클릭 이벤트 연결 함수 | `Object`<br>PointerEvent  |
