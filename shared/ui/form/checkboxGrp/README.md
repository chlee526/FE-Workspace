# UI - form - CheckBoxGrp

-   체크박스(그룹형) 컴포넌트
-   기본형/버튼형/박스형 선택이 가능
-   옵션목록으로 체크박스 데이터 연결

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                     |
| ---------- | ----- | ------------------------ |
| 2024-10-30 | 1.0.0 | Grid 속성 추가           |
| 2023-04-06 | 1.0.0 | CheckBoxGrp 마이그레이션 |

---

#### File

| 파일명      | 타입     | 설명               |
| ----------- | -------- | ------------------ |
| CheckBoxGrp | 컴포넌트 | 그룹 컴포넌트 메인 |

---

#### Useage

```vue
<!-- 기본형 -->
<comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 사용여부"></comp-checkbox-grp>

<!-- 버튼형 -->
<comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 사용여부" :btn="true"></comp-checkbox-grp>

<!-- 박스형 -->
<comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 사용여부" :box="true"></comp-checkbox-grp>

<!-- 미사용(Disabled) -->
<comp-checkbox-grp id="아이디명" class="클래스명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" all-label="전체선택 사용여부" disabled></comp-checkbox-grp>
```

#### Props

|        필수        | Prop                 | 설명                                                                                                                       | 타입/값         | Default |
| :----------------: | :------------------- | :------------------------------------------------------------------------------------------------------------------------- | :-------------- | :------ |
| :heavy_check_mark: | **id**               | 아이디                                                                                                                     | `String`        |         |
|                    | **class**            | 클래스<br>`'is-small'/'is-large'/'is-xlarge'`                                                                              | `String`        |         |
|                    | **name**             | 그룹명                                                                                                                     | `String`        |         |
| :heavy_check_mark: | **opts**             | 옵션 목록<br><pre>[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러" }, ... ]</pre> | `Array`         |         |
|                    | **allLabel**         | 전체 기능 사용시 라벨명                                                                                                    | `String`        |         |
|                    | **btn**              | 버튼형 사용 여부                                                                                                           | `Boolean`       | false   |
|                    | **box**              | 박스형 사용 여부                                                                                                           | `Boolean`       | false   |
|                    | **grid**             | grid 값의 column을 가진 GRID형태                                                                                           | `Number`        | null    |
|                    | **allUnchkDisabled** | 미전체해제(1개 남았을때 해제)가 안됨<br> allLabel 미사용시에만 사용                                                        | `Boolean`       | false   |
| :heavy_check_mark: | **v-model**          | 컴포넌트 할당 변수                                                                                                         | `Vue Variables` |         |

---
