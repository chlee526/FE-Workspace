# UI - Form - Slider

-   Slider UI

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                       |
| ---------- | ----- | -------------------------- |
| 2023-04-06 | 1.0.0 | Slider 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<template>
    <!-- 기본형(Label) -->
    <comp-slider id="아이디명" class="클래스명" v-model="Vue Variables" min="최소범위" max="최대범위" unit="단위" division="분할 구간 수"></comp-slider>

    <!-- 라벨 없는 타입(Nolabel) -->
    <comp-slider id="아이디명" class="클래스명" type="nolabel" v-model="Vue Variables" min="최소범위" max="최대범위" unit="단위"></comp-slider>
</template>
```

---

#### Props

|        필수        | Prop         | 설명                                                                                                                  | 타입/값  | Default      |
| :----------------: | :----------- | :-------------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| :heavy_check_mark: | **id**       | 아이디<br>'아이디\_' + 넘버링으로 개별 컴포넌트 Id 생성됨.                                                            | `String` |              |
|                    | **class**    | 클래스명<br>사이즈 : `'is-small'`                                                                                     | `String` |              |
|                    | **type**     | 타입<br> `'label'`/ `'nolabel'`                                                                                       | `String` | label        |
| :heavy_check_mark: | **min**      | 최소범위                                                                                                              | `String` | 0            |
| :heavy_check_mark: | **max**      | 최대범위                                                                                                              | `String` | 100          |
| :heavy_check_mark: | **division** | 분할 구간 수 설정<br>`'label'`타입을 사용하려면 필수 설정<br>`null`이면 타입에 상관없이 무조건 `'nolabel'`타입 적용됨 | `String` | null         |
| :heavy_check_mark: | **v-model**  | 컴포넌트 할당 변수<br>`'최소범위,최대범위'`&nbsp; ex&#41;`'0,100'`                                                    | `String` | null         |
|                    | **unit**     | 단위                                                                                                                  | `String` | null         |
|                    | **style**    | CSS 설정<br>width를 설정 하기 위해서만 사용                                                                           | `CSS`    | width: 480px |

---

#### Events

-   Events 없음
