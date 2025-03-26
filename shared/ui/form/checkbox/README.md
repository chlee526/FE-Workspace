# UI - form - CheckBox

-   체크박스(단일형) 컴포넌트
-   라벨/버튼형(라벨필수) 선택이 가능
-   한개의 체크박스에 한개의 데이터 연결

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                  |
| ---------- | ----- | --------------------- |
| 2023-04-06 | 1.0.0 | CheckBox 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<!-- 기본 -->
<comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" label="라벨명" custom-color="커스텀컬러"></comp-checkbox>

<!-- 버튼형 -->
<comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" label="라벨명(라벨필수)" :btn="true" custom-color="커스텀컬러"></comp-checkbox>

<!-- 라벨 없음 -->
<comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" custom-color="커스텀컬러"></comp-checkbox>

<!-- 미사용(Disabled) -->
<comp-checkbox class="클래스명" id="아이디명" :val="Value값" v-model="Vue Variables" label="라벨명" custom-color="커스텀컬러" disabled></comp-checkbox>
```

#### Props

|        필수        | Prop            | 설명                                                                                                             | 타입/값                                         | Default |
| :----------------: | :-------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- | :------ |
|                    | **id**          | 아이디                                                                                                           | `String`                                        |         |
|                    | **class**       | 클래스 <br>`'is-board'`: 게시판 전용기능. 게시판에서 선택용도로(단독) 사용될 때, 인터렉션 영역이 cell전체로 확장 | `String`<br>`'is-small'/'is-large'/'is-xlarge'` |         |
|                    | **name**        | 그룹명                                                                                                           | `String`                                        |         |
| :heavy_check_mark: | **val**         | input value                                                                                                      | `String`                                        |         |
| :heavy_check_mark: | **v-model**     | 컴포넌트 할당 변수                                                                                               | `Vue Variables`                                 |         |
|                    | **label**       | 라벨 명(버튼형 사용시 필수)                                                                                      | `String`                                        | ''      |
|                    | **btn**         | 버튼형으로 사용시                                                                                                | `Boolean`                                       | false   |
|                    | **box**         | 박스형으로 사용시                                                                                                | `Boolean`                                       | false   |
|                    | **grp**         | 그룹형으로 사용시(comp-checkbox-grp 전용)                                                                        | `Boolean`                                       | false   |
|                    | **customColor** | 사용자색상                                                                                                       | `Hex`                                           |         |
|                    | **disabled**    | 미 사용 여부                                                                                                     | `Boolean`                                       |         |
|                    | **before**      | 라벨 아이콘 (가상요소 X, label 앞 쪽에 element 삽입)                                                             | `String`                                        |         |
|                    | **after**       | 라벨 아이콘 (가상요소 X, label 뒤 쪽에 element 삽입)                                                             | `String`                                        |         |
|                    | **treeview**    | 트리뷰로 사용시(comp-tree-view 전용)                                                                             | `Boolean`                                       | false   |
|                    | **searchName**  | 트리뷰로 사용시(comp-tree-view 전용)                                                                             | `String`                                        |         |
|                    | **tabindex**    | tabindex 설정(음수 적용 때문에 String 타입 적용)                                                                 | `String`                                        | '0'     |

---

### Events

|   Event    | 설명                           | Callback                  |
| :--------: | :----------------------------- | :------------------------ |
| **click**  | 컴포넌트 클릭 이벤트 연결 함수 | `Object`<br>PointerEvent  |
| **change** | 컴포넌트 변경 이벤트 연결 함수 | `Object`<br>PointerEvent  |
