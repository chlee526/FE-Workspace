# Templates - 분석 대상별 언급량 점유율

-   분석 대상별 언급량 점유율 템플릿

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용             |
| ---------- | ----- | ---------------- |
| 2025-01-16 | 1.0.0 | 리드미 작성      |
| 2023-04-06 | 1.0.0 | 템플릿 최초 등록 |

---

#### File

| 파일명     | 타입  | 설명               |
| ---------- | ----- | ------------------ |
| index      | index | 공유 컴포넌트 메인 |
| style.scss | css   | 스타일             |

---

#### Useage

```vue
<template>
    <!-- 기본 -->
    <tmpl-share-comparision id="아이디" class="기본 클래스명" :common-search-opts="공통검색조건" :code="분석타입입" @click="차트 클릭 이벤트" />

    <!-- SLOT형 -->
    <!-- 박스형태 그대로 사용할 경우, Header부분을 Slot으로 제공 -->
    <tmpl-share-comparision id="아이디" class="기본 클래스명" :common-search-opts="공통검색조건" :code="분석타입입" @click="차트 클릭 이벤트">
        <h4 slot="title">
            <span>제목</span>
        </h4>
    </tmpl-share-comparision>
</template>
```

---

#### Props

|        필수        | Prop                 | 설명                                            | 타입/값  | Default         |
| :----------------: | :------------------- | :---------------------------------------------- | -------- | --------------- |
| :heavy_check_mark: | **id**               | 아이디                                          | `String` |                 |
| :heavy_check_mark: | **commonSearchOpts** | 공통 검색 조건<br />graphs, analsList 포함 필수 | `Object` |                 |
|                    | **graphType**        | 시작 그래프 종류                                | `String` | 'bar-stack-100' |

---

### Events

|   Event   | 설명                    | Callback                     |
| :-------: | :---------------------- | :--------------------------- |
| **click** | 차트 클릭시 이벤트 발생 | `Object`<br>해당 그래프 정보 |
